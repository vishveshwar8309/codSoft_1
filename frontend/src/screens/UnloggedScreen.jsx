import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../slices/blogsApiSlice";
import Loader from "../components/Loader";

const UnloggedScreen = () => {
  const [blogs, setBlogs] = useState(null);
  const { data, isLoading, error } = useGetAllBlogsQuery();

  useEffect(() => {
    setBlogs(data);
  }, [data]);

  return (
    <>
      <Container>
        {isLoading ? (
          <Loader className="d-flex justify-content-center" />
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <>
            {blogs ? (
              <Row style={{ height: "500px" }}>
                {blogs.map((blog) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={blog._id}>
                    <Card
                      className="my-3 p-3 rounded shadow"
                      style={{ height: "450px" }}
                    >
                      <Link to={`/signin?redirect=/blogs/${blog._id}`}>
                        <Card.Img
                          src={blog.image}
                          alt={blog.content}
                          variant="top"
                        />
                      </Link>
                      <Card.Body>
                        <Link
                          to={`/signin?redirect=/blogs/${blog._id}`}
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
                  </Col>
                ))}
              </Row>
            ) : (
              <p>Their is no blogs data at present</p>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default UnloggedScreen;
