import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const count = 44;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y += dt * 0.045;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={group}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#ffbd6b"
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          opacity={0.28}
        />
      </Points>
    </group>
  );
}

function Core() {
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0, idle: 0 });

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const { x, y } = state.pointer;

    // track pointer stillness for idle breathing
    const moved = Math.abs(x - pointer.current.x) + Math.abs(y - pointer.current.y);
    pointer.current.x = x;
    pointer.current.y = y;
    pointer.current.idle = moved > 0.002 ? 0 : Math.min(pointer.current.idle + dt, 2);
    const idleFactor = Math.min(pointer.current.idle / 1.2, 1);

    if (shell.current) {
      shell.current.rotation.y += dt * 0.22;
      shell.current.rotation.x += dt * 0.09;
    }
    if (core.current) {
      core.current.rotation.y -= dt * 0.35;
      const breathe = 1 + Math.sin(state.clock.elapsedTime * (Math.PI * 2) / 4) * 0.01 * idleFactor;
      core.current.scale.setScalar(breathe);
    }
    if (ring.current) {
      ring.current.rotation.z += dt * 0.14;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= dt * 0.07;
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
      <mesh ref={ring2} rotation-x={Math.PI / 2.3 + (40 * Math.PI) / 180} rotation-y={0.4}>
        <torusGeometry args={[3.5, 0.012, 8, 96]} />
        <meshBasicMaterial color="#e8721f" transparent opacity={0.24} />
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
      <fog attach="fog" args={["#14100c", 9, 19]} />
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
      <Particles />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
        <Core />
      </Float>
    </Canvas>
  );
}
