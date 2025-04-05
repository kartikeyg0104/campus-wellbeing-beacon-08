
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Smile, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export function ChatSupport() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const supportResponses = [
    "I understand how you feel. Would you like to explore some coping strategies?",
    "That sounds challenging. Have you tried any relaxation techniques?",
    "Thank you for sharing that with me. What specific support would be most helpful right now?",
    "I'm here to listen. Would you like to discuss this further or try some mindfulness exercises?",
    "Your well-being is important. Would it help to talk about available campus resources?",
  ];
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
      
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
      
      toast({
        title: "New message",
        description: "You received a response from the support team.",
      });
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="flex flex-col h-[70vh]">
          <div className="border-b p-4">
            <h3 className="font-semibold text-lg">Wellness Support Chat</h3>
            <p className="text-sm text-muted-foreground">Our team is here to support you</p>
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
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
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
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
