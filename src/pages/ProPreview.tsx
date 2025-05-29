import { ArrowLeft, Check, Edit2, MapPin, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface ProPreviewProps {
  onBack: () => void;
  onContinue: () => void;
}

const mockProfile = {
  name: "Alex Rivera",
  avatar: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
  location: "Boston, MA",
  portfolio: [
    "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg",
    "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    "https://images.pexels.com/photos/1300345/pexels-photo-1300345.jpeg",
    "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
  ],
  services: [
    { name: "Haircut & Style", price: 45, duration: "45 min" },
    { name: "Fade & Design", price: 55, duration: "1 hr" },
    { name: "Beard Trim", price: 25, duration: "30 min" }
  ],
  availability: "Mon–Fri, 10am–6pm",
  social: {
    instagram: "@alexrivera.cuts",
    tiktok: "@alexrivera"
  }
};

const ProPreview = ({ onBack, onContinue }: ProPreviewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [specialties, setSpecialties] = useState([
    "Fades",
    "Designs",
    "Textured Crops"
  ]);
  const [experience, setExperience] = useState("5");
  const [license, setLicense] = useState("MA Board of Cosmetology #12345");

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto pt-12"
        >
          <Card className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">You're Live!</h1>
              <p className="text-muted-foreground">
                Your profile is now visible to clients in your area. We'll notify you when you receive booking requests.
              </p>
            </div>

            <Button className="w-full" size="lg" onClick={onContinue}>
              Go to Dashboard
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={100} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">You're Almost Ready</h1>
          <p className="text-muted-foreground">
            Step 6 of 6 - Review & Optimize
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={mockProfile.avatar}
                  alt={mockProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">{mockProfile.name}</h2>
                    <Badge variant="secondary">New to Trustfall</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{mockProfile.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Instagram:</span>{" "}
                    {mockProfile.social.instagram}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">TikTok:</span>{" "}
                    {mockProfile.social.tiktok}
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Available:</span>{" "}
                  {mockProfile.availability}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <Label className="text-lg mb-3 block">Portfolio</Label>
                <ScrollArea className="w-full">
                  <div className="flex gap-4 pb-4">
                    {mockProfile.portfolio.map((image, index) => (
                      <div
                        key={index}
                        className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div>
                <Label className="text-lg mb-3 block">Services</Label>
                <div className="space-y-3">
                  {mockProfile.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                      <p className="font-medium">${service.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-lg">Optimize Your Profile</Label>
              <p className="text-sm text-muted-foreground">
                Add details to help clients find you and trust your expertise
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your Specialties</Label>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 flex items-center gap-1"
                    >
                      {specialty}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 hover:bg-transparent"
                        onClick={() => setSpecialties(prev => prev.filter((_, i) => i !== index))}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7"
                    onClick={() => setSpecialties(prev => [...prev, "New Tag"])}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Tag
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="max-w-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">License/Certification (Optional)</Label>
                <Input
                  id="license"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="e.g., State Board License #"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  Going Live...
                </div>
              ) : (
                "Go Live on Trustfall"
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProPreview;