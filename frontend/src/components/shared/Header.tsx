import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { ContainerFilter } from "../products/ContainerFilter";
import { FaBars, FaWhatsapp } from 'react-icons/fa';
import { FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
import { Logo } from "./logo";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { AuthModal } from "./AuthModal";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const [showUserMenu,  setShowUserMenu]  = useState(false);
  const [modalOpen,     setModalOpen]     = useState(false);
  const [modalTab,      setModalTab]      = useState<'login' | 'register'>('login');

  const openModal = (tab: 'login' | 'register' = 'login') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-slate-800 text-white py-4 md:py-8 px-4 md:px-5 border-b border-slate-800 lg:px-20">
        <div className="flex items-center gap-3 md:gap-5">
          {/* Logo */}
          <div className="w-[35%] md:w-[30%]">
            <Logo />
          </div>

          {/* Search + Actions */}
          <div className="w-[65%] md:w-[70%] pl-2 md:pl-6 lg:pl-8 flex justify-between">
            <div className="flex flex-col gap-2 md:gap-5 flex-1 min-w-0">
              <span className="text-slate-300 hidden md:flex flex-row text-sm">
                <span className="font-semibold text-white mr-1">Lo más buscado:</span>
                Papeles, Carpetas, Limpia Tipo...
              </span>
              <div className="flex w-full max-w-2xl">
                <ContainerFilter onSearch={(searchTerm, category) => {
                  navigate(`/products?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
                }} />
              </div>
            </div>

            <div className="flex flex-col gap-2 md:gap-5 ml-2 md:ml-0 flex-shrink-0">
              {/* User button */}
              <div className="relative flex justify-end">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(p => !p)}
                      className="border-2 border-slate-700 w-8 h-8 md:w-9 md:h-9 rounded-full grid place-items-center text-xs md:text-sm font-bold hover:bg-slate-700 transition-colors uppercase"
                    >
                      {user.email[0]}
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 top-10 md:top-11 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 w-48 z-50 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b">
                          <p className="text-xs font-semibold truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <FiPackage className="w-4 h-4" /> Mis Órdenes
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" /> Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => openModal('login')}
                    className="border-2 border-slate-700 w-8 h-8 md:w-9 md:h-9 rounded-full grid place-items-center hover:bg-slate-700 transition-colors"
                  >
                    <FiUser className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-row-reverse items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <Link to="/cart" className="relative">
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 grid place-items-center bg-amber-500 text-white text-[10px] md:text-xs rounded-full font-bold z-10">
                      {totalItems}
                    </span>
                    <HiOutlineShoppingCart size={30} strokeWidth={1} className="md:hidden bg-amber-50 text-blue-950 hover:text-amber-400 transition-colors" />
                    <HiOutlineShoppingCart size={40} strokeWidth={1} className="hidden md:block bg-amber-50 text-blue-950 hover:text-amber-400 transition-colors" />
                  </Link>
                  <button className="md:hidden">
                    <FaBars size={20} />
                  </button>
                </div>

                <div className="hidden md:flex flex-row items-center gap-3">
                  <FaWhatsapp size={40} className="text-amber-50 hover:text-amber-400 transition-colors" />
                  <div className="flex flex-col text-[10px] leading-tight">
                    <p className="font-bold text-slate-400">TELÉFONOS:</p>
                    <a href="https://wa.me/584244085004" target="_blank" className="hover:text-amber-400 transition-colors">(+58) 424 408 5004</a>
                    <a href="https://wa.me/584144100978" target="_blank" className="hover:text-amber-400 transition-colors">(+58) 414 410 0978</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de autenticación */}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </>
  );
};