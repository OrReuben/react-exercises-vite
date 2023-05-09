import React, { useEffect } from "react";

const Example2 = ({ setData }:any) => {
  useEffect(() => {
    // let disabled = false;
    const fetchData = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const jsonData = await data.json();
      // if (!disabled) {
        setData(jsonData);
      // }
    };
    fetchData();

    // return () => {
    //   disabled = true;
    //   setData([]);
    // };
    
  }, []);
  return <div>Example2</div>;
};

export default Example2;
