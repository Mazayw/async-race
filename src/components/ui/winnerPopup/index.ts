import { CreateElement } from '../../createElement';
import { ICar } from '../../../interfaces';
import './index.scss';

export class Winner extends CreateElement {
  constructor(parentNode: HTMLElement, car: ICar) {
    super(parentNode, 'div', ['winner-screen']);

    const title = new CreateElement(this.element, 'h2', [
      'winner-screen__title',
    ]);
    title.element.style.color = `${car.color}`;
    title.element.innerHTML = `
      <span>${car.name}</span>
      Wins in 
      <span>${car.time}</span>
      sec...
    `;
  }
}
