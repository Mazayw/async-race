import { CreateElement } from '../createElement';

export class Header extends CreateElement {
  constructor(parent: HTMLElement) {
    super(parent, 'header', ['header']);
    const buttons = new CreateElement(this.element, 'div', ['buttons']);
    const toGarage = new CreateElement(
      buttons.element,
      'button',
      ['button', 'buttons-garage'],
      'To garage'
    );
    const toWinners = new CreateElement(
      buttons.element,
      'button',
      ['button', 'buttons-winners'],
      'To winners'
    );
    const headerChange = new CreateElement(this.element, 'div', [
      'header-change',
    ]);
    const headerChangeAdd = new CreateElement(headerChange.element, 'form', [
      'header-change__add',
    ]);
    const nameAdd = new CreateElement(headerChangeAdd.element, 'input', [
      'name-add',
    ]);
    nameAdd.element.setAttribute('type', 'text');
    const colorAdd = new CreateElement(headerChangeAdd.element, 'input', [
      'color-add',
    ]);
    colorAdd.element.setAttribute('type', 'color');
    const buttonAdd = new CreateElement(
      headerChangeAdd.element,
      'button',
      ['button', 'submit-add'],
      'Create'
    );
    buttonAdd.element.setAttribute('type', 'submit');

    const headerChangeUpdate = new CreateElement(headerChange.element, 'form', [
      'header-change__update',
    ]);
    const nameUpdate = new CreateElement(
      headerChangeUpdate.element,
      'input',
      ['name-update'],
      '',
      true
    );
    nameAdd.element.setAttribute('type', 'text');
    const colorUpdate = new CreateElement(
      headerChangeUpdate.element,
      'input',
      ['color-add'],
      '',
      true
    );
    colorUpdate.element.setAttribute('type', 'color');
    const buttonUpdate = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'submit-update'],
      'Update',
      true
    );
    buttonUpdate.element.setAttribute('type', 'submit');

    const headerFormsButtons = new CreateElement(headerChange.element, 'form', [
      'header-forms__buttons',
    ]);

    const buttonRace = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'button-race'],
      'Race'
    );

    const buttonReset = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'button-reset'],
      'Recet'
    );

    const buttonGenerate = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'button-generate'],
      'Generate cars'
    );
  }
}
