import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { FormButton } from "../components/FormButton";
import { FormInput } from "../components/FormInput";

export const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="register-form-container">
      <div className="form-container-wrapper">
        <span className="form-logo">Online Chat</span>
        <span className="title">Registration</span>
        <form className="form-registration" action="" onSubmit={handleSubmit}>
          <FormInput
            className="form-input"
            type="text"
            placeholder="Display name"
          />
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

          <label className="file-label" htmlFor="file">
            <img
              className="avatar-img"
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/name.png"
              alt="name"
            />
            <p className="add-avatar">Add an avatar</p>
          </label>

          <FormButton disabled={loading} type="submit" className="form-button">
            Sign up
          </FormButton>
          {loading && "Uploading and compressing the image please wait..."}
          {error && <span>Somthing went wrong</span>}
        </form>
        <p className="alr-have-acc">
          Already have an account?
          <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};
