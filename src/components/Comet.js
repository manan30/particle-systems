import React from 'react';
import PropTypes from 'prop-types';
import { useLoader, useFrame } from 'react-three-fiber';
import { TextureLoader } from 'three';

import CometTextureURL from '../textures/texture.jpg';
import CometRoughnessTextureURL from '../textures/roughness.jpg';

function Asset({ url }) {
  const loadTexture = useLoader(TextureLoader, url);
  return loadTexture;
}

function Comet() {
  const cometRef = React.useRef();
  const cometTexture = Asset({ url: CometTextureURL });
  const CometRoughnessTexture = Asset({ url: CometRoughnessTextureURL });

  // useFrame((_, delta) => {
  //   cometRef.current.position.x += delta;
  //   cometRef.current.position.y += delta;
  // });

  return (
    <mesh ref={cometRef}>
      <sphereBufferGeometry attach='geometry' args={[0.2, 360, 360]} />
      <meshStandardMaterial
        attach='material'
        map={cometTexture}
        roughnessMap={CometRoughnessTexture}
        roughness={0.8}
      />
    </mesh>
  );
}

// Comet.propTypes = {
//   setRef: PropTypes.objectOf(PropTypes.any)
// };

// Comet.defaultProps = {
//   setRef: {}
// };
export default Comet;
