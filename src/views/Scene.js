import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';

import Comet from '../components/Comet';

function Scene() {
  const cometRef = useRef();
  const { camera } = useThree();

  camera.fov = 45;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 1000;

  camera.position.z = 50;

  // useFrame((_, delta) => {
  //   // if (cometRef.current) {
  //   //   cometRef.current.position.x += delta;
  //   //   cometRef.current.position.y += delta;
  //   // }
  // });

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <React.Suspense fallback={<mesh />}>
        <Comet setRef={cometRef} />
      </React.Suspense>
    </>
  );
}

export default Scene;
