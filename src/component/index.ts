
/* This is the entrypoint ts file for the component. The component should return an object
 * that extends { rendered: { element: HTMLElement } }.
 */

import { MyComponentOptions, MyComponent } from "./types"

export const createMyComponent = (options: MyComponentOptions): MyComponent => {
  const element = document.createElement('div')
  element.classList.add('com-my-component')

  element.textContent = options.initialText

  return {
    rendered: { element },
    updateText: newText => element.textContent = newText,
  }
}
