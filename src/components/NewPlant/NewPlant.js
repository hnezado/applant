import { useState, useEffect } from "react";
import "./NewPlant.scss";

const NewPlant = ({ adminAction, updateState, modalAction, addMsg }) => {
  const [newPlant, setNewPlant] = useState({
    commonName: "testName",
    botanicalName: "",
    maintenance: "",
    water: "",
    type: [],
    purifying: false,
    safety: "",
    about: "",
    image: "",
    exposure: [],
    price: 0,
    stock: 0,
    inStore: true,
  });

  useEffect(() => {
    console.log("newPlant:", newPlant);
  }, [newPlant]);

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

  const createPlant = (event) => {
    event.preventDefault();
    if (validateData(newPlant)) {
      adminAction(newPlant, "new-plant");
      addMsg("New plant created successfully");
      modalAction("close");
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    } else {
      addMsg("Please fill out all fields before submitting");
    }
  };

  const handleInput = (event) => {
    const newPlantCopy = { ...newPlant };
    const { name, value, checked } = event.target;
    if (name === "type") {
      newPlantCopy[name] =
        value === "all" ? ["indoors", "outdoors"] : value.split(" ");
    } else if (name === "exposure") {
      newPlantCopy[name] =
        value === "all" ? ["low", "medium", "high"] : value.split(" ");
    } else if (name === "purifying" || name === "inStore") {
      newPlantCopy[name] = checked;
    } else {
      newPlantCopy[name] = value;
    }
    setNewPlant(newPlantCopy);
  };

  const getNewPlantForm = () => {
    return (
      <div className="PlantDetails">
        <form className="form" onSubmit={createPlant}>
          <h2>New plant</h2>
          <table>
            <tbody>
              <tr>
                <td>Image URL</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="image"
                    value={newPlant.image}
                  />
                </td>
              </tr>
              <tr>
                <td>Common name</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="commonName"
                    value={newPlant.commonName}
                  />
                </td>
              </tr>
              <tr>
                <td>Botanical name</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="botanicalName"
                    value={newPlant.botanicalName}
                  />
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="type"
                    value={newPlant.type}
                  />
                </td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="maintenance"
                    value={newPlant.maintenance}
                  />
                </td>
              </tr>
              <tr>
                <td>Water</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="water"
                    value={newPlant.water}
                  />
                </td>
              </tr>
              <tr>
                <td>Exposure</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="exposure"
                    value={newPlant.exposure}
                  />
                </td>
              </tr>
              <tr>
                <td>Safety</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="text"
                    name="safety"
                    value={newPlant.safety}
                  />
                </td>
              </tr>
              <tr>
                <td>Purifying</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="checkbox"
                    name="purifying"
                    checked={newPlant.purifying}
                  />
                </td>
              </tr>
              <tr>
                <td>About</td>
                <td>
                  <textarea
                    onChange={(event) => handleInput(event)}
                    name="about"
                    type="text"
                    value={newPlant.about}
                  />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="number"
                    name="price"
                    value={newPlant.price}
                  />
                </td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="number"
                    name="stock"
                    value={newPlant.stock}
                  />
                </td>
              </tr>
              <tr>
                <td>In store</td>
                <td>
                  <input
                    className="input-form"
                    onChange={(event) => handleInput(event)}
                    type="checkbox"
                    name="inStore"
                    checked={newPlant.inStore}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="button">Create new plant</button>
        </form>
      </div>
    );
  };

  return <div className="NewPlant">{getNewPlantForm()}</div>;
};

export default NewPlant;
