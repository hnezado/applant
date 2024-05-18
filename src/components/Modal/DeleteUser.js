const DeleteUser = ({ users, modal, apiPostAction, modalAction }) => {
  const user = users.filter((user) => {
    return modal.split("/")[1] === user._id;
  })[0];

  const deleteUser = () => {
    apiPostAction(null, `delete-user/${user._id}`, ["users"]);
    modalAction("close");
    window.location.reload();
  };

  const getDeleteUserForm = () => {
    return (
      <div className="modal">
        <h2>Delete user</h2>
        <h3>
          Are you sure you want to delete the user <i>{user.username}</i>?
        </h3>
        <button className="button" onClick={() => deleteUser()}>
          DELETE
        </button>
        <button className="button" onClick={() => modalAction("close")}>
          Cancel
        </button>
      </div>
    );
  };

  return <div className="DeleteUser">{getDeleteUserForm()}</div>;
};

export default DeleteUser;
