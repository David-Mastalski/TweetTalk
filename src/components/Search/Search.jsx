import styles from "./Search.module.scss";
import FunnelSimple from "../../assets/FunnelSimple.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useContext, useEffect, useState } from "react";

import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { AuthContext } from "../../context/AuthContext";

export function Search() {
  const [shownUsers, setShownUsers] = useState(false);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleSearch = async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", userName),
        where("displayName", "<=", userName + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setUsers(userData);
        setErr(false);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };

    handleSearch();
  }, [userName]);

  const handleSelect = async (user) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUserName("");
    setShownUsers(false);
  };

  return (
    <div>
      <div className={styles.search}>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="Search"
            value={userName}
            onChange={(e) => {
              const value = e.target.value.trim();
              setUserName(value);
              setShownUsers(value !== "" ? true : false);
            }}
          />
        </div>
        <img src={FunnelSimple} alt="" />
      </div>
      {err && <span>User not found</span>}
      {shownUsers && (
        <div className={styles.usersFound}>
          {users.map((user, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(user)}
              className={`${styles.searchChat}`}
            >
              <UserPhoto src={user.photoURL} />
              <p>{user.displayName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
