import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MyBlogs = ({ blog }) => {
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{ width: "350px", height: "450px" }}
    >
      <Link to={`/blogs/${blog._id}`}>
        <Card.Img src={blog.image} alt={blog.content} variant="top" />
      </Link>

      <Card.Body>
        <Link
          to={`/blogs/${blog._id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <Card.Title>
            <strong>{blog.title}</strong>
          </Card.Title>
        </Link>

        <Card.Title as="div">
          <strong> - {blog.author}</strong>
        </Card.Title>

        <Card.Text as="div">{blog.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyBlogs;
