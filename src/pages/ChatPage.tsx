
import React from 'react';
import { ChatSupport } from '@/components/wellness/ChatSupport';

const ChatPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Chat Support</h1>
        <p className="text-muted-foreground">
          Connect with our OpenAI-powered wellness assistant for personalized support.
        </p>
      </div>

      <ChatSupport />
    </div>
  );
};

export default ChatPage;
