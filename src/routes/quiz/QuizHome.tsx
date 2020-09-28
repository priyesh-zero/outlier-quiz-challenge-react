import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router";

import Container from "react-bootstrap/esm/Container";

import { routeVariants } from "../../framer-animation/routes";
import { QuizContext } from "../../providers/contexts/QuizContext";

export const QuizHome = () => {
  const history = useHistory();
  const { nextQuestion, currentQuestion } = useContext(QuizContext);
  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);
  useEffect(() => {
    history.push(`/quiz/${currentQuestion}`);
  }, [currentQuestion]);
  return (
    <motion.div
      variants={routeVariants}
      initial={"entry"}
      animate={"stage"}
      exit={"exit"}
      className="bg-dark h-100"
    >
      <Container
        className="h-100 d-flex justify-content-center align-items-center"
        fluid="lg"
      >
        <h1>Hello World</h1>
        <button onClick={() => nextQuestion()}>next</button>
      </Container>
    </motion.div>
  );
};
