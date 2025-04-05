
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Smile, PlusCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  sendMessageToLlama, 
  ChatMessage 
} from '@/services/llamaService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hi there! How can I help you today?',
    sender: 'support',
    timestamp: new Date(),
  },
];

const SYSTEM_CONTEXT = `You are a wellness assistant for a campus wellness app. 
Your responsibilities include:
1. Intent Detection – Identify what the user is trying to do (e.g., book a meeting, ask a question, request help).
2. Entity Recognition – Extract important details from user input (e.g., names, dates, times, places, topics).
3. Dialogue Management – Respond appropriately based on conversation context and user intent.
4. Language Generation – Generate replies that are natural, polite, and human-like.
5. Context Memory – Remember relevant information from the conversation history to stay coherent and helpful.

Always act as a proactive assistant. If the user asks something vague, ask a clarifying question. 
If you detect an intent like booking or requesting something, confirm the details.
Speak clearly and naturally. Be concise but helpful. Use friendly, professional tone.
If you're missing information (like date/time), ask the user for it.

Focus on mental health, wellness strategies, campus resources, and academic support.`;

export function ChatSupport() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      const llamaMessages: ChatMessage[] = [
        {
          role: 'system',
          content: SYSTEM_CONTEXT
        },
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: newMessage
        }
      ];
      
      const response = await sendMessageToLlama(llamaMessages);
      
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error 
          ? `Error: ${error.message}` 
          : "Sorry, there was an error processing your request.",
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="flex flex-col h-[70vh]">
          <div className="border-b p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Wellness Support Chat</h3>
              <p className="text-sm text-muted-foreground">Powered by Llama</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <PlusCircle className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                className="flex-1"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
