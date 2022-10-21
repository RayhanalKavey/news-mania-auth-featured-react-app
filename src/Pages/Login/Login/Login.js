import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

//-------------
const Login = () => {
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);
  //-------------notE redirect user
  const navigate = useNavigate();
  //-------------notE user location where they want to go

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //---------
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    console.log(email, password);
    //signin
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        //- reset user
        form.reset(user);

        //-notE redirect user when login
        navigate(from, { replace: true });
        //-Clear error
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
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
      <Button className="d-block " variant="primary" type="submit">
        Login
      </Button>
      <Form.Text className="d-block  p-2 my-4 text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Login;
