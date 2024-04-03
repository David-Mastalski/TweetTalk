import styles from "./ShortChat.module.scss";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { getHour } from "../../utils/getHour";

export function ShortChat({ onClick, chatData }) {
  let hour;
  const user = chatData[1].userInfo;
  const lastMessageValue = chatData[1].lastMessage
    ? chatData[1].lastMessage.text
    : "";

  if (chatData[1].date) {
    const timeStampSeconds = chatData[1].date.seconds;
    const timeStampNanoseconds = chatData[1].date.nanoseconds;
    hour = getHour(timeStampSeconds, timeStampNanoseconds);
  }

  return (
    <div onClick={onClick} className={styles.shortChat}>
      <UserPhoto src={user.photoURL} />
      <div className={styles.personInfo}>
        <p>{user.displayName}</p>
        <span>{lastMessageValue}</span>
      </div>
      <span className={styles.time}>{hour}</span>
    </div>
  );
}
