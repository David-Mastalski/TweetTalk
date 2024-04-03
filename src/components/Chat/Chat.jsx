import styles from "./Chat.module.scss";
import { MessageForm } from "../MessageForm/MessageForm";
import { Messages } from "../Messages/Messages";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import SELECT_CHAT from "../../assets/select-chat.svg";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className={styles.chat}>
      {data.chatId === "null" ? (
        <div className={styles.selectChat}>
          <img className={styles.a} src={SELECT_CHAT} alt="Select Chat" />
          <p>
            Select a conversation or start a <span>new one</span>
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div className={styles.chatInfo}>
            <div className={styles.chatInfo__person}>
              <UserPhoto src={data.user?.photoURL} />
              <p className={styles.userName}>
                {data.user?.displayName} <span>Online</span>
              </p>
            </div>
            <div className={styles.chatAction}>
              <button>
                <FontAwesomeIcon icon={faVideo} />
              </button>
              <button>
                <FontAwesomeIcon icon={faPhone} />
              </button>
              <button>
                <FontAwesomeIcon icon={faGear} />
              </button>
            </div>
          </div>
          <Messages />
          <MessageForm />
        </>
      )}
    </div>
  );
}
