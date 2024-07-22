import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome to Hubnex Educate!' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);

  const predefinedQuestions = [
    "What courses do you offer?",
    "Who are the mentors?",
    "How can I enroll?",
    "What is the fee structure?",
    "Is there a certificate upon completion?"

  ];

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (question) => {
    try {
      const response = await axios.post('http://localhost:5005/api/chat', { question });
      const botMessage = response.data.answer;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: question },
        { sender: 'bot', text: botMessage }
      ]);
      setShowProceedButton(true);
      setShowOptions(false); // Hide options after sending the message
    } catch (error) {
      setError("Sorry, there was a problem processing your request. Please try again later.");
      console.error("Error sending message:", error);
    }
  };

  const handleButtonClick = (question) => {
    sendMessage(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleToggleChat}
          className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          💬
        </button>
      </div>
      {chatOpen && (
        <div className="w-full max-w-lg fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-6 flex flex-col h-96">
          <div className="flex-1 overflow-y-scroll mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-gray-300 text-gray-900' : 'bg-blue-600 text-white'}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            <div ref={messageEndRef} />
            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}
            {showProceedButton && (
              <div className="flex justify-end my-4">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Click here to proceed
                </button>
              </div>
            )}
            {showOptions && (
              <div className="flex flex-wrap mb-4">
                {predefinedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(q)}
                    className="bg-blue-500 text-white p-2 m-2 rounded"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex mt-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
