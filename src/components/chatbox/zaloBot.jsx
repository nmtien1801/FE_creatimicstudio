import React, { useState } from 'react';
import axios from 'axios';

const ZaloChatWidget = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      // Giả sử bạn đã có userOaId của khách (lấy từ profile sau khi họ nhấn quan tâm)
      // Nếu chưa có, thường sẽ điều hướng khách sang trang quan tâm OA trước.
      await axios.post('http://localhost:8080/api/zalo/send-manual', {
        userId: "ID_KHACH_HANG", 
        message: message
      });
      setMessage("");
      alert("Đã gửi tin nhắn tới OA!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {isOpen ? (
        <div style={{ width: '300px', background: '#fff', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
          <div style={{ background: '#0068ff', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Chat với Creatimic</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ height: '200px', padding: '10px', fontSize: '14px', color: '#666' }}>
            Chào bạn! Hãy gửi tin nhắn, chúng tôi sẽ phản hồi qua Zalo của bạn.
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex' }}>
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập nội dung..."
              style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button onClick={handleSend} style={{ marginLeft: '5px', background: '#0068ff', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px' }}>Gửi</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#0068ff', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ZaloChatWidget;