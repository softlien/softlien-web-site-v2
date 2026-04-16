"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

type HeroMeshBackgroundProps = {
  className?: string;
};

function MeshPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(0);
  // const { viewport } = useThree();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(6, 6, 64, 64),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const h = Math.max(1, window.innerHeight);
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const targetX = state.mouse.x;
    const targetY = state.mouse.y;

    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, targetX, 0.1);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, targetY, 0.1);

    const t = state.clock.getElapsedTime();
    const s = scrollRef.current;
    const h = hoverRef.current;

    meshRef.current.rotation.z = t * 0.08 + s * 0.55;
    meshRef.current.rotation.y = s * 0.35;
    meshRef.current.position.y = -0.15 + s * 0.25;

    const rotateIntensity = 0.4 * h;
    meshRef.current.rotation.x = -Math.PI / 2 + mouseRef.current.y * rotateIntensity;
    meshRef.current.rotation.y += mouseRef.current.x * rotateIntensity;

    const shiftIntensity = 0.5 * h;
    meshRef.current.position.x = -mouseRef.current.x * shiftIntensity;

    meshRef.current.position.y += -mouseRef.current.y * shiftIntensity;
  });

  const handlePointerOver = () => {
    gsap.to(hoverRef, { current: 1, duration: 0.6, ease: "power2.out" });
  };

  const handlePointerOut = () => {
    gsap.to(hoverRef, { current: 0, duration: 1, ease: "power2.out" });
  };

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation-x={-Math.PI / 2}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerMove={() => {

      }}
    >
      <MeshDistortMaterial
        color="#b74343"
        roughness={0.35}
        metalness={0.25}
        distort={0.35}
        speed={1.4}
        wireframe
      />
    </mesh>
  );
}

export function HeroMeshBackground({ className }: HeroMeshBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayScrollRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      const h = Math.max(1, window.innerHeight);
      overlayScrollRef.current = Math.min(1, Math.max(0, window.scrollY / h));

      const el = overlayRef.current;
      if (!el) return;

      const s = overlayScrollRef.current;
      el.style.transform = `translate3d(0, ${s * -14}px, 0) scale(${1 + s * 0.04})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <div className={className}>
      {!reducedMotion && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 2.4, 2.8], fov: 45 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[2, 3, 2]} intensity={1.1} />
          <MeshPlane />
        </Canvas>
      )}

      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px circle at 20% 20%, rgba(255,255,255,0.30), transparent 55%), radial-gradient(700px circle at 80% 30%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(900px circle at 50% 80%, rgba(255,255,255,0.14), transparent 55%)",
          filter: "blur(22px)",
          animation: reducedMotion
            ? undefined
            : "softlien-mesh-float 10s ease-in-out infinite",
        }}
      />
    </div>
  );
}
