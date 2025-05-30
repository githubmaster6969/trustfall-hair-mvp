import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

type ImageUpload = {
  preview: string;
  file: File;
} | null;

interface UserOnboardingProps {
  onBack: () => void;
  onContinue: () => void;
}

const UserOnboarding = ({ onBack, onContinue }: UserOnboardingProps) => {
  const [frontImage, setFrontImage] = useState<ImageUpload>(null);
  const [sideImage, setSideImage] = useState<ImageUpload>(null);
  const [topImage, setTopImage] = useState<ImageUpload>(null);
  const [backImage, setBackImage] = useState<ImageUpload>(null);
  const [blurFace, setBlurFace] = useState(false);

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
    label,
    required = false,
  }: {
    image: ImageUpload;
    setImage: (image: ImageUpload) => void;
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
        required={required}
      />
      <Label
        htmlFor={`upload-${label}`}
        className="block w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
      >
        {image ? (
          <img
            src={image.preview}
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
      {image && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setImage(null)}
        >
          ×
        </Button>
      )}
    </div>
  );

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
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City or ZIP Code</Label>
              <Input
                id="location"
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
                label="Front View"
                required
              />
              <ImageUploadBox
                image={sideImage}
                setImage={setSideImage}
                label="Side View"
                required
              />
              <ImageUploadBox
                image={topImage}
                setImage={setTopImage}
                label="Top View (Optional)"
              />
              <ImageUploadBox
                image={backImage}
                setImage={setBackImage}
                label="Back View (Optional)"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="outline" className="w-full" onClick={onBack}>
            Go Back
          </Button>
          <Button className="w-full" onClick={onContinue}>Continue</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserOnboarding;