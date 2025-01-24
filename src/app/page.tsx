"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { FaUser, FaUserAstronaut } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface Message {
  type: "sent" | "received";
  text: string;
}

const sendSound = new Howl({
  src: ["/sounds/send.mp3"],
});
const receiveSound = new Howl({
  src: ["/sounds/receive.mp3"],
});

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const randomChannel = uuidv4();
    setChannel(randomChannel);

    const socketInstance = new WebSocket(`ws://localhost:8000/chat/ws/${randomChannel}`);
    socket.current = socketInstance;

    socketInstance.onmessage = (event) => {
      receiveSound.play();
      setMessages(
          (prev) => [...prev, { type: "received", text: event.data }]
      );
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && socket.current) {
      socket.current.send(input);
      setMessages((prev) => [...prev, { type: "sent", text: input }]);
      sendSound.play();
      setInput("");
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-600">
            Chatbot
          </h1>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <strong>Channel:</strong> {channel}
            </p>
          </div>
          <div
              className="flex flex-col space-y-2 overflow-y-auto h-96 border border-gray-300 rounded-lg p-4 mb-4"
          >
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex items-center space-x-2 ${
                        msg.type === "sent" ? "justify-end" : "justify-start"
                    }`}
                >
                  {msg.type === "received" && (
                      <div className="flex items-center justify-center w-8 h-8">
                        <FaUserAstronaut className="text-gray-500 w-6 h-6" />
                      </div>
                  )}
                  <span
                      className={`inline-block px-4 py-2 rounded-lg text-sm break-words max-w-full ${
                          msg.type === "sent"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                  ></span>
                  {msg.type === "sent" && (
                      <div className="flex items-center justify-center w-8 h-8">
                        <FaUser className="text-blue-500 w-6 h-6" />
                      </div>
                  )}
                </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
            <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
  );
}
