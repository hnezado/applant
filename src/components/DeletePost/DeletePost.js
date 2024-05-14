import { useState } from "react";
import "./DeletePost.scss";

const DeletePost = ({ posts, modal, apiPostAction, modalAction, addMsg }) => {
  const [deletingPost, setDeletingPost] = useState(
    posts.filter((post) => modal.split("/")[1] === post._id)[0]
  );

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const deletePost = () => {
    apiPostAction(null, `delete-post/${deletingPost._id}`, ["posts"]);
    addMsg("Post deleted successfully");
    modalAction("close");
    setTimeout(() => {
      window.location.reload();
    }, 2200);
  };

  const getDeletePostForm = () => {
    return (
      <div className="form-container">
        <h2>Delete post</h2>
        <h3>
          Are you sure you want to delete the post{" "}
          <i>{toUpper(deletingPost.commonName)}</i>?
        </h3>
        <button className="button" onClick={deletePost}>
          DELETE
        </button>
        <button className="button" onClick={() => modalAction("close")}>
          Cancel
        </button>
      </div>
    );
  };

  return <div className="DeletePost">{getDeletePostForm()}</div>;
};

export default DeletePost;
