import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProServicesProps {
  onBack: () => void;
  onContinue: () => void;
}

type Service = {
  id: string;
  category: string;
  name: string;
  price: string;
  duration: string;
  notes?: string;
};

const serviceCategories = [
  "Haircut",
  "Fade / Taper / Blend",
  "Lineup / Edge Up",
  "Beard Care",
  "Hair & Beard Combo",
  "Kids Cut",
  "Braids / Twists",
  "Color / Bleach",
  "Wash & Style",
  "Add-ons"
];

const durationOptions = [
  "15 min",
  "30 min",
  "45 min",
  "1 hr",
  "1 hr 15 min",
  "1 hr 30 min",
  "1 hr 45 min",
  "2 hrs"
];

const ProServices = ({ onBack, onContinue }: ProServicesProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addService = () => {
    if (!selectedCategory) return;

    const newService: Service = {
      id: Math.random().toString(36).substring(7),
      category: selectedCategory,
      name: "",
      price: "",
      duration: "30 min"
    };

    setServices(prev => [...prev, newService]);
    setSelectedCategory("");
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const isValidService = (service: Service) => {
    return service.name.trim() !== "" && 
           service.price.trim() !== "" && 
           !isNaN(parseFloat(service.price));
  };

  const remainingCategories = serviceCategories.filter(
    category => !services.some(service => service.category === category)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={83.33} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">List Your Services</h1>
          <p className="text-muted-foreground">
            Step 5 of 6 - Service Menu Setup
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a service category" />
              </SelectTrigger>
              <SelectContent>
                {remainingCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={addService}
              disabled={!selectedCategory}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="grid gap-6">
            {services.map(service => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge>{service.category}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${service.id}`}>Service Name</Label>
                      <Input
                        id={`name-${service.id}`}
                        placeholder="e.g., Low Fade with Curls"
                        value={service.name}
                        onChange={(e) => updateService(service.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`price-${service.id}`}>Price (USD)</Label>
                      <Input
                        id={`price-${service.id}`}
                        placeholder="e.g., 35"
                        value={service.price}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, '');
                          updateService(service.id, 'price', value);
                        }}
                        type="text"
                        inputMode="decimal"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`duration-${service.id}`}>Duration</Label>
                      <Select
                        value={service.duration}
                        onValueChange={(value) => updateService(service.id, 'duration', value)}
                      >
                        <SelectTrigger id={`duration-${service.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map(duration => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`notes-${service.id}`}>Additional Notes (Optional)</Label>
                      <Textarea
                        id={`notes-${service.id}`}
                        placeholder="e.g., Includes neck shave, Designs extra"
                        value={service.notes}
                        onChange={(e) => updateService(service.id, 'notes', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="outline" className="w-full" onClick={onBack}>
            Go Back
          </Button>
          <Button 
            className="w-full" 
            onClick={onContinue}
            disabled={services.length === 0 || !services.every(isValidService)}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProServices;