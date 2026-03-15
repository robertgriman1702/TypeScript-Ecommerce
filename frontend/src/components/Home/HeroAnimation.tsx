import { motion } from "framer-motion";

interface HeroAnimationProps {
  title: string;
  subtitle?: string;
  phoneImage?: string;
}

export default function HeroAnimation({
  title,
  subtitle,
}: HeroAnimationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative text-left max-w-2xl px-6 md:px-10 md:absolute md:left-10 lg:left-20"
      >
        <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-semibold">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-white/80 text-base sm:text-xl md:text-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>

    </div>
  );
}