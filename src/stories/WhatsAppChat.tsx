import React, { useState } from "react";

interface WhatsAppChatProps {
  phoneNumber?: string;
  message?: string;
  buttonText?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = "+258840000000",
  message = "Hello, I would like to inquire about your products.",
  buttonText = "Chat with us",
  position = "bottom-right",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const handleClick = () => {
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    // Open in new tab
    window.open(whatsappUrl, "_blank");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-2 w-72">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-green-600 font-bold">WhatsApp Chat</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Click below to start a conversation on WhatsApp
          </p>
          <button
            onClick={handleClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            {buttonText}
          </button>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg"
          aria-label="Open WhatsApp chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default WhatsAppChat;
