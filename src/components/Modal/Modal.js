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
// import EditPlant from '../EditPlant/EditPlant'
// import DeletePlant from '../DeletePlant/DeletePlant'
// import NewPost from '../NewPost/NewPost'
// import EditPost from '../EditPost/EditPost'
// import DeletePost from '../DeletePost/DeletePost'

const ModalComponent = (props) => {
  const {
    users,
    modal,
    modalOpened,
    modalAction,
    authAction,
    onSignup,
    onLogin,
    newUsername,
    adminAction,
    updateState,
  } = props;
  const showModal = () => {
    if (modal === "login") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <Login
              authAction={authAction}
              modalAction={modalAction}
              newUsername={newUsername}
              onLogin={onLogin}
            />
          </Modal>
        </div>
      );
    } else if (modal === "signup") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <Signup
              authAction={authAction}
              modalAction={modalAction}
              onSignup={onSignup}
              updateState={(url) => updateState(url)}
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
              adminAction={adminAction}
              modalAction={modalAction}
            />
          </Modal>
        </div>
      );
    } else if (modal === "new-plant") {
      return (
        <div>
          <Modal open={modalOpened} onClose={() => modalAction("close")}>
            <NewPlant {...props} />
          </Modal>
        </div>
      );
    }
    // } else if(this.props.modal.includes('edit-plant')){
    //   return(
    //     <div>
    //       <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
    //         <EditPlant
    //           {...this.props}
    //         />
    //       </Modal>
    //     </div>
    //   )
    // }
    // } else if(this.props.modal.includes('delete-plant')){
    //   return(
    //     <div>
    //       <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
    //         <DeletePlant
    //           {...this.props}
    //         />
    //       </Modal>
    //     </div>
    //   )
    // }
    // } else if(this.props.modal === 'new-post'){
    //   return(
    //     <div>
    //       <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
    //         <NewPost
    //           {...this.props}
    //         />
    //       </Modal>
    //     </div>
    //   )
    // }
    // } else if(this.props.modal.includes('edit-post')){
    //   return(
    //     <div>
    //       <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
    //         <EditPost
    //           {...this.props}
    //         />
    //       </Modal>
    //     </div>
    //   )
    // }
    // } else if(this.props.modal.includes('delete-post')){
    //   return(
    //     <div>
    //       <Modal open={this.props.modalOpened} onClose={()=>this.props.modalAction('close')}>
    //         <DeletePost
    //           {...this.props}
    //         />
    //       </Modal>
    //     </div>
    //   )
    // }
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
