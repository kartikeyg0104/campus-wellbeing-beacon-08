
import React from 'react';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const sendMessageToLlama = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Using a free Llama endpoint - note this is a mock endpoint for demonstration
    // In a production app, you might want to use a real Llama API service
    const response = await fetch('https://free-llama-api.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      // For demo purposes, we'll return a mock response if the API call fails
      console.log('Using fallback response as API call failed');
      return generateFallbackResponse(messages[messages.length - 1].content);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Llama API:', error);
    // Provide a fallback response when the API is unavailable
    return generateFallbackResponse(messages[messages.length - 1].content);
  }
};

// Generates simple responses when the API is unavailable
const generateFallbackResponse = (message: string): string => {
  const responses = [
    "I understand you're asking about wellness. How can I help you today?",
    "That's an interesting question about mental health. Would you like to know more about campus resources?",
    "I'm here to support your wellbeing journey. Could you share more about what you're looking for?",
    "Wellness is important. I can suggest some strategies that might help with that.",
    "I'm your campus wellness assistant. I can provide guidance on mental health resources available to you."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
