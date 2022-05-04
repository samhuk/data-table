import { FieldSorting, Sorting } from "@samhuk/table/dist/types";
import { DataTableQuery } from "./types";

export const convertDataTableQueryToPostgreSqlQuery = (q: DataTableQuery): string => {
    const page = q.page ?? 1
    const pageSize = q.pageSize ?? 20
    const skip = `offset ${(page - 1) * pageSize}`
    const limit = `limit ${pageSize}`
    const orderBy = q.fieldSortingList.length > 0 
      ? `order by ${q.fieldSortingList
        .map(fs => `${fs.fieldName.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`)} ${fs.sorting}`)
        .join(',')}`
      : ''

    return `${orderBy} ${limit} ${skip}`
}

/**
 * @example
 * serializeFieldSortingList([{ fieldName: 'a', sorting: ASC },{ fieldName: 'b', sorting: DESC }])
 * // 'a-asc,b-desc'
 */
const serializeFieldSortingList = (fieldSortingList: FieldSorting[]): string => (
  fieldSortingList
    .filter(fs => fs.sorting !== Sorting.NONE)
    .map(fs => `${fs.fieldName}-${fs.sorting}`).join(',')
)

const deserializeFieldSortingList = (fieldSortingListString: string): FieldSorting[] => {
  const regex = new RegExp(/([a-zA-Z0-9]*)-(asc|desc),?/g)
  const fieldSorting: FieldSorting[] = []

  let result = null
  while ((result = regex.exec(fieldSortingListString)) != null)
    fieldSorting.push({ fieldName: result[1], sorting: result[2] as Sorting  })
  
  return fieldSorting
}

export const convertQueryToQueryParameters = (query: DataTableQuery): { [param: string]: string|number|boolean } => ({
  page: query.page,
  pageSize: query.pageSize,
  sort: serializeFieldSortingList(query.fieldSortingList),
})

export const convertQueryParametersToQuery = (queryParameters: { [key: string]: string }): DataTableQuery => ({
  page: queryParameters.page != null ? parseInt(queryParameters.page) : null,
  pageSize: queryParameters.pageSize != null ? parseInt(queryParameters.pageSize) : null,
  fieldSortingList: deserializeFieldSortingList(queryParameters.sort)
})
