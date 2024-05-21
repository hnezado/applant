import Signup from "./Signup";
import Login from "./Login";
import DeleteUser from "./DeleteUser";
import NewPlant from "./NewPlant";
import EditPlant from "./EditPlant";
import DeletePlant from "./DeletePlant";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import RemoveCartItem from "./RemoveCartItem";
import Enlarger from "./Enlarger";
import CheckoutForm from "./CheckoutForm";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./Modal.scss";

const ModalComponent = (props) => {
  const {
    userInfo,
    users,
    plants,
    posts,
    modal,
    modalOpened,
    newUsername,
    apiPostAction,
    modalAction,
    authAction,
    signup,
    login,
    addMsg,
  } = props;

  const publicKey = loadStripe(
    "pk_test_51PHUppCuywdMRflbcTbWjm676FKztgj1xkCEJYgNSK7ffYbCfgpzUEcNTPOXrckOLWqHc42TCmF4to8lC7HRp63d005jtpiekH"
  );

  const showModal = () => {
    if (modal === "signup") {
      return <Signup modalAction={modalAction} signup={signup} />;
    } else if (modal === "login") {
      return (
        <Login
          newUsername={newUsername}
          modalAction={modalAction}
          authAction={authAction}
          login={login}
        />
      );
    } else if (modal && modal.includes("delete-user")) {
      return (
        <DeleteUser
          users={users}
          modal={modal}
          apiPostAction={apiPostAction}
          modalAction={modalAction}
        />
      );
    } else if (modal === "new-plant") {
      return (
        <NewPlant
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal && modal.includes("edit-plant")) {
      return (
        <EditPlant
          plants={plants}
          modal={modal}
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal && modal.includes("delete-plant")) {
      return (
        <DeletePlant
          plants={plants}
          modal={modal}
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal === "new-post") {
      return (
        <NewPost
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal && modal.includes("edit-post")) {
      return (
        <EditPost
          posts={posts}
          modal={modal}
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal && modal.includes("delete-post")) {
      return (
        <DeletePost
          posts={posts}
          modal={modal}
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal && modal.includes("remove-cart-item")) {
      return (
        <RemoveCartItem
          plants={plants}
          modal={modal}
          apiPostAction={apiPostAction}
          modalAction={modalAction}
          addMsg={addMsg}
        />
      );
    } else if (modal && modal.includes("enlarger")) {
      return <Enlarger plants={plants} modal={modal} />;
    } else if (modal === "payment") {
      return (
        <Elements stripe={publicKey}>
          <CheckoutForm
            userInfo={userInfo}
            apiPostAction={apiPostAction}
            modalAction={modalAction}
            addMsg={addMsg}
          />
        </Elements>
      );
    }
  };

  return (
    <Modal
      className="Modal"
      open={modalOpened}
      onClose={() => modalAction("close")}
    >
      {showModal()}
    </Modal>
  );
};

export default ModalComponent;
