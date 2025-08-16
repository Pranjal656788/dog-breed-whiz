-- Create quiz_answers table
CREATE TABLE public.quiz_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_results table
CREATE TABLE public.ai_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quiz_answers(id) ON DELETE CASCADE,
  breed TEXT NOT NULL,
  traits JSONB NOT NULL,
  reasoning TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public quiz)
CREATE POLICY "Quiz answers are publicly accessible" 
ON public.quiz_answers 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "AI results are publicly accessible" 
ON public.ai_results 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_ai_results_quiz_id ON public.ai_results(quiz_id);
CREATE INDEX idx_quiz_answers_created_at ON public.quiz_answers(created_at);
CREATE INDEX idx_ai_results_created_at ON public.ai_results(created_at);