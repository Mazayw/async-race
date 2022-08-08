import { carIcon } from '../../car';
import { CreateElement } from '../../createElement';
import { ICar, IEngineStatus } from '../../../interfaces';
import './index.scss';
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

  constructor(parent: HTMLElement, car: ICar) {
    super(parent, 'li', ['car']);
    this.car = car;
    const buttons = new CreateElement(this.element, 'div', ['car-buttons']);
    const buttonSelect = new CreateElement(
      buttons.element,
      'button',
      ['button', 'select'],
      'Select'
    );
    const buttonDelete = new CreateElement(
      buttons.element,
      'button',
      ['button', 'delete'],
      'Delete'
    );
    buttonDelete.element.onclick = () => {
      if (car.id) deleteCar(car.id);
      this.remove();
    };

    const carName = new CreateElement(
      buttons.element,
      'span',
      ['car-name'],
      car.name
    );
    const road = new CreateElement(this.element, 'div', ['road']);
    const controls = new CreateElement(this.element, 'div', ['controls']);
    const buttonStart = new CreateElement(
      controls.element,
      'button',
      ['button', 'start'],
      'Start'
    );

    const buttonStop = new CreateElement(
      controls.element,
      'button',
      ['button', 'stop'],
      'Stop'
    );

    buttonStart.element.onclick = () => {
      if (car.id) this.startCarEngine(car.id, buttonStart, buttonStop);
    };

    buttonStop.element.onclick = () => {
      if (car.id) this.stopCarEngine(car.id, buttonStart, buttonStop);
    };

    this.carImg = new CreateElement(
      road.element,
      'div',
      ['car-icon'],
      carIcon(car.color)
    );
    const flag = new CreateElement(
      road.element,
      'img',
      ['flag'],
      carIcon(car.color)
    );
    flag.element.setAttribute('src', './../../assets/flag.svg');
    flag.element.setAttribute('alt', 'Race flag');
  }

  updateButtons(start: CreateElement, stop: CreateElement, type = false): void {
    start.setDisabled(type);
    stop.setDisabled(!type);
  }

  async stopCarEngine(
    id: number,
    start: CreateElement,
    stop: CreateElement
  ): Promise<void> {
    const data = await startStopEngine(id, 'stopped');

    if (data.status === 200) {
      this.updateButtons(start, stop, false);
      this.speed = 0;
      this.carAnimation?.cancel();
      this.carImg.element.style.left = '2%';
    }
  }

  async startCarEngine(
    id: number,
    start: CreateElement,
    stop: CreateElement
  ): Promise<void> {
    const data = await startStopEngine(id, 'started');
    console.log(id);
    if (data.status === 200) {
      this.updateButtons(start, stop, true);

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
