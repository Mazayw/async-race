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
    const numberTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__number'],
      '№'
    );

    const colorTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__car'],
      'Car'
    );

    const nameTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__name'],
      'Name'
    );

    const winsTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table-header__wins'],
      'Wins'
    );

    const timeTable = new CreateElement(
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
    const numberTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__number'],
      `${n + 1}`
    );
    const colorTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__color'],
      carIcon(car.color)
    );
    const nameTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__name'],
      car.name
    );
    const winsTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__wins'],
      `${car.wins}`
    );
    const timeTable = new CreateElement(
      this.element,
      'div',
      ['table-element', 'table__time'],
      `${car.time} sec`
    );
  }
}
