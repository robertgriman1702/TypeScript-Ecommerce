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

  // Para navbar: abre/cierra con click en el botón
  // Para search: abre con hover
  const handleButtonClick = () => {
    if (isNavbar) {
      setIsOpen(prev => !prev);
    }
  };

  const handleMouseEnter = () => {
    clearClose();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    scheduleClose();
  };

  const handleItemClick = (item: string, index: number) => {
    clearClose();
    setIsOpen(false);
    if (onSelect) onSelect(item);
    if (links && links[index]) {
      navigate(links[index]);
    }
  };

  return (
    <div 
      className={containerClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={buttonClass} onClick={handleButtonClick}>
        <span>{label}</span>
        <HiOutlineChevronDown
          className={`w-4 h-4 transition-transform duration-[400ms] ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 top-full z-50 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto custom-scrollbar ${
            isNavbar ? 'w-56 mt-1 rounded-b-lg' : 'w-48'
          }`}
          // Evita que el mouseLeave del contenedor cierre el dropdown cuando el mouse entra al menú
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