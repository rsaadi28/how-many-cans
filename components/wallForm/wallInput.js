export default function WallInput({ index, wall, handleInputChange }) {
  return (
    <>
      <label>Largura</label>
      <input
        type="number"
        step="0.1"
        min="0"
        placeholder="Largura"
        value={wall.width}
        onChange={(e) => handleInputChange(index, 'width', e.target.value)}
      />
      <label>Altura</label>
      <input
        type="number"
        step="0.1"
        min="0"
        placeholder="Altura"
        value={wall.height}
        onChange={(e) => handleInputChange(index, 'height', e.target.value)}
      />
      <label>Portas</label>
      <input
        type="number"
        step="0.1"
        min="0"
        placeholder="Portas"
        value={wall.doors}
        onChange={(e) => handleInputChange(index, 'doors', e.target.value)}
      />
      <label>Janelas</label>
      <input
        type="number"
        step="0.1"
        min="0"
        placeholder="Janelas"
        value={wall.windows}
        onChange={(e) => handleInputChange(index, 'windows', e.target.value)}
      />
    </>
  );
}