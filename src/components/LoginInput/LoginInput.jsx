import styles from "./LoginInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LoginInput({ type, icon, placeholder }) {
  return (
    <div className={styles.dataInput}>
      <FontAwesomeIcon icon={icon} />
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
