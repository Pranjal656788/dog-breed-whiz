import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizSectionProps {
  onQuizComplete: (answers: Record<string, string>) => void;
}

const quizQuestions = [
  {
    id: "activity",
    question: "How active are you?",
    options: [
      { value: "low", label: "Couch potato - I prefer indoor activities", icon: "🛋️" },
      { value: "moderate", label: "Moderately active - Daily walks and weekend hikes", icon: "🚶" },
      { value: "high", label: "Very active - Running, hiking, outdoor sports", icon: "🏃" },
    ]
  },
  {
    id: "homeSize",
    question: "What's your living situation?",
    options: [
      { value: "apartment", label: "Apartment or small space", icon: "🏢" },
      { value: "house", label: "House with small yard", icon: "🏠" },
      { value: "large", label: "Large house with big yard", icon: "🏡" },
    ]
  },
  {
    id: "experience",
    question: "Your experience with dogs?",
    options: [
      { value: "none", label: "First-time dog owner", icon: "🌟" },
      { value: "some", label: "Some experience", icon: "👍" },
      { value: "expert", label: "Very experienced", icon: "🎓" },
    ]
  },
  {
    id: "timeAtHome",
    question: "How much time are you home?",
    options: [
      { value: "little", label: "Away most of the day (8+ hours)", icon: "⏰" },
      { value: "moderate", label: "Home part of the day (4-8 hours)", icon: "🕐" },
      { value: "lots", label: "Home most of the time", icon: "🏠" },
    ]
  },
  {
    id: "sizePreference",
    question: "What size dog do you prefer?",
    options: [
      { value: "small", label: "Small (under 25 lbs)", icon: "🐕" },
      { value: "medium", label: "Medium (25-60 lbs)", icon: "🐶" },
      { value: "large", label: "Large (60+ lbs)", icon: "🐕‍🦺" },
    ]
  },
  {
    id: "grooming",
    question: "How much grooming are you willing to do?",
    options: [
      { value: "minimal", label: "Minimal - Occasional brushing", icon: "✂️" },
      { value: "moderate", label: "Moderate - Regular brushing", icon: "🧴" },
      { value: "high", label: "High - Daily grooming", icon: "💇" },
    ]
  },
  {
    id: "children",
    question: "Do you have children at home?",
    options: [
      { value: "none", label: "No children", icon: "👤" },
      { value: "young", label: "Young children (under 10)", icon: "👶" },
      { value: "older", label: "Older children (10+)", icon: "👦" },
    ]
  },
  {
    id: "budget",
    question: "What's your monthly budget for dog care?",
    options: [
      { value: "low", label: "Under ₹8,000", icon: "💰" },
      { value: "moderate", label: "₹8,000-25,000", icon: "💵" },
      { value: "high", label: "₹25,000+", icon: "💸" },
    ]
  },
];

export const QuizSection = ({ onQuizComplete }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [quizQuestions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onQuizComplete(newAnswers);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-16">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <Progress value={progress} className="w-full h-3" />
        </div>

        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant="quiz"
                className="w-full p-6 h-auto text-left justify-start"
                onClick={() => handleAnswer(option.value)}
              >
                <span className="text-2xl mr-4">{option.icon}</span>
                <span className="text-lg">{option.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};