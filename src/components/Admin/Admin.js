import { Link } from "react-router-dom";
import { FaPlus, FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiBasket } from "react-icons/bi";
import "./Admin.scss";

const Admin = ({ userInfo, users, plants, posts, modalAction }) => {
  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const getUsersTable = () => {
    return (
      <section className="table-container">
        <h2>List of users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                user && (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td className="actions-cell">
                      <div className="actions-cell-content">
                        <Link
                          title="Delete user"
                          className="link"
                          onClick={() =>
                            modalAction("open", `delete-user/${user._id}`)
                          }
                        >
                          <MdDeleteForever className="delete-icon" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
            <tr>
              <td title="New user" colSpan={2}>
                <div className="add-btn">
                  <FaPlus
                    className="link add-icon"
                    onClick={() => modalAction("open", "signup")}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  };

  const getPlantsTable = () => {
    return (
      <section className="table-container">
        <h2>List of plants</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sale</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => {
              return (
                plant && (
                  <tr key={plant._id}>
                    <td>{toUpper(plant.commonName)} </td>
                    <td className="on-store">
                      {plant.inStore ? (
                        <BiBasket className="sale-icon" />
                      ) : null}
                    </td>
                    <td className="stock">
                      {plant.stock ? `${plant.stock}` : null}
                    </td>
                    <td className="actions-cell">
                      <div className="actions-cell-content">
                        <Link
                          title="Edit plant"
                          className="link"
                          onClick={() =>
                            modalAction("open", `edit-plant/${plant._id}`)
                          }
                        >
                          <FaPen className="edit-icon" />
                        </Link>
                        <Link
                          title="Delete plant"
                          className="link"
                          onClick={() =>
                            modalAction("open", `delete-plant/${plant._id}`)
                          }
                        >
                          <MdDeleteForever className="delete-icon" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
            <tr>
              <td title="New plant" colSpan={4}>
                <div className="add-btn">
                  <FaPlus
                    className="link add-icon"
                    onClick={() => modalAction("open", "new-plant")}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  };

  const getPostsTable = () => {
    return (
      <section className="table-container">
        <h2>List of Posts</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                post && (
                  <tr key={post._id}>
                    <td>{toUpper(post.title)}</td>
                    <td>{toUpper(post.content)}</td>
                    <td className="actions-cell">
                      <div className="actions-cell-content">
                        <Link
                          title="Edit post"
                          className="link"
                          onClick={() =>
                            modalAction("open", `edit-post/${post._id}`)
                          }
                        >
                          <FaPen className="edit-icon" />
                        </Link>
                        <Link
                          title="Delete post"
                          className="link"
                          onClick={() =>
                            modalAction("open", `delete-post/${post._id}`)
                          }
                        >
                          <MdDeleteForever className="delete-icon" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
            <tr>
              <td title="New post" colSpan={4}>
                <div className="add-btn">
                  <FaPlus
                    className="link add-icon"
                    onClick={() => modalAction("open", "new-post")}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  };

  const getAdminTables = () => {
    if (userInfo) {
      if (userInfo.admin) {
        return (
          <div className="tables-container">
            <Link
              title="Go to Stripe dashboard"
              className="button"
              to={`https://dashboard.stripe.com/test/payments?status[0]=successful`}
              target="_blank"
            >
              View transactions
            </Link>
            {getUsersTable()}
            <hr />
            {getPlantsTable()}
            <hr />
            {getPostsTable()}
          </div>
        );
      } else {
        return <h1 className="login-req">Admin user required </h1>;
      }
    } else {
      return <h1 className="login-req">Login required </h1>;
    }
  };

  return <div className="Admin">{getAdminTables()}</div>;
};

export default Admin;
