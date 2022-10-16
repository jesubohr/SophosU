import styles from "./styles.module.css"

export interface ITableProps {
  numRows: number
  columnHeaders: string[]
  cellRenderer: (rowIndex: number, columnIndex: number) => JSX.Element
  headerRenderer?: (columnIndex: number) => JSX.Element
}

export const Table = ({ numRows, columnHeaders, cellRenderer, headerRenderer }: ITableProps) => {
  return (
    <table className={ styles.table }>
      <thead>
        <tr>
          <th></th>
          { columnHeaders.map((header, index) => (
            <th key={ index } className={ styles.header }>
              <div className={ styles["header-cell"] }>
                { headerRenderer ? headerRenderer(index) : header }
              </div>
            </th>
          )) }
        </tr>
      </thead>
      <tbody>
        { [...Array(numRows)].map((_, rowIndex) => (
          <tr key={ rowIndex } className={ styles.row }>
            <td className={ styles["index-cell"] }>{ rowIndex + 1 }</td>
            { [...Array(columnHeaders.length)].map((_, columnIndex) => (
              <td key={ columnIndex } className={ styles.cell }>
                { cellRenderer(rowIndex, columnIndex) }
              </td>
            )) }
          </tr>
        )) }
      </tbody>
    </table>
  )
}
