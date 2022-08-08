import { CreateElement } from '../createElement';
import { nameGenerator, colorGenerator } from '../randomizer';
import {
  createCar,
  getAllCars,
  createWinner,
  getWinner,
  updateWinner,
} from '../api';
import { ICar, IAllCars } from '../../interfaces';
import { GarageCar } from './car/index';
import { Winner } from './winnerPopup/index';

export class GarageWrapper extends CreateElement {
  cars: IAllCars;

  title: CreateElement;

  page: CreateElement;

  pageNumber = 1;

  garageItems: CreateElement;

  allCarsElements: GarageCar[];

  winnerPopup: Winner;

  updateCar: ICar;

  constructor(parent: HTMLElement) {
    super(parent, 'header', ['header']);
    this.updateCars();
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

    buttonAdd.element.setAttribute('type', 'button');
    buttonAdd.element.onclick = async () => {
      const name = (nameAdd.element as HTMLInputElement).value;
      const color = (colorAdd.element as HTMLInputElement).value;

      if (name && color) {
        createCar({ name: name, color: color });
        await this.updateCars();
        await this.drawCars();
        await this.updateTitle();
      }
    };

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
    buttonUpdate.element.setAttribute('type', 'button');

    const headerFormsButtons = new CreateElement(headerChange.element, 'form', [
      'header-forms__buttons',
    ]);

    const buttonRace = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'button-race'],
      'Race'
    );
    buttonRace.element.setAttribute('type', 'button');

    buttonRace.element.onclick = () => {
      this.startRaceAllCars();
    };

    const buttonReset = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'button-reset'],
      'Reset'
    );
    buttonReset.element.setAttribute('type', 'button');

    buttonReset.element.onclick = () => {
      this.resetCars();
    };

    const buttonGenerate = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'button-generate'],
      'Generate cars'
    );

    buttonGenerate.element.setAttribute('type', 'button');

    buttonGenerate.element.onclick = () => {
      this.generateCars();
      console.log('click');
    };

    this.title = new CreateElement(this.element, 'h2', ['title']);
    this.page = new CreateElement(this.element, 'h2', ['title']);
    this.updatePage();

    const pagination = new CreateElement(this.element, 'div', ['pagination']);

    this.garageItems = new CreateElement(this.element, 'div', ['garage-items']);

    this.drawCars(this.pageNumber, 7);

    const buttonPrevPage = new CreateElement(
      pagination.element,
      'button',
      ['button', 'button-generate'],
      'Prev. Page'
    );
    buttonPrevPage.element.setAttribute('type', 'button');

    const buttonNextPage = new CreateElement(
      pagination.element,
      'button',
      ['button', 'button-generate'],
      'Next. Page'
    );
    buttonNextPage.element.setAttribute('type', 'button');

    buttonNextPage.element.onclick = () => {
      this.pageNumber++;
      this.changePage();
      this.drawCars();
    };

    buttonPrevPage.element.onclick = () => {
      this.pageNumber--;
      this.changePage();
      this.drawCars();
    };
  }

  private async changePage(): Promise<void> {
    this.updatePage();
  }

  private async updateCars(): Promise<void> {
    this.cars = await getAllCars();
    this.updateTitle();
  }

  private async updateTitle(): Promise<void> {
    this.title.element.innerHTML = `Garage - (${this.cars.count} cars)`;
  }

  private async updatePage(): Promise<void> {
    this.page.element.innerHTML = `Page - ${this.pageNumber}`;
  }

  private async generateCars(): Promise<void> {
    for (let index = 0; index < 100; index -= -1) {
      const car = { name: nameGenerator(), color: colorGenerator() };
      console.log('car', car);
      console.log('tata', index);
      await createCar(car);
      this.updateCars();
    }
  }

  private async drawCars(page = this.pageNumber, limit = 7): Promise<void> {
    this.allCarsElements = [];
    this.garageItems.removeChilds();
    this.cars = await getAllCars(page, limit);
    this.cars.cars.map((el) => {
      const res = new GarageCar(this.garageItems.element, el);
      this.allCarsElements.push(res);
    });
    console.log(this.allCarsElements);
  }

  private async startRaceAllCars(): Promise<void> {
    const res = this.allCarsElements.map(async (car) => {
      await car.startCarEngine(car.car.id);
      return car;
    });

    const winner = await Promise.race(res);

    const winCar: ICar = {
      id: winner.car.id,
      name: winner.car.name,
      color: winner.car.color,
      time: +(winner.speed / 1000).toFixed(2),
      wins: 1,
    };

    this.winnerPopup = new Winner(this.element, winCar);

    await this.createOrUpdateWinner(winCar);

    this.winnerPopup.element.onclick = () => {
      this.winnerPopup.remove();
    };
  }

  private async resetCars(): Promise<void> {
    this.allCarsElements.map(async (car) => {
      await car.stopCarEngine(car.car.id);
    });
  }

  private async createOrUpdateWinner(winnerCar: ICar): Promise<void> {
    const carData = await getWinner(winnerCar.id);

    if (carData.status === 200) {
      carData.result.wins++;
      winnerCar.wins = carData.result.wins;

      await updateWinner(winnerCar);
    } else {
      await createWinner(winnerCar);
    }
  }
}
