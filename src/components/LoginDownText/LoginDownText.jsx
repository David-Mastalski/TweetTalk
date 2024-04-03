import { Link } from "react-router-dom";
import styles from "./LoginDownText.module.scss";

export function LoginDownText({ children, linkTitle, to }) {
  return (
    <p className={styles.text}>
      {children}. <Link to={to}>{linkTitle}</Link>
    </p>
  );
}
