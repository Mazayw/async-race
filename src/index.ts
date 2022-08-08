import './styles.scss';
import { Header } from './components/ui/header';
import { CreateElement } from './components/createElement';
import { GarageCar } from './components/ui/car';
import { getCar, getAllCars } from './components/api';

window.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const cars = await getAllCars();
  console.log(cars);
  new Header(body);
  for (let index = 0; index < cars.cars.length; index++) {
    new GarageCar(body, cars.cars[index]);
  }

  //new CreateElement(body, header());
});
