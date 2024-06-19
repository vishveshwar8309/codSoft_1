import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { useGetUserBlogsQuery } from "../slices/blogsApiSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import MyBlogs from "../components/MyBlogs";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);

  const dispatch = useDispatch();

  const { data: blogs, isLoading, error } = useGetUserBlogsQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({ name, email }).unwrap();
      dispatch(setCredentials(res));
      toast.success("update successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <h2>User Details</h2>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="info" className="my-3">
              Update user
            </Button>
            {isUpdating && <Loader />}
          </Form>
        </Col>
        <Col md={8}>
          <h2>My Blogs</h2>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <p>no blogs at present{error?.data?.message || error.error}</p>
          ) : (
            <Row>
              {blogs.map((blog) => (
                <Col key={blog._id}>
                  <MyBlogs blog={blog} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
