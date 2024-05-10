import { Link } from "react-router-dom";
import { BiBasket } from "react-icons/bi";
import "./Admin.scss";

const Admin = ({
  addMsg,
  modalAction,
  userInfo,
  adminAction,
  users,
  plants,
  posts,
}) => {
  // state = {
  //   user: {
  //     _id: "",
  //     username: "",
  //     password: "",
  //     admin: false,
  //     favoritePlants: [],
  //     cart: [],
  //     totalPrice: 0,
  //   },
  //   newPlant: {
  //     commonName: "",
  //     botanicalName: "",
  //     type: [],
  //     maintenance: [],
  //     water: [],
  //     exposure: [],
  //     safety: "",
  //     purifying: false,
  //     about: "",
  //     price: 0,
  //     stock: 0,
  //     inStore: false,
  //   },
  //   newPost: {},
  //   adminPermissions: false,
  // };

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const showUsers = () => {
    return (
      <div className="form-container">
        <h2>List of users</h2>
        <button
          className="button"
          onClick={() => modalAction("open", "signup")}
        >
          New user
        </button>
        <table>
          <tbody>
            <th>Username</th>
            <th>Actions</th>
            {users.map((user, index) => {
              return (
                user && (
                  <tr>
                    <td>{user.username}</td>
                    <td>
                      <Link
                        className="link"
                        onClick={() =>
                          modalAction("open", `delete-user/${user._id}`)
                        }
                      >
                        <img src="/icons/delete-icon.png" alt="delete-icon" />
                      </Link>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const showPlants = () => {
    return (
      <div className="form-container">
        <h2>List of plants</h2>
        <button
          className="button"
          onClick={() => modalAction("open", "new-plant")}
        >
          New plant
        </button>
        <table>
          <tbody>
            <th>Name</th>
            <th>Stock</th>
            <th>Actions</th>
            {plants.map((plant, index) => {
              return (
                plant && (
                  <tr>
                    <td>{toUpper(plant.commonName)} </td>
                    <td className="stock">
                      {plant.inStore ? <BiBasket /> : null}
                      {plant.inStore ? ` (${plant.stock} uds)` : null}
                    </td>
                    <td className="actions-cell">
                      <Link
                        className="link"
                        onClick={() =>
                          modalAction("open", `edit-plant/${plant._id}`)
                        }
                      >
                        <img src="/icons/edit-icon.png" alt="edit-icon" />
                      </Link>
                      <Link
                        className="link"
                        onClick={() =>
                          modalAction("open", `delete-plant/${plant._id}`)
                        }
                      >
                        <img src="/icons/delete-icon.png" alt="delete-icon" />
                      </Link>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const showPosts = () => {
    return (
      <div className="form-container">
        <h2>List of Posts</h2>
        <button
          className="button"
          onClick={() => modalAction("open", "new-post")}
        >
          New post
        </button>
        <table>
          <tbody>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
            {posts.map((post, index) => {
              return (
                post && (
                  <tr>
                    <td>{toUpper(post.title)}</td>
                    <td>{toUpper(post.content)}</td>
                    <td>
                      <Link
                        className="link"
                        onClick={() =>
                          modalAction("open", `edit-post/${post._id}`)
                        }
                      >
                        <img src="/icons/edit-icon.png" alt="edit-icon" />
                      </Link>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const showAdminForms = () => {
    if (userInfo) {
      if (userInfo.admin) {
        return (
          <div className="forms-container">
            <Link
              className="button"
              to={`https://dashboard.stripe.com/test/payments`}
              target="_blank"
            >
              Stripe dashboard
            </Link>
            <hr />
            {showUsers()}
            <hr />
            {showPlants()}
            <hr />
            {showPosts()}
          </div>
        );
      } else {
        return <h1>Admin user required </h1>;
      }
    } else {
      return <h1>Login required </h1>;
    }
  };

  return <div className="Admin">{showAdminForms()}</div>;
};

// (<a className="link" href={`https://dashboard.stripe.com/test/payments`}>Stripe dashboard</a>
export default Admin;
