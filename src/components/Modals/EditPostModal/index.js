import axios from "axios";
import { BASE_URL } from "../../../consts";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";

const EditPostModal = ({ postId, isOpen, onToggle, onEdit, isLoading }) => {
  const [editPostDetails, setEditPostDetails] = useState({
    title: "",
    body: "",
  });

  const handlePostDetailsChange = useCallback((event, field) => {
    setEditPostDetails((prevValue) => ({
      ...prevValue,
      [field]: event.target.value,
    }));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/${postId}`)
      .then(({ data }) => {
        setEditPostDetails({ ...data });
      })
      .catch(() => {
        alert("Unable to get post data");
        onToggle();
      });
  }, [postId, onToggle]);

  return (
    <Modal centered isOpen={isOpen} toggle={onToggle}>
      <ModalHeader>Edit the post</ModalHeader>
      <ModalBody>
        <Input
          disabled={isLoading}
          onChange={(e) => handlePostDetailsChange(e, "title")}
          value={editPostDetails.title}
          placeholder="Enter post title"
        />
        <Input
          disabled={isLoading}
          onChange={(e) => handlePostDetailsChange(e, "body")}
          value={editPostDetails.body}
          placeholder="Enter post content"
          className="my-3"
        />
        <div className="d-flex justify-content-end">
          <Button onClick={onToggle} color="danger" className="me-3">Cancel</Button>
          <Button color="success" onClick={() => onEdit(editPostDetails)} disabled={isLoading}>Save</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditPostModal;
