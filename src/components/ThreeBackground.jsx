import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Particles from "./Particles";

export default function ThreeBackground() {
  // Disable on small screens to keep performance smooth.
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
