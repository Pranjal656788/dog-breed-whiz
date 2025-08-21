import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { breed } = await req.json();
    
    if (!breed) {
      throw new Error('Missing breed parameter');
    }

    console.log('Generating image for breed:', breed);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Create a detailed prompt for the specific breed
    const prompt = `A beautiful, photorealistic ${breed} dog portrait, sitting in a natural outdoor setting with soft lighting, professional pet photography style, friendly expression, high quality, detailed fur texture`;

    // Call OpenAI Image Generation API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        n: 1,
        size: '512x512',
        quality: 'standard',
        response_format: 'b64_json'
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI Image API error: ${response.status}`);
    }

    const data = await response.json();
    const imageB64 = data.data[0].b64_json;
    
    console.log('Image generated successfully for breed:', breed);

    return new Response(JSON.stringify({
      success: true,
      image: `data:image/png;base64,${imageB64}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-dog-image function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});