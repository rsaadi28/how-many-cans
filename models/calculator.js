import { DOOR_AREA, WINDOW_AREA, PAINT_COVERAGE_PER_LITER, PAINT_CAN_SIZES } from "constants/constants";

function calculatePaint(walls) {
  let totalArea = 0;

  // Calcular a área total das paredes
  walls.forEach(({ width, height, doors, windows }) => {
    const wallArea = width * height;
    const doorArea = doors * DOOR_AREA;
    const windowArea = windows * WINDOW_AREA;
    totalArea += wallArea - doorArea - windowArea;
  });

  // Calcular os litros necessários
  const litersRequired = totalArea / PAINT_COVERAGE_PER_LITER;
  let remainingLiters = litersRequired;

  // Calcular a quantidade de latas necessárias
  const cans = PAINT_CAN_SIZES.map((size) => {
    const numCans = Math.floor(remainingLiters / size);
    remainingLiters -= numCans * size;
    return { size, quantity: numCans };
  });

  // Se ainda houver tinta restante (menos de 1L), devemos adicionar a lata menor necessária
  if (remainingLiters > 0) {
    const lastCan = cans[cans.length - 1];
    lastCan.quantity += 1;
  }

  return {
    totalArea,
    litersRequired,
    cans: cans.filter((can) => can.quantity > 0),
  };
}

export { calculatePaint };
