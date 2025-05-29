import { ArrowLeft, Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface ProAvailabilityProps {
  onBack: () => void;
  onContinue: () => void;
}

type TimeSlot = {
  id: string;
  start: string;
  end: string;
};

type DaySchedule = {
  enabled: boolean;
  timeSlots: TimeSlot[];
};

type WeeklySchedule = {
  [key: string]: DaySchedule;
};

const ProAvailability = ({ onBack, onContinue }: ProAvailabilityProps) => {
  const [calendarConnected, setCalendarConnected] = useState<string | null>(null);
  const [walkInsEnabled, setWalkInsEnabled] = useState(false);
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    monday: { enabled: true, timeSlots: [{ id: '1', start: '09:00', end: '17:00' }] },
    tuesday: { enabled: true, timeSlots: [{ id: '2', start: '09:00', end: '17:00' }] },
    wednesday: { enabled: true, timeSlots: [{ id: '3', start: '09:00', end: '17:00' }] },
    thursday: { enabled: true, timeSlots: [{ id: '4', start: '09:00', end: '17:00' }] },
    friday: { enabled: true, timeSlots: [{ id: '5', start: '09:00', end: '17:00' }] },
    saturday: { enabled: false, timeSlots: [] },
    sunday: { enabled: false, timeSlots: [] },
  });

  const addTimeSlot = (day: string) => {
    const newSlot: TimeSlot = {
      id: Math.random().toString(36).substring(7),
      start: '09:00',
      end: '17:00',
    };
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [...prev[day].timeSlots, newSlot],
      },
    }));
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter(slot => slot.id !== slotId),
      },
    }));
  };

  const updateTimeSlot = (day: string, slotId: string, field: 'start' | 'end', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map(slot =>
          slot.id === slotId ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const toggleDay = (day: string, enabled: boolean) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled,
        timeSlots: enabled ? 
          (prev[day].timeSlots.length ? prev[day].timeSlots : [{ id: Math.random().toString(36).substring(7), start: '09:00', end: '17:00' }]) 
          : prev[day].timeSlots,
      },
    }));
  };

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

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
            <Progress value={83.33} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">Set Your Availability</h1>
          <p className="text-muted-foreground">
            Step 4 of 6 - Working Hours
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Connect Your Calendar
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant={calendarConnected === 'google' ? 'default' : 'outline'}
                className="h-20"
                onClick={() => setCalendarConnected('google')}
              >
                <div className="space-y-1">
                  <div className="font-medium">Google Calendar</div>
                  {calendarConnected === 'google' && (
                    <div className="text-xs">Connected ✓</div>
                  )}
                </div>
              </Button>

              <Button
                variant={calendarConnected === 'apple' ? 'default' : 'outline'}
                className="h-20"
                onClick={() => setCalendarConnected('apple')}
              >
                <div className="space-y-1">
                  <div className="font-medium">Apple Calendar</div>
                  {calendarConnected === 'apple' && (
                    <div className="text-xs">Connected ✓</div>
                  )}
                </div>
              </Button>

              <Button
                variant={calendarConnected === 'outlook' ? 'default' : 'outline'}
                className="h-20"
                onClick={() => setCalendarConnected('outlook')}
              >
                <div className="space-y-1">
                  <div className="font-medium">Outlook Calendar</div>
                  {calendarConnected === 'outlook' && (
                    <div className="text-xs">Connected ✓</div>
                  )}
                </div>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Weekly Schedule
            </h2>

            <div className="space-y-6">
              {Object.entries(schedule).map(([day, { enabled, timeSlots }]) => (
                <div key={day} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">{formatDay(day)}</Label>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => toggleDay(day, checked)}
                    />
                  </div>

                  {enabled && (
                    <div className="space-y-4 pl-6">
                      {timeSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center gap-4">
                          <Select
                            value={slot.start}
                            onValueChange={(value) => updateTimeSlot(day, slot.id, 'start', value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <span>to</span>

                          <Select
                            value={slot.end}
                            onValueChange={(value) => updateTimeSlot(day, slot.id, 'end', value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="flex gap-2">
                            {timeSlots.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTimeSlot(day, slot.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                            {timeSlots.length < 3 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => addTimeSlot(day)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Switch
                id="walk-ins"
                checked={walkInsEnabled}
                onCheckedChange={setWalkInsEnabled}
              />
              <Label htmlFor="walk-ins">
                Accept walk-ins during available hours
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
            disabled={Object.values(schedule).every(day => !day.enabled)}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProAvailability;