import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Register = () => {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, verifyEmail } =
    useContext(AuthContext);

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
        // User create here
        const user = result.user;
        //- reset user
        form.reset(user);
        //reset error message
        setError("");

        //Update user
        handleUpdateUserProfile(name, photoURL);
        //verify email
        handleEmailVerification();
        toast.success("Please verify your email address before login!");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  //update user
  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };
  // varify email
  const handleEmailVerification = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  //Accept terms and condition
  const handleTermsAndCondition = (event) => {
    // console.log(event.target.checked);
    setAccepted(event.target.checked);
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          onClick={handleTermsAndCondition}
          type="checkbox"
          label={
            <>
              Accept <Link to="/terms">terms and conditions</Link>
            </>
          }
        />
      </Form.Group>
      <Button
        className={`btn ${!accepted ? " btn-danger" : " btn-primary"}`}
        // className={!accepted ? "btn btn-danger" : "btn btn-primary"}
        variant="primary"
        type="submit"
        disabled={!accepted}
      >
        Register
      </Button>

      <Form.Text className="d-block p-2 my-4 text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Register;
