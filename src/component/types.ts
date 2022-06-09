import { PaginatorOptions } from '@samhuk/paginator/dist/types'
import { FieldSorting, RowData, TableAppearanceOptions, TableOptions } from '@samhuk/table/dist/types'
import { DataTableQuery } from './dataTableQuery/types'

export type Rendered = {
  element: HTMLElement
}

export type DataGetterOptions = {
  query: DataTableQuery
  onComplete: (result: DataGetterResult) => void
}

export type DataGetterResult = {
  data: RowData[]
  totalRowCount?: number
}

export type DataGetter = (options: DataGetterOptions) => void

export type Connector = {
  getData: DataGetter
}

export type DataTableOptions = {
  connector: Connector
  tableOptions: TableOptions
  paginatorOptions: PaginatorOptions
}

export type DataTable = {
  rendered: Rendered
  setPage: (page: number) => void
}

export type DataTableColumnPreferences = {
  widthPx: number
}

export type DataTableColumnPreferencesDict = { [fieldName: string]: DataTableColumnPreferences }

export type DataTablePreferences = {
  columnOrdering?: string[]
  columnPreferencesDict: DataTableColumnPreferencesDict
  pageSize: number
  fieldSortingList: FieldSorting[]
  tableAppearanceOptions: TableAppearanceOptions
}

export type ServerColumnOptions = {
  sortable?: boolean
  filterable?: boolean
  resizable?: boolean
  setCellValueAsTitle?: boolean
}

export type ServerColumnOptionsDict = { [fieldName: string]: ServerColumnOptions }
