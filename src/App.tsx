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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="trustfall-theme">
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            <Route path={ROUTES.USER_ONBOARDING} element={<UserOnboarding />} />
            <Route path={ROUTES.HAIR_PREFS} element={<HaircutPreferences />} />
            <Route path={ROUTES.SCHEDULING} element={<SchedulingPreferences />} />
            <Route path={ROUTES.RECOMMENDED_PROS} element={<RecommendedProfessionals />} />
            <Route path={ROUTES.CONFIRM_BOOKING} element={<BookingConfirmation />} />
            <Route path={ROUTES.SUCCESS} element={<BookingSuccessPage />} />
            <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
            <Route path={ROUTES.DASHBOARD} element={<UserDashboard />} />
            <Route path={ROUTES.TRANSFORMATION} element={<TransformationPage />} />
            
            {/* Professional Routes */}
            <Route path={ROUTES.PRO_SIGNUP} element={<ProSignup />} />
            <Route path={ROUTES.PRO_SOCIALS} element={<ProSocialLinks />} />
            <Route path={ROUTES.PRO_PORTFOLIO} element={<ProPortfolio />} />
            <Route path={ROUTES.PRO_SERVICES} element={<ProServices />} />
            <Route path={ROUTES.PRO_AVAILABILITY} element={<ProAvailability />} />
            <Route path={ROUTES.PRO_PREVIEW} element={<ProPreview />} />
            <Route path={ROUTES.PRO_PROFILE} element={<ProProfile />} />
            <Route path={ROUTES.PRO_DASHBOARD} element={<ProDashboard />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;