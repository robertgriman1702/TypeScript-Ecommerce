import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaWhatsapp } from 'react-icons/fa';
import { FiUser, FiLogOut, FiPackage, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { Logo } from "./logo";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { AuthModal } from "./AuthModal";
import { ContainerFilter } from "../products/ContainerFilter";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [modalOpen,    setModalOpen]    = useState(false);
  const [modalTab,     setModalTab]     = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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
      <header className="bg-slate-800 text-white px-4 lg:px-20">
        
        {/* ── DESKTOP ── */}
        <div className="hidden md:flex items-center gap-5 py-8">
          <div className="w-[30%]">
            <Logo />
          </div>
          <div className="w-[70%] pl-6 md:pl-8 flex justify-between">
            <div className="flex flex-col gap-5">
              <span className="text-slate-300 text-sm">
                <span className="font-semibold text-white mr-1">Lo más buscado:</span>
                Papeles, Carpetas, Limpia Tipo...
              </span>
              <div className="flex w-full max-w-2xl">
                <ContainerFilter onSearch={(searchTerm, category) => {
                  navigate(`/products?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
                }} />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="relative flex justify-end">
                {user ? (
                  <div className="relative">
                    <button onClick={() => setShowUserMenu(p => !p)}
                      className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-sm font-bold hover:bg-slate-700 transition-colors uppercase">
                      {user.email[0]}
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 top-11 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 w-48 z-50 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b">
                          <p className="text-xs font-semibold truncate">{user.email}</p>
                        </div>
                        <Link to="/orders" onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                          <FiPackage className="w-4 h-4" /> Mis Órdenes
                        </Link>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          <FiLogOut className="w-4 h-4" /> Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => openModal('login')}
                    className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center hover:bg-slate-700 transition-colors">
                    <FiUser className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-row-reverse items-center gap-4">
                <div className="flex items-center gap-2">
                  <Link to="/cart" className="relative">
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 grid place-items-center bg-amber-500 text-white text-xs rounded-full font-bold z-10">
                      {totalItems}
                    </span>
                    <HiOutlineShoppingCart size={40} strokeWidth={1} className="bg-amber-50 text-blue-950 hover:text-amber-400 transition-colors" />
                  </Link>
                </div>
                <div className="flex flex-row items-center gap-3">
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

        {/* ── MOBILE ── */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            {/* Hamburger */}
            <button onClick={() => setMobileMenuOpen(p => !p)} className="p-2">
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            {/* Logo centrado */}
            <Logo />

            {/* Acciones derecha */}
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileSearch(p => !p)}>
                <FiSearch size={20} />
              </button>
              <Link to="/cart" className="relative">
                <span className="absolute -top-1 -right-1 w-4 h-4 grid place-items-center bg-amber-500 text-white text-[10px] rounded-full font-bold z-10">
                  {totalItems}
                </span>
                <HiOutlineShoppingCart size={24} strokeWidth={1.5} className="text-white" />
              </Link>
              {user ? (
                <button onClick={() => setShowUserMenu(p => !p)}
                  className="border-2 border-slate-600 w-8 h-8 rounded-full grid place-items-center text-xs font-bold uppercase">
                  {user.email[0]}
                </button>
              ) : (
                <button onClick={() => openModal('login')}>
                  <FiUser size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Barra de búsqueda mobile */}
          {showMobileSearch && (
            <div className="pb-3">
              <ContainerFilter onSearch={(searchTerm, category) => {
                setShowMobileSearch(false);
                navigate(`/products?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
              }} />
            </div>
          )}

          {/* Menú mobile desplegable */}
          {mobileMenuOpen && (
            <div className="bg-slate-700 rounded-xl mb-3 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-600">
                <p className="text-xs text-slate-300">
                  <span className="font-semibold text-white">TELÉFONOS: </span>
                  <a href="https://wa.me/584244085004" className="hover:text-amber-400">(+58) 424 408 5004</a>
                </p>
              </div>
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-slate-600">
                    <p className="text-xs text-slate-300 truncate">{user.email}</p>
                  </div>
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm border-b border-slate-600 hover:bg-slate-600">
                    <FiPackage className="w-4 h-4" /> Mis Órdenes
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-slate-600">
                    <FiLogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <button onClick={() => { openModal('login'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-600">
                  <FiUser className="w-4 h-4" /> Iniciar Sesión
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultTab={modalTab} />
    </>
  );
};