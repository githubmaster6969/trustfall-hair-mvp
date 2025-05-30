import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/landing/Home";
import Upload from "@/pages/user/booking/Upload";
import Preferences from "@/pages/user/booking/Preferences";
import Scheduling from "@/pages/user/booking/Scheduling";
import Matches from "@/pages/user/booking/Matches";
import ProProfile from "@/pages/ProProfile";
import Confirm from "@/pages/user/booking/Confirm";
import Success from "@/pages/user/booking/Success";
import Dashboard from "@/pages/user/Dashboard";
import Explore from "@/pages/user/Explore";
import Profile from "@/pages/user/Profile";
import Messages from "@/pages/user/Messages";
import Bookings from "@/pages/user/Bookings";
import Login from "@/pages/login";
import TransformationPage from "@/pages/TransformationPage";
import ProSignup from "@/pages/ProSignup";
import ProSocialLinks from "@/pages/ProSocialLinks";
import ProPortfolio from "@/pages/ProPortfolio";
import ProAvailability from "@/pages/ProAvailability";
import ProServices from "@/pages/ProServices";
import ProPreview from "@/pages/ProPreview";
import ProDashboard from "@/pages/ProDashboard";
import { useState } from "react";

type Page = 
  | "home"
  | "login"
  | "upload"
  | "pro-signup"
  | "pro-social-links"
  | "pro-portfolio"
  | "pro-availability"
  | "pro-services"
  | "pro-preview"
  | "pro-dashboard"
  | "preferences"
  | "scheduling"
  | "matches"
  | "pro-profile"
  | "user-profile"
  | "confirm"
  | "explore"
  | "transformation"
  | "success"
  | "dashboard"
  | "messages"
  | "bookings";

interface PageState {
  page: Page;
  proId?: string;
  transformationId?: string;
  source?: Page;
}

function App() {
  const [pageState, setPageState] = useState<PageState>({ page: "home" });
  const [history, setHistory] = useState<PageState[]>([]);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);

  const navigateTo = (page: Page, proId?: string, transformationId?: string, source?: Page) => {
    // Save current state to history before navigating
    if (pageState.page !== page) {
      setHistory(prev => [...prev, pageState]);
    }
    setPageState({ page, proId, transformationId, source });
  };

  const navigateBack = () => {
    const previousState = history[history.length - 1];
    if (previousState) {
      setPageState(previousState);
      setHistory(prev => prev.slice(0, -1));
    } else {
      // Default fallback if no history exists
      setPageState({ page: "landing" });
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="trustfall-theme">
      {hasActiveBooking && pageState.page === "landing" ? (
        <Dashboard onNavigate={navigateTo} />
      ) : pageState.page === "home" ? (
        <Home
          onGetStarted={() => navigateTo("upload")}
          onExplore={() => navigateTo("explore", undefined, undefined, "landing")}
          onProSignup={() => navigateTo("pro-signup")}
        />
      ) : pageState.page === "login" ? (
        <Login />
      ) : pageState.page === "upload" ? (
        <Upload
          onBack={navigateBack}
          onContinue={() => navigateTo("preferences")}
        />
      ) : pageState.page === "pro-signup" ? (
        <ProSignup
          onBack={navigateBack}
          onContinue={() => navigateTo("pro-social-links")}
        />
      ) : pageState.page === "pro-social-links" ? (
        <ProSocialLinks
          onBack={navigateBack}
          onContinue={() => navigateTo("pro-portfolio")}
        />
      ) : pageState.page === "pro-portfolio" ? (
        <ProPortfolio
          onBack={navigateBack}
          onContinue={() => navigateTo("pro-services")}
        />
      ) : pageState.page === "pro-services" ? (
        <ProServices
          onBack={navigateBack}
          onContinue={() => navigateTo("pro-preview")}
        />
      ) : pageState.page === "pro-availability" ? (
        <ProAvailability
          onBack={navigateBack}
          onContinue={() => navigateTo("pro-preview")}
        />
      ) : pageState.page === "pro-preview" ? (
        <ProPreview
          onBack={navigateBack}
          onContinue={() => navigateTo("pro-dashboard")}
        />
      ) : pageState.page === "preferences" ? (
        <Preferences
          onBack={navigateBack}
          onContinue={() => navigateTo("scheduling")}
        />
      ) : pageState.page === "scheduling" ? (
        <Scheduling
          onBack={navigateBack}
          onContinue={() => navigateTo("matches")}
        />
      ) : pageState.page === "matches" ? (
        <Matches
          onBack={navigateBack}
          onViewProfile={(proId) => navigateTo("pro-profile", proId)}
          onBook={(proId) => navigateTo("confirm", proId)}
          onExplore={() => navigateTo("explore")}
        />
      ) : pageState.page === "pro-profile" ? (
        <ProProfile
          proId={pageState.proId!}
          onBack={navigateBack}
          onBook={() => navigateTo("confirm", pageState.proId)}
        />
      ) : pageState.page === "user-profile" ? (
        <Profile />
      ) : pageState.page === "messages" ? (
        <Messages />
      ) : pageState.page === "bookings" ? (
        <Bookings />
        />
      ) : pageState.page === "explore" ? (
        <Explore
          onBack={navigateBack}
          onViewTransformation={(id) => navigateTo("transformation", undefined, id, "explore")}
          onViewProfile={(proId) => navigateTo("pro-profile", proId)}
        />
      ) : pageState.page === "transformation" ? (
        <TransformationPage
          transformationId={pageState.transformationId!}
          onBack={navigateBack}
          onViewProfile={(proId) => navigateTo("pro-profile", proId)}
          onBook={(proId) => navigateTo("confirm", proId)}
        />
      ) : pageState.page === "confirm" ? (
        <Confirm
          proId={pageState.proId!}
          onBack={navigateBack}
          onSendBookingRequest={() => {
            setHasActiveBooking(true);
            navigateTo("success", pageState.proId);
          }}
        />
      ) : pageState.page === "success" ? (
        <Success
          proId={pageState.proId!}
          onViewDashboard={() => navigateTo("dashboard")}
        />
      ) : pageState.page === "dashboard" ? (
        <Dashboard
          onNavigate={navigateTo}
        />
      ) : pageState.page === "pro-dashboard" ? (
        <ProDashboard
          onNavigate={navigateTo}
        />
      ) : null}
    </ThemeProvider>
  );
}

export default App;