import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { routeVariants } from "../../framer-animation/routes";
import { QuizContext } from "../../providers/contexts/QuizContext";
import { useHistory } from "react-router";

export const CompleteScreen = () => {
  const { actualScore, hasCompleted, persistScore } = useContext(QuizContext);
  const history = useHistory();
  useEffect(() => {
    if (!hasCompleted()) {
      history.push("/");
    } else {
      persistScore();
    }
  }, []);
  return (
    <motion.div
      variants={routeVariants}
      initial={"entry"}
      animate={"stage"}
      exit={"exit"}
      className="bg-dark flex-fill m-5 d-flex flex-column align-items-center justify-content-center"
    >
      <motion.h2
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, color: "#FFF", opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Thank you for the Taking the Test
      </motion.h2>
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        width="10em"
        height="10em"
        viewBox="0 0 16 16"
        className="bi bi-check2-circle text-success"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        <path
          fillRule="evenodd"
          d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"
        />
      </motion.svg>
      <motion.h2
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 10, color: "#FFF", opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        You have scored
        <span className="d-block m-5 font-weight-bolder bg-light text-dark rounded">
          {actualScore}%
        </span>
        in this test.
      </motion.h2>
    </motion.div>
  );
};
