import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";

const CreatePostModal = ({
  isOpen,
  onToggle,
  onTitleChange,
  onBodyChange,
  title,
  body,
  onCancel,
  onAdd,
  isLoading,
}) => (
  <Modal centered isOpen={isOpen} toggle={onToggle}>
    <ModalHeader>Add a post to the user</ModalHeader>
    <ModalBody>
      <Input
        onChange={onTitleChange}
        value={title}
        placeholder="Enter post title"
      />
      <Input
        onChange={onBodyChange}
        value={body}
        placeholder="Enter post content"
        className="my-3"
      />
      <div className="d-flex justify-content-end">
        <Button onClick={onCancel} color="danger" className="me-3">Cancel</Button>
        <Button color="success" onClick={onAdd} disabled={isLoading}>Add post</Button>
      </div>
    </ModalBody>
  </Modal>
);

export default CreatePostModal;
