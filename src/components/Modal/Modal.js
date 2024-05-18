import Signup from "./Signup";
import Login from "./Login";
import DeleteUser from "./DeleteUser";
import NewPlant from "./NewPlant";
import EditPlant from "./EditPlant";
import DeletePlant from "./DeletePlant";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import CheckoutForm from "./CheckoutForm";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./Modal.scss";

const ModalComponent = (props) => {
  const {
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
  const showModal = () => {
    if (modal === "signup") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <Signup modalAction={modalAction} signup={signup} />
          </Modal>
        </div>
      );
    } else if (modal === "login") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <Login
              newUsername={newUsername}
              modalAction={modalAction}
              authAction={authAction}
              login={login}
            />
          </Modal>
        </div>
      );
    } else if (modal && modal.includes("delete-user")) {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <DeleteUser
              users={users}
              modal={modal}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
            />
          </Modal>
        </div>
      );
    } else if (modal === "new-plant") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <NewPlant
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          </Modal>
        </div>
      );
    } else if (modal && modal.includes("edit-plant")) {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <EditPlant
              plants={plants}
              modal={modal}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          </Modal>
        </div>
      );
    } else if (modal && modal.includes("delete-plant")) {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <DeletePlant
              plants={plants}
              modal={modal}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          </Modal>
        </div>
      );
    } else if (modal === "new-post") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <NewPost
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          </Modal>
        </div>
      );
    } else if (modal && modal.includes("edit-post")) {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <EditPost
              posts={posts}
              modal={modal}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          </Modal>
        </div>
      );
    } else if (modal && modal.includes("delete-post")) {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <DeletePost
              posts={posts}
              modal={modal}
              apiPostAction={apiPostAction}
              modalAction={modalAction}
              addMsg={addMsg}
            />
          </Modal>
        </div>
      );
    } else if (modal === "payment") {
      const publicKey = loadStripe(
        "pk_test_51IrpUwINyfw3Ussjr5TrEoNC8GW0dM1LdTMSLYsAIhofMEO44bCM8br241Ywwi96IRkCNMgKI4kMoSI8nugv9CSA0097t9atRk"
      );
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <Elements stripe={publicKey}>
              <CheckoutForm />
            </Elements>
          </Modal>
        </div>
      );
    }
  };

  return <div className="Modal">{showModal()}</div>;
};

export default ModalComponent;
