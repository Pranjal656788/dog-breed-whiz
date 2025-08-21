import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { QuizSection } from "@/components/QuizSection";
import { PaymentSection } from "@/components/PaymentSection";
import { ResultSection } from "@/components/ResultSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type AppState = "hero" | "quiz" | "payment" | "result" | "analyzing";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<AppState>("hero");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizId, setQuizId] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleStartQuiz = () => {
    setCurrentSection("quiz");
  };

  const handleQuizComplete = async (answers: Record<string, string>) => {
    setQuizAnswers(answers);
    setCurrentSection("analyzing");
    
    try {
      // Store quiz answers in database
      const { data: quizData, error: quizError } = await supabase
        .from('quiz_answers')
        .insert({ answers })
        .select()
        .single();

      if (quizError) throw quizError;
      
      setQuizId(quizData.id);

      // Call the analyze-quiz edge function
      const { data: analysisResult, error: analysisError } = await supabase.functions.invoke('analyze-quiz', {
        body: {
          quiz_id: quizData.id,
          answers: answers
        }
      });

      if (analysisError) throw analysisError;

      if (analysisResult?.success) {
        setAiResult(analysisResult.result);
        setCurrentSection("payment");
      } else {
        throw new Error(analysisResult?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error processing quiz:', error);
      // Fallback to payment section even if analysis fails
      setCurrentSection("payment");
    }
  };

  const handlePaymentComplete = () => {
    setCurrentSection("result");
  };

  const handleRestartQuiz = () => {
    setQuizAnswers({});
    setQuizId(null);
    setAiResult(null);
    setCurrentSection("hero");
  };

  return (
    <div className="min-h-screen">
      {currentSection === "hero" && <HeroSection onStartQuiz={handleStartQuiz} />}
      {currentSection === "quiz" && <QuizSection onQuizComplete={handleQuizComplete} />}
      {currentSection === "analyzing" && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-foreground mb-2">🐕 Analyzing your perfect dog breed...</h2>
            <p className="text-muted-foreground">Our AI is matching you with the ideal companion!</p>
          </div>
        </div>
      )}
      {currentSection === "payment" && <PaymentSection onPaymentComplete={handlePaymentComplete} />}
      {currentSection === "result" && (
        <ResultSection answers={quizAnswers} aiResult={aiResult} onRestartQuiz={handleRestartQuiz} />
      )}
      
      {/* Always show testimonials and footer at the bottom */}
      {currentSection !== "quiz" && currentSection !== "payment" && currentSection !== "analyzing" && (
        <>
          <TestimonialsSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
