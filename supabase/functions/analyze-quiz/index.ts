import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quiz_id, answers } = await req.json();
    
    if (!quiz_id || !answers) {
      throw new Error('Missing quiz_id or answers');
    }

    console.log('Analyzing quiz:', { quiz_id, answers });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Prepare the prompt with user's answers
    const userPrompt = `Based on these lifestyle answers, recommend the SINGLE best dog breed for this person:

Activity Level: ${answers.activity}
Home Size: ${answers.homeSize}
Experience: ${answers.experience}
Time at Home: ${answers.timeAtHome}
Size Preference: ${answers.sizePreference}
Grooming Willingness: ${answers.grooming}
Children: ${answers.children}
Budget: ${answers.budget}

Consider their specific lifestyle and provide a personalized recommendation.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional dog behaviorist. Recommend ONE single best dog breed for a first-time dog owner based on the provided lifestyle answers. Respond ONLY in JSON with keys: breed (string), traits (array of strings), reasoning (string). Keep reasoning concise (2-3 sentences). Choose traits that are most relevant to their lifestyle.'
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('OpenAI response:', aiResponse);

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(aiResponse);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      throw new Error('Invalid AI response format');
    }

    // Validate the response structure
    if (!parsedResult.breed || !parsedResult.traits || !parsedResult.reasoning) {
      throw new Error('Invalid AI response structure');
    }

    // Store the result in the database
    const { data: insertResult, error: insertError } = await supabase
      .from('ai_results')
      .insert({
        quiz_id,
        breed: parsedResult.breed,
        traits: parsedResult.traits,
        reasoning: parsedResult.reasoning
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Failed to save result: ${insertError.message}`);
    }

    console.log('Result saved successfully:', insertResult);

    return new Response(JSON.stringify({
      success: true,
      result: {
        breed: parsedResult.breed,
        traits: parsedResult.traits,
        reasoning: parsedResult.reasoning
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-quiz function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});