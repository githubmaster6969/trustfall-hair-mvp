import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { ROUTES } from "@/routes";

interface Professional {
  id: string;
  name: string;
  avatar: string;
  services: string[];
  portfolio: string[];
  matchScore: number;
  rating: number;
  distance: number;
  bookings: number;
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Alex Rivera",
    avatar: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    services: ["Fades", "Designs", "Textured Crops"],
    portfolio: [
      "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
      "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg"
    ],
    matchScore: 92,
    rating: 4.9,
    distance: 2.3,
    bookings: 156
  },
  {
    id: "2",
    name: "Jordan Chen",
    avatar: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    services: ["Tapers", "Textured Cuts", "Color"],
    portfolio: [
      "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
      "https://images.pexels.com/photos/1300345/pexels-photo-1300345.jpeg"
    ],
    matchScore: 89,
    rating: 4.8,
    distance: 3.1,
    bookings: 203
  },
  {
    id: "3",
    name: "Sam Taylor",
    avatar: "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
    services: ["Natural Styles", "Waves", "Layers"],
    portfolio: [
      "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
    ],
    matchScore: 87,
    rating: 4.9,
    distance: 1.8,
    bookings: 178
  },
  {
    id: "4",
    name: "Morgan Lee",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
    services: ["Bobs", "Styling", "Extensions"],
    portfolio: [
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"
    ],
    matchScore: 85,
    rating: 4.7,
    distance: 4.2,
    bookings: 142
  },
  {
    id: "5",
    name: "Chris Parker",
    avatar: "https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg",
    services: ["Layered Cuts", "Face Framing", "Balayage"],
    portfolio: [
      "https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    ],
    matchScore: 84,
    rating: 4.8,
    distance: 2.7,
    bookings: 189
  },
  {
    id: "6",
    name: "Jamie Wilson",
    avatar: "https://images.pexels.com/photos/1181576/pexels-photo-1181576.jpeg",
    services: ["Pixie Cuts", "Undercuts", "Creative Color"],
    portfolio: [
      "https://images.pexels.com/photos/1181576/pexels-photo-1181576.jpeg",
      "https://images.pexels.com/photos/1181579/pexels-photo-1181579.jpeg"
    ],
    matchScore: 82,
    rating: 4.9,
    distance: 3.5,
    bookings: 167
  }
];

const RecommendedProfessionals = () => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'bookings'>('distance');

  const handleBook = (proId: string) => {
    updateBooking({ selectedPro: proId });
    navigate(ROUTES.CONFIRM_BOOKING);
  };

  const sortedProfessionals = [...mockProfessionals].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'bookings':
        return b.bookings - a.bookings;
      default:
        return a.distance - b.distance;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={80} className="h-2" />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Top Professionals Matched to Your Look</h1>
            <Button variant="outline" onClick={() => navigate(ROUTES.EXPLORE)}>
              Explore Styles
            </Button>
          </div>
          <p className="text-muted-foreground">
            Step 4 of 4 - Choose Your Stylist
          </p>
          <div className="flex items-center gap-4">
            <Button
              variant={sortBy === 'distance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('distance')}
            >
              Closest
            </Button>
            <Button
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('rating')}
            >
              Top Rated
            </Button>
            <Button
              variant={sortBy === 'bookings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('bookings')}
            >
              Most Booked
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProfessionals.map((pro) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={pro.avatar}
                        alt={pro.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{pro.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span>{pro.rating}</span>
                        <span className="text-muted-foreground">({pro.bookings} bookings)</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {pro.matchScore}% Match
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {pro.services.map((service) => (
                      <Badge key={service} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pro.distance} miles away
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <img
                    src={pro.portfolio[0]}
                    alt="Portfolio 1"
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <img
                    src={pro.portfolio[1]}
                    alt="Portfolio 2"
                    className="w-full h-24 object-cover rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`${ROUTES.PRO_PROFILE}/${pro.id}`)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={() => handleBook(pro.id)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default RecommendedProfessionals;