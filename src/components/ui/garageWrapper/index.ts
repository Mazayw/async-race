import { CreateElement } from '../../createElement';
import { nameGenerator, colorGenerator } from '../../randomizer';
import {
  createCar,
  getAllCars,
  createWinner,
  getWinner,
  updateWinner,
} from '../../api';
import { ICar, IAllCars } from '../../../interfaces';
import { GarageCar } from '../car/index';
import { Winner } from '../winnerPopup/index';
import { WinnersWrapper } from '../winnersWrapper/index';
import './index.scss';
import { updateCar } from '../../api';

export class GarageWrapper extends CreateElement {
  cars: IAllCars;

  title: CreateElement;

  page: CreateElement;

  pageNumber = 1;

  garageItems: CreateElement;

  allCarsElements: GarageCar[];

  winnerPopup: Winner;

  winnersPage: WinnersWrapper;

  nameUpdate: CreateElement;

  colorUpdate: CreateElement;

  buttonNextPage: CreateElement;

  buttonPrevPage: CreateElement;

  constructor(parent: HTMLElement) {
    super(parent, 'header', ['header']);

    const buttons = new CreateElement(this.element, 'div', ['buttons']);

    const toGarage = new CreateElement(
      buttons.element,
      'button',
      ['button', 'buttons-garage'],
      'To garage'
    );

    toGarage.element.setAttribute('disabled', '');

    const toWinners = new CreateElement(
      buttons.element,
      'button',
      ['button', 'buttons-winners'],
      'To winners'
    );

    const garageItemsWrapper = new CreateElement(parent, 'div', [
      'garage-items__wrapper',
    ]);

    const headerChange = new CreateElement(garageItemsWrapper.element, 'div', [
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
      } else {
        alert('First you must enter a valid data');
      }
    };

    const headerChangeUpdate = new CreateElement(
      garageItemsWrapper.element,
      'form',
      ['header-change__update']
    );

    this.nameUpdate = new CreateElement(
      headerChangeUpdate.element,
      'input',
      ['name-update'],
      '',
      false
    );

    nameAdd.element.setAttribute('type', 'text');

    this.colorUpdate = new CreateElement(
      headerChangeUpdate.element,
      'input',
      ['color-add'],
      '',
      false
    );

    this.colorUpdate.element.setAttribute('type', 'color');

    const buttonUpdate = new CreateElement(
      headerChangeUpdate.element,
      'button',
      ['button', 'submit-update'],
      'Update',
      false
    );

    buttonUpdate.element.setAttribute('type', 'button');

    buttonUpdate.element.onclick = () => {
      this.updateSelectedCar();
    };

    new CreateElement(headerChange.element, 'form', ['header-forms__buttons']);

    const buttonsWrapper = new CreateElement(
      garageItemsWrapper.element,
      'div',
      ['buttons-wrapper']
    );

    const buttonRace = new CreateElement(
      buttonsWrapper.element,
      'button',
      ['button', 'button-race'],
      'Race'
    );

    buttonRace.element.setAttribute('type', 'button');

    buttonRace.element.onclick = () => {
      this.startRaceAllCars();
    };

    const buttonReset = new CreateElement(
      buttonsWrapper.element,
      'button',
      ['button', 'button-reset'],
      'Reset'
    );

    buttonReset.element.setAttribute('type', 'button');

    buttonReset.element.onclick = () => {
      this.resetCars();
    };

    const buttonGenerate = new CreateElement(
      buttonsWrapper.element,
      'button',
      ['button', 'button-generate'],
      'Generate cars'
    );

    buttonGenerate.element.setAttribute('type', 'button');

    buttonGenerate.element.onclick = () => {
      this.generateCars();
    };

    this.title = new CreateElement(garageItemsWrapper.element, 'h2', ['title']);

    this.page = new CreateElement(garageItemsWrapper.element, 'h2', ['title']);

    const pagination = new CreateElement(garageItemsWrapper.element, 'div', [
      'pagination',
    ]);

    this.garageItems = new CreateElement(garageItemsWrapper.element, 'div', [
      'garage-items',
    ]);

    this.drawCars(this.pageNumber, 7);

    this.buttonPrevPage = new CreateElement(
      pagination.element,
      'button',
      ['button', 'button-generate'],
      'Prev. Page',
      true
    );

    this.buttonPrevPage.element.setAttribute('type', 'button');

    this.buttonNextPage = new CreateElement(
      pagination.element,
      'button',
      ['button', 'button-generate'],
      'Next. Page'
    );

    this.buttonNextPage.element.setAttribute('type', 'button');

    this.winnersPage = new WinnersWrapper(parent);

    this.winnersPage.element.classList.add('invisible');

    this.buttonNextPage.element.onclick = () => {
      this.pageNumber++;
      this.updatePage();
      this.drawCars();
    };

    this.buttonPrevPage.element.onclick = () => {
      this.pageNumber--;
      this.updatePage();
      this.drawCars();
    };

    toWinners.element.onclick = () => {
      garageItemsWrapper.element.classList.add('invisible');
      this.winnersPage.element.classList.remove('invisible');
      toWinners.element.toggleAttribute('disabled');
      toGarage.element.toggleAttribute('disabled');
      this.winnersPage.remove();
      this.winnersPage = new WinnersWrapper(parent);
    };

    toGarage.element.onclick = () => {
      garageItemsWrapper.element.classList.remove('invisible');
      this.winnersPage.element.classList.add('invisible');
      toGarage.element.toggleAttribute('disabled');
      toWinners.element.toggleAttribute('disabled');
    };

    this.updateCars();
  }

