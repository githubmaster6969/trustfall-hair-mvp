import { ArrowLeft, Camera, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProPortfolioProps {
  onBack: () => void;
  onContinue: () => void;
}

type PortfolioEntry = {
  id: string;
  after: {
    preview: string;
    file: File;
  };
  before?: {
    preview: string;
    file: File;
  };
  analysis?: {
    hairType: string;
    faceShape: string;
    style: string;
  };
};

const ProPortfolio = ({ onBack, onContinue }: ProPortfolioProps) => {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    entryId: string,
    type: 'before' | 'after'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          [type]: {
            preview: URL.createObjectURL(file),
            file,
          },
          // Mock AI analysis when after photo is uploaded
          analysis: type === 'after' ? {
            hairType: "Type 2A - Wavy",
            faceShape: "Oval",
            style: "Modern Textured Crop"
          } : entry.analysis
        };
      }
      return entry;
    }));
  };

  const addEntry = () => {
    const newEntry: PortfolioEntry = {
      id: Math.random().toString(36).substring(7),
      after: {
        preview: "",
        file: new File([], "")
      }
    };
    setEntries(prev => [...prev, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Progress value={66.67} className="h-2" />
          </div>
          <h1 className="text-2xl font-semibold">Upload Your Work</h1>
          <p className="text-muted-foreground">
            Step 3 of 6 - Portfolio Setup
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <Card key={entry.id} className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <Label className="text-sm font-medium">After Photo</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, entry.id, 'after')}
                      className="hidden"
                      id={`after-${entry.id}`}
                      required
                    />
                    <Label
                      htmlFor={`after-${entry.id}`}
                      className="block w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      {entry.after.preview ? (
                        <img
                          src={entry.after.preview}
                          alt="After"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
                          <Camera className="w-8 h-8 text-muted-foreground/50" />
                          <span className="text-sm text-muted-foreground text-center">
                            Upload the final result
                          </span>
                        </div>
                      )}
                    </Label>
                  </div>

                  {entry.after.preview && (
                    <div className="space-y-4">
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, entry.id, 'before')}
                          className="hidden"
                          id={`before-${entry.id}`}
                        />
                        <Label
                          htmlFor={`before-${entry.id}`}
                          className="block w-full aspect-[4/3] rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
                        >
                          {entry.before?.preview ? (
                            <img
                              src={entry.before.preview}
                              alt="Before"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
                              <Camera className="w-8 h-8 text-muted-foreground/50" />
                              <span className="text-sm text-muted-foreground text-center">
                                Add before photo (optional)
                              </span>
                            </div>
                          )}
                        </Label>
                      </div>

                      {entry.analysis && (
                        <div className="space-y-2">
                          <Label className="text-sm">AI Analysis</Label>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{entry.analysis.hairType}</Badge>
                            <Badge variant="secondary">{entry.analysis.faceShape}</Badge>
                            <Badge variant="secondary">{entry.analysis.style}</Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}

            {entries.length < 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={addEntry}
                  className="w-full h-full min-h-[300px] border-2 border-dashed"
                >
                  <Plus className="h-6 w-6 mr-2" />
                  Add Another Style
                </Button>
              </motion.div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            AI will help tag your work so clients with similar hair and styles can find you more easily.
          </div>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" className="w-full" onClick={onBack}>
              Go Back
            </Button>
            <Button 
              className="w-full" 
              onClick={onContinue}
              disabled={entries.length === 0 || entries.some(e => !e.after.preview)}
            >
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProPortfolio;