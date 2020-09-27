import React, { useState } from "react";
import { motion } from "framer-motion";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { UserNameModel } from "../components/home/UserNameModel";
import { routeVariants } from "../framer-animation/routes";

export const HomeRoute = () => {
  const [userNameModal, setUserNameModal] = useState(false);

  const handleStart = () => {
    setUserNameModal(true);
  };

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
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
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
              <Button variant="primary" onClick={handleStart}>
                Start
              </Button>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
      <UserNameModel
        show={userNameModal}
        onHide={() => setUserNameModal(false)}
      />
    </motion.div>
  );
};
