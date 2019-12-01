import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useThree, useFrame } from 'react-three-fiber';

import Comet from '../components/Comet';

function Scene() {
  const objectRef = useRef();
  const outerRef = useRef();
  const { camera } = useThree();

  camera.fov = 60;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 10000;

  camera.position.y = 10;
  camera.position.z = 150;

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.y += delta / 100;
    if (objectRef.current) objectRef.current.rotation.y += delta / 4;
  });

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <object3D>
        <mesh ref={outerRef} position={[0, 0, 0]}>
          <sphereBufferGeometry attach='geometry' args={[10, 32, 32]} />
          <meshLambertMaterial attach='material' color={0xffff00} />
        </mesh>
        <object3D ref={objectRef}>
          <React.Suspense fallback={<mesh />}>
            <Comet />
          </React.Suspense>
        </object3D>
      </object3D>
    </>
  );
}

export default Scene;
