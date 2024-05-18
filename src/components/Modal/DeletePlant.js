import { useState } from "react";

const DeletePlant = ({ plants, modal, apiPostAction, modalAction, addMsg }) => {
  const [deletingPlant] = useState(
    plants.filter((plant) => modal.split("/")[1] === plant._id)[0]
  );

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const deletePlant = () => {
    apiPostAction(null, `delete-plant/${deletingPlant._id}`, ["plants"]);
    modalAction("close");
    addMsg("Plant deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2200);
  };

  const getDeletePlantForm = () => {
    return (
      <div className="modal">
        <h2>Delete plant</h2>
        <h3>
          Are you sure you want to delete the plant{" "}
          <i>{toUpper(deletingPlant.commonName)}</i>?
        </h3>
        <button className="button" onClick={() => deletePlant()}>
          DELETE
        </button>
        <button className="button" onClick={() => modalAction("close")}>
          Cancel
        </button>
      </div>
    );
  };

  return <div className="DeletePlant">{getDeletePlantForm()}</div>;
};

export default DeletePlant;