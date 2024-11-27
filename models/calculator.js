function calculatePaint(walls) {
  const paintCoveragePerLiter = 5; // 1L cobre 5m²
  const paintCanSizes = [18, 3.6, 2.5, 0.5]; // Tamanhos das latas
  let totalArea = 0;

  // Calcular a área total das paredes
  walls.forEach(({ width, height, doors, windows }) => {
    const wallArea = width * height;
    const doorArea = doors * 0.8 * 1.9; // Área das portas
    const windowArea = windows * 2.0 * 1.2; // Área das janelas
    totalArea += wallArea - doorArea - windowArea;
  });

  // Calcular os litros necessários
  const litersRequired = totalArea / paintCoveragePerLiter;
  let remainingLiters = litersRequired;

  // Calcular a quantidade de latas necessárias
  const cans = paintCanSizes.map((size) => {
    const numCans = Math.floor(remainingLiters / size);  // Calcular quantas latas de cada tamanho
    remainingLiters -= numCans * size;  // Subtrair a quantidade de tinta que já foi coberta
    return { size, quantity: numCans };
  });

  // Se ainda houver tinta restante (menos de 1L), devemos adicionar a lata menor necessária
  if (remainingLiters > 0) {
    const lastCan = cans[cans.length - 1];
    lastCan.quantity += 1;  // Adicionar uma lata do menor tamanho disponível
  }

  return {
    totalArea,
    litersRequired: litersRequired, // Total de tinta necessário, arredondado para cima
    cans: cans.filter((can) => can.quantity > 0), // Retorna apenas as latas que foram utilizadas
  };
}

exports.calculatePaint = calculatePaint;
