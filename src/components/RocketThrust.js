const OutlineShader = {
  uniforms: {
    offset: { type: 'f', value: 0.3 },
    color: { type: 'v3', value: new THREE.Color('#000000') },
    alpha: { type: 'f', value: 1.0 }
  },

  vertexShader: [
    'uniform float offset;',

    'void main() {',
    '  vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );',
    '  gl_Position = projectionMatrix * pos;',
    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform vec3 color;',
    'uniform float alpha;',

    'void main() {',
    '  gl_FragColor = vec4( color, alpha );',
    '}'
  ].join('\n')
};

const container = document.getElementById('container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
renderer.domElement.style.cursor = 'pointer';

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);
camera.position.set(0, -6, 3);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.y = 1;
controls.enableDamping = true;
controls.enabled = false;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x01374b);
scene.fog = new THREE.Fog(scene.background, 10, 20);

// lights
const aLight = new THREE.AmbientLight(0x555555);
scene.add(aLight);

const dLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
dLight1.position.set(0.7, 1, 1);
scene.add(dLight1);

// var dlh1 = new THREE.DirectionalLightHelper( dLight1, 0.5 );
// scene.add( dlh1 );

// var gh = new THREE.GridHelper( 2, 10, 0x000000, 0x808080 );
// scene.add( gh );

// -------------------------------------------

const rocketGroup = new THREE.Group();
scene.add(rocketGroup);

const rocket = new THREE.Group();
rocket.position.y = -1.5; // vertically center
rocketGroup.add(rocket);

// -------------------------------------------

// body

const points = [];

points.push(new THREE.Vector2(0, 0)); // bottom

for (let i = 0; i < 11; i++) {
  const point = new THREE.Vector2(Math.cos(i * 0.227 - 0.75) * 8, i * 4.0);

  points.push(point);
}

points.push(new THREE.Vector2(0, 40)); // tip

const rocketGeo = new THREE.LatheGeometry(points, 32);

const rocketMat = new THREE.MeshToonMaterial({
  color: 0xcccccc,
  shininess: 1
});

const rocketOutlineMat = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.clone(OutlineShader.uniforms),
  vertexShader: OutlineShader.vertexShader,
  fragmentShader: OutlineShader.fragmentShader,
  side: THREE.BackSide
});

const rocketObj = THREE.SceneUtils.createMultiMaterialObject(rocketGeo, [
  rocketMat,
  rocketOutlineMat
]);
rocketObj.scale.setScalar(0.1);
rocket.add(rocketObj);

// var wireframe = new THREE.WireframeGeometry( rocketGeo );
// var line = new THREE.LineSegments( wireframe );
// line.material.color.setHex( 0x000000 );
// rocketObj.add( line );

// -------------------------------------------

// window

const portalGeo = new THREE.CylinderBufferGeometry(0.26, 0.26, 1.6, 32);
const portalMat = new THREE.MeshToonMaterial({ color: 0x90dcff });
const portalOutlineMat = rocketOutlineMat.clone();
portalOutlineMat.uniforms.offset.value = 0.03;
const portal = THREE.SceneUtils.createMultiMaterialObject(portalGeo, [
  portalMat,
  portalOutlineMat
]);
portal.position.y = 2;
portal.rotation.x = Math.PI / 2;
rocket.add(portal);

// ------------

const circle = new THREE.Shape();
circle.absarc(0, 0, 3.5, 0, Math.PI * 2);

const hole = new THREE.Path();
hole.absarc(0, 0, 3, 0, Math.PI * 2);
circle.holes.push(hole);

const tubeExtrudeSettings = {
  amount: 17,
  steps: 1,
  bevelEnabled: false
};
const tubeGeo = new THREE.ExtrudeGeometry(circle, tubeExtrudeSettings);
tubeGeo.computeVertexNormals();
tubeGeo.center();
const tubeMat = new THREE.MeshToonMaterial({
  color: 0xff0000,
  shininess: 1
});
const tubeOutlineMat = rocketOutlineMat.clone();
tubeOutlineMat.uniforms.offset.value = 0.2;
const tube = THREE.SceneUtils.createMultiMaterialObject(tubeGeo, [
  tubeMat,
  tubeOutlineMat
]);
tube.position.y = 2;
tube.scale.setScalar(0.1);
rocket.add(tube);

