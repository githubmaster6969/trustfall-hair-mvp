import { Scissors, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { routes } from "@/routes/routes";

interface LandingPageProps {
  onGetStarted: () => void;
  onExplore: () => void;
  onProSignup: () => void;
}

const LandingPage = ({ onGetStarted, onExplore, onProSignup }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto text-center space-y-8"
      >
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Trustfall
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Confident Haircuts Start with Clarity
          </p>
        </div>

        <div className="space-y-4 mt-10">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onGetStarted()}
          >
            <Button 
              variant="default" 
              size="lg"
              className="w-full py-6 text-base flex items-center justify-center gap-2 shadow-sm"
            >
              <User className="h-5 w-5" />
              I'm Looking for a Haircut
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onProSignup()}
          >
            <Button 
              variant="outline" 
              size="lg"
              className="w-full py-6 text-base flex items-center justify-center gap-2 shadow-sm"
            >
              <Scissors className="h-5 w-5" />
              I'm a Barber or Stylist
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onExplore()}
          >
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full py-6 text-base flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Just Browsing – Explore Styles
            </Button>
          </motion.div>
        </div>

        <div className="mt-8">
          <a 
            href={routes.LOGIN}
            className="text-sm text-primary hover:underline transition-all"
          >
            Already have an account? Log In
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;