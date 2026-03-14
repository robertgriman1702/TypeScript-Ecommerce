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
        initial={{ opacity: 0, x: -400 }}
        animate={{ opacity: 1, x: -300 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute text-left max-w-2xl px-6"
      >
        <h1 className="text-white text-3xl md:text-6xl font-semibold p:2">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-neutral-900 text-3xl p:2">
            {subtitle}
          </p>
        )}
      </motion.div>

    </div>
  );
}