import { Home, Search, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NavigationBar = ({ currentPage, onNavigate }: NavigationBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4 md:px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center">
          <Button
            variant={currentPage === "dashboard" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate("dashboard")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={currentPage === "explore" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate("explore")}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Explore</span>
          </Button>
          <Button
            variant={currentPage === "bookings" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate("booking")}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Bookings</span>
          </Button>
          <Button
            variant={currentPage === "profile" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;