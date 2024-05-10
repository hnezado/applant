import "./Blog.scss";

const Blog = ({ userInfo, posts, modalAction }) => {
  const getPosts = () => {
    return (
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
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div className="Blog">{getPosts()}</div>;
};
export default Blog;
