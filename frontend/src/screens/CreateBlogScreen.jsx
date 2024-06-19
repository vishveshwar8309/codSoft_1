import React, { useState } from "react";
import TinyMice from "../components/TinyMice";
import FormContainer from "../components/FormContainer";
import { Form, Container, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useCreateABlogMutation,
  useUploadBlogImageMutation,
} from "../slices/blogsApiSlice";
import { toast } from "react-toastify";

const CreateBlogScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  const [createABlog, { isLoading }] = useCreateABlogMutation();
  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadBlogImageMutation();

  //   const handleEditorChange = (event, editor) => {
  //     const data = editor.getData();
  //     console.log("Content was updated:", data);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdBlog = await createABlog({
      title,
      content,
      author,
      image,
      description,
    }).unwrap();

    if (createdBlog) {
      toast.success("success");
    }
    navigate("/");
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" className="mt-5">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add title to this Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="author" className="my-3">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add author to this Blog"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="content" className="my-3">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add content to this Blog"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="image" className="my-3">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage}
          ></Form.Control>
          <Form.Control
            type="file"
            label="choose file"
            onChange={uploadFileHandler}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="my-3">
          <Form.Label>Description:</Form.Label>
          {/* <TinyMice /> */}

          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Add description to this Blog"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3">
          <Button type="submit" variant="info" className="border-success">
            Create
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default CreateBlogScreen;
