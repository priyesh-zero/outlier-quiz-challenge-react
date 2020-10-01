import { motion, useAnimation } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useHistory, useRouteMatch } from "react-router";
import { Options } from "../../components/question/Options";
import { Rating } from "../../components/question/Rating";
import { routeVariants } from "../../framer-animation/routes";
import { QuizContext } from "../../providers/contexts/QuizContext";

export const Questions = () => {
  const {
    params: { qno },
  } = useRouteMatch<{ qno: string }>();
  const {
    currentQuestion,
    getCurrentQuestion,
    progress,
    checkAuth,
  } = useContext(QuizContext);
  const history = useHistory();
  const successControls = useAnimation();
  const errorControls = useAnimation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkAuth()) {
      history.push(`/`);
    } else {
      setLoading(false);
    }
  }, [checkAuth, setLoading]);

  useEffect(() => {
    if (currentQuestion !== parseInt(qno)) {
      history.push(`/quiz/${currentQuestion}`);
    }
  }, [currentQuestion]);

  const question = getCurrentQuestion();
  if (!question || loading)
    return (
      <motion.div
        variants={routeVariants}
        initial={"entry"}
        animate={"stage"}
        exit={"exit"}
        className="bg-dark flex-fill d-flex justify-content-center align-items-center"
      >
        <div className="h2 text-center text-white">Initializing Test!</div>
      </motion.div>
    );

  const handleSelect = async (option: string) => {
    successControls.set("hidden");
    errorControls.set("hidden");
    if (question.correct_answer === option) {
      await successControls.start("correct");
      await successControls.start("hiddenTwo");
    } else {
      await errorControls.start("wrong");
      await errorControls.start("hiddenTwo");
    }
    progress(question.correct_answer === option);
  };

  return (
    <motion.div
      variants={routeVariants}
      initial={"entry"}
      animate={"stage"}
      exit={"exit"}
      className="bg-dark flex-fill"
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
          handleSelect={handleSelect}
          correctAnswer={question.correct_answer}
        />
        <div className="w-100 position-relative">
          <motion.h2
            className="position-absolute w-100 text-center"
            variants={resultVariant}
            initial="hidden"
            animate={successControls}
          >
            Yeah!
          </motion.h2>
          <motion.h2
            className="position-absolute w-100 text-center"
            variants={resultVariant}
            initial="hidden"
            animate={errorControls}
          >
            Opps!
          </motion.h2>
        </div>
      </Container>
    </motion.div>
  );
};

const resultVariant = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  correct: {
    x: 0,
    opacity: 1,
    color: "#28a745",
  },
  wrong: {
    x: 0,
    opacity: 1,
    color: "#dc3545",
  },
  hiddenTwo: {
    x: -200,
    opacity: 0,
    transition: { delay: 1 },
  },
};
