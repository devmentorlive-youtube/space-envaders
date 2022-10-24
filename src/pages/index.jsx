import { useState, useEffect, useRef } from "react";

export default function Homepage() {
  const [baddies, setBaddies] = useState(
    [...new Array(3)].map(() => [...new Array(5)].map(() => ({ dead: false })))
  );
  const [offset, setOffset] = useState([0, 0]);
  const step = 10;

  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = function onTick() {
      setOffset((prev) => [prev[0] + step, prev[1] + step * 0.1]);
    };

    const id = setInterval(() => {
      if (typeof ref.current !== "function") return;
      ref.current();
    }, 1000);

    return () => clearInterval(id);
  }, []);

  function mutate(i, j, value = {}) {
    setBaddies((prev) => [
      ...prev.map((row, _i) =>
        row.map((_, _j) =>
          _i === i && _j === j
            ? { ...baddies[i][j], ...value }
            : baddies[_i][_j]
        )
      ),
    ]);
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-full md:w-[500px] md:h-[800px] bg-black mx-auto">
        <div className="relative">
          <div
            className="flex flex-col gap-2 absolute"
            style={{
              left: offset[0] + "px",
              top: offset[1] + "px",
            }}>
            {baddies.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                {row.map((baddie, j) => (
                  <div
                    key={j}
                    className={`w-[80px] h-[80px] border ${
                      baddie.dead ? "border-red-500" : " border-white"
                    }`}
                    onClick={() =>
                      mutate(i, j, {
                        dead: !baddies[i][j].dead,
                      })
                    }></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
