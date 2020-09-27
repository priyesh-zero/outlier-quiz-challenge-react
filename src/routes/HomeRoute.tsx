import React from "react";
import { motion } from "framer-motion";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const HomeRoute = () => {
  return (
    <motion.div
      initial={{ x: 1920 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark h-100"
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
        fluid="lg"
      >
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="" style={{ width: "30rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/random/286x180?quiz"
            />
            <Card.Body>
              <Card.Title>Outlier Quiz</Card.Title>
              <Card.Text>
                Check your wits in our witty real-time test. just press the
                start button to start the adventure.
              </Card.Text>
              <Button variant="primary">Start</Button>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </motion.div>
  );
};
