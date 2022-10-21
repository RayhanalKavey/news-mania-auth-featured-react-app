import React, { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  //--2 second way
  const photoURLRef = useRef(user?.photoURL);
  //--1 way to take input value from onSubmit and onChange together starT
  const [name, setName] = useState(user?.displayName);
  // const [photoURL, setPhotoURL] = useState(user?.photoURL); //sln --1 with useState
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(photoURLRef.current.value);
    // handleUpdateUserProfile(name, photoURL); ////sln --1 with useState
    handleUpdateUserProfile(name, photoURLRef.current.value); ////sln --2 with useRef
    toast.success("Successfully updated");
  };
  // notE capture the user information changed
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  // const handleChangePhotoURL = (event) => {
  //   setPhotoURL(event.target.value);
  // };//sln 1 with useState
  // notE update user
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
  //--1 way to take input value from onSubmit and onChange together enD
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          // notE we can set default value in the input field starT
          readOnly
          defaultValue={user?.email}
          // notE we can set default value in the input field enD
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your name</Form.Label>
        <Form.Control
          onChange={handleChangeName}
          defaultValue={name}
          type="text"
          placeholder="Name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhotoURL">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control
          // onChange={handleChangePhotoURL} //sln --1 with useState
          ref={photoURLRef} //sln --2
          defaultValue={user?.photoURL}
          type="text"
          placeholder="Photo URL"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Profile;
