import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

//-------------
const Login = () => {
  const [error, setError] = useState("");
  const { signIn, setLoading } = useContext(AuthContext);
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
        // notE login after email verification
        if (user.emailVerified) {
          //-notE redirect user when login
          navigate(from, { replace: true });
        } else {
          toast.error(
            "Your email is not verified !! Please verify your email address."
          );
        }
        //-Clear error
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        // notE solve always show spinner/ this error occurs because we enforce user to verify email
        setLoading(false);
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

      <Button className="d-block " variant="primary" type="submit">
        Login
      </Button>
      <Form.Text className="d-block  p-2 my-4 text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Login;
