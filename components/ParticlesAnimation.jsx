import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesAnimation() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="relative h-screen"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            resize: true,
          },
        },
        particles: {
          color: {
            value: "#22c55e",
          },
          links: {
            color: "#22c55e",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: "none",
            enable: true,
            random: false,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 15,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
