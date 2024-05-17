require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./User.model");
const Plant = require("./Plant.model");

console.log("envs:", process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const addToCart = async (product) => {
  const userId = "6645f701d0058304a8540bf9"; // test user
  const { productId, quantity } = product;

  const user = await User.findOne({ _id: userId });
  if (user) {
    console.log("user:", user);
    console.log("asdf:", user.cart[0].product);
    const existingProduct = user.cart.find(
      (item) => item?.product?.toString() === productId.toString()
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
      console.log("Product quantity updated");
    } else {
      user.cart.push({ product: productId, quantity });
      console.log("Product added to cart");
    }
    const updatedUser = await user.save();
    const populatedUpdatedUser = await updatedUser.populate({
      path: "cart.product",
      model: "Plant",
    });
    console.log("Updated user cart");
    console.log("Populated user cart:", populatedUpdatedUser.cart);
  } else {
    const msg = `User not found`;
    console.error(msg);
  }
};

const jadePlantId = "663fd21e8acd0a140f8d3b53";
const quantity = 0;
const newData = { productId: jadePlantId, quantity: quantity };
addToCart(newData);

// TODO Uninstall from frontend dependencies:
// mongoose, nodemon, dotenv
