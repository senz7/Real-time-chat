import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const FormInput = (props) => {
  const { type, id, placeholder, onChange, className, onKeyDown, value } =
    props;

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
};
