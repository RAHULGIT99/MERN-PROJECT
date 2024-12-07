import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const { state } = useLocation(); // Get the state from the previous page
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previousResponses, setPreviousResponses] = useState([]);

  // Parse the result from the state
  const result = state?.result;
  const parsedResult = result ? JSON.parse(result) : null;

//   useEffect(() => {
//     if (result) {
//       setResponse(result); // Set the fetched data in the response state
//     }
//   }, [result]);

  const limitWords = (text, limit = 500) => {
    const words = text.split(/\s+/);
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '... (Response truncated)';
    }
    return text;
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const res = await axios.post(`http://127.0.0.1:5888/query`, { query });

      const limitedResponse = limitWords(res.data.response);

      // Add to previous responses
      setPreviousResponses((prev) => [
        { query, response: limitedResponse },
        ...prev,
      ]);

      setResponse(limitedResponse);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setResponse("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
      setQuery(""); // Clear input after submission
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Chatbot Toggle and Modal */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating Toggle Button */}
        <button
            onClick={toggleChatbot}
            className=" text-white p-4 rounded-full  transition-all duration-300 ease-in-out transform hover:scale-110"
            >
            {isOpen ? (
                <img 
                src="/img/gattu.jpg" 
                alt="Chatbot Avatar" 
                style={{
                  width: '60px', 
                  height: '60px', 
                  objectFit: 'cover', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(145deg, #e0e0e0, #ffffff)', 
                  boxShadow: '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff', 
                  // border: '2px solid blue'
                }}
              />
            ) : (
                <div 
              style={{
                perspective: '800px', // Creates 3D perspective
                display: 'inline-block', // Aligns with the avatar
              }}
            >
            <img 
                src="/img/gattu.jpg" 
                alt="Chatbot Avatar" 
                style={{
                width: '58px', 
                height: '58px', 
                objectFit: 'cover', 
                borderRadius: '50%', 
                background: 'linear-gradient(145deg, #e0e0e0, #ffffff)', 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(255, 255, 255, 0.3)', 
                transform: 'rotateX(15deg) rotateY(-15deg) translateZ(10px)', 
                transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(20px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateX(15deg) rotateY(-15deg) translateZ(10px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(255, 255, 255, 0.3)';
                }}
            />
            </div>

              

            )}
        </button>

        {/* Chatbot Modal */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transition-all duration-300 ease-in-out">
            {/* Chatbot Query Section */}
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="query"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Question
                </label>
                <input
                  type="text"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className=" text-black w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What would you like to know?"//entering query colour
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "Ask"}
              </button>
            </form>

            {/* Scrollable Response History */}
            <div className="mt-4 max-h-64 overflow-y-auto space-y-3">
              {/* Current Response */}
              {response && (
                <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-700 mb-2">
                    Latest Response:
                  </h3>
                  <p className="text-gray-800 text-sm">{response}</p>
                </div>
              )}

              {/* Previous Responses */}
              {previousResponses.slice(0, 5).map((prevResponse, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-md border border-gray-200"
                >
                  <h4 className="text-xs font-medium text-gray-600 mb-1">
                    Q: {prevResponse.query}
                  </h4>
                  <p className="text-gray-800 text-sm">
                    {prevResponse.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;


