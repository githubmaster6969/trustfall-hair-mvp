import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface ExplorePageProps {
  onBack: () => void;
  onViewProfile: (proId: string) => void;
  onViewTransformation: (id: string) => void;
}

interface Transformation {
  id: string;
  title: string;
  stylist: string;
  rating: number;
  reviews: number;
  matchScore?: number;
  distance: number;
  beforeImage: string;
  afterImage: string;
  category: string;
}

const mockTransformations: Transformation[] = [
  {
    id: "1",
    title: "Classic Drop Fade",
    stylist: "Alex Rivera",
    rating: 4.9,
    reviews: 156,
    matchScore: 92,
    distance: 2.3,
    beforeImage: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    afterImage: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    category: "Low Fades"
  },
  {
    id: "2",
    title: "Clean Buzz Cut",
    stylist: "Jordan Chen",
    rating: 4.8,
    reviews: 203,
    distance: 3.1,
    beforeImage: "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
    afterImage: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    category: "Buzz Cuts"
  },
  {
    id: "3",
    title: "Textured Natural Waves",
    stylist: "Sam Taylor",
    rating: 4.9,
    reviews: 178,
    matchScore: 87,
    distance: 1.8,
    beforeImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
    afterImage: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg",
    category: "Natural Styles"
  },
  {
    id: "4",
    title: "Modern Buzz Design",
    stylist: "Chris Parker",
    rating: 4.7,
    reviews: 142,
    distance: 4.2,
    beforeImage: "https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg",
    afterImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    category: "Buzz Cuts"
  },
  {
    id: "5",
    title: "Precision Low Fade",
    stylist: "Morgan Lee",
    rating: 4.8,
    reviews: 189,
    matchScore: 85,
    distance: 2.7,
    beforeImage: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg",
    afterImage: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    category: "Low Fades"
  },
  {
    id: "6",
    title: "Natural Curls",
    stylist: "Jamie Wilson",
    rating: 4.9,
    reviews: 167,
    distance: 3.5,
    beforeImage: "https://images.pexels.com/photos/1300345/pexels-photo-1300345.jpeg",
    afterImage: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    category: "Natural Styles"
  }
];

const categories = ["Buzz Cuts", "Low Fades", "Natural Styles"];

const ExplorePage = ({ onBack, onViewProfile, onViewTransformation }: ExplorePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold mb-2">
            Popular Haircuts Around Boston
          </h1>
          <p className="text-muted-foreground">
            Browse transformations and find your next style
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">{category} ›</h2>
                <Button variant="ghost">View All</Button>
              </div>
              
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4">
                  {mockTransformations
                    .filter(t => t.category === category)
                    .map((transformation) => (
                      <Card
                        key={transformation.id}
                        className="w-[300px] shrink-0 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => onViewTransformation(transformation.id)}
                      >
                        <div className="relative aspect-square">
                          <img
                            src={transformation.afterImage}
                            alt={transformation.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 left-2 w-20 h-20 rounded-md overflow-hidden border-2 border-white shadow-md">
                            <img
                              src={transformation.beforeImage}
                              alt="Before"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {transformation.matchScore && (
                            <Badge
                              className="absolute top-2 right-2 bg-primary text-primary-foreground"
                            >
                              {transformation.matchScore}% Match
                            </Badge>
                          )}
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-medium">{transformation.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            by {transformation.stylist}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span>{transformation.rating}</span>
                              <span className="text-muted-foreground">
                                ({transformation.reviews})
                              </span>
                            </div>
                            <span className="text-muted-foreground">
                              {transformation.distance} miles
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {mockTransformations.map((transformation) => (
            <motion.div
              key={transformation.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card
                className="cursor-pointer overflow-hidden"
                onClick={() => onViewProfile(transformation.id)}
              >
                <div className="relative aspect-square">
                  <img
                    src={transformation.afterImage}
                    alt={transformation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 w-20 h-20 rounded-md overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={transformation.beforeImage}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {transformation.matchScore && (
                    <Badge
                      className="absolute top-2 right-2 bg-primary text-primary-foreground"
                    >
                      {transformation.matchScore}% Match
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">{transformation.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {transformation.stylist}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{transformation.rating}</span>
                      <span className="text-muted-foreground">
                        ({transformation.reviews})
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {transformation.distance} miles
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExplorePage;