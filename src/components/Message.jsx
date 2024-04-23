import { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-info">
        <img
          className="user-msg-img"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoUrl
              : data.user.photoUrl
          }
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="message-content">
        <p>{message.text}</p>
        {message.img && <img src={message.image} alt="" />}
      </div>
    </div>
  );
};
