import styles from "./AppWrapper.module.scss";
import { AsideBar } from "../AsideBar/AsideBar";
import { Chats } from "../Chats/Chats";
import { Chat } from "../Chat/Chat";

export function AppWrapper() {
  return (
    <div className={styles.appWrapper}>
      <AsideBar />
      <Chats />
      <Chat />
    </div>
  );
}