  private async updateCars(): Promise<void> {
    this.cars = await getAllCars();
    this.updateTitle();
    this.updatePage();
  }

  private async updateTitle(): Promise<void> {
    this.title.element.innerHTML = `Garage - (${this.cars.count} cars)`;
  }

  private async updatePage(): Promise<void> {
    this.page.element.innerHTML = `Page - ${this.pageNumber}`;
    const totalPages = Math.ceil(Number(this.cars.count) / 7);

    if (this.pageNumber === 1) this.buttonPrevPage.setDisabled(true);
    if (this.pageNumber > 1) this.buttonPrevPage.setDisabled(false);

    if (this.pageNumber === totalPages) this.buttonNextPage.setDisabled(true);
    if (this.pageNumber < totalPages) this.buttonNextPage.setDisabled(false);
  }

  private async generateCars(): Promise<void> {
    for (let index = 0; index < 100; index -= -1) {
      const car = { name: nameGenerator(), color: colorGenerator() };
      await createCar(car);
      this.updateCars();
    }
  }

  private async drawCars(page = this.pageNumber, limit = 7): Promise<void> {
    this.allCarsElements = [];
    this.garageItems.removeChilds();
    this.cars = await getAllCars(page, limit);
    this.cars.cars.map((el) => {
      const res = new GarageCar(
        this.garageItems.element,
        el,
        this.nameUpdate,
        this.colorUpdate
      );
      this.allCarsElements.push(res);
    });
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
      winnerCar.time =
        winnerCar.time < carData.result.time
          ? winnerCar.time
          : carData.result.time;
      await updateWinner(winnerCar);
    } else {
      await createWinner(winnerCar);
    }
  }

  private async updateSelectedCar() {
    const name = (this.nameUpdate.element as HTMLInputElement).value;
    const color = (this.colorUpdate.element as HTMLInputElement).value;
    const id = Number(this.nameUpdate.element.dataset.id);

    if (name && color && id) {
      const newCar: ICar = {
        name: name,
        color: color,
        id: id,
      };
      await updateCar(newCar);
      this.drawCars();
    } else {
      alert('First you must select a car');
    }
  }
}
