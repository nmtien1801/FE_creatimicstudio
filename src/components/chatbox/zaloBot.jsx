import React, { useState } from 'react';
import axios from 'axios';

const ZaloBot = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      // Gọi tới Backend của bạn thay vì gọi trực tiếp Zalo
      // Endpoint này bạn cần tạo thêm ở file zalo.js bên Backend
      // await axios.post('http://localhost:8080/api/send-message', {
      //   message: message,
      //   // Trong thực tế, bạn cần lấy userId của khách hàng từ session hoặc định danh khác
      //   userId: "ID_NGUOI_DUNG_ZALO" 
      // });

      let res = await axios.get('http://localhost:8080/api/zalo-status', {
        params: {
          message: message,
          userId: "ID_NGUOI_DUNG_ZALO"
        }
      });
      
      console.log('ssssss ', res);
      
      setMessage("");
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhắn tin cho Creatimic..."
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button onClick={handleSendMessage} style={{ marginLeft: '5px', background: '#0068ff', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px' }}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ZaloBot;