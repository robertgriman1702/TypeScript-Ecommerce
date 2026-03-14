import { FaWhatsapp } from 'react-icons/fa';

export const WhatsButton: React.FC = () => {
  const phoneNumber = "+584244085004";
  
  return (
    <div>
      <a 
        href={`https://wa.me/${phoneNumber}`} 
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 ease-in-out hover:bg-[#128C7E] hover:scale-110 animate-pulse" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>
    </div>
  );
};