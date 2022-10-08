import { useEffect, useState } from "react";
import { GrFlagFill } from "react-icons/gr";
import { BsCircleFill } from "react-icons/bs";

function Tablero({ playState, losed, setLosed, win, setWin, setBanderas }) {
  const { filas, columnas, minas } = playState;

  const colores = {
    "-1": "text-red-500",
    0: "text-gray-500",
    1: "text-blue-500",
    2: "text-green-500",
    3: "text-red-500",
    4: "text-purple-500",
    5: "text-yellow-500",
    6: "text-pink-500",
    7: "text-cyan-500",
    8: "text-lime-500",
  };

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const crearTablero = (dimenciones) => {
    const tablero = [];
    for (let i = 0; i < dimenciones[0]; ++i) {
      tablero.push(
        dimenciones.length === 1 ? 0 : crearTablero(dimenciones.slice(1))
      );
    }
    return tablero;
  };

  const obtenerVecinos = (fila, columna, filas, columnas) => {
    const vecinos = [];
    if (fila > 0) {
      vecinos.push([fila - 1, columna]); //Arriba
    }
    if (fila < filas - 1) {
      vecinos.push([fila + 1, columna]); //Abajo
    }
    if (columna > 0) {
      vecinos.push([fila, columna - 1]); //Izquierda
    }
    if (columna < columnas - 1) {
      vecinos.push([fila, columna + 1]); //Derecha
    }

    if (fila > 0 && columna > 0) {
      vecinos.push([fila - 1, columna - 1]); //Arriba Izquierda
    }
    if (fila < filas - 1 && columna < columnas - 1) {
      vecinos.push([fila + 1, columna + 1]); //Abajo Derecha
    }
    if (fila > 0 && columna < columnas - 1) {
      vecinos.push([fila - 1, columna + 1]); //Arriba Derecha
    }
    if (fila < filas - 1 && columna > 0) {
      vecinos.push([fila + 1, columna - 1]); //Abajo Izquierda
    }

    return vecinos;
  };

  const buscaminas = (filas, columnas, minas) => {
    const tablero = crearTablero([filas, columnas]);
    let posision_minas = new Set();

    if (minas < filas * columnas) {
      while (minas > posision_minas.size) {
        const fila = randomNumber(0, filas);
        const columna = randomNumber(0, columnas);
        const posision = `[${fila},${columna}]`;

        if (posision_minas.has(posision)) {
          continue;
        }

        posision_minas.add(posision);
        tablero[fila][columna] = -1;
      }
    }

    posision_minas = Array.from(posision_minas, JSON.parse);

    posision_minas.forEach((posision) => {
      const vecinos = obtenerVecinos(posision[0], posision[1], filas, columnas);
      vecinos.map((vecino) => {
        if (tablero[vecino[0]][vecino[1]] !== -1) {
          tablero[vecino[0]][vecino[1]] += 1;
        }
      });
    });

    return tablero;
  };

  const [tablero, setTablero] = useState(crearTablero([filas, columnas]));
  const [covered, setCovered] = useState(crearTablero([filas, columnas]));
  const visitados = new Set();

  const descubrir = (fila, columna) => {
    if (losed || win) return;

    setCovered((prev) => {
      const newCovered = [...prev];
      newCovered[fila][columna] = 1;
      return newCovered;
    });

    if (tablero[fila][columna] === -1) {
      setLosed(true);

      setCovered((prev) => {
        const newCovered = [...prev];
        for (let i = 0; i < filas; ++i) {
          for (let j = 0; j < columnas; ++j) {
            if (tablero[i][j] === -1) {
              newCovered[i][j] = 1;
            }
          }
        }
        return newCovered;
      });
    }

    if (tablero[fila][columna] === 0) {
      const vecinos = obtenerVecinos(fila, columna, filas, columnas);

      vecinos.map((vecino) => {
        const visitado = `[${vecino[0]},${vecino[1]}]`;

        if (visitados.has(visitado)) {
          return;
        }

        visitados.add(`[${fila},${columna}]`, visitado);

        descubrir(vecino[0], vecino[1]);
      });
    }
  };

  const marcar = (e, fila, columna) => {
    e.preventDefault();

    if (losed || win) return;

    if (covered[fila][columna] === "flag") {
      setBanderas((prev) => prev + 1);

      setCovered((prev) => {
        const newCovered = [...prev];
        newCovered[fila][columna] = 0;
        return newCovered;
      });
    } else {
      setBanderas((prev) => prev - 1);
      setCovered((prev) => {
        const newCovered = [...prev];
        newCovered[fila][columna] = "flag";
        return newCovered;
      });
    }
  };

  useEffect(() => {
    setTablero(buscaminas(filas, columnas, minas));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let coveredCells = 0;
    for (let i = 0; i < filas; ++i) {
      for (let j = 0; j < columnas; ++j) {
        if (covered[i][j] === 0 || covered[i][j] === "flag") {
          coveredCells++;
        }
      }
    }
    if (coveredCells === minas) {
      setWin(true);
    }
    console.log(coveredCells, minas);
  }, [columnas, covered, filas, minas, setWin]);

  return (
    <table
      className={`bg-gray-800 font-bold table-fixed border ${
        losed ? "border-red-500" : win ? "border-green-500" : "border-gray-500"
      }`}
    >
      <tbody>
        {tablero.map((fila, i) => {
          return (
            <tr key={i}>
              {fila.map((columna, j) => {
                return covered[i][j] === 0 ? (
                  <td
                    onContextMenu={(e) => {
                      marcar(e, i, j);
                    }}
                    onClick={() => {
                      descubrir(i, j);
                    }}
                    key={j}
                    className={`w-10 h-10 text-center ${
                      losed || win ? "" : "hover:bg-gray-700"
                    } ${colores[columna]} not-selectable`}
                  />
                ) : covered[i][j] === "flag" ? (
                  <td
                    onContextMenu={(e) => {
                      marcar(e, i, j);
                    }}
                    key={j}
                    className={`w-10 h-10 bg-gray-800 text-center hover:bg-gray-700 text-green-600 not-selectable`}
                  >
                    {<GrFlagFill />}
                  </td>
                ) : (
                  <td
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    key={j}
                    className={`w-10 h-10 text-center bg-gray-900 ${colores[columna]} not-selectable`}
                  >
                    {columna === -1 ? (
                      <BsCircleFill />
                    ) : columna === 0 ? (
                      ""
                    ) : (
                      columna
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Tablero;
