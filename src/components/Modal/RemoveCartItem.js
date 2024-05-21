import { useState } from "react";

const RemoveCartItem = ({
  plants,
  modal,
  apiPostAction,
  modalAction,
  addMsg,
}) => {
  const plantId = modal.split("/")[1];
  const [favoritePlant] = useState(
    plants.filter((plant) => plantId === plant._id)[0]
  );

  const removeItem = async () => {
    try {
      const result = await apiPostAction(null, `remove-from-cart/${plantId}`, [
        "user",
      ]);
      modalAction("close");
      addMsg(result.data.msg);
    } catch (err) {
      addMsg("Error removing item from cart");
    }
  };

  const getRemoveCartItemForm = () => {
    return (
      <div className="modal">
        <h2>Delete user</h2>
        <h3>
          Are you sure you want to remove{" "}
          <u>
            <i>{favoritePlant.commonName}</i>
          </u>{" "}
          from the cart?
        </h3>
        <div className="btns-container">
          <button className="button delete" onClick={removeItem}>
            DELETE
          </button>
          <button className="button" onClick={() => modalAction("close")}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return <div className="RemoveCartItem">{getRemoveCartItemForm()}</div>;
};

export default RemoveCartItem;
