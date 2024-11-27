import database from "infra/database";
import { calculatePaint } from "models/calculator";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { walls } = req.body; // Recebe os dados das paredes do frontend

  if (!walls || !Array.isArray(walls)) {
    return res.status(400).json({ error: 'Dados inválidos. É necessário enviar as paredes.' });
  }

  try {
    const validationResults = validateWalls(walls);
    if (!validationResults.isValid) {
      // Retornando erros com quebras de linha
      return res.status(400).json({ error: validationResults.errors.join('\n') });
    }

    const paintResult = calculatePaint(walls);

    await database.query({
      text: "INSERT INTO paints (total_area, liters_required,cans) VALUES ($1,$2,$3);",
      values: [paintResult.totalArea, paintResult.litersRequired, JSON.stringify(paintResult.cans)]
    });

    return res.status(200).json({ success: true, data: paintResult });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro no servidor', details: error.message });
  }
}

// Função para validar as paredes
function validateWalls(walls) {
  const errors = [];
  const doorArea = 0.8 * 1.9;
  const windowArea = 2.0 * 1.2;

  for (let i = 0; i < walls.length; i++) {
    const { width, height, doors, windows } = walls[i];
    const wallArea = width * height;
    const openingsArea = doors * doorArea + windows * windowArea;

    if (wallArea < 1 || wallArea > 50) {
      errors.push(`Parede ${i + 1} deve ter entre 1 e 50 metros quadrados.`);
    }

    if (openingsArea > wallArea * 0.5) {
      errors.push(`Aberturas da Parede ${i + 1} não podem exceder 50% da área da parede.`);
    }

    if (doors > 0 && height < 1.9 + 0.3) {
      errors.push(`Parede ${i + 1} com portas deve ter altura mínima de 2.2 metros.`);
    }
  }

  return { isValid: errors.length === 0, errors };
}
