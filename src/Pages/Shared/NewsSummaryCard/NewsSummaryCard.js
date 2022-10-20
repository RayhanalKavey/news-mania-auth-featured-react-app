import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from "react-icons/fa";

const NewsSummaryCard = ({ news }) => {
  const { _id, title, total_view, author, details, image_url, rating } = news;
  return (
    <Card className=" mb-5">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-start">
            <Image
              roundedCircle
              style={{ height: "60px" }}
              src={author?.img}
            ></Image>
            <div>
              <h5>{author?.name}</h5>
              <p>{author?.published_date}</p>
            </div>
          </div>
          <div>
            <FaRegBookmark></FaRegBookmark>
            <FaShareAlt></FaShareAlt>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Img variant="top" src={image_url} />
        <Card.Text>
          {details.length > 250 ? (
            <p>
              {details.slice(0, 250) + "...."}{" "}
              <Link to={`/news/${_id}`}>Read more</Link>
            </p>
          ) : (
            <p>{details}</p>
          )}{" "}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <FaStar className="text-warning"></FaStar>
          <span>{rating?.number}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaEye></FaEye>
          <span>{total_view}</span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default NewsSummaryCard;
