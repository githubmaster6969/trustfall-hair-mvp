import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue your journey
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button className="w-full" size="lg">
            Sign In
          </Button>

          <div className="text-center">
            <a 
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}