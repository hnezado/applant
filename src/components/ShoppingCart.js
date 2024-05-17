// import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const ShoppingCart = ({ userInfo, apiPostAction, modalAction, addMsg }) => {
  // const []

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const deleteFromCart = () => {};

  const getTotalPrice = () => {
    if (userInfo) {
      return userInfo.cart.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    }
  };

  const getCartItems = () => {
    if (userInfo) {
      return userInfo.cart.map((item, index) => {
        return (
          <div key={index} className="allItemsCart">
            <img src={item.product.image} alt={item.product.commonName} />
            <div className="infoItemCart">
              <b>
                <p>{toUpper(item.product.commonName)}</p>
              </b>
              <p>
                <b>Qty:</b> {item.quantity}
              </p>
              <p>
                <b>Price:</b> {item.product.price}€
              </p>
              <p>
                <b>Total: </b>
                {item.quantity * item.product.price}€
              </p>
              <button onClick={() => deleteFromCart(item.product._id)}>
                <RiDeleteBinLine className="removeIcon" />
              </button>
            </div>
          </div>
        );
      });
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  // return <div className="ShoppingCart"></div>;

  return (
    <div className="ShoppingCart">
      {userInfo &&
        userInfo.cart &&
        Array.isArray(userInfo.cart) &&
        (userInfo.cart.length ? (
          <div className="cart">
            <h1>Cart</h1>
            <div className="ShoppingCart">
              <div className="ItemsCart">{getCartItems()}</div>
              <div className="total-price">
                <p>
                  <b>Total: </b> {getTotalPrice()} €
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
          </div>
        ) : (
          <h1>Your cart it's empty </h1>
        ))}
    </div>
    // ) : (
    //   <h1>Login required </h1>
  );
};

export default ShoppingCart;
