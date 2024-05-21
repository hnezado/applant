import { useState } from "react";

const NewPost = ({ apiPostAction, modalAction, addMsg }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    content: "",
  });

  const validateData = (postData) => {
    let valid = true;
    Object.keys(postData).forEach((key) => {
      const value = postData[key];
      if (typeof value === "string" && !value.trim()) valid = false;
    });
    return valid;
  };

  const createPost = (event) => {
    event.preventDefault();
    if (validateData(newPost)) {
      apiPostAction(newPost, "new-post", ["posts"]);
      addMsg("New post created successfully");
      modalAction("close");
    } else {
      addMsg("Please fill out all fields before submitting");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newPostCopy = { ...newPost };
    newPostCopy[name] = value;
    setNewPost(newPostCopy);
  };

  const getNewPostForm = () => {
    return (
      <div className="modal">
        <form className="form" onSubmit={createPost}>
          <h2>New post</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Title</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="title"
                    placeholder="Post title"
                  />
                </td>
              </tr>
              <tr>
                <td>Image URL</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="image"
                    placeholder="Image URL"
                  />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td colSpan="2">
                  <textarea
                    className="input i-table"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="content"
                    placeholder="Post content"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="button">Create new post</button>
        </form>
      </div>
    );
  };

  return <div className="NewPost">{getNewPostForm()}</div>;
};

export default NewPost;
