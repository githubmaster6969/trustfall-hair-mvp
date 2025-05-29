import { ArrowLeft, Bookmark, Calendar, ChevronLeft, ChevronRight, Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface TransformationPageProps {
  transformationId: string;
  onBack: () => void;
  onViewProfile: (proId: string) => void;
  onBook: (proId: string) => void;
}

interface Transformation {
  id: string;
  title: string;
  stylist: {
    id: string;
    name: string;
    avatar: string;
  };
  images: {
    before: string;
    after: string;
    process?: string[];
  };
  description: string;
  hairDetails: {
    type: string;
    length: string;
    faceShape: string;
    texture: string;
  };
  tags: string[];
  service: {
    name: string;
    price: number;
    duration: string;
  };
  reviews: {
    rating: number;
    total: number;
    featured: Array<{
      author: string;
      rating: number;
      comment: string;
      date: string;
      image?: string;
    }>;
  };
  similar: Array<{
    id: string;
    title: string;
    image: string;
    stylist: string;
    matchScore?: number;
  }>;
}

const mockTransformation: Transformation = {
  id: "1",
  title: "Modern Textured Crop with Low Fade",
  stylist: {
    id: "s1",
    name: "Alex Rivera",
    avatar: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg"
  },
  images: {
    before: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    after: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    process: [
      "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg",
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
    ]
  },
  description: "Client wanted a modern, low-maintenance style that would work with their natural texture. We went with a textured crop featuring a low fade to create a clean, professional look that's easy to style.",
  hairDetails: {
    type: "2A - Wavy",
    length: "Medium on top, Short sides",
    faceShape: "Oval",
    texture: "Medium / Normal"
  },
  tags: ["Low Fade", "Textured", "Professional", "Low Maintenance"],
  service: {
    name: "Haircut & Style",
    price: 45,
    duration: "45 min"
  },
  reviews: {
    rating: 4.9,
    total: 156,
    featured: [
      {
        author: "Michael K.",
        rating: 5,
        comment: "Alex understood exactly what I wanted. The cut is perfect and so easy to style!",
        date: "2 weeks ago",
        image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
      }
    ]
  },
  similar: [
    {
      id: "2",
      title: "Classic Taper Fade",
      image: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
      stylist: "Jordan Chen",
      matchScore: 89
    },
    {
      id: "3",
      title: "Modern Quiff",
      image: "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
      stylist: "Sam Taylor"
    },
    {
      id: "4",
      title: "Textured Crop",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      stylist: "Chris Parker",
      matchScore: 85
    }
  ]
};

const TransformationPage = ({ onBack, onViewProfile, onBook }: TransformationPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date>();
  
  const allImages = [
    mockTransformation.images.after,
    mockTransformation.images.before,
    ...(mockTransformation.images.process || [])
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={allImages[currentImageIndex]}
                alt="Transformation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevImage}
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextImage}
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 inset-x-4 flex justify-between items-center">
                <div className="flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">{mockTransformation.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={mockTransformation.stylist.avatar}
                      alt={mockTransformation.stylist.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <button
                      className="text-sm hover:underline"
                      onClick={() => onViewProfile(mockTransformation.stylist.id)}
                    >
                      by {mockTransformation.stylist.name}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>{mockTransformation.reviews.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockTransformation.reviews.total} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">What They Asked For</h2>
                <p className="text-muted-foreground">{mockTransformation.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-4 space-y-4">
                  <h2 className="font-medium">Hair Details</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hair Type</span>
                      <span>{mockTransformation.hairDetails.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length</span>
                      <span>{mockTransformation.hairDetails.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Face Shape</span>
                      <span>{mockTransformation.hairDetails.faceShape}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Texture</span>
                      <span>{mockTransformation.hairDetails.texture}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 space-y-4">
                  <h2 className="font-medium">Style Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {mockTransformation.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>

              {mockTransformation.reviews.featured.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Featured Reviews</h2>
                  {mockTransformation.reviews.featured.map((review, index) => (
                    <Card key={index} className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.author}</span>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        {review.image && (
                          <img
                            src={review.image}
                            alt="Review"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </Card>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-medium">Similar Styles</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {mockTransformation.similar.map((style) => (
                    <Card
                      key={style.id}
                      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => onViewProfile(style.id)}
                    >
                      <div className="relative aspect-square">
                        <img
                          src={style.image}
                          alt={style.title}
                          className="w-full h-full object-cover"
                        />
                        {style.matchScore && (
                          <Badge
                            className="absolute top-2 right-2 bg-primary text-primary-foreground"
                          >
                            {style.matchScore}% Match
                          </Badge>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <h3 className="font-medium text-sm">{style.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          by {style.stylist}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-8 space-y-6 h-fit"
          >
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    ${mockTransformation.service.price}
                  </h2>
                  <Badge variant="secondary">
                    {mockTransformation.service.duration}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {mockTransformation.service.name}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Select Date</h3>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={() => onBook(mockTransformation.stylist.id)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save as Reference
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransformationPage;