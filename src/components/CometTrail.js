import React from 'react';
import { useFrame } from 'react-three-fiber';
import Particles from '../utils/Particle';

function CometTrail() {
  const trailRef = React.useRef();

  const trail = new Particles({
    color: 0xff5a00,
    size: 0.02,
    rangeHorizontal: 0.9,
    rangeVertical: 4.5,
    pointCount: 10000,
    speed: 0.001
  });

  trail.rotation.set(-Math.PI / 2, 0, 0);

  useFrame(({ clock }) => {
    if (clock.elapsedTime > 5) {
      return;
    }
    if (trailRef.current) trailRef.current.update();
  });

  return <primitive object={trail} ref={trailRef} />;
}

export default CometTrail;
