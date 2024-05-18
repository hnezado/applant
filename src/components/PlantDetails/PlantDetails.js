import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import "./PlantDetails.scss";

const PlantDetails = ({ plants, apiPostAction }) => {
  const { _id: plantId } = useParams();
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    if (plants && plants.length > 0) {
      retrievePlant();
    }
  }, [plants]);

  useEffect(() => {
    console.log("selectedPlant:", selectedPlant);
  }, [selectedPlant]);

  const retrievePlant = () => {
    const filteredPlant = plants.filter((plant) => plant._id === plantId)[0];
    setSelectedPlant(filteredPlant);
  };

  // state = {
  //   plant: {
  //     ...this.props.allPlants.filter(
  //       (plant) => this.props.match.params._id === plant._id
  //     )[0],
  //   },
  //   toLikeNotLogged: false,
  //   redirectToAdmin: false,
  // };
  const toUpper = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };
  // handleInput(event) {
  //   const { name, value } = event.target
  //   this.setState({
  //     ...this.state,
  //     plant: { ...selectedPlant, [name]: value },
  //   })
  // }
  // apiPostAction(action) {
  //   if (action === 'edit') {
  //     this.props.apiPostAction(
  //       selectedPlant,
  //       `edit-plant/${selectedPlant._id}`
  //     )
  //   } else if (action === 'delete') {
  //     this.props.apiPostAction(null, `delete-plant/${selectedPlant._id}`)
  //     this.setState({ ...this.state, redirectToAdmin: true })
  //   }
  // }
  const likeToFavorites = () => {
    //   const selectedPlantId = this.props.match.params._id
    //   if (this.props.userInfo) {
    //     this.props.addFavoritePlant(selectedPlantId)
    //   } else {
    //     this.props.modalAction('open', 'login')
    //   }
  };
  const showPlantDetails = () => {
    //   if (this.state.redirectToAdmin) {
    //     return <Redirect to="/admin" />
    //   }
    return (
      <div className="PlantDetails">
        <div className="PlantDetailsUp">
          <div className="image">
            <img src={selectedPlant.image} alt={selectedPlant.commonName} />
          </div>
          <div className="infoPlantDetails">
            <div className="buttons">
              <button className="link-btn" onClick={likeToFavorites}>
                <MdFavoriteBorder />
              </button>
              <Link to={`/store-items/${plantId}`}>
                <button className="link-btn">
                  <MdAddShoppingCart />{" "}
                </button>
              </Link>
            </div>
            <div>
              <h2>{toUpper(selectedPlant.commonName)}</h2>
              <i>
                <h3>{toUpper(selectedPlant.botanicalName)}</h3>
              </i>
              <p>
                <b>Maintenance:</b> {toUpper(selectedPlant.maintenance)}
              </p>
              <p>
                <b>Watering:</b> {toUpper(selectedPlant.water)}
              </p>
              <p>
                <b>Type:</b>{" "}
                {selectedPlant.type.map((type) => {
                  return `${toUpper(type)} `;
                })}
              </p>
              <p>
                <b>Exposure: </b>
                {selectedPlant.exposure.map((exposure) =>
                  toUpper(exposure + " ")
                )}
              </p>
              <p>
                <b>Air purifying:</b> {selectedPlant.purifying ? "Yes" : "No"}
              </p>
              <p>
                <b>Pet/baby safe:</b> {selectedPlant.safety}
              </p>
            </div>
          </div>
        </div>
        <div className="About">
          <h3>
            <b>About {toUpper(selectedPlant.commonName)}</b>
          </h3>
          <p>{selectedPlant.about}</p>
        </div>
      </div>
    );
  };

  return selectedPlant ? (
    <div className="PlantDetails">{showPlantDetails()}</div>
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
