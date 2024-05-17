import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPen, FaCheck } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const ShoppingCart = ({ userInfo, apiPostAction, modalAction, addMsg }) => {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    if (!userInfo) {
      modalAction("open", "login");
      addMsg("Login required");
    } else {
      setEditQty();
    }
  }, [userInfo]);

  const setEditQty = () => {
    if (userInfo && Object.keys(userInfo).length) {
      const cartCopy = [...userInfo.cart];
      for (let i = 0; i < cartCopy.length; i++) {
        cartCopy[i].editQuantity = false;
      }
      setCartItems(cartCopy);
    }
  };

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
  };

  const toggleEdit = async (index, mode) => {
    if (userInfo) {
      const cartItemsCopy = [...cartItems];
      cartItemsCopy[index].editQuantity = mode;
      if (mode === false) {
        const result = await apiPostAction(
          { quantity: cartItemsCopy[index].quantity },
          `edit-quantity/${cartItemsCopy[index].product._id}`,
          ["user", "users"]
        );
        addMsg(result.data.msg);
      }
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

  const removeFromCart = async (productId) => {
    if (userInfo) {
      try {
        const result = await apiPostAction(
          null,
          `remove-from-cart/${productId}`,
          ["user"]
        );
        addMsg(result.data.msg);
      } catch (err) {
        addMsg("Error removing item from cart");
      }
    } else {
      modalAction("open", "login");
      addMsg("Login required");
    }
  };

  const getTotalPrice = () => {
    if (userInfo) {
      return userInfo.cart.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    }
  };

  const getCartItems = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index} className="allItemsCart">
          <img
            title={toUpper(item.product.botanicalName)}
            src={item.product.image}
            alt={item.product.commonName}
          />
          <div className="infoItemCart">
            <table className="table-cart">
              <th>Product name</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Total price</th>
              <tr key="index">
                <td className="td-name">{toUpper(item.product.commonName)}</td>
                {/* <td className="td-center">{item.quantity}</td> */}
                <td className="td-qty">
                  {item.editQuantity ? (
                    <div className="qty-content">
                      <Link
                        title="Update quantity"
                        onClick={() => toggleEdit(index, false)}
                      >
                        <FaCheck />
                      </Link>
                      <input
                        className="input-cart"
                        onChange={(event) => handleInput(event, index)}
                        type="number"
                        name="quantity"
                        value={item.quantity}
                      />
                    </div>
                  ) : (
                    <div className="qty-content centered">
                      <Link
                        title="Edit quantity"
                        onClick={() => toggleEdit(index, true)}
                      >
                        <FaPen />
                      </Link>
                      {item.quantity}
                    </div>
                  )}
                </td>
                <td className="td-right">{item.product.price}€</td>
                <td className="td-right">
                  {item.quantity * item.product.price}€
                </td>
              </tr>
            </table>
            <button onClick={() => removeFromCart(item.product._id)}>
              <RiDeleteBinLine
                title="Delete item from cart"
                className="removeIcon"
              />
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="ShoppingCart">
      {cartItems ? (
        cartItems.length ? (
          <div className="cart">
            <h1>My shopping cart</h1>
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
        )
      ) : (
        <h1 className="login-req">Login required</h1>
      )}
    </div>
  );
};

export default ShoppingCart;
