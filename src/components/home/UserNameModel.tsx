import React, { FC, FormEvent, useContext } from "react";
import { object, string } from "yup";
import { Formik } from "formik";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useHistory } from "react-router";
import { UserContext } from "../../providers/contexts/UserContext";

const formSchema = object({
  name: string().required(),
});

interface UserNameModelProps {
  show: boolean;
  onHide: () => void;
}

export const UserNameModel: FC<UserNameModelProps> = ({ show, onHide }) => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Your Name?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Formik
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            setUser(values.name);
            actions.resetForm();
            onHide();
            history.push("/quiz");
          }}
          initialValues={{ name: "" }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit as (e: FormEvent<HTMLElement>) => void}
            >
              <Form.Row>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    autoComplete="false"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>{`Welcome to the Outlier Test ${values.name}`}</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit" disabled={!isValid}>
                {values.name ? `Let's Start ${values.name}` : "Add Your Name"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
