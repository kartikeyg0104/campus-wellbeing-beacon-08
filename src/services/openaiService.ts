
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useOpenAIApiKey = () => {
  const [isValidating, setIsValidating] = React.useState(false);

  const getApiKey = () => {
    return localStorage.getItem('openai_api_key');
  };

  const validateAndSetApiKey = async (apiKey: string): Promise<boolean> => {
    try {
      setIsValidating(true);
      // Make a small test request to validate the key
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Test' }],
          max_tokens: 5
        }),
      });

      if (response.ok) {
        localStorage.setItem('openai_api_key', apiKey);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error validating OpenAI API key:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const hasApiKey = !!getApiKey();

  return {
    apiKey: getApiKey(),
    validateAndSetApiKey,
    isValidating,
    hasApiKey,
  };
};

export const sendMessageToOpenAI = async (messages: ChatMessage[]): Promise<string> => {
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set your API key.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
