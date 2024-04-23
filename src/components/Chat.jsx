import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db, storage, } from "../firebase";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

import { Messages } from "./Messages";
import { FormButton } from "./FormButton";
import { FormInput } from "./FormInput";


export const Chat = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
  };

  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data.user?.displayName}</span>
        <div className="chat-icons">
          <img
            className="icon-add"
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEI0lEQVR4nO1aS28TSRBuRICsgpb34whHBIL9E8szLI8brxsILstGwBWWM3BCQtrfkCMIEEgwCgFjJ1VfNdZoEwycdpcDWrjxiFhkVJ7qxALbaztje4woaaRJul3d1VX1VXXVOPedvlGK49xKEdovwpdF+CbA0wC9AWjGnjciPKVjOgfAvmKxuMJlgaIoGmTmYyJ8F6BPIlxu8fkP4DsifLRUKi3pugC5XO4HgM6K8MuwKYA+AHwfoPOqGWbepCdORIv00Xf9n44BdAHgSH8zJxT94z2f0cPpihAitAfgF1UbmAToOBEta52XLBehEyJMVVp6DmBXR80IoD/mNMAsQtvT4s/MOwGSKoGupa6dQqGwPtl4ZYG3zPzr6OjowlQXcc4pT4B+E+F3QdvF4uN1qTD33m9UdZsQU95PbHEdJmbeCtBTE+aZ7mFeDAGsqWI4QUSrXZeoWCyuAPihmfELtYp5+EQwJ8p574dcl8l7PwRwPphZWz5T5dhTGuxcj6hQKKyaswq+1jLEBsfuhk804zNiAKDo1kKwS+KEopPLCInQSHD+pkwMoHMhTnQCYtulKIoGRMibMCMNJ2u+o6lCIsjkzy5jBEzuNpN/2VArmrwFhHAZpHK5vCAgKUCH607ULNYmHU9r8QQ+KZcWPxE+aYd9u8F9QtNq+tBOAthg4UrulG6gpBkR/lhznyJ0wJz8XlqLdkIQJREaU57e8173JYnwFTOr8y7zgvBFO/RLtQZvWuz4pQ80csAO/XqtwZIJsin7gshm08j0V4MAv9bBtPOqTghCRKsNuV59NWhIUI7jeHGrjAEeb6PwEG6a462uV6oE7qROkCVBHqQsCPeNaQFYU9e0vhlnF4NfrQBmXRDv+WAD+J0NiBf6PCDSfhu83z8pCg3XTMZC0qgVwKwKEse5lSFpzOfzP9acZAVlRYMTaS2s0NwOxNYjZj5le7xVd5IIHbETJJfdixUMlA41DDQA/W32t8NljLynYQOkv/63DaGlfXN6ZLD48MQEOd3MDwZDrVcLyi4j5GcPmJ423RTS/oT5yjstjrkek4j8JMLvzclba2VoeTKcgJYtXY8IlbyKnpkQV1tmkJgYTZq/5HtRxI7jeCnABdtDoe0+Y9JW4OnQVtC/XXe7xI9CO27eDZ+k0ZOoVs0MwDbXFZ+gYE4lEdmQCmM9jWBmSVWcRhQOXcoURdGAodP7YE7e+7VpLzIYAMBOyqfVfdWInbQyqBIngmN3tPeu/Yk5tYfuLp9s5ysG9QPNnULaIbOmlF63uBlEGwnpjPnPjKbXAP2e1J1ks8K21gD00XdtGumlyOaMhTpBSDsAOt2TLyAsNzusBWW9ArRRfPiYfLeCQz0RoBZpQVlrsXprA/iGfUDzb/ioRt9F6E+9nuocnVv3PvGdXP/TZ4w3E4tZblHOAAAAAElFTkSuQmCC"
          />
          <img
            className="icon-camera"
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiElEQVR4nO2VSwqAMAxEi3hF1+68Zi+QzqzFhUeJFHQjih9oA5oHha46D5ImITiO46yQSUucsCPG2ALSVxdQ1YaUDpDxSCycGb9le28ffJrDQgKkTEf3igJJAZnJNOT6VxcApM/BlzksJHA7hy7Aj5YA1k1I629I60GkT0cxrZcRrdax4zi/ZQFKhZplCpOIQAAAAABJRU5ErkJggg=="
          />
          <img
            className="icon-more"
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nO3VTU7DQAwF4NkAK362wKFaOAZ/pwQaJNsvi5RAjgHsQSaTQUBGXdag90mzafOs1p66KRERERERERH9f8Mw7KnqtZk2ZvLmB9AVoFdd1+1Gz38CcApIC+j73DFTU9WTFDRfOvFVRNZmtuj7230/gCwB7XMxnevMtvOFmdzkIo8icph+8NemYoBcRssXZvowfmNbpApAzvKYV9HyhZm8+kM+ylTRNM1BHu9LtHzhb24qlMdb+SDbzRe+7vL9W6aKttXz/Mx9tHzhezrfv37uxwbgyEyex47IRbR84SvN93Qe3ZP/sPxO+vFOTEUAFRHZiZb/xv9spmKV40WOo+Z/dcb3tN9D3yTjNpE7H+fGTgTIExEREREREaW/7wNicY9uBj8M+QAAAABJRU5ErkJggg=="
          />
        </div>
      </div>
      <Messages />
      <div className="chat-input-btn">
        <FormInput
          className="chat-input"
          onChange={(e) => setText(e.target.value)}
        />
        <FormButton onClick={handleSend} className="chat-btn">
          Send
        </FormButton>
        <FormInput
          type="file"
          className="chat-add-img"
          onChange={(e) => setImage(e.target.file)}
        />
      </div>
    </div>
  );
};
