import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { FormInput } from "../components/FormInput";
import { FormButton } from "../components/FormButton";
import { auth } from "../firebase";

export const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="register-form-container">
      <div className="form-container-wrapper">
        <span className="form-logo">Online Chat</span>
        <span className="title">Logining</span>
        <form onSubmit={handleSubmit} className="form-registration" action="">
          <FormInput className="form-input" type="email" placeholder="Email" />
          <FormInput
            className="form-input"
            type="password"
            placeholder="Password"
          />
          <FormInput
            id="file"
            className="form-input file-input"
            type="file"
            placeholder="File"
          />
          <FormButton className="form-button">Login</FormButton>
          {error && <span>Somthing went wrong</span>}
        </form>

        <p className="alr-have-acc">
          Have no an account?
          <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};
