import React from 'react'
import { createMyComponent } from '../../../../component'
import { MyComponentOptions, MyComponent } from '../../../../component/types'
import Com from './base'

/**
 * Thin wrapper around the MyComponent component
 */
export const render = (props: { options: MyComponentOptions, setComponent?: (component: MyComponent) => void }) => (
  <Com
    componentOptions={props.options}
    createComponent={createMyComponent}
    setComponent={props.setComponent}
    name="component"
  />
)

export default render
