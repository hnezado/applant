import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import Message from "./components/Message/Message";
import Homepage from "./components/Homepage/Homepage";
import Blog from "./components/Blog/Blog";
import Store from "./components/Store/Store";
import Admin from "./components/Admin/Admin";

function App() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    password: "",
    admin: false,
    favoritePlants: [],
    cart: [],
    totalPrice: 0,
  });
  const [newUsername, setNewUsername] = useState([""]);
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    updateState("users");
    updateState("plants");
    updateState("posts");
    updateState("user");
  }, []);

  useEffect(() => {
    console.log("user updated to:", user);
  }, [user]);

  const updateState = (url) => {
    axios({
      method: "get",
      url: `http://localhost:5000/server/${url}`,
      withCredentials: true,
    })
      .then((result) => {
        if (result.data.data) {
          if (url === "user") {
            setUser(result.data.data);
          } else if (url === "users") {
            setUsers(result.data.data);
          } else if (url === "plants") {
            setPlants(result.data.data);
          } else if (url === "posts") {
            setPosts(result.data.data);
          }
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const modalAction = (action, mod) => {
    if (mod) {
      setModal(mod);
    }
    if (action === "open") {
      setModalOpened(true);
    } else if (action === "close") {
      setModalOpened(false);
    }
  };

  const authAction = (data, url) => {
    return axios({
      method: "post",
      url: `http://localhost:5000/server/${url}`,
      data: data,
      withCredentials: true,
    })
      .then((result) => {
        addMsg(result.data.message);
        updateState("user");
        updateState("users");
        console.log("msg:", result.data.message);
        console.log("full result:", result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignup = (newUsername) => {
    setNewUsername(newUsername);
  };

  const onLogin = () => {
    setNewUsername("");
  };

  const adminAction = (data, url) => {
    axios({
      method: "post",
      url: `http://localhost:5000/server/${url}`,
      data: data,
      withCredentials: true,
    })
      .then((result) => {
        this.addMsg(result.data.message);
        this.updateState("users");
        this.updateState("plants");
        this.updateState("posts");
        this.updateState("user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMsg = (msg) => {
    setMessage(msg);
  };

  const cleanMsg = () => {
    setMessage("");
  };

  return (
    <div className="App">
      <Navbar
        modalAction={(action, mod) => modalAction(action, mod)}
        authAction={(data, url) => authAction(data, url)}
        userInfo={user}
      />
      <Message message={message} cleanMsg={() => cleanMsg()} />
      <Routes>
        <Route path="/" element={<Homepage allPlants={plants} />} />
        <Route
          path="/blog"
          element={
            <Blog
              userInfo={user}
              posts={posts}
              modalAction={(action, mod) => modalAction(action, mod)}
            />
          }
        />
        <Route path="/store" element={<Store allPlants={plants} />} />
        <Route
          path="/admin"
          element={
            <Admin
              addMsg={(msg) => addMsg(msg)}
              modalAction={(action, mod) => modalAction(action, mod)}
              userInfo={user}
              adminAction={(data, url) => adminAction(data, url)}
              users={users}
              plants={plants}
              posts={posts}
              updateState={(url) => updateState(url)}
            />
          }
        />
      </Routes>
      <Modal
        addMsg={(msg) => addMsg(msg)}
        modal={modal}
        modalAction={(action, mod) => modalAction(action, mod)}
        modalOpened={modalOpened}
        updateState={(url) => updateState(url)}
        authAction={(data, url) => authAction(data, url)}
        onSignup={(newUsername) => onSignup(newUsername)}
        onLogin={() => onLogin()}
        newUsername={newUsername}
        userInfo={user}
        users={users}
        plants={plants}
        posts={posts}
        adminAction={(data, url) => adminAction(data, url)}
        // editStateFromNewPost={(body, message) =>
        //   this.editStateFromNewPost(body, message)
        // }
      />
      <Footer modalAction={(action, mod) => modalAction(action, mod)} />
    </div>
  );
}

export default App;
