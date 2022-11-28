import styles from "./styles.module.css"

export interface IErrorProps {
  message: string
}

export const ErrorView = (props: IErrorProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error</h1>
      <p className={styles.description}>{props.message}</p>
    </div>
  )
}
