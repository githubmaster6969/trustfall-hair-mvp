import { Check, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface BookingSuccessPageProps {
  proId: string;
  onViewDashboard: () => void;
}

const BookingSuccessPage = ({ onViewDashboard }: BookingSuccessPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-8 pt-12"
      >
        <Card className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Booking Request Sent!</h1>
            <p className="text-muted-foreground">
              Your request has been sent to Alex. They'll review your photos and preferences
              and confirm your appointment within 24 hours.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button className="w-full" size="lg" onClick={onViewDashboard}>
              <Calendar className="mr-2 h-4 w-4" />
              View My Dashboard
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <MessageCircle className="mr-2 h-4 w-4" />
              Send a Message
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingSuccessPage;