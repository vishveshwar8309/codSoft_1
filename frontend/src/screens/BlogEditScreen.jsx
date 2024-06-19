import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form } from "react-bootstrap";
import {
  useGetBlogDataQuery,
  useUploadBlogImageMutation,
} from "../slices/blogsApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const BlogEditScreen = React.memo(() => {
  const { id: blogId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [uploadBlogImage, { isLoading: isUploading }] =
    useUploadBlogImageMutation();
  const { data, isLoading, error, refetch } = useGetBlogDataQuery(blogId);
  console.log(data);

  useEffect(() => {
    setTitle(data.title);
    setAuthor(data.author);
    setContent(data.content);
    setDescription(data.description);
  }, [blogId, data.title, data.author, data.content, data.description]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <FormContainer>
          <Form className="mt-5">
            <Form.Group controlId="title" className=" mt-4">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add title to this page"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="author" className="my-3">
              <Form.Label>Author:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add author to this page"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="content" className="my-3">
              <Form.Label>Content:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add content to this page"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="descritpion" className="my-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add description to this page"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </FormContainer>
      )}
    </>
  );
});

export default BlogEditScreen;
