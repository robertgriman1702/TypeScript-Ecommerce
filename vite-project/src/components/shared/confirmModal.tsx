import { FiAlertTriangle } from 'react-icons/fi';

interface Props {
  isOpen:    boolean;
  title:     string;
  message:   string;
  onConfirm: () => void;
  onCancel:  () => void;
  confirmText?: string;
  cancelText?:  string;
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText  = 'Cancelar',
}: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <FiAlertTriangle className="w-7 h-7 text-red-500" />
          </div>
        </div>

        {/* Texto */}
        <h3 className="text-lg font-bold text-slate-800 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          {message}
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};