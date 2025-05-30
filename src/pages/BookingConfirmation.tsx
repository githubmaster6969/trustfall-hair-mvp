import { ArrowLeft, Calendar, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface BookingConfirmationProps {
  proId: string;
  onBack: () => void;
  onSendBookingRequest: () => void;
}

interface Service {
  name: string;
  price: number;
  duration: string;
}

interface Professional {
  id: string;
  name: string;
  avatar: string;
  services: Service[];
  distance: number;
}

interface UserPreferences {
  description: string;
  photos: {
    front: string;
    side: string;
    top?: string;
    back?: string;
  };
}

const mockProfessional: Professional = {
  id: "1",
  name: "Alex Rivera",
  avatar: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
  services: [
    { name: "Haircut & Style", price: 45, duration: "45 min" },
    { name: "Fade & Design", price: 55, duration: "1 hr" },
    { name: "Beard Trim", price: 25, duration: "30 min" },
    { name: "Hair & Beard Combo", price: 65, duration: "1 hr 15 min" }
  ],
  distance: 2.3
};

const mockUserPreferences: UserPreferences = {
  description: "I'm looking for a modern textured crop with a mid fade. I want to keep some length on top for styling, but make it manageable for daily styling. My hair is thick and slightly wavy, so I'd like to work with that natural texture.",
  photos: {
    front: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    side: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg",
    top: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    back: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"
  }
};

const BookingConfirmation = ({ onBack, onSendBookingRequest }: BookingConfirmationProps) => {
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Mock selected service and time
  const selectedService = mockProfessional.services[0];
  const selectedDate = new Date();
  selectedDate.setDate(selectedDate.getDate() + 2);
  selectedDate.setHours(14, 0, 0, 0);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
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
          <h1 className="text-2xl font-semibold">Confirm Your Booking Request</h1>
          <p className="text-muted-foreground mt-2">
            Review your appointment details and add any specific requests
          </p>
          <Separator className="my-6" />
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          <div className="space-y-6 order-2 md:order-1">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Your Uploaded Photos</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(mockUserPreferences.photos).map(([key, url]) => (
                    <div key={key} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`${key} view`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">What You Asked For</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {mockUserPreferences.description}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Label htmlFor="message">Additional Details or Requests (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Example: I have a cowlick on the right side, prefer scissors over clippers..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Card className="p-6 order-1 md:order-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={mockProfessional.avatar}
                  alt={mockProfessional.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-lg">{mockProfessional.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mockProfessional.distance} miles away</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedService.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedService.duration}</p>
                </div>
                <p className="font-medium">${selectedService.price}</p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(selectedDate)}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 pt-6">
          <Separator />
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm leading-relaxed text-muted-foreground"
            >
              I understand this is a booking request and will be confirmed by the professional. 
              The photos and description I provided will be shared with the stylist to help them 
              prepare for my appointment.
              Once confirmed, I'll receive detailed instructions and the professional's exact location.
            </Label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            Go Back
          </Button>
          <Button
            className="flex-1"
            disabled={!agreed}
            onClick={onSendBookingRequest}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Booking Request
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;