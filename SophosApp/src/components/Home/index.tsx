import type { IconName, Intent } from "@blueprintjs/core"
import { Button, Icon } from "@blueprintjs/core"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

export interface IHomeItemProps {
  title: string
  count: number
  intent: Intent
  icon: IconName
  description: string
}

export const HomeItem = ({
  icon,
  count,
  intent,
  title,
  description
}: IHomeItemProps) => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon intent={intent} icon={icon} iconSize={32} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.records}>
        <p className={styles["records-title"]}>Records</p>
        <p className={styles["records-quantity"]}>{count ?? 0}</p>
      </div>
      <Button
        large
        intent={intent}
        onClick={() => navigate(`/${title.toLocaleLowerCase()}`)}
      >
        View
      </Button>
    </div>
  )
}
