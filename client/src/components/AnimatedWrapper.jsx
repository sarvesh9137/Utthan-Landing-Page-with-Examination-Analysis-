// AnimatedWrapper.jsx
import { motion } from "framer-motion";

export function FadeIn({ children, className="" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className={className}>
      {children}
    </motion.div>
  );
}
