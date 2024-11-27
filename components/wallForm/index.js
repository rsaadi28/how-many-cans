import { useState } from 'react';
import WallInput from './wallInput';
import styles from './style.module.css';

const WALLS = [
  { width: 0, height: 0, doors: 0, windows: 0 },
  { width: 0, height: 0, doors: 0, windows: 0 },
  { width: 0, height: 0, doors: 0, windows: 0 },
  { width: 0, height: 0, doors: 0, windows: 0 },
];

export default function Home() {
  const [walls, setWalls] = useState(WALLS);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (index, field, value) => {
    const updatedWalls = [...walls];
    updatedWalls[index][field] = parseFloat(value) || 0;
    setWalls(updatedWalls);
  };

  const handleSubmit = async () => {
    try {
      console.log(JSON.stringify({ walls }));
      setError(null);
      const response = await fetch('/api/v1/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walls }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data.data);
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      setResult(null);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles['walls-container']}>
        {walls.map((wall, index) => (
          <div key={index} className={styles['wall-item']}>
            <h3>Parede {index + 1}</h3>
            <WallInput
              wall={wall}
              index={index}
              handleInputChange={handleInputChange}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Calcular</button>

      {error && (
        <div style={{ color: 'red' }}>
          {error.split('\n').map((err, index) => (
            err.trim() ? <p key={index}>{err.trim()}</p> : null
          ))}
        </div>
      )}

      {result && (
        <div className={styles.result}>
          <h2>Resultado</h2>
          <p>Área total: {result.totalArea} m²</p>
          <p>Litros necessários: {result.litersRequired} L</p>
          <ul>
            {result.cans.map((can) => (
              <li key={can.size}>
                {can.quantity}x {can.size} L
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
