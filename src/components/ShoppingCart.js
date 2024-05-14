import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const ShoppingCart = ({ userInfo }) => {
  const [cart, setCart] = useState(userInfo.cart);

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const getCartItems = () => {
    if (cart && cart.length) {
      return cart.map((item, index) => {
        return (
          <div key={index} className="allItemsCart">
            <img src={item.plant.image} alt={item.plant.commonName} />
            <div className="infoItemCart">
              <b>
                <p>{this.toUpper(item.plant.commonName)}</p>
              </b>
              <p>
                <b>Qty:</b> {item.quantity}
              </p>
              <p>
                <b>Price:</b> {item.plant.price}€
              </p>
              <p>
                <b>Total: </b>
                {item.quantity * item.plant.price}€
              </p>
              <button onClick={() => this.props.deleteFromCart(item.plant._id)}>
                <RiDeleteBinLine className="removeIcon" />
              </button>
            </div>
          </div>
        );
      });
    }
  };

  return userInfo ? (
    userInfo.cart.length ? (
      <div className="cart">
        <h1>Cart</h1>
        <div className="ShoppingCart">
          <div className="ItemsCart">{this.getCartItems()}</div>
          <div className="total-price">
            <p>
              <b>Total: </b> {this.props.userInfo.totalPrice} €
            </p>
            <button
              onClick={() => {
                this.props.modalAction("open", "payment");
              }}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    ) : (
      <h1>Your cart it's empty </h1>
    )
  ) : (
    <h1>Login required </h1>
  );
};

export default ShoppingCart;
