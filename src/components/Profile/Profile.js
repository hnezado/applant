import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiFlowerPot } from "react-icons/gi";
import "./Profile.scss";

const Profile = ({ userInfo, modalAction, addMsg }) => {
  const [favoritePlants, setFavoritePlants] = useState();

  useEffect(() => {
    initFavoritePlants();
  }, [userInfo]);

  const initFavoritePlants = () => {
    if (userInfo) {
      if (userInfo.favoritePlants?.length) {
        const favoritesCopy = [...userInfo.favoritePlants];
        if (userInfo?.username === "test") {
          setTimeout(() => {
            setFavoritePlants(favoritesCopy);
          }, 2000);
        } else {
          setFavoritePlants(favoritesCopy);
        }
      }
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const getFavoritePlants = () => {
    if (favoritePlants && favoritePlants.length > 0) {
      return (
        <div className="cards-container">
          <h2 className="sub-heading">
            <GiFlowerPot /> Your favorite plants <GiFlowerPot />
          </h2>
          {favoritePlants.map((plant, index) => {
            return (
              <div key={index} className="card">
                <img src={plant.image} alt={plant.commonName} />
                <div className="names">
                  <p className="common">{toUpper(plant.commonName)}</p>
                  <p className="botanical">
                    <i>({toUpper(plant.botanicalName)})</i>
                  </p>
                </div>
                <div className="btns-container">
                  <Link className="button" to={`/plant-details/${plant._id}`}>
                    View details page
                  </Link>
                  <Link className="button" to={`/store-item/${plant._id}`}>
                    View in store
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <h2 className="sub-heading">You have not favorites</h2>;
    }
  };

  return userInfo ? (
    <>
      {favoritePlants?.length ? (
        <div className="Profile">
          <h1 className="heading">{`${toUpper(
            userInfo.username
          )}'s profile`}</h1>
          {getFavoritePlants()}
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
  ) : (
    <h1 className="login-req">Login required</h1>
  );
};

export default Profile;
