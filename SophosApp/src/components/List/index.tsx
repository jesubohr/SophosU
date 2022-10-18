import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Popover2 } from "@blueprintjs/popover2"
import { Menu, MenuItem, Position } from "@blueprintjs/core"
import { ButtonGroup, Button, InputGroup } from "@blueprintjs/core"
import { Table } from "@/components/Table"
import { fuzzySearch } from "@/utils/fuzzySearch"

import styles from "./styles.module.css"

export interface IListRecordsProps {
  data: any[]
  title: string
  route: string
  headers: string[]
  searchKeys: string[]
  onDelete: (code: string) => void
}

export const ListRecords = (props: IListRecordsProps) => {
  const { title, route, headers } = props
  const { data, searchKeys, onDelete } = props
  const [records, setRecords] = useState(data)
  const navigate = useNavigate()

  // Rendering Methods
  function cellRenderer (rowIndex: number, columnIndex: number) {
    const record = records[rowIndex]
    const column = formatHeader(headers[columnIndex])
    const value = record[column]
    const cellClassNumber = (typeof value === 'number') ? styles["num-cell"] : ""

    if (columnIndex === headers.length - 1) {
      const actions = { view: viewRecord, edit: editRecord, delete: deleteRecord }
      return (
        <ActionButtons actions={ actions } index={ rowIndex } />
      )
    }
    return <div className={ cellClassNumber }>{ value }</div>
  }
  function headerRenderer (columnIndex: number) {
    return (
      <>
        { headers[columnIndex] }
        { columnIndex < headers.length - 1 && (
          <SortingMenu columnIndex={ columnIndex } sortColumn={ sortColumn } />
        ) }
      </>
    )
  }

  // Data Methods
  type Record = keyof typeof records[0]
  const formatHeader = (header: string) => header.toLowerCase().replace(" ", "_") as Record
  function sortColumn (columnIndex: number, comparator: (a: any, b: any) => number) {
    if (columnIndex === undefined) return
    const sortedRecords = [...records].sort((a, b) => {
      const column = formatHeader(headers[columnIndex])
      const first = a[column]
      const second = b[column]
      return comparator(first, second)
    })
    setRecords(sortedRecords)
  }
  function handleSearch (event: React.FormEvent<HTMLInputElement>) {
    const search = event.currentTarget.value.toLowerCase()
    const filteredRecords = searchKeys.map(key => {
      return data.filter(record => (
        fuzzySearch(search, record[key].toLowerCase())
      ))
    }).flat()
    setRecords(search ? filteredRecords : data)
  }

  // Routing Methods
  const createRecord = () => navigate(`/${route}/add`)
  const viewRecord = (index: number) => navigate(`/${route}/${records[index].code}`)
  const editRecord = (index: number) => navigate(`/${route}/${records[index].code}/edit`)
  const deleteRecord = (index: number) => onDelete(records[index].code)

  return (
    <main>
      <div className={ styles["header-container"] }>
        <h1 className={ styles.title }>{ title }</h1>
        <div className={ styles["header-actions"] }>
          <InputGroup
            type="search"
            large
            leftIcon="search"
            placeholder="Search..."
            onInput={ handleSearch }
          />
          <Button
            large
            icon="add"
            text={ `Add ${title.slice(0, -1)}` }
            onClick={ createRecord }
          />
        </div>
      </div>
      <div className={ styles.table }>
        <Table
          numRows={ records.length }
          columnHeaders={ headers }
          cellRenderer={ cellRenderer }
          headerRenderer={ headerRenderer }
        />
      </div>
    </main>
  )
}


// Sub-components
interface ISortingMenuProps {
  columnIndex: number
  sortColumn: (columnIndex: number, comparator: (a: any, b: any) => number) => void
}
const SortingMenu = ({ columnIndex, sortColumn }: ISortingMenuProps) => {
  const sortAsc = () => sortColumn(columnIndex, (a, b) => compare(a, b))
  const sortDesc = () => sortColumn(columnIndex, (a, b) => compare(b, a))

  const compare = (a: any, b: any) => {
    if (typeof a === 'number') return Number(a) - Number(b)
    if (typeof a === 'object') return Number(a) - Number(b)
    return String(a).localeCompare(String(b))
  }

  const PopMenu = () => (
    <Menu>
      <MenuItem icon="sort-asc" onClick={ sortAsc } text="Sort Ascendent" />
      <MenuItem icon="sort-desc" onClick={ sortDesc } text="Sort Descendent" />
    </Menu>
  )
  return (
    <Popover2
      minimal
      position={ Position.BOTTOM_RIGHT }
      content={ <PopMenu /> }>
      <Button icon="chevron-down" minimal />
    </Popover2>
  )
}

interface IActionButtonsProps {
  index: number
  actions: { [key: string]: (index: number) => void }
}
const ActionButtons = ({ index, actions }: IActionButtonsProps) => {
  return (
    <ButtonGroup minimal className={ styles.actions }>
      <Button title="View" icon="user" onClick={ () => actions["view"](index) } />
      <Button title="Edit" icon="edit" onClick={ () => actions["edit"](index) } />
      <Button title="Delete" icon="trash" onClick={ () => actions["delete"](index) } />
    </ButtonGroup>
  )
}
