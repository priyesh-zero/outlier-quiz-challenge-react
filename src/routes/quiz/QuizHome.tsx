import React from "react";
import { motion } from "framer-motion";

import Container from "react-bootstrap/esm/Container";

import { routeVariants } from "../../framer-animation/routes";

export const QuizHome = () => {
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
      </Container>
    </motion.div>
  );
};
