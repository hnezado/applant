import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import Message from "./components/Message/Message";
import Homepage from "./components/Homepage/Homepage";
import PlantDetails from "./components/PlantDetails/PlantDetails";
import Store from "./components/Store/Store";
import StoreItem from "./components/Store/StoreItem";
import ShoppingCart from "./components/Store/ShoppingCart";
import Blog from "./components/Blog/Blog";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";

const configFn = require("./config_server");
let config;

const load_config = async () => {
  try {
    config = await configFn.getConfig();
  } catch (err) {
    console.error(`Error loading configuration`, err);
  }
};

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState("");

  const apiGetAction = useCallback(async (url) => {
    try {
      const response = await axios({
        method: "get",
        url: `${config.DB_SERVER_URL}/${url}`,
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateState = useCallback(
    async (state) => {
      let value = await apiGetAction(state);
      value = value.data;
      if (state === "user") setUserInfo(value);
      else if (state === "users") setUsers(value);
      else if (state === "plants") setPlants(value);
      else if (state === "posts") setPosts(value);
    },
    [apiGetAction]
  );

  useEffect(() => {
    updateState("user");
    updateState("users");
    updateState("plants");
    updateState("posts");
  }, [updateState]);

  const apiPostAction = async (data, url, update) => {
    try {
      const response = await axios({
        method: "post",
        url: `${config.DB_SERVER_URL}/${url}`,
        data: data,
        withCredentials: true,
      });
      if (Array.isArray(update)) {
        update.forEach((stateToUpdate) => updateState(stateToUpdate));
      } else {
        console.error("Required update or incorrect format");
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const modalAction = (action, mod) => {
    if (mod === "login") {
      if (userInfo) {
        addMsg("Already logged in");
        return;
      }
    }
    if (mod) {
      setModal(mod);
    }
    if (action === "open") {
      setModalOpened(true);
    } else if (action === "close") {
      setModalOpened(false);
    }
  };

  const authAction = async (data, url) => {
    return axios({
      method: "post",
      url: `http://localhost:5000/server/${url}`,
      data: data,
      withCredentials: true,
    })
      .then((result) => {
        addMsg(result.data.msg);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signup = async (newUser) => {
    const result = await authAction(newUser, "signup");
    if (result.data && result.data.successSignup) {
      setNewUsername(newUser.username);
      updateState("users");
      modalAction("open", "login");
    }
  };

  const login = async (user) => {
    const result = await authAction(user, "login");
    if (result.data && result.data.successLogin) {
      setNewUsername("");
      updateState("user");
      modalAction("close");
    }
  };

  const logout = async () => {
    await authAction(null, "logout");
    updateState("user");
    navigate("/");
  };

  const addMsg = (msg) => {
    setMessage(msg);
  };

  const cleanMsg = () => {
    setMessage("");
  };

  load_config();

  return (
    <div className="App">
      <Navbar userInfo={userInfo} modalAction={modalAction} logout={logout} />
      <Message message={message} cleanMsg={cleanMsg} />
      <Routes>
        <Route
          path="/"
          element={<Homepage userInfo={userInfo} plants={plants} />}
        />
        <Route
          path="/blog"
          element={
            <Blog
              userInfo={userInfo}
              posts={posts}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          }
        />
        <Route
          path="/store"
          element={<Store userInfo={userInfo} plants={plants} />}
        />
        <Route
          path="/store-item/:_id"
          element={
            <StoreItem
              userInfo={userInfo}
              plants={plants}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              userInfo={userInfo}
              users={users}
              plants={plants}
              posts={posts}
              modalAction={modalAction}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              userInfo={userInfo}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          }
        />
        <Route
          path="/plant-details/:_id"
          element={
            <PlantDetails
              userInfo={userInfo}
              plants={plants}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ShoppingCart
              userInfo={userInfo}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          }
        />
      </Routes>
      <Modal
        userInfo={userInfo}
        users={users}
        plants={plants}
        posts={posts}
        modal={modal}
        modalOpened={modalOpened}
        newUsername={newUsername}
        apiPostAction={apiPostAction}
        modalAction={modalAction}
        authAction={authAction}
        signup={signup}
        login={login}
        addMsg={addMsg}
      />
      <Footer modalAction={modalAction} addMsg={addMsg} />
    </div>
  );
}

export default App;