// var wireframe = new THREE.WireframeGeometry( tubeGeo );
// var line = new THREE.LineSegments( wireframe );
// line.material.color.setHex( 0x000000 );
// tube.add( line );

// -------------------------------------------

// wing

const shape = new THREE.Shape();

shape.moveTo(3, 0);
shape.quadraticCurveTo(25, -8, 15, -37);
shape.quadraticCurveTo(13, -21, 0, -20);
shape.lineTo(3, 0);

const extrudeSettings = {
  steps: 1,
  amount: 4,
  bevelEnabled: true,
  bevelThickness: 2,
  bevelSize: 2,
  bevelSegments: 5
};

const wingGroup = new THREE.Group();
rocket.add(wingGroup);

const wingGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
wingGeo.computeVertexNormals();
const wingMat = new THREE.MeshToonMaterial({
  color: 0xff0000,
  shininess: 1
});
const wingOutlineMat = rocketOutlineMat.clone();
wingOutlineMat.uniforms.offset.value = 1;
const wing = THREE.SceneUtils.createMultiMaterialObject(wingGeo, [
  wingMat,
  wingOutlineMat
]);
wing.scale.setScalar(0.03);
wing.position.set(0.6, 0.9, 0);
wingGroup.add(wing);

// var wireframe = new THREE.WireframeGeometry( wingGeo );
// var line = new THREE.LineSegments( wireframe );
// line.material.color.setHex( 0x000000 );
// wing.add( line );

const wing2 = wingGroup.clone();
wing2.rotation.y = Math.PI;
rocket.add(wing2);

const wing3 = wingGroup.clone();
wing3.rotation.y = Math.PI / 2;
rocket.add(wing3);

const wing4 = wingGroup.clone();
wing4.rotation.y = -Math.PI / 2;
rocket.add(wing4);

// -------------------------------------------

// fire and stars particles

// https://aerotwist.com/tutorials/creating-particles-with-three-js/
// https://aerotwist.com/static/tutorials/creating-particles-with-three-js/demo/
// downloads/paul-lewis-aerotwist/particles-r88

const Particles = function(options) {
  const color = (this.color = options.color || 0x333333);
  const size = (this.size = options.size || 0.4);

  const pointCount = (this.pointCount = options.pointCount || 40); // 1800
  const rangeV = (this.rangeV = options.rangeV || 2); // 600
  const rangeH = (this.rangeH = options.rangeH || 1);

  const speed = (this.speed = this.speedTarget = options.speed || 0.0005);

  THREE.Group.call(this);

  // circle texture

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 3;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#fff';
  ctx.fill();

  const texture = new THREE.Texture(canvas);
  texture.premultiplyAlpha = true;
  texture.needsUpdate = true;

  //

  const pointsGeo = new THREE.Geometry();
  const pointsMat = new THREE.PointsMaterial({
    color,
    size,
    map: texture,
    transparent: true,
    depthWrite: false
  });

  for (let p = 0; p < pointCount; p++) {
    const point = new THREE.Vector3(
      THREE.Math.randFloatSpread(rangeH),
      THREE.Math.randFloatSpread(rangeV),
      THREE.Math.randFloatSpread(rangeH)
    );

    point.velocity = new THREE.Vector3(0, -Math.random() * speed * 100, 0);

    pointsGeo.vertices.push(point);
  }

  const points = (this.points = new THREE.Points(pointsGeo, pointsMat));
  points.position.y = -rangeV / 2;
  points.sortParticles = true;

  this.add(points);
};

Particles.prototype = Object.create(THREE.Group.prototype);
Particles.prototype.constructor = Particles;

Particles.prototype.update = function() {
  // this.points.rotation.y -= 0.01; // 0.01

  let pCount = this.pointCount;
  while (pCount--) {
    const point = this.points.geometry.vertices[pCount];

    // check if we need to reset
    if (point.y < -this.rangeV / 2) {
      point.y = this.rangeV / 2;
      point.velocity.y = 0;
    }

    // update the velocity
    point.velocity.y -= Math.random() * this.speed; // .1

    // and the position
    point.add(point.velocity);
  }

  this.points.geometry.verticesNeedUpdate = true;
};

