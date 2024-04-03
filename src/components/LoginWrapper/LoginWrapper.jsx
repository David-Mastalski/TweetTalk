import styles from "./LoginWrapper.module.scss";

export function LoginWrapper({ children, title, describe, onSubmit }) {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <p className={styles.formWrapper__title}>{title}</p>
        <span className={styles.formWrapper__describe}>{describe}</span>

        <form action="#" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
