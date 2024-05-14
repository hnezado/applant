import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import "./Blog.scss";

const Blog = ({ userInfo, posts, apiPostAction, modalAction, addMsg }) => {
  const toggleLike = (post) => {
    const postCopy = { ...post };
    if (userInfo) {
      if (!postCopy.likes.includes(userInfo._id)) {
        postCopy.likes.push(userInfo._id);
      } else {
        postCopy.likes = postCopy.likes.filter((like) => like !== userInfo._id);
      }
      apiPostAction(postCopy, `add-like/${postCopy._id}`, ["posts"]);
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const getLikes = (post) => {
    return <span title="Total likes">{post.likes.length}</span>;
  };

  const getLikeButton = (post) => {
    let liked;
    if (userInfo) {
      liked = post.likes.includes(userInfo._id);
    } else {
      liked = false;
    }

    let className, title;
    if (liked) {
      className = "like-btn active";
      title = "Remove like";
    } else {
      className = "like-btn inactive";
      title = "I like it!";
    }
    return (
      <Link
        className={className}
        title={title}
        onClick={() => toggleLike(post)}
      >
        <BiSolidLike />
      </Link>
    );
  };

  return (
    <div className="Blog">
      <div className="post-container">
        {userInfo ? (
          userInfo.admin ? (
            <div>
              <button
                className="button"
                onClick={() => modalAction("open", "new-post")}
              >
                New post
              </button>
            </div>
          ) : null
        ) : null}
        {[...posts].reverse().map((post) => (
          <div className="post" key={post._id}>
            <div>
              <img src={post.image} alt="post-img" />
            </div>
            <div className="post-content">
              <div className="post-text">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="like-container">
                {getLikes(post)}
                {getLikeButton(post)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;
