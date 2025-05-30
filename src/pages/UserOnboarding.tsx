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
import { Eye, EyeOff } from "lucide-react";

type ImageUpload = {
  preview: string;
  file: File;
} | null;

interface UserOnboardingProps {
  onBack: () => void;
  onContinue: (profileId: string) => void;
}

const UserOnboarding = ({ onBack, onContinue }: UserOnboardingProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) throw new Error('No authenticated user');

    const { data, error } = await supabase.storage
      .from('user-photos')
      .upload(`${user.id}/${path}`, file, { upsert: true });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('user-photos')
      .getPublicUrl(data.path);
      
    return publicUrl;
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.location) {
      toast({ 
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive" 
      }); 
      return;
    }

    if (formData.password.length < 6) {
    if ((!frontImage && !frontImageUrl) || (!sideImage && !sideImageUrl)) {
      toast({ 
        title: "Missing Photos",
        description: "Please upload the required front and side view photos.",
        variant: "destructive" 
      }); 
      return;
    }

    setIsLoading(true);

    try {
      // Create new profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          location: formData.location,
          blur_face: blurFace
        })
        .select()
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Failed to create profile');

      // Only upload new images
      const uploads = await Promise.all([
        frontImage ? uploadImage(frontImage.file, `${profile.id}/front.jpg`) : frontImageUrl,
        sideImage ? uploadImage(sideImage.file, `${profile.id}/side.jpg`) : sideImageUrl,
        topImage ? uploadImage(topImage.file, `${profile.id}/top.jpg`) : topImageUrl,
        backImage ? uploadImage(backImage.file, `${profile.id}/back.jpg`) : backImageUrl,
      ]);

      // Update image URLs in state
      setFrontImageUrl(uploads[0]);
      setSideImageUrl(uploads[1]);
      setTopImageUrl(uploads[2]);
      setBackImageUrl(uploads[3]);

      // Upsert user profile in database
      const { error } = await supabase.from('user_profiles').upsert({
        id: profile.id,
        front_photo_url: uploads[0],
        side_photo_url: uploads[1],
        top_photo_url: uploads[2],
        back_photo_url: uploads[3],
      });

      if (error) throw error;

      onContinue(profile.id);
    } catch (error) {
      console.error('Error:', error);
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <Label htmlFor="password">Password (minimum 6 characters)</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
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