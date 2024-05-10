import "./Message.scss";
import React from "react";

import { BsFillInfoCircleFill } from "react-icons/bs";

const Message = ({ message, cleanMsg }) => {
  const showMsg = () => {
    setTimeout(() => {
      cleanMsg();
    }, 2000);
    return (
      <div className="message-container">
        <BsFillInfoCircleFill />
        <article>{message}</article>
      </div>
    );
  };

  return <div className="Message">{message ? showMsg() : null}</div>;
};

export default Message;
