const names = {
  brand: [
    'Audi',
    'Bentley',
    'BMW',
    'Cadillac',
    'Chevrolet',
    'Citroen',
    'Datsun',
    'Ferrari',
    'Fiat',
    'Ford',
    'Geely',
    'Genesis',
    'Great',
    'Wall',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Jaguar',
    'Jeep',
    'KIA',
    'Lada',
    'Lamborghini',
    'Land',
    'Rover',
    'Lexus',
    'LIFAN',
    'Mazda',
    'Mercedes - Benz',
    'Mitsubishi',
    'Nissan',
    'Opel',
    'Peugeot',
    'Porsche',
    'Ravon',
    'Renault',
    'Rolls - Royce',
    'Skoda',
    'Smart',
    'SsangYong',
    'Subaru',
    'Suzuki',
    'Toyota',
  ],
  title: [
    'Aegea',
    'Albea',
    'Argo',
    'Bravo',
    'Croma',
    'Doblo',
    'Ducato',
    'Freemont',
    'Freemont cross',
    'Fullback',
    'Grande punto',
    'Idea',
    'Linea',
    'Mobi',
    'Multipla',
    'Panda',
    'Punto',
    'Scudo',
    'Tipo',
    'Tipo cross',
    'Toro',
    'Ascent',
    'Brz',
    'Forester',
    'Impreza',
    'Impreza wrx',
    'Justy',
    'Legacy',
    'Levorg',
    'Outback',
    'Stella',
    'Trezia',
    'Tribeca',
  ],
};

export const nameGenerator = () => {
  const brandLength = names.brand.length;
  const titleLength = names.title.length;
  const brand = names.brand[Math.ceil(Math.random() * (brandLength - 1))];
  const title = names.title[Math.ceil(Math.random() * (titleLength - 1))];
  return `${brand} ${title}`;
};

export const colorGenerator = () => {
  const arr = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];
  let res = '#';
  for (let index = 0; index < 6; index++) {
    const random = Math.ceil(Math.random() * arr.length - 1);
    res += arr[random];
  }
  return res;
};
