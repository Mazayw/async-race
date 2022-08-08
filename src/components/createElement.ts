export class CreateElement {
  element: HTMLElement;

  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    content = '',
    disabled = false
  ) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...styles);
    this.element.innerHTML = content;

    if (parent) {
      parent.append(this.element);
    }

    if (disabled) {
      this.setDisabled(true);
    }
  }

  remove(): void {
    this.element.remove();
  }

  setDisabled(isDisabled = false): void {
    this.element.toggleAttribute('disabled', isDisabled);
  }
}
