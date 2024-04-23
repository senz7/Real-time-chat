import { signOut } from "firebase/auth";
import { useContext } from "react";

import { FormButton } from "./FormButton";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="navbar-logo">Online Chat</span>
      <div className="user">
        <img
          className="user-img"
          src="https://sun9-33.userapi.com/impg/_c0UHFJc7_LQUpml2CLdNfjWp-_6t6dcxzKGbA/ORRFrzWak5o.jpg?size=604x340&quality=96&sign=6c73f5d4527a4138da3d8a7768a78959&c_uniq_tag=zDRm7sg8xIxkVemKn0qAQZUFGR-im4lBVcZ70Q0TVRs&type=album"
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <FormButton onClick={() => signOut(auth)} className="logout-btn">
          Logout
        </FormButton>
      </div>
    </div>
  );
};
