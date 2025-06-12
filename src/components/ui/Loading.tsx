/**
 * @Description
 * 로딩 애니메이션을 보여주는 로딩 컴포넌트입니다.
 */

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex space-x-3">
        <motion.div
          className="h-4 w-4 rounded-full"
          initial={{ backgroundColor: "#ffecf4" }}
          animate={{
            backgroundColor: [
              "#ffecf4",
              "#ffb4d1",
              "#ff7caf",
              "#ffb4d1",
              "#ffecf4",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
        <motion.div
          className="h-4 w-4 rounded-full"
          initial={{ backgroundColor: "#ffecf4" }}
          animate={{
            backgroundColor: [
              "#ffecf4",
              "#ffb4d1",
              "#ff7caf",
              "#ffb4d1",
              "#ffecf4",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 0.5,
          }}
        />
        <motion.div
          className="h-4 w-4 rounded-full"
          initial={{ backgroundColor: "#ffecf4" }}
          animate={{
            backgroundColor: [
              "#ffecf4",
              "#ffb4d1",
              "#ff7caf",
              "#ffb4d1",
              "#ffecf4",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

export default Loading;