Particles.prototype.updateConstant = function() {
  let pCount = this.pointCount;
  while (pCount--) {
    const point = this.points.geometry.vertices[pCount];

    // check if we need to reset
    if (point.y < -this.rangeV / 2) {
      point.y = this.rangeV / 2;
    }

    point.y -= this.speed;
  }

  this.points.geometry.verticesNeedUpdate = true;
};

// orange
const fire = new Particles({
  color: 0xff5a00,
  size: 0.4,
  rangeH: 0.8,
  rangeV: 2.5,
  pointCount: 50
});
rocket.add(fire);

// yellow
const fire2 = new Particles({
  color: 0xffc000,
  size: 0.6,
  rangeH: 0.5
});
rocket.add(fire2);

// var box = new THREE.BoxHelper( fire.points );
// fire.add( box );

// -------------------------------------------

// stars

const stars = new Particles({
  color: 0xffffff,
  size: 0.6,
  rangeH: 20,
  rangeV: 20,
  pointCount: 400,
  size: 0.2,
  speed: 0.1
});

stars.points.position.y = 0;
scene.add(stars);

// -------------------------------------------

// input

//

const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
// var helper = new THREE.PlaneHelper( plane, 5, 0xffff00 );
// scene.add( helper );

const rocketTarget = new THREE.Vector3();

const cameraTarget = new THREE.Vector3();
cameraTarget.copy(camera.position);

const raycaster = new THREE.Raycaster();

//

const mouse = new THREE.Vector2();

// var targetSphere = new THREE.Mesh(
//  new THREE.SphereBufferGeometry( 0.2 ),
//  new THREE.MeshPhongMaterial({ color: 0x00ff00 })
// );

// scene.add( targetSphere );

function mousemove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  cameraTarget.x = -mouse.x * 1;
  cameraTarget.z = 3 + mouse.y * 1;

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, rocketTarget);
  // targetSphere.position.copy( rocketTarget );
}

function mousedown(e) {
  TWEEN.removeAll();

  // rotation
  const dir = mouse.x < 0 ? -1 : 1;
  var tween = new TWEEN.Tween(rocket.rotation)
    .to({ y: dir * Math.PI }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();

  // scale
  var tween = new TWEEN.Tween(rocketGroup.scale)
    .to({ y: 0.7 }, 300)
    .easing(TWEEN.Easing.Cubic.Out)
    .onComplete(function() {
      const tween = new TWEEN.Tween(rocketGroup.scale)
        .to({ y: 1.3 }, 300)
        .easing(TWEEN.Easing.Cubic.In)
        .onComplete(function() {
          const tween = new TWEEN.Tween(rocketGroup.scale)
            .to({ y: 1 }, 200)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
        })
        .start();
    })
    .start();

  stars.speedTarget = 0.3;

  renderer.domElement.style.cursor = 'none';
}

function mouseup(e) {
  stars.speedTarget = 0.1;
  renderer.domElement.style.cursor = 'pointer';
}

renderer.domElement.addEventListener('mousemove', mousemove, false);
renderer.domElement.addEventListener('mousedown', mousedown, false);
renderer.domElement.addEventListener('mouseup', mouseup, false);

// -------------------------------------------

window.addEventListener('resize', resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const clock = new THREE.Clock();
let time = 0;
const angle = THREE.Math.degToRad(3);

loop();

function loop() {
  requestAnimationFrame(loop);
  TWEEN.update();
  controls.update();

  time += clock.getDelta();

  rocketGroup.rotation.y = Math.cos(time * 8) * angle;

  fire.update();
  fire2.update();

  stars.updateConstant();

  lerp(rocketGroup.position, 'y', rocketTarget.y);
  lerp(rocketGroup.position, 'x', rocketTarget.x);

  lerp(camera.position, 'x', cameraTarget.x);
  lerp(camera.position, 'z', cameraTarget.z);

  lerp(stars, 'speed', stars.speedTarget);

  renderer.render(scene, camera);
}

function lerp(object, prop, destination) {
  if (object && object[prop] !== destination) {
    object[prop] += (destination - object[prop]) * 0.1;

    if (Math.abs(destination - object[prop]) < 0.01) {
      object[prop] = destination;
    }
  }
}
