import "../App.css";

import { Chat } from "../components/Chat";
import { Sidebar } from "../components/Sidebar";

export const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
