import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Store.scss";

const Store = ({ userInfo, plants }) => {
  const [filteredStoreItems, setFilteredStoreItems] = useState([]);

  useEffect(() => {
    initFilteredItems();
  }, [userInfo]);

  const initFilteredItems = () => {
    const filteredItems = plants?.filter((plant) => plant.inStore);
    if (userInfo?.username === "test") {
      setTimeout(() => {
        setFilteredStoreItems(filteredItems);
      }, 2000);
    } else {
      setFilteredStoreItems(filteredItems);
    }
  };

  const filterStoreItems = (event, by, type) => {
    const itemsInStock = plants.filter((plant) => plant.inStore);
    let filteredItems, value;
    if (by === "commonName") {
      value = event.target.value.toLowerCase();
      filteredItems = itemsInStock.filter((plant) => plant[by].includes(value));
    } else if (by === "type") {
      filteredItems = itemsInStock.filter((plant) => plant[by].includes(type));
    } else {
      filteredItems = itemsInStock;
    }
    setFilteredStoreItems(filteredItems);
  };

  const getFilter = () => {
    return (
      <div className="filter">
        <div className="filter-btns">
          <button className="button" onClick={() => filterStoreItems()}>
            All
          </button>
          <button
            className="button"
            onClick={() => filterStoreItems(null, "type", "indoors")}
          >
            Indoors
          </button>
          <button
            className="button"
            onClick={() => filterStoreItems(null, "type", "outdoors")}
          >
            Outdoors
          </button>
        </div>
        <input
          className="input search-bar"
          type="text"
          placeholder="Search plant"
          onChange={(event) => filterStoreItems(event, "commonName")}
        />
      </div>
    );
  };

  const getStoreItems = () => {
    return filteredStoreItems.map((plant, index) => {
      return (
        <div key={index} className="plant-card">
          <Link className="link" to={`/store-item/${plant._id}`}>
            <img src={plant.image} alt={plant.commonName} />
          </Link>
          <h2>
            {plant.commonName[0].toUpperCase() + plant.commonName.slice(1)}
          </h2>
          <h3>
            (
            {plant.botanicalName[0].toUpperCase() +
              plant.botanicalName.slice(1)}
            )
          </h3>
          <p>
            <b>PVP</b> {formatPrice(plant.price)}€
          </p>
        </div>
      );
    });
  };

  const formatPrice = (value) => {
    return value.toLocaleString("es-ES", { minimumFractionDigits: 2 });
  };

  return (
    <>
      {filteredStoreItems?.length ? (
        <div className="Store">
          {getFilter()}
          <div className="plant-cards-container">{getStoreItems()}</div>
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
export default Store;
