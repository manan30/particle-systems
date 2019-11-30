import React from 'react';
import { useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three';

import CometTrail from './CometTrail';
import CometTextureURL from '../textures/texture.jpg';
import CometRoughnessTextureURL from '../textures/roughness.jpg';

function Asset({ url }) {
  const loadTexture = useLoader(TextureLoader, url);
  return loadTexture;
}

function Comet() {
  const cometGroupRef = React.useRef();
  const cometRef = React.useRef();
  const cometTexture = Asset({ url: CometTextureURL });
  const CometRoughnessTexture = Asset({ url: CometRoughnessTextureURL });

  return (
    <group ref={cometGroupRef} position={[100, 5, 0]}>
      <mesh ref={cometRef}>
        <sphereBufferGeometry attach='geometry' args={[0.9, 360, 360]} />
        <meshStandardMaterial
          attach='material'
          map={cometTexture}
          roughnessMap={CometRoughnessTexture}
          roughness={0.8}
        />
      </mesh>
      <CometTrail />
    </group>
  );
}

export default Comet;
