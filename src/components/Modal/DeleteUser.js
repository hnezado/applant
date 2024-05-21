const DeleteUser = ({ users, modal, apiPostAction, modalAction }) => {
  const user = users.filter((user) => {
    return modal.split("/")[1] === user._id;
  })[0];

  const deleteUser = () => {
    apiPostAction(null, `delete-user/${user._id}`, ["users"]);
    modalAction("close");
  };

  const getDeleteUserForm = () => {
    return (
      <div className="modal">
        <h2>Delete user</h2>
        <h3>
          Are you sure you want to delete{" "}
          <u>
            <i>{user?.username}</i>
          </u>
          ?
        </h3>
        <div className="btns-container">
          <button className="button delete" onClick={() => deleteUser()}>
            DELETE
          </button>
          <button className="button" onClick={() => modalAction("close")}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return <div className="DeleteUser">{getDeleteUserForm()}</div>;
};

export default DeleteUser;
