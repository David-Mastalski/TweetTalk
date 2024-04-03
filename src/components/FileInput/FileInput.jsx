import styles from "./FileInput.module.scss";
import FILE from "../../assets/file.svg";

export function FileInput() {
  return (
    <div className={styles.fileInput}>
      <label htmlFor="file">
        <img src={FILE} alt="File" />
        <span>Add file...</span>
      </label>
      <input
        type="file"
        style={{ display: "none", visibility: "hidden" }}
        id="file"
      />
    </div>
  );
}
