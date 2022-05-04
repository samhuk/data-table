export type Rendered = {
  /**
   * The root element of the component
   */
  element: HTMLElement
}

/**
 * Options for the creation of MyComponent
 */
 export type MyComponentOptions = {
  initialText: string
}

export type MyComponent = {
  rendered: Rendered
  /**
   * Updates the text that is shown within the component
   */
  updateText: (newText: string) => string
}
