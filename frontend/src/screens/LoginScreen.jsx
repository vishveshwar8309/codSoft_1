import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetuserDataMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authenticateUser, { isLoading, error }] = useGetuserDataMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await authenticateUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate(redirect);
      toast.success("logged in successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 style={{ marginTop: "70px" }}>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="my-3 mt-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email.."
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-4">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter the password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Button
            type="submit"
            variant="info"
            className="my-3 border border-success"
          >
            Sign In
          </Button>
        </Form.Group>
      </Form>
      {isLoading && <Loader />}
      <p>
        Didn't have an account? <Link to="/register">register</Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
