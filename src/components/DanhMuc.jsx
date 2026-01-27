import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const MegaMenu = ({ categories }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const closeTimeout = useRef(null);
  const navigate = useNavigate(); // [MỚI] Khởi tạo điều hướng

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  // Hàm xử lý click điều hướng
  const handleNavigate = (id, e) => {
    e.stopPropagation(); // Ngăn sự kiện hover làm gián đoạn click
    navigate(`/product/${id}`);
  };

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-2 z-[2001]">
      <ul className="space-y-1">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <li
              key={cat.id} // [SỬA] Dùng ID thay vì Name làm key
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) {
                  clearTimeout(closeTimeout.current);
                  closeTimeout.current = null;
                }
                setOpenCategory(cat.id); // [SỬA] Dùng ID quản lý state
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => {
                  setOpenCategory(null);
                  closeTimeout.current = null;
                }, 300);
              }}
            >
              {/* CATEGORY CHA */}
              <div
                onClick={(e) => handleNavigate(cat.id, e)} // [MỚI] Click cha
                className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${openCategory === cat.id ? "bg-orange-50 text-orange-600" : "text-gray-800 hover:bg-gray-50"
                  }`}
              >
                <span className="font-medium">{cat.name}</span>
                {cat.children?.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${openCategory === cat.id ? "rotate-[-90deg]" : ""
                      }`}
                  />
                )}
              </div>

              {/* SUB MENU */}
              {cat.children?.length > 0 && openCategory === cat.id && (
                <div
                  className="absolute top-0 left-full ml-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[2002]"
                >
                  {cat.children.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={(e) => handleNavigate(sub.id, e)} // [MỚI] Click con
                      className="p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm transition-all border-l-2 border-transparent hover:border-orange-500 mb-1"
                    >
                      <div className="font-medium">{sub.name}</div>
                      {sub.productCount > 0 && (
                        <div className="text-[10px] text-gray-400">
                          {sub.productCount} sản phẩm
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="p-3 text-gray-500 text-center italic">Không có danh mục</li>
        )}
      </ul>
    </div>
  );
};

export default MegaMenu;
