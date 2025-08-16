import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { QuizSection } from "@/components/QuizSection";
import { PaymentSection } from "@/components/PaymentSection";
import { ResultSection } from "@/components/ResultSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

type AppState = "hero" | "quiz" | "payment" | "result";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<AppState>("hero");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const handleStartQuiz = () => {
    setCurrentSection("quiz");
  };

  const handleQuizComplete = (answers: Record<string, string>) => {
    setQuizAnswers(answers);
    setCurrentSection("payment");
  };

  const handlePaymentComplete = () => {
    setCurrentSection("result");
  };

  const handleRestartQuiz = () => {
    setQuizAnswers({});
    setCurrentSection("hero");
  };

  return (
    <div className="min-h-screen">
      {currentSection === "hero" && <HeroSection onStartQuiz={handleStartQuiz} />}
      {currentSection === "quiz" && <QuizSection onQuizComplete={handleQuizComplete} />}
      {currentSection === "payment" && <PaymentSection onPaymentComplete={handlePaymentComplete} />}
      {currentSection === "result" && (
        <ResultSection answers={quizAnswers} onRestartQuiz={handleRestartQuiz} />
      )}
      
      {/* Always show testimonials and footer at the bottom */}
      {currentSection !== "quiz" && currentSection !== "payment" && (
        <>
          <TestimonialsSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
