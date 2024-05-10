import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";

import Parallax from "../Parallax/Parallax";

const Homepage = ({ allPlants }) => {
  const [filteredPlants, setFilteredPlants] = useState([...allPlants]);

  useEffect(() => {
    setFilteredPlants(allPlants);
  }, [allPlants]);

  const filterPlants = (event, by, type) => {
    let value;
    let filteredPlants;
    if (by === "commonName") {
      value = event.target.value.toLowerCase();
      filteredPlants = allPlants.filter((plant) => plant[by].includes(value));
    } else if (by === "type") {
      filteredPlants = allPlants.filter((plant) => plant.type.includes(type));
    } else {
      filteredPlants = allPlants;
    }
    setFilteredPlants(filteredPlants);
  };

  const getPlants = () => {
    return filteredPlants.map((plant, index) => (
      <div key={index} className="plant-card">
        <Link className="link" to={`/plant-details/${plant._id}`}>
          <img src={plant.image} alt={plant.commonName} />
        </Link>
        <h2>{plant.commonName[0].toUpperCase() + plant.commonName.slice(1)}</h2>
        <h3>
          ({plant.botanicalName[0].toUpperCase() + plant.botanicalName.slice(1)}
          )
        </h3>
        <Link className="see-details" to={`/plant-details/${plant._id}`}>
          <div>
            <p>See details</p>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="Homepage">
      <Parallax />
      <div className="filter-buttons">
        <button className="button" onClick={() => filterPlants()}>
          All
        </button>
        <button
          className="button"
          onClick={() => filterPlants(null, "type", "indoors")}
        >
          Indoors
        </button>
        <button
          className="button"
          onClick={() => filterPlants(null, "type", "outdoors")}
        >
          Outdoors
        </button>
      </div>
      <input
        className="inputSearchPlant"
        type="text"
        placeholder="Search plant by name"
        onChange={(event) => filterPlants(event, "commonName")}
      />
      <div className="plant-cards-container">{getPlants()}</div>
    </div>
  );
};
export default Homepage;
