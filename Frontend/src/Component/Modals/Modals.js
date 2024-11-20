/** @format */

import { useEffect, useState } from "react";
import {Form, Modal } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { createApi, updateApi } from "../../Repository/Repository";





// const showNotification = ({ message, type = "success" }) => {
//   Store.addNotification({
//     title: "",
//     message,
//     type,
//     insert: "top",
//     container: "top-right",
//     animationIn: ["animate__animated", "animate__fadeIn"],
//     animationOut: ["animate__animated", "animate__fadeOut"],
//     dismiss: {
//       duration: 3000,
//       onScreen: true,
//     },
//   });
// };

const CreateBook = ({ show, handleClose, edit, id, fetchApi, data }) => {
  const [title, setTitle] = useState(data?.title || "");
  const [author, setAuthor] = useState(data?.author || "");
  const [genre, setGenre] = useState(data?.genre || "");
  const [published_year, setPublished_year] = useState(data?.published_year || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && data) {
      setTitle(data?.title || "");
      setAuthor(data?.author || "");
      setGenre(data?.genre || "");
      setPublished_year(data?.published_year || "");
    } else {
      resetForm();
    }
  }, [edit, data]);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublished_year("");
  };

  const additionalFunctions = [handleClose, fetchApi];

  const validateForm = () => {
    if (!title || !author || !genre || !published_year) {
      alert("All fields are required!");
      return false;
    }
    if (isNaN(published_year) || published_year.length !== 4) {
      alert("Please enter a valid 4-digit published year.");
      return false;
    }
    return true;
  };

  const createHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      title,
      author,
      genre,
      published_year,
    };

    createApi({
      url: "api/book/add/book",
      payload,
      setLoading,
      successMsg: "Book added successfully",
      additionalFunctions,
    });

    resetForm();
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      title,
      author,
      genre,
      published_year,
    };

    updateApi({
      url: `api/book/updateBookById/${id}`,
      payload,
      setLoading,
      successMsg: "Book updated successfully",
      additionalFunctions,
    });

    resetForm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={edit ? updateHandler : createHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
              <option value="Biography">Biography</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Published Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter published year (e.g., 2023)"
              value={published_year}
              onChange={(e) => setPublished_year(e.target.value)}
            />
          </Form.Group>
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default CreateBook;


