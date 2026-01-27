import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Package } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const MegaMenu = ({ categories }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const closeTimeout = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  // Hàm điều hướng đến sản phẩm
  const handleNavigateToProduct = (productId, e) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  // Hàm điều hướng đến danh mục
  const handleNavigateByCateId = (cateId, e) => {
    e.stopPropagation();
    navigate(`/category/${cateId}`);
  };

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-2 z-[2001]">
      <ul className="space-y-1">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <li
              key={cat.id}
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) {
                  clearTimeout(closeTimeout.current);
                  closeTimeout.current = null;
                }
                setOpenCategory(cat.id);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => {
                  setOpenCategory(null);
                  setOpenSubCategory(null);
                  closeTimeout.current = null;
                }, 300);
              }}
            >
              {/* DANH MỤC CHA */}
              <div
                onClick={(e) => handleNavigateByCateId(cat.id, e)}
                className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                  openCategory === cat.id 
                    ? "bg-orange-50 text-orange-600" 
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium">{cat.name}</span>
                {cat.children?.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openCategory === cat.id ? "rotate-[-90deg]" : ""
                    }`}
                  />
                )}
              </div>

              {/* SUB MENU */}
              {cat.children?.length > 0 && openCategory === cat.id && (
                <div className="absolute top-0 left-full ml-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[2002]">
                  <ul className="space-y-1">
                    {cat.children.map((sub) => (
                      <li key={sub.id}>
                        {/* DANH MỤC CON */}
                        <div
                          onClick={(e) => handleNavigateByCateId(sub.id, e)}
                          onMouseEnter={() => setOpenSubCategory(sub.id)}
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                            openSubCategory === sub.id
                              ? "bg-orange-50 text-orange-600"
                              : "text-gray-800 hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-medium">{sub.name}</span>
                          {sub.product?.length > 0 && (
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                openSubCategory === sub.id ? "rotate-[-90deg]" : ""
                              }`}
                            />
                          )}
                        </div>

                        {/* HIỂN THỊ PRODUCTS NẾU CÓ */}
                        {sub.product && sub.product.length > 0 && openSubCategory === sub.id && (
                          <div className="ml-3 mt-1 space-y-1">
                            {sub.product.map((prod) => (
                              <div
                                key={prod.id}
                                onClick={(e) => handleNavigateToProduct(prod.id, e)}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm transition-all group"
                              >
                                <Package className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-400" />
                                <div className="flex-1">
                                  <div className="font-medium line-clamp-1">{prod.name}</div>
                                  {prod.price && (
                                    <div className="text-[10px] text-gray-400">
                                      {Number(prod.price).toLocaleString('vi-VN')}đ
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
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