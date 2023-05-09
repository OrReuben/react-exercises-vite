import { useState } from "react";
import Example2 from "./Example2";
const Example = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  console.log(data);

  return (
    <div>
      <button onClick={() => setShow(!show)}>click</button>
      {show && <Example2 setData={setData} />}
    </div>
  );
};

export default Example;
