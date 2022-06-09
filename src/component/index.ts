import { createPaginator } from '@samhuk/paginator'
import { Paginator } from '@samhuk/paginator/dist/types'
import { createTable } from '@samhuk/table'
import { Table } from '@samhuk/table/dist/types'
import { DataGetterResult, DataTable, DataTableOptions } from './types'

export const createDataTable = (options: DataTableOptions): DataTable => {
  let dataTable: DataTable
  let paginator: Paginator
  let table: Table

  const onGetData = (result: DataGetterResult) => {
    table.updateTableData(result.data)
    paginator.setItemCount(result.totalRowCount ?? result.data.length)
  }

  const getData = () => options.connector.getData({
    query: {
      page: paginator.page,
      pageSize: paginator.pageSize,
      fieldSortingList: table.fieldSortingList,
    },
    onComplete: onGetData,
  })

  options.paginatorOptions.events = {
    onPageChange: () => getData(),
    onPageSizeChange: () => getData(),
  }

  const element = document.createElement('div')
  element.classList.add('com-data-table')

  table = createTable(options.tableOptions)
  element.appendChild(table.rendered.element)

  paginator = createPaginator(options.paginatorOptions)
  element.appendChild(paginator.rendered.element)

  // Initial get data if nullish data provided
  if (options.tableOptions.initialData == null) {
    getData()
  }
  else {
    // TODO: this could be better...
    onGetData({
      data: options.tableOptions.initialData,
    })
  }

  return dataTable = {
    rendered: { element },
    setPage: page => {
      paginator.setPage(page)
      getData()
    },
  }
}
