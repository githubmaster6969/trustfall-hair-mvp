import { ArrowLeft, Ruler, Sparkles, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/routes";
import { motion } from "framer-motion";

type ImageUpload = {
  preview: string;
  file: File;
} | null;

const HaircutPreferences = () => {
  const navigate = useNavigate();
  const { bookingData, updateBooking } = useBooking();
  const [referenceImage, setReferenceImage] = useState<ImageUpload>(null);
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [description, setDescription] = useState("");

  const handleContinue = () => {
    updateBooking({
      description,
      reference: referenceImage?.preview || socialMediaLink
    });
    
    navigate(ROUTES.SCHEDULING);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceImage({
        preview: URL.createObjectURL(file),
        file,
      });
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
            <Button variant="ghost" size="icon" onClick={() => navigate(ROUTES.USER_ONBOARDING)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={40} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">Your Hair Profile</h1>
          <p className="text-muted-foreground">
            Step 2 of 4 - Hair Analysis & Preferences
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Here's what we detected from your photos</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-medium">Hair Type</h3>
                </div>
                <p className="text-sm text-muted-foreground">Type 2A - Wavy</p>
              </Card>
              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Ruler className="h-5 w-5" />
                  <h3 className="font-medium">Hair Length</h3>
                </div>
                <p className="text-sm text-muted-foreground">Medium (Shoulder Length)</p>
              </Card>
              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <UserCircle className="h-5 w-5" />
                  <h3 className="font-medium">Face Shape</h3>
                </div>
                <p className="text-sm text-muted-foreground">Oval</p>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="description" className="text-lg font-medium block mb-4">
                Describe your desired haircut
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the style, length, and any specific details about the haircut you want..."
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium block">
                Have a reference photo or link? (Optional)
              </Label>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-sm text-muted-foreground">
                    Upload a reference photo
                  </Label>
                  <div className="relative group">
                    <input
                      type="file"
                      id="reference"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="reference"
                      className="block w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      {referenceImage ? (
                        <img
                          src={referenceImage.preview}
                          alt="Reference"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
                          <Image className="w-8 h-8 text-muted-foreground/50" />
                          <span className="text-sm text-muted-foreground text-center">
                            Click to upload
                          </span>
                        </div>
                      )}
                    </Label>
                    {referenceImage && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setReferenceImage(null)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social-link" className="text-sm text-muted-foreground">
                    Or paste a social media link
                  </Label>
                  <Input
                    id="social-link"
                    placeholder="Instagram, Pinterest, or TikTok URL"
                    value={socialMediaLink}
                    onChange={(e) => setSocialMediaLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="outline" className="w-full" onClick={() => navigate(ROUTES.USER_ONBOARDING)}>
            Go Back
          </Button>
          <Button
            className="w-full"
            onClick={handleContinue}
            disabled={!description}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HaircutPreferences;