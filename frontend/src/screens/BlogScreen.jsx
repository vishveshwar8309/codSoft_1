import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetBlogDataQuery } from "../slices/blogsApiSlice";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const BlogScreen = () => {
  const { id: blogId } = useParams();

  const { data, isLoading, error } = useGetBlogDataQuery(blogId);

  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-light mt-3 ml-3">
          go back
        </Link>
      </div>

      <div className=" my-4">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Error:{error?.data?.message}</Message>
        ) : (
          <div>
            <h1>{data.title}</h1>
            <div style={{ fontSize: "x-large" }}> - {data.author}</div>
            <div className="my-2">{data.date.substring(0, 10)}</div>
            <div
              style={{
                width: "auto",
                height: "auto",
                float: "right",
                // padding: "0.2em",
                border: "solid 1px black",
                margin: "50px",
                textAlign: "center",
              }}
            >
              {data.image && (
                <img
                  src={data.image}
                  variant="top"
                  alt={data.title}
                  style={{ width: "auto", height: "auto" }}
                />
              )}
            </div>

            <div className="my-5">
              <p style={{ fontSize: "large" }}>{data.description}</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BlogScreen;
