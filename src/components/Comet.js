import React from 'react';
import { useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import CometTrail from './CometTrail';
import CometTextureURL from '../textures/texture.jpg';
import CometRoughnessTextureURL from '../textures/roughness.jpg';

// const params = { particles: 500 };
const GUIControls = new GUI({ particles: 500 });

function Asset({ url }) {
  const loadTexture = useLoader(TextureLoader, url);
  return loadTexture;
}

function Comet() {
  const [particles, setParticles] = React.useState(500);
  const cometGroupRef = React.useRef();
  const cometRef = React.useRef();
  const cometTexture = Asset({ url: CometTextureURL });
  const CometRoughnessTexture = Asset({ url: CometRoughnessTextureURL });

  React.useMemo(
    () =>
      GUIControls.add(
        { particles: 5000 },
        'particles',
        0,
        50000
      ).onFinishChange(e => setParticles(parseInt(e, 10))),
    []
  );

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
      <CometTrail particles={particles} />
    </group>
  );
}

export default Comet;
