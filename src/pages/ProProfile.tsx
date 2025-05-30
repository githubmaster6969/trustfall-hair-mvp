import { ArrowLeft, Calendar, MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProProfileProps {
  proId: string;
  onBack: () => void;
  onBook: () => void;
}

interface Service {
  name: string;
  price: number;
  duration: string;
  description: string;
}

interface Professional {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  services: Service[];
  portfolio: string[];
  matchScore: number;
  rating: number;
  distance: number;
  bookings: number;
  specialties: string[];
}

const mockProfessional: Professional = {
  id: "1",
  name: "Alex Rivera",
  avatar: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
  bio: "With over 8 years of experience, I specialize in modern men's cuts and creative designs. My approach combines classic techniques with contemporary styles to create looks that enhance your natural features.",
  services: [
    { 
      name: "Haircut & Style", 
      price: 45, 
      duration: "45 min",
      description: "Classic haircut with styling. Includes consultation, wash, cut, and style with premium products."
    },
    { 
      name: "Fade & Design", 
      price: 55, 
      duration: "1 hr",
      description: "Precision fade with optional design work. Perfect for creating unique, personalized styles."
    },
    { 
      name: "Beard Trim", 
      price: 25, 
      duration: "30 min",
      description: "Professional beard grooming including shape, trim, and line-up. Hot towel service included."
    },
    { 
      name: "Hair & Beard Combo", 
      price: 65, 
      duration: "1 hr 15 min",
      description: "Complete grooming package combining our signature haircut with full beard service."
    }
  ],
  portfolio: [
    "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg",
    "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    "https://images.pexels.com/photos/1300345/pexels-photo-1300345.jpeg",
    "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
  ],
  specialties: ["Fades", "Designs", "Textured Crops", "Modern Styles"],
  matchScore: 92,
  rating: 4.9,
  distance: 2.3,
  bookings: 156
};

const ProProfile = ({ onBack, onBook }: ProProfileProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="bg-card rounded-lg p-6 shadow-md">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={mockProfessional.avatar}
                alt={mockProfessional.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold">{mockProfessional.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>{mockProfessional.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockProfessional.bookings} bookings)
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
                  {mockProfessional.matchScore}% Match
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{mockProfessional.distance} miles away</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockProfessional.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p className="text-muted-foreground">{mockProfessional.bio}</p>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Services & Pricing</h2>
            <div className="space-y-3">
              {mockProfessional.services.map((service, index) => (
                <TooltipProvider
                  key={service.name}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-medium">${service.price}</p>
                          <Button 
                            size="sm"
                            onClick={() => onBook()}
                          >
                            Book
                          </Button>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>{service.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Work</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mockProfessional.portfolio.map((photo, index) => (
                <div 
                  key={index}
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {/* TODO: Open portfolio detail view */}}
                >
                  <img
                    src={photo}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white text-center p-4">
                      <p className="font-medium">View Details</p>
                      <p className="text-sm">Click to see transformation</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button className="flex-1" size="lg" onClick={onBook}>
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProProfile;