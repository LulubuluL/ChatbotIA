import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const responses = {
    'bonjour': 'Bonjour! Comment puis-je vous aider?',
    'hello': 'Hello! How can I help you?',
    'hi': 'Hi there! How can I help you?',
    'comment vas-tu': 'Je vais très bien, merci! Et vous?',
    'how are you': "I'm doing great, thank you! How about you?",
    'au revoir': 'Au revoir! Bonne journée!',
    'goodbye': 'Goodbye! Have a great day!',
    'help': "You can ask me basic questions in English or French. Try: 'hello', 'how are you', 'goodbye'",
    'aide': "Vous pouvez me poser des questions basiques en français ou en anglais. Essayez: 'bonjour', 'comment vas-tu', 'au revoir'",
    'météo': 'Désolé, je ne peux pas vous donner la météo actuelle.',
    'weather': "Sorry, I can't provide current weather information.",
    'heure': "Désolé, je ne peux pas vous donner l'heure exacte.",
    'time': "Sorry, I can't provide the exact time."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const timestamp = new Date().toLocaleString();
    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(false);

    setTimeout(() => {
      const botResponse = {
        text: getBotResponse(inputValue.toLowerCase()),
        sender: 'bot',
        timestamp: new Date().toLocaleString()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);
  };

  const getBotResponse = (input) => {
    return responses[input] || "Je ne comprends pas. / I don't understand. Type 'aide' or 'help'.";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">🤖 Chatbot</h2>
        <p>You can ask me basic questions in English or French. Try: 'hello', 'how are you', 'goodbye'</p>
        <p>Vous pouvez me poser des questions basiques en français ou en anglais. Essayez: 'bonjour', 'comment vas-tu', 'au revoir'</p>
      </CardHeader>
      <CardContent className="h-96 overflow-y-auto mb-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-4 rounded-lg w-full max-w-[80%] ${
              message.sender === 'user'
                ? 'ml-auto bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{message.text}</span>
              <span className="text-xs text-white">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message / Type your message"
            aria-label="Message input"
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!isTyping}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            aria-label="Send message"
          >
            <Send size={20} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chatbot;
