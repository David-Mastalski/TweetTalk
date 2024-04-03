import styles from "./Message.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getHour } from "../../utils/getHour";

export function Message({ id, message }) {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const [isDataShown, setIsDataShown] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  const timeStampSeconds = message.date.seconds;
  const timeStampNanoseconds = message.date.nanoseconds;
  const hour = getHour(timeStampSeconds, timeStampNanoseconds);

  return (
    <div
      ref={ref}
      key={id}
      style={{ gap: message.img && message.text ? "2px" : "0px" }}
      className={`${styles.message} ${
        message.senderId === currentUser.uid && styles["message--owner"]
      }`}
    >
      {message.img && (
        <img src={message.img} alt="" className={styles.message__img} />
      )}
      <div
        className={styles.message__content}
        onClick={() => setIsDataShown((prevState) => !prevState)}
      >
        {message.text && <p className={styles.message__text}>{message.text}</p>}
      </div>
      {isDataShown && <div className={styles.message__postDate}>{hour}</div>}
    </div>
  );
}
