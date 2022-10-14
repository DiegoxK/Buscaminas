import Image from "next/image";
import { useEffect, useState } from "react";
import Tablero from "./Tablero";
import { BsFillGearFill } from "react-icons/bs";
import Head from "next/head";

export default function Buscaminas() {
  const [started, setStarted] = useState(false);
  const [config, setConfig] = useState(false);
  const [losed, setLosed] = useState(false);
  const [win, setWin] = useState(false);
  const [playState, setPlayState] = useState({
    filas: 16,
    columnas: 30,
    minas: 99,
  });

  const [banderas, setBanderas] = useState(playState.minas);

  const onchange = (e) => {
    setPlayState({
      ...playState,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  useEffect(() => {
    setBanderas(playState.minas);
  }, [playState]);

  return (
    <>
      <Head>
        <title>Buscamina</title>
      </Head>
      <div className="h-full my-auto flex flex-col justify-center items-center">
        {started ? (
          <>
            <h1 className="text-5xl font-bold text-green-500">Buscaminas</h1>
            <p>Minas Restantes {banderas}</p>
            <div className="text-center font-bold text-green-500">
              <div
                onClick={() => {
                  setStarted(false);
                  setLosed(false);
                  setWin(false);
                  setPlayState({
                    filas: 16,
                    columnas: 30,
                    minas: 99,
                  });
                  setBanderas(playState.minas);
                }}
                className={`cursor-pointer min-w-fit border-t border-l border-r ${
                  losed
                    ? "border-red-500"
                    : win
                    ? "border-green-500"
                    : "border-gray-500"
                }`}
              >
                Reset
              </div>
              <Tablero
                playState={playState}
                setPlayState={setPlayState}
                losed={losed}
                setLosed={setLosed}
                win={win}
                setWin={setWin}
                setBanderas={setBanderas}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-5 text-green-500">
              Buscaminas
            </h1>
            <Image width={200} height={200} src="/Kokomi 4.png" alt="Jean1" />
            <div className="mt-5">
              <button
                className="bg-green-600 hover:bg-green-500 mr-3 text-white font-bold py-2 px-4 rounded"
                onClick={() => setStarted(true)}
              >
                Comenzar!
              </button>
              <button
                className="bg-green-600 text-center hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => setConfig((prev) => !prev)}
              >
                <BsFillGearFill />
              </button>
            </div>
            {config && (
              <div className="bg-gray-700 p-10 rounded-lg mt-5">
                <form>
                  <FormInput
                    name="filas"
                    onchange={onchange}
                    value={playState.filas}
                  >
                    Filas
                  </FormInput>
                  <FormInput
                    name="columnas"
                    onchange={onchange}
                    value={playState.columnas}
                  >
                    Columnas
                  </FormInput>
                  <FormInput
                    name="minas"
                    onchange={onchange}
                    value={playState.minas}
                  >
                    Minas
                  </FormInput>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const FormInput = ({ children, value, onchange, name }) => {
  return (
    <>
      <label className="ml-3 mr-1" htmlFor={name}>
        {children}
      </label>
      <input
        className="rounded-sm w-12 py-1 bg-gray-800 text-center focus:outline-none text-white focus:ring-0 focus:border-transparent"
        value={value}
        onChange={onchange}
        type="number"
        name={name}
        id={name}
      />
    </>
  );
};
