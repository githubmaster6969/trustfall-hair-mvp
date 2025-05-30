import React, { useState } from 'react';
import { Calendar, LogOut, MessageCircle, Search, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";

interface UserDashboardProps {
  onNavigate: (page: string, proId?: string) => void;
  onLogout?: () => void;
}

interface Booking {
  proId: string;
  proName: string;
  proImage: string;
  service: string;
  date: Date;
  status: "pending" | "confirmed" | "cancelled";
  address?: string;
}

interface SimilarStyle {
  id: string;
  title: string;
  image: string;
  stylist: string;
  matchScore: number;
}

const mockBooking: Booking = {
  proId: "1",
  proName: "Alex Rivera",
  proImage: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
  service: "Haircut & Style",
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  status: "pending",
  address: "123 Style Street, Suite 4B"
};

const mockSimilarStyles: SimilarStyle[] = [
  {
    id: "1",
    title: "Modern Textured Crop",
    image: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    stylist: "Alex Rivera",
    matchScore: 92
  },
  {
    id: "2",
    title: "Classic Taper Fade",
    image: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    stylist: "Jordan Chen",
    matchScore: 89
  },
  {
    id: "3",
    title: "Natural Waves",
    image: "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
    stylist: "Sam Taylor",
    matchScore: 87
  }
];

const UserDashboard = ({ onNavigate, onLogout }: UserDashboardProps) => {
  const [booking, setBooking] = useState<Booking>(mockBooking);

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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-24">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">My Dashboard</h1>
            <div className="flex gap-2">
              <Button onClick={() => onNavigate("explore")}>
                <Search className="h-4 w-4 mr-2" />
                Explore Styles
              </Button>
              <Button variant="ghost" onClick={() => onNavigate("landing")}>
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Booking</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={booking.proImage}
                  alt={booking.proName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{booking.proName}</h3>
                  <Badge 
                    variant={
                      booking.status === "confirmed" 
                        ? "default" 
                        : booking.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {booking.status === "confirmed" 
                      ? "Confirmed" 
                      : booking.status === "cancelled"
                      ? "Cancelled"
                      : "Pending Confirmation"}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{booking.service}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(booking.date)}</span>
                </div>
                {booking.address && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>{booking.address}</span>
                  </div>
                )}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-end gap-4">
              {booking.status !== "cancelled" && (
                <Button 
                  variant="destructive" 
                  onClick={() => setBooking(prev => ({ ...prev, status: "cancelled" }))}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Booking
                </Button>
              )}
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              {booking.status === "cancelled" && (
                <Button 
                  onClick={() => onNavigate("gallery")}
                >
                  Finish Booking
                </Button>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Similar Styles You Might Like</h2>
              <Button variant="ghost">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockSimilarStyles.map((style) => (
                <Card
                  key={style.id}
                  className="overflow-hidden cursor-pointer group"
                  onClick={() => onNavigate("profile", style.id)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={style.image}
                      alt={style.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">{style.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">by {style.stylist}</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {style.matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <NavigationBar currentPage="dashboard" onNavigate={onNavigate} />
    </div>
  );
};

export default UserDashboard;