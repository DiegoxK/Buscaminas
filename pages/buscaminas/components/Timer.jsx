import { useEffect, useState } from "react";

function Timer({ timer, setTimer }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimer(
      setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((prev) => prev + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000)
    );

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="flex mb-4">
      <h3 className="mr-1">Tiempo:</h3>
      <h4>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </h4>
    </div>
  );
}

export default Timer;
