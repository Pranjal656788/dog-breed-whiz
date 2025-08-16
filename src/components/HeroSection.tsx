import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Find Your <span className="text-hero">Paw-fect</span> Dog Match
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
            Take our AI-powered quiz and discover the one dog breed that's perfect for you. 
            We analyze your lifestyle to find your ideal companion.
          </p>
          <Button 
            variant="hero" 
            onClick={onStartQuiz}
            className="mt-8"
          >
            Start Quiz 🐕
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Happy person with their perfect dog match"
              className="w-full max-w-lg rounded-2xl shadow-elegant"
            />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl animate-bounce">
              🐾
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};