import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, RotateCcw } from "lucide-react";
import sampleDog from "@/assets/sample-dog.jpg";

interface ResultSectionProps {
  answers: Record<string, string>;
  aiResult?: {
    breed: string;
    traits: string[];
    reasoning: string;
    image?: string;
  } | null;
  onRestartQuiz: () => void;
}

export const ResultSection = ({ answers, aiResult, onRestartQuiz }: ResultSectionProps) => {
  // Use AI result if available, otherwise fallback to simple logic
  const getBreedRecommendation = () => {
    if (aiResult) {
      return {
        name: aiResult.breed,
        image: aiResult.image || sampleDog, // Use AI-generated image or fallback
        traits: aiResult.traits,
        description: aiResult.reasoning
      };
    }

    // Fallback logic if AI result is not available
    const { activity, homeSize, sizePreference, experience, timeAtHome } = answers;
    
    if (activity === "high" && sizePreference === "large") {
      return {
        name: "Golden Retriever",
        image: sampleDog,
        traits: ["High Energy", "Family Friendly", "Easy to Train", "Moderate Grooming"],
        description: "Perfect for active families! Golden Retrievers love outdoor activities and are incredibly loyal companions."
      };
    } else if (homeSize === "apartment" && sizePreference === "small") {
      return {
        name: "Cavalier King Charles Spaniel",
        image: sampleDog,
        traits: ["Gentle", "Apartment Friendly", "Low Exercise", "Moderate Grooming"],
        description: "Ideal for apartment living! These gentle dogs are perfect companions for a more relaxed lifestyle."
      };
    } else if (experience === "none" && timeAtHome === "lots") {
      return {
        name: "Labrador Retriever",
        image: sampleDog,
        traits: ["Beginner Friendly", "Loyal", "Moderate Energy", "Easy Care"],
        description: "Perfect first dog! Labs are forgiving, loving, and great for new dog owners who are home often."
      };
    } else {
      return {
        name: "Border Collie",
        image: sampleDog,
        traits: ["Highly Intelligent", "Active", "Trainable", "High Grooming"],
        description: "For the dedicated owner! Border Collies are brilliant dogs that thrive with mental and physical stimulation."
      };
    }
  };

  const breed = getBreedRecommendation();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-success/5 to-accent/5 px-4 py-16">
      <div className="max-w-2xl mx-auto w-full text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            🎉 {aiResult ? 'AI-Matched' : 'Paw-some'} Choice!
          </h2>
          <p className="text-xl text-muted-foreground">
            {aiResult ? 'Our AI analyzed your lifestyle and found your perfect match:' : 'Based on your answers, here\'s your perfect dog match:'}
          </p>
        </div>

        <Card className="shadow-elegant border-2 border-success/20">
          <CardHeader className="space-y-4">
            <div className="relative mx-auto w-48 h-48">
              <img 
                src={breed.image} 
                alt={breed.name}
                className="w-full h-full object-cover rounded-full border-4 border-success/20"
              />
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-success-foreground fill-current" />
              </div>
            </div>
            <CardTitle className="text-3xl text-hero">{breed.name}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {breed.description}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {breed.traits.map((trait) => (
                <Badge 
                  key={trait} 
                  variant="secondary" 
                  className="text-sm px-3 py-1"
                >
                  {trait}
                </Badge>
              ))}
            </div>
            
            <div className="pt-6">
              <Button 
                variant="outline" 
                onClick={onRestartQuiz}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};