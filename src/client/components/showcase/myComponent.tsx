import React from 'react'
import { DataTableQuery } from '../../../component/dataTableQuery/types'
import { DataTableOptions, DataTable } from '../../../component/types'
import DataTableWithReact from '../common/generic/myComponent'
import ItemBase from './itemBase'

const createTestData = (q: DataTableQuery) => {
  const testData: any[] = []
  const start = (q.page - 1) * q.pageSize
  for (let i = start; i < start + q.pageSize; i += 1)
    testData.push({ uuid: (i + 1).toString(), field1: Math.random(), field2: Math.round(Math.random() * 100) })
  return testData
}

const COMPONENT_OPTIONS: DataTableOptions = {
  connector: {
    getData: options => {
      setTimeout(() => {
        options.onComplete({
          data: createTestData(options.query),
          totalRowCount: 100,
        })
      }, 1000)
    },
  },
  tableOptions: {
    columnOrdering: ['uuid', 'field1', 'field2'],
    columnOptionsDict: {
      uuid: {
        fieldName: 'uuid',
        displayName: 'id',
        initialWidthPx: 50,
      },
      field1: {
        fieldName: 'field1',
        initialWidthPx: 200,
      },
      field2: {
        fieldName: 'field2',
      },
    },
  },
  paginatorOptions: {
    page: 1,
    itemCount: 100,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100, 500],
  },
}

const Operations = (props: { component: DataTable }) => (
  <>
    <button
      type="button"
      className="button--white"
      onClick={() => props.component.setPage(2)}
    >
      Go to page 2
    </button>
  </>
)

export const render = () => (
  <ItemBase component={DataTableWithReact} componentOptions={COMPONENT_OPTIONS} operationsComponent={Operations} />
)

export default render
