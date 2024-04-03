import styles from "./MessageForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export function MessageForm() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!img && !text) {
      return;
    }

    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
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
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: text === "" ? "Wysłałeś(aś) zdjęcie" : text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: text === "" ? "Wysłał(a) zdjęcie" : text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSend}>
        <div className={styles.container}>
          {selectedImage && (
            <div className={styles["container--photoPresentation"]}>
              <div className={styles.photoWrapper}>
                <img src={selectedImage} alt="" />
                <button
                  onClick={() => {
                    setImg(null);
                    setSelectedImage(null);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          )}
          <div className={styles["container--inputs"]}>
            <label htmlFor="file">
              <FontAwesomeIcon icon={faLink} />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none", visibility: "hidden" }}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <input
              type="text"
              placeholder="Write a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
