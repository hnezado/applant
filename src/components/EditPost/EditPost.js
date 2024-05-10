import { useState, useEffect } from "react";
import "./EditPost.scss";

const EditPost = ({ posts, modal, modalAction, adminAction, addMsg }) => {
  const [editingPost, setEditingPost] = useState(
    posts.filter((post) => modal.split("/")[1] === post._id)[0]
  );

  useEffect(() => {
    console.log("editingPost:", editingPost);
  }, [editingPost]);

  const validateData = (postData) => {
    let valid = true;
    Object.keys(postData).forEach((key) => {
      const value = postData[key];
      if (typeof value === "string" && !value.trim()) valid = false;
    });
    return valid;
  };

  const editPost = (event) => {
    event.preventDefault();
    if (validateData(editingPost)) {
      adminAction(editingPost, `edit-post/${editingPost._id}`);
      addMsg("Post edited successfully");
      modalAction("close");
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    } else {
      addMsg("Please fill out all fields before submitting");
    }
  };

  const handleInput = (event) => {
    const editingPostCopy = { ...editingPost };
    const { name, value } = event.target;
    editingPostCopy[name] = value;
    setEditingPost(editingPostCopy);
  };

  const getEditPostForm = () => {
    return (
      <div className="form-container">
        <form className="form" onSubmit={editPost}>
          <h2>Edit post</h2>
          <table>
            <tbody>
              <tr>
                <td>Image URL</td>
                <td>
                  <input
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="image"
                    value={editingPost.image}
                  />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="title"
                    value={editingPost.title}
                  />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="content"
                    value={editingPost.content}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button>Edit post</button>
        </form>
        <button
          onClick={() => modalAction("open", `delete-post/${editingPost._id}`)}
        >
          Delete post
        </button>
      </div>
    );
  };

  return <div className="EditPost">{getEditPostForm()}</div>;
};

export default EditPost;
