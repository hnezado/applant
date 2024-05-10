import { useState, useEffect } from "react";
import "./NewPost.scss";

const NewPost = ({ modalAction, adminAction, addMsg }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    // console.log("newPost:", newPost);
  }, [newPost]);

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
      adminAction(newPost, "new-post");
      addMsg("New post created successfully");
      modalAction("close");
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    } else {
      addMsg("Please fill out all fields before submitting");
    }
  };

  // handleSubmit(event, data, url) {
  //   event.preventDefault()
  //   axios({
  //     method: 'post',
  //     url: `${process.env.REACT_APP_URL}/app/${url}`,
  //     data: data,
  //     withCredentials: true,
  //   })
  //     .then((result) => {
  //       this.props.addMsg(result.data.data.message)
  //       this.props.updateState('posts')
  //       this.props.modalAction('close')
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const handleInput = (event) => {
    console.log("handling input!!!!!!!!");
    const { name, value } = event.target;
    const newPostCopy = { ...newPost };
    newPostCopy[name] = value;
    setNewPost(newPostCopy);
  };

  const getNewPostForm = () => {
    return (
      <div className="form-container">
        <form
          className="form"
          onSubmit={createPost}
          // onSubmit={(ev) => handleSubmit(ev, this.state.newPost, 'new-post')}
        >
          <h2>New post</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    onChange={handleInput}
                    type="text"
                    name="title"
                    placeholder="Post title"
                  />
                </td>
                <td>
                  <input
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="image"
                    placeholder="Image URL"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <textarea
                    id="new-post-textarea"
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
