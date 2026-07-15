import React from 'react';

const ZaloChatWidget = () => {
  return (
    <a
      href="https://zalo.me/0372672396"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '140px',
        right: '20px', // Tăng từ 20px lên 80px để đẩy nút dịch sang bên trái nhiều hơn
        zIndex: 9999,
        display: 'block',
        width: '45px', // Nhỏ lại
        height: '45px', // Nhỏ lại
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src="/zalo.webp" 
        alt="Zalo Chat" 
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain'
        }} 
      />
    </a>
  );
};

export default ZaloChatWidget;