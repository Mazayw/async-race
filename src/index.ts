import './styles.scss';
import { GarageWrapper } from './components/ui/garageWrapper';
import { CreateElement } from './components/createElement';
import { GarageCar } from './components/ui/car';
import { getCar, getAllCars } from './components/api';

//window.addEventListener('DOMContentLoaded', async () => {
(async () => {
  const body = document.body;

  new GarageWrapper(body);
})();
alert('Привет! Просьба проверить работу после 10 августа. Спасибо!)');
//new CreateElement(body, header());
//});
