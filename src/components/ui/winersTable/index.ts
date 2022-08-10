import { CreateElement } from '../../createElement';
import { ICar } from '../../../interfaces';
import './index.scss';
import { carIcon } from '../../car/index';

export class WinnersTable extends CreateElement {
  cars: { result: ICar[]; total: string };

  constructor(
    parentNode: HTMLElement,
    cars: { result: ICar[]; total: string }
  ) {
    super(parentNode, 'div', ['winner-table']);
    this.cars = cars;
    this.drawTable();
  }

  async drawTable() {
    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__number'],
      '№'
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__car'],
      'Car'
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__name'],
      'Name'
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__wins'],
      'Wins'
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__time'],
      'Time'
    );
    this.cars.result.forEach((el, i) => {
      this.drawTableRows(i, el);
    });
  }

  private drawTableRows(n: number, car: ICar): void {
    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__number'],
      `${n + 1}`
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__color'],
      carIcon(car.color)
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__name'],
      car.name
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__wins'],
      `${car.wins}`
    );

    new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__time'],
      `${car.time} sec`
    );
  }
}
