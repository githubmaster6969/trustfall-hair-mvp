import { ThemeProvider } from "@/components/ThemeProvider";
import LandingPage from "@/pages/LandingPage";
import UserOnboarding from "@/pages/UserOnboarding";
import HaircutPreferences from "@/pages/HaircutPreferences";
import SchedulingPreferences from "@/pages/SchedulingPreferences";
import RecommendedProfessionals from "@/pages/RecommendedProfessionals";
import ProProfile from "@/pages/ProProfile";
import BookingConfirmation from "@/pages/BookingConfirmation";
import BookingSuccessPage from "@/pages/BookingSuccessPage";
import UserDashboard from "@/pages/UserDashboard";
import ExplorePage from "@/pages/ExplorePage";
import TransformationPage from "@/pages/TransformationPage";
import ProSignup from "@/pages/ProSignup";
import ProSocialLinks from "@/pages/ProSocialLinks";
import ProPortfolio from "@/pages/ProPortfolio";
import ProAvailability from "@/pages/ProAvailability";
import ProServices from "@/pages/ProServices";
import ProPreview from "@/pages/ProPreview";
import ProDashboard from "@/pages/ProDashboard";
import { BookingProvider } from "@/context/BookingContext";
import { useState } from "react";

type Page = 
  | "landing" 
  | "onboarding" 
  | "pro-signup"
  | "pro-social-links"
  | "pro-portfolio"
  | "pro-availability"
  | "pro-services"
  | "pro-preview"
  | "pro-dashboard"
  | "preferences" 
  | "scheduling" 
  | "gallery" 
  | "profile" 
  | "booking" 
  | "explore" 
  | "transformation"
  | "bookingSuccess"
  | "dashboard";

interface PageState {
  page: Page;
  proId?: string;
  transformationId?: string;
  source?: Page;
}

function App() {
  const [pageState, setPageState] = useState<PageState>({ page: "landing" });
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
      <BookingProvider>
      {hasActiveBooking && pageState.page === "landing" ? (
        <UserDashboard onNavigate={navigateTo} />
      ) : pageState.page === "landing" ? (
        <LandingPage 
          onGetStarted={() => navigateTo("onboarding")}
          onExplore={() => navigateTo("explore", undefined, undefined, "landing")}
          onProSignup={() => navigateTo("pro-signup")}
        />
      ) : pageState.page === "onboarding" ? (
        <UserOnboarding 
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
        <HaircutPreferences
          onBack={navigateBack}
          onContinue={() => navigateTo("scheduling")}
        />
      ) : pageState.page === "scheduling" ? (
        <SchedulingPreferences
          onBack={navigateBack}
          onContinue={() => navigateTo("gallery")}
        />
      ) : pageState.page === "gallery" ? (
        <RecommendedProfessionals
          onBack={navigateBack}
          onViewProfile={(proId) => navigateTo("profile", proId)}
          onBook={(proId) => navigateTo("booking", proId)}
          onExplore={() => navigateTo("explore")}
        />
      ) : pageState.page === "profile" ? (
        <ProProfile
          proId={pageState.proId!}
          onBack={navigateBack}
          onBook={() => navigateTo("booking", pageState.proId)}
        />
      ) : pageState.page === "explore" ? (
        <ExplorePage
          onBack={navigateBack}
          onViewTransformation={(id) => navigateTo("transformation", undefined, id, "explore")}
          onViewProfile={(proId) => navigateTo("profile", proId)}
        />
      ) : pageState.page === "transformation" ? (
        <TransformationPage
          transformationId={pageState.transformationId!}
          onBack={navigateBack}
          onViewProfile={(proId) => navigateTo("profile", proId)}
          onBook={(proId) => navigateTo("booking", proId)}
        />
      ) : pageState.page === "booking" ? (
        <BookingConfirmation
          proId={pageState.proId!}
          onBack={navigateBack}
          onSendBookingRequest={() => {
            setHasActiveBooking(true);
            navigateTo("bookingSuccess", pageState.proId);
          }}
        />
      ) : pageState.page === "bookingSuccess" ? (
        <BookingSuccessPage
          proId={pageState.proId!}
          onViewDashboard={() => navigateTo("dashboard")}
        />
      ) : pageState.page === "dashboard" ? (
        <UserDashboard
          onNavigate={navigateTo}
        />
      ) : pageState.page === "pro-dashboard" ? (
        <ProDashboard
          onNavigate={navigateTo}
        />
      ) : null}
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;