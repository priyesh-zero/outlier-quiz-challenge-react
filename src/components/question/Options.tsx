import React, { FC, useEffect } from "react";
import { useRandomArray } from "../../hooks/useRandomArray";
import { motion, useAnimation } from "framer-motion";

interface OptionsProps {
  options: string[];
}

const variant = {
  initial: { opacity: 0, x: 100 },
  animate: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.6 + 0.3 * index },
  }),
  hover: { scale: 1.1, x: 25, color: "#FFF" },
};

export const Options: FC<OptionsProps> = ({ options }) => {
  const randomOptions = useRandomArray(options);
  const animation = useAnimation();
  useEffect(() => {
    animation.start("animate");
  }, []);

  return (
    <>
      {randomOptions.map((option, index) => (
        <motion.h3
          custom={index}
          variants={variant}
          initial={"initial"}
          animate={"animate"}
          whileHover={"hover"}
          className="w-100 m-3 text-left text-muted"
        >
          {decodeURIComponent(option)}
        </motion.h3>
      ))}
    </>
  );
};
