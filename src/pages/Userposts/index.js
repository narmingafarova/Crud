import axios from "axios";
import { BASE_URL } from "../../consts";
import { Col, Row, ListGroup, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageContentWrapper from "../../components/PageContentWrapper";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserPost from "../../components/UserPost";
import CreatePostModal from "../../components/Modals/CreatePostModal";
import EditPostModal from "../../components/Modals/EditPostModal";

const UserPostsPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState();
  const [error, setError] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newPostDetails, setNewPostDetails] = useState({ title: "", body: "" });
  const [isAddPostLoading, setAddPosstLoading] = useState(false);
  const [editingPostId, setEditingPostId] = useState();
  const [isEditPostLoading, setEditPostLoading] = useState(false);

  const getPosts = useCallback(() => {
    setPosts(null);
    axios
      .get(`${BASE_URL}/posts?userId=${id}`)
      .then((res) => {
        setPosts(res.data);
        setError("");
      })
      .catch(() => {
        setError("Unable to get posts of users :(");
      });
  }, [id]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleAddClick = useCallback(() => {
    setAddModalOpen(true);
  }, []);

  const handleAddModalToggle = useCallback(() => {
    setAddModalOpen((prevState) => !prevState);
  }, []);

  const handleNewModalDetailsChange = useCallback((event, fieldName) => {
    setNewPostDetails((prevValue) => ({
      ...prevValue,
      [fieldName]: event.target.value,
    }));
  }, []);

  const handleAddPost = useCallback(() => {
    setAddPosstLoading(true);
    axios
      .get(`${BASE_URL}/posts`, {
        ...newPostDetails,
        userId: id,
      })
      .then(() => {
        alert("Post has been added successfully :)");
        handleAddModalToggle();
        getPosts();
      })
      .catch(() => {
        alert("Unwxpected error occured");
      })
      .finally(() => {
        setAddPosstLoading(false);
      });
  }, [id, newPostDetails, getPosts, handleAddModalToggle]);

  const handlePostEditClick = useCallback((id) => {
    setEditingPostId(id);
  }, []);

  const handlePostDelete = useCallback((id) => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        axios.delete(`${BASE_URL}/posts/${id}`)
          .then(() => {
            alert("Post deleted successfully");
            getPosts();
          })
          .catch(() => {
            alert("Unexpected error occured");
          });
      }
    }, [getPosts]);

  const handlePostEdit = useCallback(
    (postData) => {
      setEditPostLoading(true);
      axios
        .put(`${BASE_URL}/posts/${postData.id}`)
        .then(() => {
          alert("Post edited successfully");
          setEditingPostId(null);
          getPosts();
        })
        .catch(() => {
          alert("Failed to update post data");
        })
        .finally(() => {
          setEditPostLoading(false);
        });
    },
    [getPosts]
  );

  const renderEditPostModal = useCallback(() => {
    if (Boolean(editingPostId)) {
      return (
        <EditPostModal
          isLoading={isEditPostLoading}
          onEdit={handlePostEdit}
          postId={editingPostId}
          isOpen={Boolean(editingPostId)}
          onToggle={() => setEditingPostId(null)}
        />
      );
    } else {
      return null;
    }
  }, [editingPostId, handlePostEdit, isEditPostLoading]);

  return (
    <PageContentWrapper>
      <Row>
        <Col xs={12} className="d-flex justify-content-between align-items-center" >
          <Link to="/users" className="link-dark d-inline-block">
            <h5 className="mt-3">Go back</h5>
          </Link>
          <Button onClick={handleAddClick} color="success">Add</Button>
        </Col>
        <Col xs={12}>
          {posts?.length > 1 && (
            <ListGroup className="mt-3">
              {posts?.map(({ id, title, body }) => (
                <UserPost
                  onDelete={() => handlePostDelete(id)}
                  onEdit={() => handlePostEditClick(id)}
                  key={id}
                  body={body}
                  title={title}
                />
              ))}
            </ListGroup>
          )}
          {posts?.length === 0 && (
            <h6 className="text-warning mt-3">No posts found!</h6>
          )}
          {!Boolean(error) && !Boolean(posts) && <LoadingSpinner />}
        </Col>
      </Row>
      <CreatePostModal
        title={newPostDetails.title}
        body={newPostDetails.body}
        onTitleChange={(e) => handleNewModalDetailsChange(e, "title")}
        onBodyChange={(e) => handleNewModalDetailsChange(e, "body")}
        isOpen={isAddModalOpen}
        onToggle={handleAddModalToggle}
        onCancel={handleAddModalToggle}
        onAdd={handleAddPost}
        isLoading={isAddPostLoading}
      />
      {renderEditPostModal()}
    </PageContentWrapper>
  );
};

export default UserPostsPage;
