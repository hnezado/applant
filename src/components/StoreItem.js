import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const StoreItem = ({
  userInfo,
  plants,
  apiPostAction,
  modalAction,
  addMsg,
}) => {
  const [productId] = useState(useParams()._id);
  const [selectedProduct] = useState(
    plants.filter((plant) => {
      return productId === plant._id;
    })[0]
  );
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    console.log("userInfo:", userInfo);
  }, [userInfo]);

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const handleInput = (event) => {
    const inputQuantity = event.target.value;
    if (userInfo) {
      if (inputQuantity) setQuantity(parseInt(inputQuantity));
    }
  };

  const addToCart = () => {
    if (userInfo) {
      if (quantity) {
        apiPostAction({ quantity }, `add-to-cart/${productId}`, ["user"]).then(
          (result) => {
            if (result) {
              addMsg(result.data.msg);
              console.log("Adding to cart, then the Result:", result);
            }
          }
        );
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
          <div className="item-left">
            <img src={selectedProduct.image} alt={selectedProduct.commonName} />
          </div>
          <div className="item-right">
            <div className="item-info">
              <div>
                <h2>{toUpper(selectedProduct.commonName)}</h2>
                <p>
                  <i>{toUpper(selectedProduct.botanicalName)}</i>
                </p>
              </div>
              <h3 className="price">
                {selectedProduct.price.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                })}
                €
              </h3>
            </div>
            <div className="item-actions">
              <input
                className="input-form input-qty"
                type="number"
                placeholder="Quantity"
                min="0"
                name="quantity"
                onChange={handleInput}
              />
              <div className="btns-container">
                <button className="button" onClick={addToCart}>
                  Add to cart
                </button>
                <Link className="button" to={`/plant-details/${productId}`}>
                  View details
                </Link>
              </div>
            </div>
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
