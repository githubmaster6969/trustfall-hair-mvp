import { BarChart2, Calendar, Home, Image, LayoutGrid, MessageCircle, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";

interface ProNavigationBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const ProNavigationBar = ({ currentPage, onNavigate }: ProNavigationBarProps) => {
  return (
    <>
      {/* Desktop Navigation - Left Vertical Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-[240px] bg-background border-r py-8 px-4">
        <div className="flex flex-col items-center gap-6">
          <Button
            variant={currentPage === "pro-dashboard" ? "default" : "ghost"}
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(ROUTES.PRO_DASHBOARD)}
          >
            <LayoutGrid className="h-5 w-5" />
            <span>Dashboard</span>
          </Button>
          <Button
            variant={currentPage === "bookings" ? "default" : "ghost"}
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(ROUTES.PRO_BOOKINGS)}
          >
            <Calendar className="h-5 w-5" />
            <span>Bookings</span>
          </Button>
          <Button
            variant={currentPage === "messages" ? "default" : "ghost"}
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(ROUTES.PRO_MESSAGES)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>Messages</span>
          </Button>
          <Button
            variant={currentPage === "portfolio" ? "default" : "ghost"}
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(ROUTES.PRO_PORTFOLIO)}
          >
            <Image className="h-5 w-5" />
            <span>Portfolio</span>
          </Button>
          <Button
            variant={currentPage === "analytics" ? "default" : "ghost"}
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(ROUTES.PRO_ANALYTICS)}
          >
            <BarChart2 className="h-5 w-5" />
            <span>Analytics</span>
          </Button>
          <Button
            variant={currentPage === "settings" ? "default" : "ghost"}
            size="lg"
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(ROUTES.PRO_SETTINGS)}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Bar */}
      <div className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4",
        "z-50"
      )}>
        <div className="flex justify-around items-center">
          <Button
            variant={currentPage === "pro-dashboard" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate(ROUTES.PRO_DASHBOARD)}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={currentPage === "bookings" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate(ROUTES.PRO_BOOKINGS)}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Bookings</span>
          </Button>
          <Button
            variant={currentPage === "messages" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate(ROUTES.PRO_MESSAGES)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Messages</span>
          </Button>
          <Button
            variant={currentPage === "profile" ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate(ROUTES.PRO_PROFILE)}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProNavigationBar;