export type Assets = {
  car: HTMLImageElement;
  fuel: HTMLImageElement;
  track: HTMLImageElement;
  logo: HTMLImageElement;
};

export type Game = {
  rows: number;
  columns: number;
  logos: Location[];
  car: Location;
};

export type Location = {
  row: number;
  column: number;
};

export type Cursor = {
  clientX: number;
  clientY: number;
};

export type Litres = number;

export const GAME_HEIGHT = 700;
export const GAME_WIDTH = 700;

const generateInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateLogo = (logos: Location[]): Location => {
  return logos[Math.floor(Math.random() * logos.length)];
};

export const generateGame = (rows: number = 10, columns: number = 10): Game => {
  const logos = Array.from({ length: rows }, (_, row) => ({
    row,
    column: generateInteger(0, columns - 1),
  }));
  const car = generateLogo(logos);
  return { rows, columns, logos, car };
};

export const fuelCar = (player: Cursor, field: Game): boolean => {
  const tileHeight = GAME_HEIGHT / field.rows;
  const tileWidth = GAME_WIDTH / field.columns;

  const minX = field.car.column * tileWidth;
  const maxX = (field.car.column + 1) * tileWidth;
  const minY = field.car.row * tileHeight;
  const maxY = (field.car.row + 1) * tileHeight;

  return (
    player.clientX >= minX &&
    player.clientX <= maxX &&
    player.clientY >= minY &&
    player.clientY <= maxY
  );
};

export const createGame =
  (
    canvas: HTMLCanvasElement,
    span: HTMLSpanElement,
    moneySpent: HTMLSpanElement
  ) =>
  ([images, fuel, field, score]: [Assets, Cursor, Game, Litres]) => {
    const context = canvas.getContext('2d');
    context?.clearRect(0, 0, canvas.width, canvas.height);

    const tileHeight = GAME_HEIGHT / field.rows;
    const tileWidth = GAME_WIDTH / field.columns;

    for (let row = 0; row < field.rows; row++) {
      for (let col = 0; col < field.columns; col++) {
        if (field.car.row === row && field.car.column === col) {
          context?.drawImage(
            images.car,
            col * tileWidth,
            row * tileHeight,
            tileWidth,
            tileHeight
          );
        } else if (
          !field.logos.some((w) => w.row === row && w.column === col)
        ) {
          context?.drawImage(
            images.track,
            col * tileWidth,
            row * tileHeight,
            tileWidth,
            tileHeight
          );
        } else {
          context?.drawImage(
            images.logo,
            col * tileWidth,
            row * tileHeight,
            tileWidth,
            tileHeight
          );
        }
      }
    }

    context?.drawImage(
      images.fuel,
      Math.floor(fuel.clientX - tileWidth / 2),
      Math.floor(fuel.clientY - tileHeight / 2),
      tileWidth,
      tileHeight
    );

    span.textContent = String(score);
    moneySpent.textContent = String((score * 1.317).toFixed(2));
  };
