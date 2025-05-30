import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";

interface SchedulingPreferencesProps {
  onBack: () => void;
  onContinue: () => void;
}

const SchedulingPreferences = ({ onBack, onContinue }: SchedulingPreferencesProps) => {
  const [radius, setRadius] = useState([5]);
  const [date, setDate] = useState<Date>();
  const [isFlexible, setIsFlexible] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const toggleTimeSlot = (time: string) => {
    setSelectedTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={60} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">Location & Scheduling</h1>
          <p className="text-muted-foreground">
            Step 3 of 4 - Set Your Preferences
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <Label className="text-lg font-medium">
                How far are you willing to travel?
              </Label>
            </div>
            <div className="space-y-4 px-1">
              <Slider
                value={radius}
                onValueChange={setRadius}
                min={1}
                max={15}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>1 mile</span>
                <span className="font-medium text-foreground">
                  {radius[0]} {radius[0] === 1 ? 'mile' : 'miles'}
                </span>
                <span>15 miles</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <Label className="text-lg font-medium">
                When are you free for your haircut?
              </Label>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <Label className="text-sm text-muted-foreground">Available Time Slots</Label>
                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTimes.includes(time) ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => toggleTimeSlot(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="flexible"
                checked={isFlexible}
                onCheckedChange={setIsFlexible}
              />
              <Label htmlFor="flexible">
                I'm flexible on time
              </Label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="outline" className="w-full" onClick={onBack}>
            Go Back
          </Button>
          <Button 
            className="w-full" 
            onClick={onContinue}
            disabled={!date || selectedTimes.length === 0}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SchedulingPreferences;