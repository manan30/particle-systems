import React from 'react';
import {
  Group,
  SphereBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  Geometry,
  PointsMaterial,
  Points
} from 'three';
import { useThree, useFrame } from 'react-three-fiber';

const random = (min, max) => min + Math.random() * (max - min);

// const createPoints = times => {
//   const points = () => {
//     const vector = new Vector3(0, 0, 0);

//     vector.velocity = new Vector3(
//       Math.random() * 20 + 10,
//       Math.random() * 4 - 2,
//       Math.random() * 4 - 2
//     );

//     vector.lifetime = 255;

//     return vector;
//   };

//   const geometry = new Geometry();

//   for (let i = 0; i < times; i += 1) {
//     geometry.vertices.push(points());
//   }

//   return geometry;
// };

const createParticleMesh = () => {
  const particleGeometry = new SphereBufferGeometry(0.01);
  const particleMaterial = new MeshLambertMaterial({
    color: 'red',
    transparent: true,
    opacity: 1
  });

  return new Mesh(particleGeometry, particleMaterial);
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

function Particles({ setRef }) {
  const { scene } = useThree();
  const particles = [];

  const generateParticle = () => {
    const particleMesh = createParticleMesh();
    particleMesh.position.x += 0;
    particleMesh.position.y += 0;

    scene.add(particleMesh);
    particles.push(particleMesh);
  };

  generateParticle(1000);

  useFrame(() => {
    if (particles.length <= 10000) generateParticle();

    particles.forEach(particle => {
      particle.material.opacity -= 0.008;

      if (particle.material.opacity <= 0) {
        particle.position.x = 0;
        particle.position.y = 0;
        particle.material.opacity = 1;
      }

      particle.position.x += 0.002 + (randomRange(-0.01, 0.08) / 1) * 0.8;
      particle.position.y += 0.002 + (randomRange(-0.01, 0.08) / 1) * 0.8;
    });
  });
  // const particleGeometry = new SphereBufferGeometry(0.01);
  // const particleMaterial = new MeshLambertMaterial({
  //   color: 'red',
  //   transparent: true,
  //   opacity: 1
  // });

  // new Array(1000).fill().forEach(() => {
  //   const particle = new Mesh(particleGeometry, particleMaterial);

  //   particle.position.set(0, 0, 0);
  //   particle.velocity = new Vector3(
  //     0 + Math.random() * 3 - 3 / 2,
  //     0 + Math.random() * 3 - 3 / 2,
  //     0 // Math.random() * 4 - 2
  //   );
  //   particle.acceleration = new Vector3(0, -0.001, 0);
  //   particle.lifetime = 255;

  //   particle.isDead = () => {
  //     return particle.lifetime < 0.0;
  //   };

  //   particles.add(particle);
  // });

  // particles.rotateX(Math.PI / 4);
  // particles.position.z = -4;

  return <primitive object={particles} ref={setRef} />;
}

export default Particles;
