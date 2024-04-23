import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";

import { FormInput } from "./FormInput";
import { AuthContext } from "../context/AuthContext";

export const Search = () => {
  const [userName, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDoc(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        await setDoc(doc, (db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            dispayName: user.dispayName,
            photoUrl: user.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            dispayName: currentUser.dispayName,
            photoUrl: currentUser.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="search-form">
        <FormInput
          placeholder="Find a user"
          type="text"
          className="search-input"
          onKeyDown={handleKey}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={userName}
        />
      </div>
      {error && <span>User not found</span>}
      {user && (
        <div className="user-chat" onClick={handleSelect}>
          <img className="user-chat-img" src={user.photoUrl} alt="" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
