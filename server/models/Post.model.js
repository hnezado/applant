const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId, // Define el tipo como ObjectId para el array de likes
        ref: "User", // Referencia al modelo de usuario si es necesario
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
