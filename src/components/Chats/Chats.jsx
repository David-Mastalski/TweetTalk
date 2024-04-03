import styles from "./Chats.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../Search/Search";
import { ShortChat } from "../ShortChat/ShortChat";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={styles.chats}>
      <div className={styles.chats__topBar}>
        <p>TweetTalk</p>
        <span>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </span>
      </div>
      <Search />
      <div className={styles.chats__container}>
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div key={chat[0]}>
              <ShortChat
                onClick={() => handleSelect(chat[1].userInfo)}
                chatData={chat}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
