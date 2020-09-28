import React, { useContext, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router";
import { motion } from "framer-motion";

import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

import { QuizContext } from "../../providers/contexts/QuizContext";
import { routeVariants } from "../../framer-animation/routes";
import { Rating } from "../../components/question/Rating";
import { Options } from "../../components/question/Options";

export const Questions = () => {
  const {
    params: { qno },
  } = useRouteMatch<{ qno: string }>();
  const { nextQuestion, currentQuestion, getCurrentQuestion } = useContext(
    QuizContext
  );
  const history = useHistory();

  useEffect(() => {
    if (currentQuestion !== parseInt(qno)) {
      history.push(`/quiz/${currentQuestion}`);
    }
  }, [currentQuestion]);

  const question = getCurrentQuestion();
  if (!question) return <></>;

  return (
    <motion.div
      variants={routeVariants}
      initial={"entry"}
      animate={"stage"}
      exit={"exit"}
      className="bg-dark h-100"
    >
      <Container
        className="h-100 d-flex flex-column justify-content-center align-items-center text-right"
        fluid="lg"
      >
        <motion.div
          className="w-100 text-left text-white display-5 mb-5"
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1>{decodeURIComponent(question.question)}</h1>
          <h3>{decodeURIComponent(question.category)}</h3>
          <Rating difficulty={question.difficulty} />
        </motion.div>
        <Options
          options={[question.correct_answer, ...question.incorrect_answers]}
        />
        <Button variant="success" onClick={() => nextQuestion()}>
          Next
        </Button>
      </Container>
    </motion.div>
  );
};
