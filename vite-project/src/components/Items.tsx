import React, { useState } from "react";

const Items = () => {
  type TCenter = {
    totalItems: number;
    customersCart: number[];
  };
  const [shoppingCenters, setShoppingCenters] = useState<TCenter[]>([
    { totalItems: 0, customersCart: [] },
    { totalItems: 0, customersCart: [] },
    { totalItems: 0, customersCart: [] },
    { totalItems: 0, customersCart: [] },
    { totalItems: 0, customersCart: [] },
  ]);
  const [input, setInput] = useState(1);

  const handleCheckout = () => {
    const updatedCenters = shoppingCenters.map((center) => {
      const updatedCenter = { ...center };
      updatedCenter.totalItems = updatedCenter.customersCart.reduce(
        (sum, num) => (sum += num),
        0
      );
      return updatedCenter;
    });

    const lowestToHighest = [...updatedCenters].sort(
      (a, b) => a.totalItems - b.totalItems
    );

    lowestToHighest[0].customersCart.push(input);
    setShoppingCenters(updatedCenters);
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "30px 0px" }}>
        <input
          type="number"
          onChange={(e) => setInput(e.currentTarget.valueAsNumber)}
        />{" "}
        <button onClick={() => handleCheckout()}>Checkout</button>
      </div>
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        {shoppingCenters.map((shoppingCenter, i) => (
          <section
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{ width: 200, height: 200, border: "3px solid black" }}
            ></div>
            {shoppingCenter.customersCart.map((cart, i) => (
              <div
                key={i}
                style={{
                  width: 150,
                  height: 150,
                  border: "3px solid black",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px 0px",
                }}
              >
                {cart}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Items;
