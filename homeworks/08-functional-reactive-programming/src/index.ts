import {
  GAME_HEIGHT,
  GAME_WIDTH,
  createGame,
  fuelCar,
  generateLogo,
  generateGame,
  Game,
  Assets,
  Cursor,
  Litres,
} from './app';
import {
  Observable,
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  interval,
} from 'rxjs';
import { map, scan, share, startWith, tap } from 'rxjs/operators';

const createCanvas: HTMLCanvasElement = document.createElement('canvas');
createCanvas.width = GAME_WIDTH;
createCanvas.height = GAME_HEIGHT;
document.body.appendChild(createCanvas);

const generateImage = (path: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      reject(err);
    };
  });

const images$: Observable<Assets> = forkJoin({
  car: from(generateImage('assets/car.svg')),
  track: from(generateImage('assets/track.svg')),
  logo: from(generateImage('assets/logo.svg')),
  fuel: from(generateImage('assets/fuel.svg')),
});

const fuel$: Observable<Cursor> = fromEvent<MouseEvent>(
  createCanvas,
  'mousemove'
).pipe(
  startWith({ clientX: 0, clientY: 0 }),
  map(({ clientX, clientY }) => ({ clientX, clientY }))
);

const player$: Observable<Cursor> = fromEvent<MouseEvent>(
  createCanvas,
  'click'
).pipe(
  startWith({ clientX: -1, clientY: -1 }),
  map(({ clientX, clientY }) => ({ clientX, clientY }))
);

const field$: Observable<Game> = interval(1000).pipe(
  scan(
    (field, _) => ({
      ...field,
      car: generateLogo(field.logos),
    }),
    generateGame()
  ),
  share()
);

const description: HTMLParagraphElement = document.createElement('p');
description.textContent = 'Litres filled in gas tank: ';
const span: HTMLSpanElement = document.createElement('span');
description.appendChild(span);
document.body.appendChild(description);

const fuelPrice: HTMLParagraphElement = document.createElement('p');
fuelPrice.textContent = 'Fuel price: 1.317 EUR/L';
document.body.appendChild(fuelPrice);

const moneySpent: HTMLParagraphElement = document.createElement('p');
moneySpent.textContent = 'Money spent in EUR total: ';
const moneySpentEl: HTMLSpanElement = document.createElement('moneySpent');
moneySpent.appendChild(moneySpentEl);
document.body.appendChild(moneySpent);

const score$: Observable<Litres> = combineLatest([player$, field$]).pipe(
  map(([player, field]) => (fuelCar(player, field) ? 1 : 0)),
  scan((acc, v) => acc + v, 0),
  share()
);

const game$ = combineLatest([images$, fuel$, field$, score$]).pipe(
  tap(createGame(createCanvas, span, moneySpentEl))
);

game$.subscribe();
