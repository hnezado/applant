import { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const ShoppingCart = ({ userInfo, apiPostAction, modalAction, addMsg }) => {
  useEffect(() => {
    if (!userInfo) {
      modalAction("open", "login");
      addMsg("Login required");
    }
  }, [userInfo]);

  const toUpper = (word) => {
    if (word) return word[0].toUpperCase() + word.slice(1);
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
    return userInfo.cart.map((item, index) => {
      return (
        <div key={index} className="allItemsCart">
          <img src={item.product.image} alt={item.product.commonName} />
          <div className="infoItemCart">
            <table className="table-cart">
              <th>Product name</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Total price</th>
              <tr key="index">
                <td className="td-name">{toUpper(item.product.commonName)}</td>
                {/* <td className="td-center">{item.quantity}</td> */}
                <td>
                  <input
                    className="input-cart"
                    type="number"
                    value={item.quantity}
                  />
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
      {userInfo ? (
        userInfo.cart &&
        Array.isArray(userInfo.cart) &&
        (userInfo.cart.length ? (
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
        ))
      ) : (
        <h1 className="login-req">Login required</h1>
      )}
    </div>
  );
};

export default ShoppingCart;
