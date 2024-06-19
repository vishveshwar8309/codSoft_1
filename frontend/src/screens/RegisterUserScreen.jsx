import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useRegisterUserMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const RegisterUserScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ email, name, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Registred successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 style={{ marginTop: "70px" }}>Register User</h1>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group controlId="email" className="my-3 mt-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3 ">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Button
            type="submit"
            variant="info"
            className="my-3 border border-success"
            disabled={isLoading}
          >
            Register
          </Button>
        </Form.Group>
      </Form>
      {isLoading && <Loader />}
      <p>
        Already have an account? <Link to="/signin">sign in</Link>
      </p>
    </FormContainer>
  );
};

export default RegisterUserScreen;
