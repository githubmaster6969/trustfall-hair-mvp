import { BarChart2, Calendar, ChevronDown, Eye, Heart, ImagePlus, MessageCircle, Plus, Settings, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import ProNavigationBar from "@/components/ProNavigationBar";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/routes";

interface ProDashboardProps {
  onNavigate: (page: string) => void;
}

interface Booking {
  id: string;
  clientName: string;
  service: string;
  date: Date;
  status: "pending" | "confirmed" | "completed";
}

interface PortfolioPiece {
  id: string;
  image: string;
  title: string;
  likes: number;
  references: number;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    clientName: "Michael K.",
    service: "Fade & Design",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: "confirmed"
  },
  {
    id: "2",
    clientName: "James R.",
    service: "Haircut & Style",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: "pending"
  },
  {
    id: "3",
    clientName: "David M.",
    service: "Beard Trim",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: "confirmed"
  }
];

const mockPortfolio: PortfolioPiece[] = [
  {
    id: "1",
    image: "https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg",
    title: "Modern Textured Crop",
    likes: 156,
    references: 23
  },
  {
    id: "2",
    image: "https://images.pexels.com/photos/1300343/pexels-photo-1300343.jpeg",
    title: "Clean Low Fade",
    likes: 142,
    references: 18
  },
  {
    id: "3",
    image: "https://images.pexels.com/photos/1681007/pexels-photo-1681007.jpeg",
    title: "Classic Taper",
    likes: 128,
    references: 15
  }
];

const ProDashboard = ({ onNavigate }: ProDashboardProps) => {
  const [newRequests] = useState(2);
  const [timeFilter, setTimeFilter] = useState("7d");
  const { toast } = useToast();

  const handleMetricClick = (metric: string) => {
    onNavigate(`metrics/${metric.toLowerCase()}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const MetricCard = ({ icon: Icon, label, value, subtext, metric }: {
    icon: typeof Calendar;
    label: string;
    value: string | number;
    subtext?: string;
    metric: string;
  }) => (
    <Card 
      className="p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => handleMetricClick(metric)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="text-2xl font-semibold">{value}</div>
          {subtext && (
            <div className="text-sm text-muted-foreground">{subtext}</div>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-24 md:pl-[240px]">
      <div className="max-w-7xl mx-auto p-6 space-y-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-semibold">Welcome Back, Alex 👋</h1>
              <p className="text-muted-foreground">Here's how you're doing</p>
            </div>
            
            <div className="flex items-center justify-between">
              <Tabs defaultValue="overview" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stats">Explore Stats</TabsTrigger>
                  <TabsTrigger value="insights">Booking Insights</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <MetricCard
                  icon={Calendar}
                  label="Total Bookings"
                  value="156"
                  subtext="+12 this week"
                  metric="bookings"
                />
                <MetricCard
                  icon={Eye}
                  label="Profile Views"
                  value="2.3k"
                  subtext="Seen in Explore 27 times"
                  metric="views"
                />
                <MetricCard
                  icon={Heart}
                  label="Portfolio Engagement"
                  value="426"
                  subtext="Likes + Saves"
                  metric="engagement"
                />
                <MetricCard
                  icon={Star}
                  label="Referenced Styles"
                  value="56"
                  subtext="Used as inspiration"
                  metric="references"
                />
              </div>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Bookings Over Time</h2>
                  <Button variant="outline" size="sm">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Chart Coming Soon</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Portfolio Engagement</h2>
                  <Button variant="outline" size="sm" onClick={() => onNavigate(ROUTES.PRO_PORTFOLIO)}>View All</Button>
                </div>
                <ScrollArea className="w-full">
                  <div className="flex gap-4 pb-4">
                    {mockPortfolio.map((piece) => (
                      <div
                        key={piece.id}
                        className="w-[280px] flex-shrink-0 space-y-3"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={piece.image}
                            alt={piece.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{piece.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" /> {piece.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4" /> {piece.references} references
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Quick Actions</h2>
                </div>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Add New Style
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    View Public Profile
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">New Requests</h2>
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      {newRequests}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  {mockBookings.filter(b => b.status === "pending").map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{booking.clientName}</div>
                        <div className="text-sm text-muted-foreground">{booking.service}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(booking.date)}
                        </div>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
      <ProNavigationBar currentPage="pro-dashboard" onNavigate={onNavigate} />
    </div>
  );
};

export default ProDashboard;