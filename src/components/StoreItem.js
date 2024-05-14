import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";

const StoreItem = ({
  userInfo,
  plants,
  apiPostAction,
  modalAction,
  addMsg,
}) => {
  const [productId, setProductId] = useState(useParams()._id);
  const [selectedProduct, setSelectedProduct] = useState(
    plants.filter((plant) => {
      return productId === plant._id;
    })[0]
  );
  const [quantity, setQuantity] = useState(0);

  // state = {
  //   selectedPlantId: [],
  //   quantity: 0,
  //   totalPrice: 0,
  //   toCartLoggedStatus: undefined,
  // }

  useEffect(() => {
    console.log("userInfo:", userInfo);
  }, [userInfo]);

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const handleInput = (event) => {
    const inputQuantity = event.target.value;
    if (userInfo) {
      if (inputQuantity) setQuantity(inputQuantity);
    }
  };

  const addToCart = () => {
    if (userInfo) {
      if (quantity) {
        apiPostAction({ user: userInfo, productId, quantity }, "add-to-cart", [
          "user",
        ]).then((result) => {
          addMsg(result.message);
        });
        // .catch((err) => {
        //   console.warn(err);
        // });
      } else {
        addMsg("Quantity required");
      }
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  return (
    <div className="StoreItem">
      {selectedProduct && (
        <div className="item">
          {/* filtro para asegurarse de que selectedProduct tiene datos y no es undefined */}
          <img src={selectedProduct.image} alt={selectedProduct.commonName} />
          <div className="item-info">
            <h2>{toUpper(selectedProduct.commonName)}</h2>
            <p>
              <i>{toUpper(selectedProduct.botanicalName)}</i>
            </p>
            <strong>
              <h3>
                {selectedProduct.price.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                })}
                €
              </h3>
            </strong>
            <input
              className="input"
              type="number"
              placeholder="Quantity"
              min="0"
              name="quantity"
              onChange={handleInput}
            />
            <button className="button" onClick={addToCart}>
              Add to cart
            </button>
            <Link className="button" to={`/plant-details/${productId}`}>
              View details
            </Link>
          </div>
        </div>
      )}
      {/* {this.state.toCartLoggedStatus === "not logged"
        ? this.props.modalAction("open", "login")
        : null}
      {this.state.toCartLoggedStatus === "logged" ? (
        <Redirect to="/shopping-cart" />
      ) : null} */}
    </div>
  );
};

export default StoreItem;
