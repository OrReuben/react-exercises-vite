import { useRef, useState } from "react";

function AddTiles() {
  const [tiles, setTiles] = useState(["A", "B", "C"]);
  const tileRef = useRef<HTMLDivElement>(null);
  const updateValues = (value: string, i: number): void => {
    const newTiles = [...tiles];
    newTiles[i] = value;
    setTiles(newTiles);
  };

  const handleAddTile = (i: number): void => {
    const newTiles = [...tiles];
    newTiles.splice(i + 1, 0, "");
    setTiles(newTiles);
    const inputRef: any = tileRef.current?.childNodes[i + 1].childNodes[0];
    inputRef?.focus();
  };

  return (
    <section className="tiles" ref={tileRef}>
      {tiles.map((tile, i) => (
        <div key={i} className="tile">
          <input
            type="text"
            value={tile}
            onChange={(e) => updateValues(e.currentTarget.value, i)}
          />{" "}
          {i < tiles.length - 1 && (
            <span onClick={() => handleAddTile(i)} className="add"></span>
          )}
        </div>
      ))}
      {tiles.join("")}
    </section>
  );
}

export default AddTiles;
