import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";
type GLTFProps = JSX.IntrinsicElements["group"];

type HandModelProps = GLTFProps & {
  setScore: (fn: (prev: number) => number) => void;
};
function HandModel({ setScore, difficulty, ...props }: HandModelProps) {
  console.log("rerender");
  const { nodes, materials } = useGLTF("/Hand.glb");
  const [speed, setSpeed] = React.useState(1000);
  const expectedKeyRef = useRef<string | null>(null);
  const respondedRef = useRef(false);

  const getRotation = () => {
    const rotations = [
      //   { euler: new THREE.Euler(0, 0, 0), key: "ArrowUp" },
      { euler: new THREE.Euler(0, Math.PI / 2, 0), key: "ArrowRight" },
      { euler: new THREE.Euler(0, -Math.PI / 2, 0), key: "ArrowLeft" },
      { euler: new THREE.Euler(-Math.PI / 2, 0, 0), key: "ArrowUp" },
      { euler: new THREE.Euler(Math.PI / 2, 0, 0), key: "ArrowDown" },
    ];
    const randomIndex = Math.floor(Math.random() * rotations.length);
    return rotations[randomIndex];
  };

  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 120, friction: 20 },
  }));

  React.useEffect(() => {
    if (difficulty === "Medium") {
      setSpeed(500);
    } else if (difficulty === "Hard") {
      setSpeed(250);
    }
  }, [difficulty]);

  //   Update the target position every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      const { euler, key } = getRotation();
      // Animate the hand
      api.start({
        rotation: [euler.x, euler.y, euler.z],
      });
      // Set expected key and reset response
      expectedKeyRef.current = key;
      respondedRef.current = false;
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!expectedKeyRef.current || respondedRef.current) return;

      if (event.key === expectedKeyRef.current) {
        console.log("right");
        setScore((prev: number) => prev + 1);
      } else {
        console.log("wrong");
      }

      respondedRef.current = true;
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <a.group dispose={null} scale={5} rotation={spring.rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2098783903.geometry}
        material={materials.mat16}
      />
    </a.group>
  );
}

export default React.memo(HandModel);
useGLTF.preload("/Hand.glb");
