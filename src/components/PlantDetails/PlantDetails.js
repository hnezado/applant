import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdFavorite, MdAddShoppingCart } from "react-icons/md";
import "./PlantDetails.scss";

const PlantDetails = ({
  userInfo,
  plants,
  apiPostAction,
  modalAction,
  addMsg,
}) => {
  const { _id: plantId } = useParams();
  const [selectedPlant, setSelectedPlant] = useState();

  useEffect(() => {
    initSelectedPlant();
  }, [userInfo]);

  const initSelectedPlant = () => {
    const filteredPlant = plants?.filter((plant) => plant._id === plantId)
      .length
      ? plants?.filter((plant) => plant._id === plantId)[0]
      : [];
    if (userInfo?.username === "test") {
      setTimeout(() => {
        setSelectedPlant(filteredPlant);
      }, 2000);
    } else {
      setSelectedPlant(filteredPlant);
    }
  };

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const toggleFavorite = async () => {
    if (userInfo) {
      let url;
      const existingFavorite = userInfo.favoritePlants.filter(
        (favorite) => favorite._id === plantId
      ).length;
      if (existingFavorite) {
        url = `remove-from-favorites/${plantId}`;
      } else {
        url = `add-to-favorites/${plantId}`;
      }
      const res = await apiPostAction(null, url, ["user"]);
      addMsg(`${res.data.msg}`);
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const getFavoriteButton = () => {
    let existingFavorite;
    if (userInfo) {
      existingFavorite = userInfo.favoritePlants?.filter(
        (favorite) => favorite._id === plantId
      ).length;
    } else {
      existingFavorite = false;
    }

    let className, title;
    if (existingFavorite) {
      className = "btn favorite active";
      title = "Remove favorite";
    } else {
      className = "btn favorite inactive";
      title = "Add to favorites";
    }
    return (
      <Link className={className} title={title} onClick={toggleFavorite}>
        <MdFavorite />
      </Link>
    );
  };

  const getCartButton = () => {
    return (
      <Link
        title="View in store"
        className="link btn cart"
        to={`/store-item/${plantId}`}
      >
        <MdAddShoppingCart />
      </Link>
    );
  };

  const getTopInfo = () => {
    return (
      <div className="top-info">
        <div className="image">
          <img
            onClick={() => modalAction("open", `enlarger/${plantId}`)}
            src={selectedPlant?.image}
            alt={selectedPlant?.commonName}
          />
        </div>
        <div className="summary">
          <div className="names">
            <p className="common">{toUpper(selectedPlant.commonName)}</p>
            <p className="botanical">
              <i>({toUpper(selectedPlant.botanicalName)})</i>
            </p>
          </div>
          <div className="keys-values">
            <div className="key-value key">
              <b>Maintenance:</b>
            </div>
            <div className="key-value value">
              {toUpper(selectedPlant.maintenance)}
            </div>
            <div className="key-value key">
              <b>Watering:</b>
            </div>
            <div className="key-value value">
              {toUpper(selectedPlant.water)}
            </div>
            <div className="key-value key">
              <b>Type: </b>
            </div>
            <div className="key-value value">
              {selectedPlant.type
                ? selectedPlant.type.map((type) => {
                    return `${toUpper(type)} `;
                  })
                : null}
            </div>
            <div className="key-value key">
              <b>Exposure: </b>
            </div>
            <div className="key-value value">
              {selectedPlant.exposure
                ? selectedPlant.exposure.map(
                    (exposure) => toUpper(exposure) + " "
                  )
                : null}
            </div>
            <div className="key-value key">
              <b>Air purifying:</b>
            </div>
            <div className="key-value value">
              {selectedPlant.purifying ? "Yes" : "No"}
            </div>
            <div className="key-value key">
              <b>Pet/baby safe:</b>
            </div>
            <div className="key-value value">{selectedPlant.safety}</div>
          </div>
          <div className="btns-container">
            {getFavoriteButton()}
            {getCartButton()}
          </div>
        </div>
      </div>
    );
  };

  const getBottomDescription = () => {
    return (
      <div className="description">
        <h3>
          <b>About {toUpper(selectedPlant?.commonName)}</b>
        </h3>
        <p>{selectedPlant?.about}</p>
      </div>
    );
  };

  const getPlantCard = () => {
    if (selectedPlant)
      return (
        <div className="card">
          {getTopInfo()}
          {getBottomDescription()}
        </div>
      );
  };

  return selectedPlant && Object.keys(selectedPlant).length ? (
    <div className="PlantDetails">{getPlantCard()}</div>
  ) : (
    <div className="spinner">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default PlantDetails;
