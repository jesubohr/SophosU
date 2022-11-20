import styles from "./styles.module.css"

export const LoadingView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.block}>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
        </div>
      </div>
    </div>
  )
}
