import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';

import { Vector3 } from 'three';
import Comet from '../components/Comet';
import Particles from '../components/ParticleSystem';

function Scene() {
  const cometRef = useRef();
  const particlesRef = useRef();
  const { camera, scene } = useThree();

  camera.fov = 45;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 1000;

  camera.position.z = 5;

  React.useEffect(() => console.log(particlesRef.current.parent));

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.parent.position.x += delta * 100;
      particlesRef.current.parent.position.y += delta * 100;
    }
  });

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <group>
        <React.Suspense fallback={<mesh />}>
          <Comet />
        </React.Suspense>
        <Particles setRef={particlesRef} />
      </group>
    </>
  );
}

export default Scene;
