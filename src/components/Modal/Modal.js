import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./Modal.scss";

// import { Elements } from '@stripe/react-stripe-js'
// import CheckoutForm from '../CheckoutForm'
// import { loadStripe } from '@stripe/stripe-js'

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import DeleteUser from "../DeleteUser/DeleteUser";
import NewPlant from "../NewPlant/NewPlant";
import EditPlant from "../EditPlant/EditPlant";
import DeletePlant from "../DeletePlant/DeletePlant";
import NewPost from "../NewPost/NewPost";
import EditPost from "../EditPost/EditPost";
import DeletePost from "../DeletePost/DeletePost";

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
    } else if (modal.includes("delete-user")) {
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
    } else if (modal.includes("edit-plant")) {
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
    } else if (modal.includes("delete-plant")) {
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
    } else if (modal.includes("edit-post")) {
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
    } else if (modal.includes("delete-post")) {
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
    }
    // } else if(this.props.modal === 'payment'){
    //  const promise = loadStripe(
    //    "pk_test_51IrpUwINyfw3Ussjr5TrEoNC8GW0dM1LdTMSLYsAIhofMEO44bCM8br241Ywwi96IRkCNMgKI4kMoSI8nugv9CSA0097t9atRk"
    //  );
    //   return(
    //     <div>
    //       <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
    //         <Elements
    //           {...this.props}
    //           stripe={promise}>
    //           <CheckoutForm {...this.props}/>
    //         </Elements>
    //       </Modal>
    //     </div>
    //   )
    // }
  };

  return <div className="Modal">{showModal()}</div>;
};

export default ModalComponent;
