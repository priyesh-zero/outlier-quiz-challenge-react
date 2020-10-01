import React, { FC, useEffect, useState } from "react";
import { useRandomArray } from "../../hooks/useRandomArray";
import { motion, useAnimation } from "framer-motion";

interface OptionsProps {
  options: string[];
  handleSelect: (option: string) => void;
  correctAnswer: string;
}

const variant = {
  initial: { opacity: 0, x: 100 },
  animate: (index: number) => ({
    x: 0,
    color: "#6c757d",
    opacity: 1,
    transition: { delay: 0.6 + 0.3 * index },
  }),
  animateDelay: {
    x: 0,
    color: "#6c757d",
    scale: 1,
    opacity: 1,
  },
  hover: { scale: 1.1, x: 25, color: "#FFF" },
  correct: { scale: 1.1, x: 50, color: "#0F0", transition: { yoyo: Infinity } },
  wrong: { scale: 1.1, x: 50, color: "#F00", transition: { yoyo: Infinity } },
};

export const Options: FC<OptionsProps> = ({
  options,
  handleSelect,
  correctAnswer,
}) => {
  const randomOptions = useRandomArray(options);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const handleSelection = (option: string) => {
    setSelectedOption(option);
    handleSelect(option);
  };
  return (
    <>
      {randomOptions.map((option, index) => (
        <Option
          correctAnswer={correctAnswer}
          key={option}
          index={index}
          option={option}
          handleSelect={handleSelection}
          selected={selectedOption}
        />
      ))}
    </>
  );
};

interface OptionProps {
  option: string;
  index: number;
  handleSelect: (option: string) => void;
  selected?: string;
  correctAnswer: string;
}
const Option: FC<OptionProps> = ({
  index,
  option,
  handleSelect,
  selected,
  correctAnswer,
}) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start("animate");
  }, [controls]);
  useEffect(() => {
    if (selected && selected === option) {
      controls.set("animateDelay");
      if (selected === correctAnswer) {
        controls.start("correct");
      } else {
        controls.set("wrong");
      }
      controls.start(selected === correctAnswer ? "correct" : "wrong");
    } else if (selected && option === correctAnswer) {
      controls.set("animateDelay");
      controls.start("correct");
    }
  }, [selected, controls, correctAnswer, option]);

  const handleHover = (animation: string) => {
    if (!selected) {
      controls.start(animation);
    }
  };

  return (
    <motion.h3
      custom={index}
      key={option}
      variants={variant}
      initial={"initial"}
      animate={controls}
      onMouseEnter={() => handleHover("hover")}
      onMouseLeave={() => handleHover("animateDelay")}
      className="w-100 m-3 text-left"
      onClick={() => handleSelect(option)}
      style={{ cursor: "pointer", color: "#6c757d" }}
    >
      {decodeURIComponent(option)}
    </motion.h3>
  );
};
