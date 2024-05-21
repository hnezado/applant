import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

const StoreItem = ({
  userInfo,
  plants,
  apiPostAction,
  modalAction,
  addMsg,
}) => {
  const [productId] = useState(useParams()._id);
  const [selectedProduct, setSelectedProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    initSelectedProduct();
  }, [userInfo]);

  const initSelectedProduct = () => {
    const filteredProduct = plants?.filter((plant) => {
      return productId === plant._id;
    }).length
      ? plants?.filter((plant) => {
          return productId === plant._id;
        })[0]
      : [];
    if (userInfo?.username === "test") {
      setTimeout(() => {
        setSelectedProduct(filteredProduct);
      }, 2000);
    } else {
      setSelectedProduct(filteredProduct);
    }
  };

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const handleInput = (event) => {
    const inputQuantity = event.target.value;
    if (userInfo) {
      if (inputQuantity) setQuantity(parseInt(inputQuantity));
    }
  };

  const addToCart = async () => {
    if (userInfo) {
      if (quantity) {
        const result = await apiPostAction(
          { quantity },
          `add-to-cart/${productId}`,
          ["user"]
        );
        addMsg(result?.data.msg);
        navigate("/store");
      } else {
        addMsg("Quantity required");
      }
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  return (
    <>
      {selectedProduct && Object.keys(selectedProduct).length ? (
        <div className="StoreItem">
          {selectedProduct && (
            <div className="item">
              <div className="item-left">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.commonName}
                />
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
                  <div className="quantity-container">
                    <input
                      className="input qty"
                      type="number"
                      placeholder="Quantity"
                      min="0"
                      name="quantity"
                      onChange={handleInput}
                    />
                    <button
                      title="Add to cart"
                      className="button add-cart"
                      onClick={addToCart}
                    >
                      <MdAddShoppingCart />
                    </button>
                  </div>
                  <Link
                    className="button details"
                    to={`/plant-details/${productId}`}
                  >
                    View details
                  </Link>
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

export default StoreItem;
