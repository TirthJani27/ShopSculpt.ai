"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "../../components/ChatBot/ChatMessage";
import Header from "../../components/Layout/Header/Header";


export default function ChatBotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello user! How may i assist you?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `You asked about: "${input}"` },
      ]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-1 bg-gray-100 py-6 px-4 flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md flex flex-col h-[80vh] sm:h-[70vh] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white px-4 py-3 text-lg font-semibold rounded-t-2xl">
            ShopSclupt.ai
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="border-t px-3 py-2 bg-white flex items-center gap-2 rounded-b-2xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a product, order, etc..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
