import React from 'react';

const MessengerButton = () => {
  const messengerUrl = "https://m.me/508948142310781";

  return (
    <div className="fixed bottom-28 right-13 z-50 flex items-center group">
      <a
        href={messengerUrl}
        target="_blank"
        rel="noreferrer"
        className="shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out flex items-center justify-center shrink-0"
        aria-label="Chat with us on Messenger"
      >
        <img
          src="/facebook.png"
          alt="Messenger"
          className="w-12 h-12 object-contain"
        />
      </a>
    </div>
  );
};

export default MessengerButton;