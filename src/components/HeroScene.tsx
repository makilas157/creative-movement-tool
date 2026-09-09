import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const { x, y } = state.pointer;
    if (shell.current) {
      shell.current.rotation.y += dt * 0.22;
      shell.current.rotation.x += dt * 0.09;
    }
    if (core.current) {
      core.current.rotation.y -= dt * 0.35;
    }
    if (ring.current) {
      ring.current.rotation.z += dt * 0.14;
    }
    // gentle look-toward-cursor on the whole group's parent
    const group = shell.current?.parent;
    if (group) {
      const tx = y * 0.18;
      const ty = x * 0.28;
      group.rotation.x += (tx - group.rotation.x) * (1 - Math.exp(-3 * dt));
      group.rotation.y += (ty - group.rotation.y) * (1 - Math.exp(-3 * dt));
    }
  });

  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#f0a24a" wireframe transparent opacity={0.32} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color="#3a2415"
          emissive="#e8721f"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.28}
          flatShading
        />
      </mesh>
      <mesh ref={ring} rotation-x={Math.PI / 2.3}>
        <torusGeometry args={[3, 0.02, 8, 96]} />
        <meshBasicMaterial color="#ffbd6b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffc98a" />
      <pointLight position={[-5, -2, 2]} intensity={12} color="#e8721f" distance={14} />
      <Environment>
        <Lightformer intensity={1.6} position={[0, 4, 2]} scale={[8, 8, 1]} color="#ffd8a8" />
        <Lightformer
          intensity={1}
          color="#e8721f"
          position={[-5, 0, -1]}
          rotation-y={Math.PI / 2}
          scale={[16, 2, 1]}
        />
      </Environment>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
        <Core />
      </Float>
    </Canvas>
  );
}
