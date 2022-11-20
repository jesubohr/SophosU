import { Link } from "react-router-dom"
import styles from "./styles.module.css"

export const NotFound = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>
        Sorry, the page you were looking for doesn't exist.
        <br />
        Maybe you want to go to the <Link to="/">home page</Link>?
      </p>
    </main>
  )
}
