import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTwitch,
} from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import BrandCarousel from "../BrandCarousel/BrandCarousel";

const RightSideNav = () => {
  return (
    <div>
      <ButtonGroup vertical>
        <Button className="mb-2" variant="outline-primary">
          <FaGoogle /> Login with Google
        </Button>
        <Button variant="outline-dark">
          {" "}
          <FaGithub /> Login with GitHub{" "}
        </Button>
      </ButtonGroup>
      <div className="mt-4">
        <h5>Find us on</h5>
        <ListGroup className="gap-2">
          <ListGroup.Item>
            {" "}
            <FaFacebook /> Facebook
          </ListGroup.Item>
          <ListGroup.Item>
            <FaWhatsapp /> Whatsapp
          </ListGroup.Item>

          <ListGroup.Item>
            <FaTwitter /> Twitter
          </ListGroup.Item>
          <ListGroup.Item>
            <FaTwitch />
            Twitch
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="mt-4">
        <BrandCarousel></BrandCarousel>
      </div>
    </div>
  );
};

export default RightSideNav;
