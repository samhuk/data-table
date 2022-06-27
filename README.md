# data-table

A vanilla JS data table UI component. This shows a list of data as rows and columns, with a paginator to navigate pages of the data.

![sc1](img/sc1.png)

## Usage

`npm i @samhuk/data-table`

```typescript
import { createDataTable } from '@samhuk/data-table'

const element = document.createElement('div')

const createTestData = (q: DataTableQuery) => {
  const testData: any[] = []
  const start = (q.page - 1) * q.pageSize
  for (let i = start; i < start + q.pageSize; i += 1)
    testData.push({ uuid: i.toString(), field1: Math.random(), field2: Math.round(Math.random() * 100) })
  return testData
}

const dataTable = createDataTable({
  // Provide mock connector to supply test data
  connector: {
    getData: options => {
      // Artificial 0.5s delay
      setTimeout(() => {
        options.onComplete({
          data: createTestData(options.query),
          totalRowCount: 100
        })
      }, 500)
    }
  },
  tableOptions: {
    columnOrdering: ['field1', 'field2'],
    columnOptionsDict: {
      field1: {
        fieldName: 'field1'
      },
      field2: {
        fieldName: 'field2'
      }
    }
  },
  paginatorOptions: {
    page: 1,
    itemCount: 100,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100, 500],
  }
})

element.appendChild(dataTable.rendered.element)
```

### Importing Styles

There are two main ways the styles of the component can be imported into another project. One can either:

1. `import` the scss entrypoint or css bundle file into your .ts or .js file. This is supported by all the main bundlers out there like webpack and esbuild as long as you have the required loader/plugin for scss or css files configured.
  ```typescript
  // Import the scss entrypoint file from the src
  import 'node_modules/@samhuk/data-table/src/component/styles/index.scss'
  // Import the css bundle file
  import 'node_modules/@samhuk/data-table/dist/styles.css'
  ```
2. `@import` the scss entrypoint file into your scss file.
  ```scss
  @import '~@samhuk/data-table/src/component/styles/index.scss';
  ```
