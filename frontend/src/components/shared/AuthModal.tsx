import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

interface Props {
  isOpen:      boolean;
  onClose:     () => void;
  defaultTab?: 'login' | 'register';
  onSuccess?:  () => void;
}

export const AuthModal = ({ isOpen, onClose, defaultTab = 'login', onSuccess }: Props) => {
  const { login, register } = useAuth();

  const [tab,      setTab]      = useState<'login' | 'register'>(defaultTab);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    setEmail(''); setPassword(''); setConfirm('');
    setError(''); setSuccess('');
  }, [tab, isOpen]);

  useEffect(() => { setTab(defaultTab); }, [defaultTab]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      onSuccess ? onSuccess() : onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Las contraseñas no coinciden');
    if (password.length < 6)  return setError('Mínimo 6 caracteres');
    setLoading(true);
    try {
      const msg = await register(email, password);
      setSuccess(msg || 'Revisa tu correo para confirmar tu cuenta.');
      setEmail(''); setPassword(''); setConfirm('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <FiX size={22} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {tab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {tab === 'login' ? 'Accede a tu cuenta de Pegazo C.A.' : 'Únete a Pegazo C.A.'}
          </p>
        </div>

        {/* Mensajes */}
        {error   && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
        {success && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
            <button onClick={onClose} className="block mt-2 text-green-800 font-semibold underline text-xs">
              Cerrar
            </button>
          </div>
        )}

        {/* ── LOGIN ── */}
        {tab === 'login' && !success && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="correo@ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-slate-800 hover:bg-amber-400 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>

            <p className="text-center text-sm text-gray-500 pt-2">
              ¿No tienes cuenta?{' '}
              <button type="button" onClick={() => setTab('register')}
                className="text-amber-500 font-semibold hover:underline">
                Regístrate aquí
              </button>
            </p>
          </form>
        )}

        {/* ── REGISTRO ── */}
        {tab === 'register' && !success && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="correo@ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                placeholder="Repite tu contraseña"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-slate-800 hover:bg-amber-400 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>

            <p className="text-center text-sm text-gray-500 pt-2">
              ¿Ya tienes cuenta?{' '}
              <button type="button" onClick={() => setTab('login')}
                className="text-amber-500 font-semibold hover:underline">
                Inicia sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};