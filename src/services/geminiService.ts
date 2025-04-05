
// This service handles communication with the Gemini API
import { useState } from 'react';

// API key should be stored securely
// For now, we'll use localStorage, but in production, this should be handled via backend
const API_KEY_STORAGE_KEY = 'gemini_api_key';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
  }[];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export const saveApiKey = (key: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const validateApiKey = async (key: string): Promise<boolean> => {
  if (!key || key.trim() === '') return false;
  
  // Send a minimal test request to validate the API key
  const testMessage: GeminiMessage[] = [
    {
      role: 'user',
      parts: [{ text: 'Hello' }]
    }
  ];
  
  const requestBody: GeminiRequest = {
    contents: testMessage,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 10 // Minimal tokens for validation
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    
    // If there's an error in the response, the key is invalid
    if (data.error) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

export const sendMessageToGemini = async (messages: GeminiMessage[]): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API key not found. Please set your Gemini API key.');
  }

  const requestBody: GeminiRequest = {
    contents: messages,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || `API error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const useGeminiApiKey = () => {
  const [apiKey, setApiKeyState] = useState<string | null>(getApiKey());
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const setApiKey = (key: string) => {
    saveApiKey(key);
    setApiKeyState(key);
  };

  const validateAndSetApiKey = async (key: string): Promise<boolean> => {
    setIsValidating(true);
    try {
      const isValid = await validateApiKey(key);
      if (isValid) {
        setApiKey(key);
      }
      return isValid;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    validateAndSetApiKey,
    isValidating,
    hasApiKey: !!apiKey
  };
};
