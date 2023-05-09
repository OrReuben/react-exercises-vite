import React, { useState } from "react";

const Files = () => {
  type TEntry = {
    name: string;
    children?: TEntry[];
    expand?: boolean;
  };

  const [entries, setEntries] = useState({
    children: [
      {
        name: "src",
        children: [{ name: "AddDots.tsx", children: [{ name: "test" }] }],
      },
      { name: "public", children: [{ name: "vite.svg" }] },
      { name: ".gitignore" },
      { name: "index.html" },
    ],
  });

  function Entry({
    entry,
    depth,
    i,
  }: {
    entry: TEntry;
    depth: number;
    i: number;
  }) {
    const [expand, setExpand] = useState(false);

    return (
      <div>
        {entry.children ? (
          <button
            style={{
              marginLeft: `${depth * 20}px`,
            }}
            onClick={() => setExpand(!expand)}
          >
            {entry.children && "+"} {entry.name}{" "}
          </button>
        ) : (
          <>
            <span
              style={{
                marginLeft: `${depth * 20}px`,
              }}
            >
              {entry.children && "+"} {entry.name}{" "}
            </span>
          </>
        )}
        {expand &&
          entry.children?.map((entry, i) => (
            <div key={i}>
              <Entry entry={entry} depth={depth + 1} i={i} />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      {entries.children.map((entry, i) => (
        <div key={i}>
          <Entry entry={entry} depth={0} i={i} />
        </div>
      ))}
    </div>
  );
};

export default Files;
