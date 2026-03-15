import { useState, useRef } from 'react';
import { HiOutlineChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Props {
  label: string;
  items: string[];
  links?: string[];
  onSelect?: (i: string) => void;
  variant?: 'search' | 'navbar'; 
}

export const Dropdown = ({ label, items, links, onSelect, variant = 'search' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isNavbar = variant === 'navbar';

  const containerClass = isNavbar
    ? "relative h-full flex items-center"
    : "relative h-full border-r border-gray-300";

  const buttonClass = isNavbar 
    ? "flex items-center gap-1 px-3 py-2 cursor-pointer hover:bg-slate-500 rounded-lg transition-colors text-white font-medium text-sm uppercase" 
    : "flex items-center gap-1 bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors h-full text-gray-700 font-medium text-sm"; 

  const clearClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const scheduleClose = () => {
    clearClose();
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleItemClick = (item: string, index: number) => {
    clearClose();
    setIsOpen(false);
    if (onSelect) onSelect(item);
    if (links && links[index]) navigate(links[index]);
  };

  // ── NAVBAR: solo click ──────────────────────────────────────────────────────
  if (isNavbar) {
    return (
      <div className={containerClass}>
        <div className={buttonClass} onClick={() => setIsOpen(p => !p)}>
          <span>{label}</span>
          <HiOutlineChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <>
            {/* Overlay invisible para cerrar al tocar fuera */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute left-0 top-full z-50 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto custom-scrollbar w-56 mt-1 rounded-b-lg">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item, index)}
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-slate-100 hover:text-amber-500 cursor-pointer transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // ── SEARCH: hover (comportamiento original) ─────────────────────────────────
  return (
    <div
      className={containerClass}
      onMouseEnter={() => { clearClose(); setIsOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <div className={buttonClass}>
        <span>{label}</span>
        <HiOutlineChevronDown
          className={`w-4 h-4 transition-transform duration-[400ms] ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto custom-scrollbar w-48"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item, index)}
              className="px-4 py-3 text-sm text-gray-700 hover:bg-slate-100 hover:text-amber-500 cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};