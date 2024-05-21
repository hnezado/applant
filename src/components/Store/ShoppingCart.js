import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPen, FaCheck } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const ShoppingCart = ({ userInfo, apiPostAction, modalAction, addMsg }) => {
  const [cartItems, setCartItems] = useState([]);
  const [lastQty, setLastQty] = useState(null);

  useEffect(() => {
    initCartItems();
  }, [userInfo]);

  const initCartItems = () => {
    if (userInfo) {
      if (userInfo.cart?.length) {
        const cartItemsCopy = [...userInfo.cart];
        for (let i = 0; i < cartItemsCopy.length; i++) {
          cartItemsCopy[i].editQuantity = false;
        }
        if (userInfo?.username === "test") {
          setTimeout(() => {
            setCartItems(cartItemsCopy);
          }, 2000);
        } else {
          setCartItems(cartItemsCopy);
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

  const toggleEdit = async (index, mode) => {
    if (userInfo) {
      const cartItemsCopy = [...cartItems];
      cartItemsCopy[index].editQuantity = mode;
      if (mode) {
        setLastQty(cartItemsCopy[index].quantity);
      } else {
        if (lastQty !== cartItemsCopy[index].quantity) {
          const result = await apiPostAction(
            { quantity: cartItemsCopy[index].quantity },
            `edit-quantity/${cartItemsCopy[index].product._id}`,
            ["user", "users"]
          );
          addMsg(result?.data.msg);
        }
      }
      setCartItems(cartItemsCopy);
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const handleInput = (event, index) => {
    if (userInfo) {
      const { name, value } = event.target;
      const cartItemsCopy = [...cartItems];
      cartItemsCopy[index][name] = value;
      setCartItems(cartItemsCopy);
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const formatPrice = (value) => {
    return value.toLocaleString("es-ES", { minimumFractionDigits: 2 });
  };

  const removeFromCart = async (productId) => {
    if (userInfo) {
      modalAction("open", `remove-cart-item/${productId}`);
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const getCartItems = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index} className="cart-item">
          <Link to={`/plant-details/${item.product._id}`}>
            <img
              title={toUpper(
                `View ${toUpper(item.product.botanicalName)}'s details`
              )}
              src={item.product.image}
              alt={item.product.commonName}
            />
          </Link>
          <div className="table-div">
            <div className="t-head-row">
              <div className="t-head-col name">Product name</div>
              <div className="t-head-col qty">Quantity</div>
              <div className="t-head-col price">Unit price</div>
              <div className="t-head-col total">Total price</div>
            </div>
            <div className="t-row">
              <div className="t-col name">
                {toUpper(item.product.commonName)}
              </div>
              <div className="t-col qty">
                {item.editQuantity ? (
                  <div className="qty-content">
                    <div
                      className="link"
                      title="Update quantity"
                      onClick={() => toggleEdit(index, false)}
                    >
                      <FaCheck />
                    </div>
                    <input
                      className="input qty"
                      onChange={(event) => handleInput(event, index)}
                      type="number"
                      name="quantity"
                      value={item.quantity}
                    />
                  </div>
                ) : (
                  <div className="qty-content">
                    <div
                      className="link"
                      title="Edit quantity"
                      onClick={() => toggleEdit(index, true)}
                    >
                      <FaPen />
                    </div>
                    {item.quantity}
                  </div>
                )}
              </div>
              <div className="t-col price">
                {formatPrice(item.product.price)}€
              </div>
              <div className="t-col total">
                {formatPrice(item.quantity * item.product.price)}€
              </div>
            </div>
          </div>
          <div onClick={() => removeFromCart(item.product._id)}>
            <RiDeleteBinLine
              title="Delete item from cart"
              className="link delete"
            />
          </div>
        </div>
      );
    });
  };

  const getTotalPrice = () => {
    if (userInfo) {
      return userInfo.cart.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    }
  };

  const getShoppingCart = () => {
    if (cartItems) {
      if (cartItems.length) {
        return (
          <div>
            <h1>My shopping cart</h1>
            <div className="cart-items">{getCartItems()}</div>
            <div className="total-price">
              <p>
                <b>Total: </b> {formatPrice(getTotalPrice())} €
              </p>
              <button
                className="button"
                onClick={() => {
                  modalAction("open", "payment");
                }}
              >
                Check out
              </button>
            </div>
          </div>
        );
      } else {
        return <h1>Your cart it's empty </h1>;
      }
    } else {
      return <h1 className="login-req">Login required</h1>;
    }
  };

  return (
    <>
      {cartItems && cartItems.length ? (
        <div className="ShoppingCart">{getShoppingCart()}</div>
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

export default ShoppingCart;
