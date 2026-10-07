import React, { useState, useRef, useEffect } from "react";
import { Package, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { slug } from '../utils/constants.js';

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
  const handleNavigateToProduct = (cat, product, e) => {
    e.stopPropagation();
    navigate(`/${slug(product.name)}/${cat.id}/${product.id}`);
  };

  // Hàm điều hướng đến danh mục
  const handleNavigateByCateId = (cate, e) => {
    e.stopPropagation();
    navigate(`/${slug(cate.name)}/${cate.id}/all`);
  };

  return (
    <div className="w-56 bg-white border border-gray-200 rounded-xl shadow-2xl p-1.5 z-[2001] select-none">
      <ul className="space-y-0.5">
        {categories?.map((cat) => {
          const hasChildren = cat.children && cat.children.length > 0;
          const hasProducts = cat.product && cat.product.length > 0;
          const hasContent = hasChildren || hasProducts;

          return (
            <li
              key={cat.id}
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                setOpenCategory(cat.id);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => {
                  setOpenCategory(null);
                  setOpenSubCategory(null);
                }, 200);
              }}
            >
              {/* LEVEL 1: CATEGORY CHA */}
              <div
                onClick={(e) => handleNavigateByCateId(cat, e)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  openCategory === cat.id
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <span className="text-sm line-clamp-1">{cat.name}</span>
                {hasContent && <ChevronRight className="w-4 h-4 opacity-50 shrink-0 ml-1" />}
              </div>

              {/* LEVEL 2: SUB MENU (HIỆN CON & SẢN PHẨM) */}
              {openCategory === cat.id && hasContent && (
                <div className="absolute top-0 left-full ml-1.5 w-60 h-fit max-h-[420px] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-[2002]">
                  <div className="space-y-0.5">

                    {/* --- PHẦN 1: HIỂN THỊ DANH MỤC CON --- */}
                    {hasChildren &&
                      cat.children.map((sub) => {
                        const hasSubProducts = sub.product && sub.product.length > 0;
                        return (
                          <div
                            key={sub.id}
                            className="relative"
                            onMouseEnter={() => setOpenSubCategory(sub.id)}
                          >
                            <div
                              onClick={(e) => handleNavigateByCateId(sub, e)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                                openSubCategory === sub.id
                                  ? "bg-orange-50 text-orange-600 font-semibold"
                                  : "text-gray-700 hover:bg-gray-50 font-medium"
                              }`}
                            >
                              <span className="line-clamp-1">{sub.name}</span>
                              {hasSubProducts && (
                                <ChevronRight className="w-4 h-4 opacity-50 shrink-0 ml-1" />
                              )}
                            </div>

                            {/* LEVEL 3: SẢN PHẨM CỦA SUB CATE */}
                            {hasSubProducts && openSubCategory === sub.id && (
                              <div className="absolute top-0 left-full ml-1.5 w-56 h-fit max-h-[360px] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-[2003]">
                                <div className="space-y-0.5">
                                  {sub.product.map((prod) => (
                                    <div
                                      key={prod.id}
                                      onClick={(e) => handleNavigateToProduct(sub, prod, e)}
                                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-xs transition-colors group"
                                    >
                                      <Package className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 shrink-0" />
                                      <span className="line-clamp-1 font-medium">{prod.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                    {/* ĐƯỜNG KẺ PHÂN CÁCH NẾU CÓ CẢ DANH MỤC CON VÀ SẢN PHẨM TRỰC THUỘC */}
                    {hasChildren && hasProducts && (
                      <div className="my-1 border-t border-gray-100" />
                    )}

                    {/* --- PHẦN 2: SẢN PHẨM TRỰC THUỘC CỦA CHA --- */}
                    {hasProducts &&
                      cat.product.map((p) => (
                        <div
                          key={p.id}
                          onClick={(e) => handleNavigateToProduct(cat, p, e)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-xs transition-colors group"
                        >
                          <Package className="w-4 h-4 text-gray-400 group-hover:text-orange-500 shrink-0" />
                          <span className="font-medium line-clamp-1">{p.name}</span>
                        </div>
                      ))}

                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MegaMenu;