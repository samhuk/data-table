import { FieldSorting } from "@samhuk/table/dist/types"

export type DataTableQuery = {
  page: number
  pageSize: number
  fieldSortingList: FieldSorting[]
}
