import { ArrowLeft, Facebook, Globe, Instagram } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProSocialLinksProps {
  onBack: () => void;
  onContinue: () => void;
}

const ProSocialLinks = ({ onBack, onContinue }: ProSocialLinksProps) => {
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [website, setWebsite] = useState("");

  const validateUrl = (url: string) => {
    if (!url) return true; // Empty URLs are valid (optional fields)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValid = [instagram, tiktok, facebook, website].every(validateUrl);

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
            <Progress value={50} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">Connect Your Presence</h1>
          <p className="text-muted-foreground">
            Step 3 of 6 - Link Your Social Media
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram URL
              </Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/yourusername"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktok" className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                TikTok URL
              </Label>
              <Input
                id="tiktok"
                placeholder="https://tiktok.com/@yourusername"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook URL
              </Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/yourpage"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Personal Website or Linktree
              </Label>
              <Input
                id="website"
                placeholder="https://your-website.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            These links will appear on your profile and help clients find your past work.
            All fields are optional, but adding them can help build trust with potential clients.
          </div>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" className="w-full" onClick={onBack}>
              Go Back
            </Button>
            <Button 
              className="w-full" 
              onClick={onContinue}
              disabled={!isValid}
            >
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProSocialLinks;