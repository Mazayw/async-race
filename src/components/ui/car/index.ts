import { carIcon } from '../../car';
import { CreateElement } from '../../createElement';
import { ICar, IEngineStatus } from '../../../interfaces';
import './index.scss';
import { flagDraw } from '../flag';
import { deleteWinner } from '../../api';
import {
  updateCar,
  deleteCar,
  startStopEngine,
  switchEngineDrive,
} from '../../api';

export class GarageCar extends CreateElement {
  private carImg: CreateElement;

  public car: ICar;

  public speed = 0;

  private carAnimation: Animation | undefined;

  private buttonStart: CreateElement;

  private buttonStop: CreateElement;

  constructor(
    parent: HTMLElement,
    car: ICar,
    name: CreateElement,
    color: CreateElement
  ) {
    super(parent, 'li', ['car']);
    this.car = car;
    const buttons = new CreateElement(this.element, 'div', ['car-buttons']);
    const buttonSelect = new CreateElement(
      buttons.element,
      'button',
      ['button', 'select'],
      'Select'
    );

    buttonSelect.element.onclick = () => {
      (name.element as HTMLInputElement).value = car.name;
      name.element.dataset.id = `${car.id}`;
      (color.element as HTMLInputElement).value = car.color;
    };

    const buttonDelete = new CreateElement(
      buttons.element,
      'button',
      ['button', 'delete'],
      'Delete'
    );
    buttonDelete.element.onclick = () => {
      if (car.id) deleteCar(car.id);
      deleteWinner(car.id);
      this.remove();
      //update title
    };
    const controls = new CreateElement(this.element, 'div', ['controls']);
    this.buttonStart = new CreateElement(
      controls.element,
      'button',
      ['button', 'start'],
      'Start'
    );

    this.buttonStop = new CreateElement(
      controls.element,
      'button',
      ['button', 'stop'],
      'Stop',
      true
    );

    this.buttonStart.element.onclick = () => {
      if (car.id) this.startCarEngine(car.id);
    };

    this.buttonStop.element.onclick = () => {
      if (car.id) this.stopCarEngine(car.id);
    };

    const carName = new CreateElement(
      buttons.element,
      'span',
      ['car-name'],
      car.name
    );
    const road = new CreateElement(this.element, 'div', ['road']);

    this.carImg = new CreateElement(
      road.element,
      'div',
      ['car-icon'],
      carIcon(car.color)
    );

    const flag: CreateElement = new CreateElement(
      road.element,
      'div',
      ['flag'],
      flagDraw()
    );
    flag.element.setAttribute('alt', 'Race flag');
  }

  updateButtons(start: CreateElement, stop: CreateElement, type = false): void {
    start.setDisabled(type);
    stop.setDisabled(!type);
  }

  async stopCarEngine(id: number): Promise<void> {
    const data = await startStopEngine(id, 'stopped');

    if (data.status === 200) {
      this.updateButtons(this.buttonStart, this.buttonStop, false);
      this.speed = 0;
      this.carAnimation?.cancel();
      this.carImg.element.style.left = '2%';
    }
  }

  async startCarEngine(id: number): Promise<void> {
    const data = await startStopEngine(id, 'started');
    if (data.status === 200) {
      this.updateButtons(this.buttonStart, this.buttonStop, true);

      const { result } = data;
      const time = result.distance / result.velocity;

      this.animationCar(time);
      await this.switchToDriveMode(result);
    }
  }

  private animationCar(time: number): void {
    this.carAnimation = this.carImg.element.animate(
      [{ left: '2%' }, { left: '90%' }],
      {
        duration: time,
        easing: 'ease-in-out',
      }
    );
    this.carAnimation.play();
    this.carAnimation.onfinish = () => {
      this.carImg.element.style.left = '90%';
    };
  }

  private async switchToDriveMode(car: IEngineStatus): Promise<void> {
    const driveMode = await switchEngineDrive(this.car.id);
    return new Promise((resolve) => {
      if (driveMode === 500) {
        this.carAnimation?.pause();
      }

      if (driveMode === 200) {
        this.speed = Math.floor(car.distance / car.velocity);
        resolve();
      }
    });
  }
}
