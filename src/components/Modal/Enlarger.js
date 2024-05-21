import { useState, useEffect } from "react";

const Enlarger = ({ plants, modal }) => {
  const [selectedPlant, setSelectedPlant] = useState();

  useEffect(() => {
    const filteredPlant = plants.filter(
      (plant) => modal.split("/")[1] === plant._id
    );
    setSelectedPlant(filteredPlant.length ? filteredPlant[0] : null);
  }, [plants, modal]);

  const getEnlarger = () => {
    if (selectedPlant)
      return (
        <div className="img-container">
          <img src={selectedPlant.image} alt={selectedPlant.commonName} />
        </div>
      );
  };

  return <div className="Enlarger">{getEnlarger()}</div>;
};

export default Enlarger;
