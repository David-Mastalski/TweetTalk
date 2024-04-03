import styles from "./AsideBar.module.scss";
import LOGO from "../../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function AsideBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.sideNav}>
      <div className={styles.sideNav__wrapper}>
        <div>
          <div className={styles.sideNav__logo}>
            <img src={LOGO} alt="Logo" />
          </div>
          <div className={styles.nav}>
            <button
              className={`${styles.nav__button} ${styles["nav__button--active"]}`}
            >
              <FontAwesomeIcon icon={faComment} />
            </button>
            <button className={styles.nav__button}>
              <FontAwesomeIcon icon={faGear} />
            </button>
            <button className={styles.nav__button}>
              <FontAwesomeIcon icon={faPhone} />
            </button>
          </div>
        </div>
        <div className={styles.sideNav__profile}>
          <button onClick={() => signOut(auth)} className={styles.logoutBtn}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
          <UserPhoto src={currentUser.photoURL} />
        </div>
      </div>
    </div>
  );
}
