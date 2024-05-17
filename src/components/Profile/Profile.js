import { useEffect } from "react";
import { GiFlowerPot } from "react-icons/gi";
import "./Profile.scss";

const Profile = ({ userInfo, apiPostAction, modalAction, addMsg }) => {
  useEffect(() => {
    if (!userInfo) {
      modalAction("open", "login");
      addMsg("Login required");
    }
  }, [userInfo]);

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const getFavoritePlants = () => {
    const { favoritePlants } = userInfo;
    if (favoritePlants && favoritePlants.length > 0) {
      return favoritePlants.map((plant, index) => {
        return (
          <div key={index} className="Profile">
            <div className="ProfileUp">
              <div className="img">
                <img src={plant.image} alt={plant.commonName} />
              </div>
              <div className="Details">
                <h2>{toUpper(plant.commonName)}</h2>
                <h3>({toUpper(plant.botanicalName)})</h3>
                <p>
                  <b>Maintenance:</b> {toUpper(plant.maintenance)}
                </p>
                <p>
                  <b>Watering:</b> {toUpper(plant.water)}
                </p>
                <p>
                  <b>Type: </b>
                  {plant.type
                    ? plant.type.map((type) => {
                        return `${toUpper(type)} `;
                      })
                    : null}
                </p>
                <p>
                  <b>Exposure: </b>
                  {plant.exposure
                    ? plant.exposure.map((exposure) => toUpper(exposure) + " ")
                    : null}
                </p>
                <p>
                  <b>Air purifying:</b> {plant.purifying ? "Yes" : "No"}
                </p>
                <p>
                  <b>Pet/baby safe:</b> {plant.safety}
                </p>
                <button
                  className="link-btn"
                  onClick={() =>
                    apiPostAction(null, `remove-from-favorites/${plant._id}`, [
                      "user",
                    ])
                  }
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="ProfileDown">
              <h3>
                <b>About {toUpper(plant.commonName)}</b>
              </h3>
              <p>{plant.about}</p>
            </div>
          </div>
        );
      });
    }
  };

  return userInfo ? (
    <div className="Profile">
      <h1>{`${toUpper(userInfo.username)}'s profile`}</h1>
      <p className="p">
        Your favorite plants <GiFlowerPot />
      </p>

      <div>{getFavoritePlants()}</div>
    </div>
  ) : (
    <h1 className="login-req">Login required</h1>
  );
};

export default Profile;
