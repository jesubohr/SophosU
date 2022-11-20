import { AnchorButton, Colors } from "@blueprintjs/core"
import styles from "./styles.module.css"

export interface IViewRecordProps {
  title: string
  record: any
  route: string
}

export const ViewRecord = (props: IViewRecordProps) => {
  const { title, record, route } = props
  const titleStyle = { "--border-color": Colors.BLUE3 } as React.CSSProperties

  const items = Object.entries(record)
    .map(([key, value]) => {
      if (key === "id") return null
      if (typeof value === "object") return null
      return { key: normalize(key), value }
    })
    .filter(Boolean)

  const lists = Object.entries(record)
    .map(([key, value]) => {
      if (typeof value !== "object") return null
      return { key: normalize(key), value }
    })
    .filter(Boolean)

  return (
    <main style={titleStyle}>
      <h1 className={styles.title}>View {title}</h1>
      <div className={styles.container}>
        {items.map((item: any) => (
          <Item key={item.key} title={item.key} value={item.value} />
        ))}
      </div>
      <div className={styles.container}>
        {lists.map((list: any) => (
          <ItemList
            key={list.key}
            title={list.key}
            items={list.value}
            route={route}
          />
        ))}
      </div>
    </main>
  )
}

// Method to normalize the key to a title
const normalize = (str: string) => {
  return str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}
const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

// Sub-component
interface ItemProps {
  title: string
  value: any
}
const Item = ({ title, value }: ItemProps) => {
  return (
    <div className={styles.item}>
      <p className={styles["item-title"]}>{title}</p>
      <p className={styles["item-value"]}>
        {datetimeRegex.test(value) ? new Date(value).toLocaleString() : value}
      </p>
    </div>
  )
}

interface ItemListProps {
  title: string
  items: { code: string; name: string; fullname: string }[] | any
  route: string
}
const ItemList = ({ title, items, route }: ItemListProps) => {
  return (
    <div className={styles["item-list"]}>
      <p className={styles["item-title"]}>{title}</p>
      <div className={styles.list}>
        {Array.isArray(items) ? (
          items.map((item) => (
            <AnchorButton
              key={item.code}
              large
              outlined
              intent="primary"
              text={item.name || item.fullname}
              className={styles["list-item"]}
              href={`/${route.split(",")[0]}/${item.code}`}
            />
          ))
        ) : (
          <AnchorButton
            key={items.code}
            large
            outlined
            intent="primary"
            text={items.fullname as string}
            className={styles["list-item"]}
            href={`/${route.split(",")[1]}/${items.code}`}
          />
        )}
      </div>
    </div>
  )
}
