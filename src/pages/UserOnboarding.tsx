import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

type ImageUpload = {
  preview: string;
  file: File;
} | null;

interface UserOnboardingProps {
  onBack: () => void;
  onContinue: () => void;
  onLogin: () => void;
}

const UserOnboarding = ({ onBack, onContinue, onLogin }: UserOnboardingProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const isMounted = useRef(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
  });
  
  const [frontImage, setFrontImage] = useState<ImageUpload>(null);
  const [sideImage, setSideImage] = useState<ImageUpload>(null);
  const [topImage, setTopImage] = useState<ImageUpload>(null);
  const [backImage, setBackImage] = useState<ImageUpload>(null);
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null);
  const [sideImageUrl, setSideImageUrl] = useState<string | null>(null);
  const [topImageUrl, setTopImageUrl] = useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null);
  const [blurFace, setBlurFace] = useState(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const checkAuthAndLoadData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          toast({
            title: "Authentication Required",
            description: "Please log in or sign up to continue.",
            variant: "destructive"
          });
          onLogin();
          return;
        }

        setUserId(user.id);

        const { data: profiles, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
          throw error;
        }

        // Check if we have a profile and use it to populate the form
        if (profiles) {
          setFormData({
            fullName: profiles.full_name,
            email: profiles.email,
            location: profiles.location,
          });
          setBlurFace(profiles.blur_face ?? false);
          setFrontImageUrl(profiles.front_photo_url);
          setSideImageUrl(profiles.side_photo_url);
          setTopImageUrl(profiles.top_photo_url);
          setBackImageUrl(profiles.back_photo_url);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        toast({
          title: "Error Loading Profile",
          description: "Unable to load your profile data. You can continue with creating a new profile.",
          variant: "default"
        });
      }
    };

    checkAuthAndLoadData();
  }, [toast, onLogin]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (image: ImageUpload) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage({
        preview: URL.createObjectURL(file),
        file,
      });
    }
  };

  const ImageUploadBox = ({
    image,
    setImage,
    imageUrl,
    label,
    required = false,
  }: {
    image: ImageUpload;
    setImage: (image: ImageUpload) => void;
    imageUrl: string | null;
    label: string;
    required?: boolean;
  }) => (
    <div className="relative group">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, setImage)}
        className="hidden"
        id={`upload-${label}`}
        required={required && !imageUrl}
      />
      <Label
        htmlFor={`upload-${label}`}
        className="block w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
      >
        {image || imageUrl ? (
          <img
            src={image?.preview || imageUrl}
            alt={label}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
            <Camera className="w-8 h-8 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground text-center">
              {label}
              {required && " *"}
            </span>
          </div>
        )}
      </Label>
      {(image || imageUrl) && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => {
            setImage(null);
            if (label === "Front View") setFrontImageUrl(null);
            if (label === "Side View") setSideImageUrl(null);
            if (label === "Top View") setTopImageUrl(null);
            if (label === "Back View") setBackImageUrl(null);
          }}
        >
          ×
        </Button>
      )}
    </div>
  );

  const uploadImage = async (file: File, path: string) => {
    if (!userId) throw new Error('No authenticated user');

    const { data, error } = await supabase.storage
      .from('user-photos')
      .upload(`${userId}/${path}`, file, { upsert: true });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('user-photos')
      .getPublicUrl(data.path);
      
    return publicUrl;
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to continue.",
        variant: "destructive"
      });
      onLogin();
      return;
    }

    if ((!frontImage && !frontImageUrl) || (!sideImage && !sideImageUrl) || !formData.fullName || !formData.email || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload required photos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Only upload new images
      const uploads = await Promise.all([
        frontImage ? uploadImage(frontImage.file, 'front.jpg') : frontImageUrl,
        sideImage ? uploadImage(sideImage.file, 'side.jpg') : sideImageUrl,
        topImage ? uploadImage(topImage.file, 'top.jpg') : topImageUrl,
        backImage ? uploadImage(backImage.file, 'back.jpg') : backImageUrl,
      ]);

      // Update image URLs in state
      setFrontImageUrl(uploads[0]);
      setSideImageUrl(uploads[1]);
      setTopImageUrl(uploads[2]);
      setBackImageUrl(uploads[3]);

      // Upsert user profile in database
      const { error } = await supabase.from('user_profiles').upsert({
        id: userId,
        full_name: formData.fullName,
        email: formData.email,
        location: formData.location,
        front_photo_url: uploads[0],
        side_photo_url: uploads[1],
        top_photo_url: uploads[2],
        back_photo_url: uploads[3],
        blur_face: blurFace
      });

      if (error) throw error;

      onContinue();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={20} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">Tell us about yourself</h1>
          <p className="text-muted-foreground">
            Step 1 of 5 - Basic Information
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name" 
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City or ZIP Code</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="Enter your location"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Upload Your Photos</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="blur-face"
                  checked={blurFace}
                  onCheckedChange={setBlurFace}
                />
                <Label htmlFor="blur-face" className="text-sm">
                  Blur my face
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ImageUploadBox
                image={frontImage}
                setImage={setFrontImage}
                imageUrl={frontImageUrl}
                label="Front View"
                required
              />
              <ImageUploadBox
                image={sideImage}
                setImage={setSideImage}
                imageUrl={sideImageUrl}
                label="Side View"
                required
              />
              <ImageUploadBox
                image={topImage}
                setImage={setTopImage}
                imageUrl={topImageUrl}
                label="Top View (Optional)"
              />
              <ImageUploadBox
                image={backImage}
                setImage={setBackImage}
                imageUrl={backImageUrl}
                label="Back View (Optional)"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="outline" className="w-full" onClick={onBack}>
            Go Back
          </Button>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserOnboarding;