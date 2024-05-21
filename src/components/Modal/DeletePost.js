import { useState } from "react";

const DeletePost = ({ posts, modal, apiPostAction, modalAction, addMsg }) => {
  const [deletingPost] = useState(
    posts.filter((post) => modal.split("/")[1] === post._id)[0]
  );

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const deletePost = () => {
    apiPostAction(null, `delete-post/${deletingPost._id}`, ["posts"]);
    addMsg("Post deleted successfully");
    modalAction("close");
  };

  const getDeletePostForm = () => {
    return (
      <div className="modal">
        <h2>Delete post</h2>
        <h3>
          Are you sure you want to delete{" "}
          <u>
            <i>{toUpper(deletingPost.title)}</i>
          </u>
          ?
        </h3>
        <div className="btns-container">
          <button className="button delete" onClick={deletePost}>
            DELETE
          </button>
          <button className="button" onClick={() => modalAction("close")}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return <div className="DeletePost">{getDeletePostForm()}</div>;
};

export default DeletePost;
