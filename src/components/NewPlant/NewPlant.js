import { useState } from "react";
import "./NewPlant.scss";

const NewPlant = ({ adminAction, updateState, modalAction }) => {
  const [newPlant, setNewPlant] = useState({});

  const createPlant = (event) => {
    event.preventDefault();
    adminAction(newPlant, "new-plant");
    modalAction("close");
    window.location.reload();
  };

  const handleInput = (event) => {
    const newPlantDetails = newPlant;
    const { name, value } = event.target;
    if (name === "type") {
      newPlantDetails[name] =
        value === "all" ? ["indoors", "outdoors"] : value.split(" ");
    } else if (name === "exposure") {
      newPlantDetails[name] =
        value === "all" ? ["low", "medium", "high"] : value.split(" ");
    } else if (name === "purifying" || name === "inStore") {
      newPlantDetails[name] = value ? true : false;
    } else {
      newPlantDetails[name] = value;
    }
    setNewPlant(newPlantDetails);
  };

  const getNewPlantForm = () => {
    return (
      <div className="PlantDetails">
        <form className="form" onSubmit={(event) => createPlant(event)}>
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
