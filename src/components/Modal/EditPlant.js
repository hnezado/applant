import { useState } from "react";

const EditPlant = ({ plants, modal, apiPostAction, modalAction, addMsg }) => {
  const [editedPlant, setEditedPlant] = useState(
    plants.filter((plant) => modal.split("/")[1] === plant._id)[0]
  );

  const validateData = (plantData) => {
    let valid = true;
    Object.keys(plantData).forEach((key) => {
      const value = plantData[key];
      if (
        (typeof value === "string" && !value.trim()) ||
        (Array.isArray(value) && !value.length)
      ) {
        valid = false;
      }
    });
    return valid;
  };

  const editPlant = (event) => {
    event.preventDefault();
    if (validateData) {
      apiPostAction(editedPlant, `edit-plant/${editedPlant._id}`, ["plants"]);
      addMsg("Plant edited successfully");
      modalAction("close");
    } else {
      addMsg("Please fill out all fields before submitting");
    }
  };

  const swapCheckbox = (property) => {
    const editedPlantCopy = { ...editedPlant };
    editedPlantCopy[property] = !editedPlantCopy[property];
    setEditedPlant(editedPlantCopy);
  };

  const handleInput = (event) => {
    const editedPlantCopy = { ...editedPlant };
    let { name, value, checked } = event.target;
    if (name === "type") {
      editedPlantCopy[name] =
        value === "all" ? ["indoors, outdoors"] : value.split(" ");
    } else if (name === "exposure") {
      editedPlantCopy[name] =
        value === "all" ? ["low", "medium", "high"] : value.split(" ");
    } else if (name === "purifying" || name === "inStore") {
      editedPlantCopy[name] = checked;
    } else {
      editedPlantCopy[name] = value;
    }
    setEditedPlant(editedPlantCopy);
  };

  const getEditPlantForm = () => {
    return (
      <div className="modal">
        <form className="form" onSubmit={editPlant}>
          <h2>Edit plant</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Image URL</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="image"
                    value={editedPlant.image}
                  />
                </td>
              </tr>
              <tr>
                <td>Common name</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="commonName"
                    value={editedPlant.commonName}
                  />
                </td>
              </tr>
              <tr>
                <td>Botanical name</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="botanicalName"
                    value={editedPlant.botanicalName}
                  />
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="type"
                    value={editedPlant.type.join(" ")}
                  />
                </td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="maintenance"
                    value={editedPlant.maintenance}
                  />
                </td>
              </tr>
              <tr>
                <td>Water</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="water"
                    value={editedPlant.water}
                  />
                </td>
              </tr>
              <tr>
                <td>Exposure</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="exposure"
                    value={editedPlant.exposure.join(" ")}
                  />
                </td>
              </tr>
              <tr>
                <td>Safety</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="text"
                    name="safety"
                    value={editedPlant.safety}
                  />
                </td>
              </tr>
              <tr>
                <td>Purifying</td>
                <td>
                  {editedPlant.purifying ? (
                    <input
                      onClick={() => swapCheckbox("purifying")}
                      onChange={handleInput}
                      type="checkbox"
                      name="purifying"
                      checked
                    />
                  ) : (
                    <input
                      onClick={() => swapCheckbox("purifying")}
                      onChange={handleInput}
                      type="checkbox"
                      name="purifying"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>About</td>
                <td>
                  <textarea
                    className="input i-table"
                    onChange={handleInput}
                    name="about"
                    value={editedPlant.about}
                  />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="number"
                    name="price"
                    value={editedPlant.price}
                  />
                </td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>
                  <input
                    className="input i-table"
                    onChange={handleInput}
                    type="number"
                    name="stock"
                    value={editedPlant.stock}
                  />
                </td>
              </tr>
              <tr>
                <td>In Store</td>
                <td>
                  {editedPlant.inStore ? (
                    <input
                      onClick={() => swapCheckbox("inStore")}
                      onChange={handleInput}
                      type="checkbox"
                      name="inStore"
                      checked
                    />
                  ) : (
                    <input
                      onClick={() => swapCheckbox("inStore")}
                      onChange={handleInput}
                      type="checkbox"
                      name="inStore"
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btns-container">
            <button className="button edit">Edit plant</button>
            <button
              className="button pre-delete"
              onClick={() =>
                modalAction("open", `delete-plant/${editedPlant._id}`)
              }
            >
              Delete plant
            </button>
          </div>
        </form>
      </div>
    );
  };

  return <div className="EditPlant">{getEditPlantForm()}</div>;
};

export default EditPlant;
