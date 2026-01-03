import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const MegaMenu = ({ categories }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-2 z-[2001]">
      <ul className="space-y-1">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <li
              key={cat.name}
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) {
                  clearTimeout(closeTimeout.current);
                  closeTimeout.current = null;
                }
                setOpenCategory(cat.name);
              }}
              onMouseLeave={() => {
                // small buffer so moving slightly outside won't immediately close
                closeTimeout.current = setTimeout(() => {
                  setOpenCategory((prev) => (prev === cat.name ? null : prev));
                  closeTimeout.current = null;
                }, 300);
              }}
            >
              {/* CATEGORY */}
              <div className="flex items-center justify-between p-3 text-gray-800 hover:bg-gray-50 rounded-md cursor-pointer">
                <span>{cat.name}</span>

                {cat.subs?.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openCategory === cat.name ? "rotate-[-90deg]" : ""
                    }`}
                  />
                )}
              </div>

              {/* SUB MENU */}
              {cat.subs?.length > 0 && openCategory === cat.name && (
                <div className="absolute top-0 left-full ml-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[2002]">
                  {cat.subs.map((sub, i) => (
                    <div
                      key={i}
                      className="p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm"
                    >
                      {sub.name || sub}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="p-3 text-gray-500 text-center">
            Không có danh mục
          </li>
        )}
      </ul>
    </div>
  );
};

export default MegaMenu;
