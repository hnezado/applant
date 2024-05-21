import { useState } from "react";

const EditPost = ({ posts, modal, apiPostAction, modalAction, addMsg }) => {
  const [editingPost, setEditingPost] = useState(
    posts.filter((post) => modal.split("/")[1] === post._id)[0]
  );

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
      apiPostAction(editingPost, `edit-post/${editingPost._id}`, ["posts"]);
      addMsg("Post edited successfully");
      modalAction("close");
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
      <div className="modal">
        <form className="form" onSubmit={editPost}>
          <h2>Edit post</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Image URL</td>
                <td>
                  <input
                    className="input i-table"
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
                    className="input i-table"
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
                    className="input i-table"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="content"
                    value={editingPost.content}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btns-container">
            <button className="button edit">Edit post</button>
            <button
              className="button pre-delete"
              onClick={() =>
                modalAction("open", `delete-post/${editingPost._id}`)
              }
            >
              Delete post
            </button>
          </div>
        </form>
      </div>
    );
  };

  return <div className="EditPost">{getEditPostForm()}</div>;
};

export default EditPost;
