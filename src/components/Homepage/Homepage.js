import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Parallax from "../Parallax/Parallax";
import "./Homepage.scss";

const Homepage = ({ userInfo, plants }) => {
  const navigate = useNavigate();
  const [filteredPlants, setFilteredPlants] = useState([]);

  const filterPlants = useCallback(
    (event, by, type) => {
      let value;
      let filteredPlants;
      if (by === "commonName") {
        value = event.target.value.toLowerCase();
        filteredPlants = plants?.filter((plant) => plant[by].includes(value));
      } else if (by === "type") {
        filteredPlants = plants?.filter((plant) => plant.type.includes(type));
      } else {
        filteredPlants = plants;
      }
      if (userInfo?.username === "test") {
        setTimeout(() => {
          setFilteredPlants(filteredPlants);
        }, 2000);
      } else {
        setFilteredPlants(filteredPlants);
      }
    },
    [userInfo]
  );

  useEffect(() => {
    filterPlants(null);
  }, [userInfo, plants, filterPlants]);

  const navigateToDetails = (plantId) => {
    navigate(`/plant-details/${plantId}`);
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
        <div
          className="see-details"
          onClick={() => navigateToDetails(plant._id)}
        >
          <div>
            <p>See details</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {filteredPlants?.length ? (
        <div className="Homepage">
          <Parallax />
          <div className="filter">
            <div className="filter-btns">
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
              className="input search-bar"
              type="text"
              placeholder="Search plant by Common Name"
              onChange={(event) => filterPlants(event, "commonName")}
            />
          </div>
          <div className="plant-cards-container">{getPlants()}</div>
        </div>
      ) : (
        <div className="spinner">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};
export default Homepage;
