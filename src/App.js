import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import Message from "./components/Message/Message";
import Homepage from "./components/Homepage/Homepage";
import Blog from "./components/Blog/Blog";
import Store from "./components/Store/Store";
import StoreItem from "./components/StoreItem";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";

function App() {
  const navigate = useNavigate();
  // const [user, setUser] = useState({
  //   _id: "",
  //   username: "",
  //   password: "",
  //   admin: false,
  //   favoritePlants: [],
  //   cart: [],
  //   totalPrice: 0,
  // });
  const [userInfo, setUserInfo] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   console.log("userInfo updated to:", userInfo);
  // }, [userInfo]);

  // useEffect(() => {
  //   console.log("plants updated to:", plants);
  // }, [plants]);

  // useEffect(() => {
  //   console.log("State users updated to:", users);
  // }, [users]);

  // useEffect(() => {
  //   console.log("plants updated to:", plants);
  // }, [plants]);

  useEffect(() => {
    // Checking an active session
    updateState("user");
    updateState("users");
    updateState("plants");
    updateState("posts");
  }, []);

  const updateState = async (state) => {
    const value = await apiGetAction(state);
    if (state === "user") setUserInfo(value);
    else if (state === "users") setUsers(value);
    else if (state === "plants") setPlants(value);
    else if (state === "posts") setPosts(value);
  };

  const apiGetAction = async (url) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/server/${url}`,
        withCredentials: true,
      });
      // console.log(`Returning retrieved data (${url}):`, response.data.data);
      return response.data.data;
    } catch (err) {
      throw err;
    }
  };

  const apiPostAction = async (data, url, update) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/server/${url}`,
        data: data,
        withCredentials: true,
      });
      // addMsg(response.data.message);
      if (update && Array.isArray(update) && update.length) {
        update.forEach((stateToUpdate) => updateState(stateToUpdate));
      }
      return response.data.data;
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
        addMsg(result.data.message);
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
      // const loggedUser = result.data;
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

  return (
    <div className="App">
      <Navbar userInfo={userInfo} modalAction={modalAction} logout={logout} />
      <Message message={message} cleanMsg={cleanMsg} />
      <Routes>
        <Route path="/" element={<Homepage plants={plants} />} />
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
        <Route path="/store" element={<Store plants={plants} />} />
        <Route
          path="/store-items/:_id"
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
            <Profile userInfo={userInfo} apiPostAction={apiPostAction} />
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
