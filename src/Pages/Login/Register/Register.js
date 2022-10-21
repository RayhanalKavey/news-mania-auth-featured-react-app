import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, signIn } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form?.photoURL?.value;
    const email = form?.email?.value;
    const password = form?.password?.value;
    console.log(name, photoURL, email, password);

    ////email and password login
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        //- reset user
        form.reset(user);
        //reset error message
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control
          name="photoURL"
          type="text"
          placeholder="Enter photo ULR"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button className="d-block" variant="primary" type="submit">
        Register
      </Button>
      <Form.Text className="d-block p-2 my-4 text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Register;
