import React from 'react'
import { createDataTable } from '../../../../component'
import { DataTableOptions, DataTable } from '../../../../component/types'
import Com from './base'

/**
 * Thin wrapper around the DataTable component
 */
export const render = (props: { options: DataTableOptions, setComponent?: (component: DataTable) => void }) => (
  <Com
    componentOptions={props.options}
    createComponent={createDataTable}
    setComponent={props.setComponent}
    containerElementFullSize
    name="component"
  />
)

export default render
