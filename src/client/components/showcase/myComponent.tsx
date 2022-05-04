import React from 'react'
import { DataTableQuery } from '../../../component/dataTableQuery/types'
import { DataTableOptions, DataTable } from '../../../component/types'
import DataTableWithReact from '../common/generic/myComponent'
import ItemBase from './itemBase'

const createTestData = (q: DataTableQuery) => {
  const testData: any[] = []
  const start = (q.page - 1) * q.pageSize
  for (let i = start; i < start + q.pageSize; i += 1)
    testData.push({ uuid: i.toString(), field1: Math.random(), field2: Math.round(Math.random() * 100) })
  return testData
}

const COMPONENT_OPTIONS: DataTableOptions = {
  connector: {
    getData: options => {
      setTimeout(() => {
        options.onComplete({
          data: createTestData(options.query),
          totalRowCount: 100
        })
      }, 2000)
    }
  },
  tableOptions: {
    columnOrdering: ['field1', 'field2'],
    columnOptionsDict: {
      field1: {
        fieldName: 'field1'
      },
      field2: {
        fieldName: 'field1'
      }
    }
  },
  paginatorOptions: {
    page: 1,
    itemCount: 100,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100, 500],
  }
}

const Operations = (props: { component: DataTable }) => (
  <>
    <button
      type="button"
      className="button--white"
      onClick={() => undefined}
    >
      Update the text of the component
    </button>
  </>
)

export const render = () => (
  <ItemBase component={DataTableWithReact} componentOptions={COMPONENT_OPTIONS} operationsComponent={Operations} />
)

export default render
