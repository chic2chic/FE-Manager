import { motion } from "framer-motion";

export default function Skeleton() {
  return (
    <motion.div
      className="relative overflow-hidden bg-gray-200 w-full h-full"
      initial={{ opacity: 0.6 }}
    >
      <motion.div
        className="absolute top-0 bottom-0 left-[-100%] w-[50%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        animate={{ left: ["-50%", "150%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}
