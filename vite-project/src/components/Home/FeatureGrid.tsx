import { MdLocalShipping } from 'react-icons/md';
import { HiMiniReceiptRefund } from 'react-icons/hi2';
import { FaHammer } from 'react-icons/fa6';
import { BiWorld } from 'react-icons/bi';
import { FaBox, FaSmile, FaTruck, FaShieldAlt } from 'react-icons/fa';

export const FeatureGrid = () => {
  const benefits = [
    {
      icon: MdLocalShipping,
      title: 'Envío Gratis',
      desc: 'En todos nuestros productos sin mínimo de compra',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: HiMiniReceiptRefund,
      title: 'Devoluciones Fáciles',
      desc: 'Devuelve cualquier producto dentro de 72 horas sin preguntas',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: FaHammer,
      title: 'Soporte 24/7',
      desc: 'Atención al cliente en cualquier momento vía WhatsApp',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: BiWorld,
      title: 'Garantía Total',
      desc: 'Garantía de 1 año en todos los productos defectuosos',
      gradient: 'from-orange-500 to-orange-600',
    },
  ];

  const stats = [
    { icon: FaBox,      value: '500+',  label: 'Productos' },
    { icon: FaSmile,    value: '98%',   label: 'Satisfacción' },
    { icon: FaTruck,    value: '24h',   label: 'Entrega' },
    { icon: FaShieldAlt,value: '100%', label: 'Seguro' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800  text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            ¿Por qué comprar con nosotros?
          </h2>
          <p className="text-slate-300 text-lg">
            Garantizamos la mejor experiencia de compra
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="group relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <b.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{b.desc}</p>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/20">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <s.icon size={32} className="mx-auto mb-3 text-amber-400" />
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <div className="text-sm text-slate-300">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};