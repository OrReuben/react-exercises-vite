import React, { useState } from "react";

const AddDots = () => {
  type Dot = {
    left: number;
    top: number;
    color: string;
  };
  const [dots, setDots] = useState<Dot[]>([]);
  const [currentColor, setCurrentColor] = useState("red");
  const [active, setActive] = useState<number>();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    console.log(e.clientX);
    const left = e.clientX - 125;
    const top = e.clientY - 20;
    const color = currentColor;
    setDots((prev) => [...prev, { left, top, color }]);
  };

  const handleChangeColor = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    i: number
  ): void => {
    setActive(i);
    setCurrentColor(e.currentTarget.style.backgroundColor);
  };
  return (
    <main className="container">
        <section className="choose-color">
          {["red", "yellow", "green", "purple", "cyan", "pink"].map(
            (color, i) => (
              <div
                className="edot"
                onClick={(e) => handleChangeColor(e, i)}
                style={{
                  backgroundColor: color,
                  border: i === active ? "3px solid black" : "none",
                }}
              ></div>
            )
          )}
        </section>
        <section className="dot-wrapper" onClick={(e) => handleClick(e)}>
          {dots.map((dot, i) => (
            <div
              key={i}
              className="dot"
              style={{
                left: `${dot.left}px`,
                top: `${dot.top}px`,
                backgroundColor: dot.color,
              }}
            ></div>
          ))}
        </section>
      </main>
  );
};

export default AddDots;
