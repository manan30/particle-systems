import * as THREE from 'three';

function Particle(options) {
  this.color = options.color;
  this.size = options.size;
  this.pointCount = options.pointCount;
  this.rangeVertical = options.rangeVertical;
  this.rangeHorizontal = options.rangeHorizontal;
  this.speed = options.speed;

  THREE.Group.call(this);

  const pointsGeometry = new THREE.Geometry();
  const pointsMaterial = new THREE.PointsMaterial({
    color: this.color,
    size: this.size,
    transparent: true,
    depthWrite: false
  });

  for (let p = 0; p < this.pointCount; p += 1) {
    const point = new THREE.Vector3(
      THREE.Math.randFloatSpread(this.rangeHorizontal),
      THREE.Math.randFloatSpread(this.rangeVertical),
      THREE.Math.randFloatSpread(this.rangeHorizontal)
    );

    point.velocity = new THREE.Vector3(0, -Math.random() * this.speed * 100, 0);

    pointsGeometry.vertices.push(point);
  }

  this.points = new THREE.Points(pointsGeometry, pointsMaterial);
  this.points.position.y = -this.rangeVertical / 2;
  this.points.sortParticles = true;

  this.prototype = Object.create(THREE.Group.prototype);
  this.add(this.points);
}

Particle.prototype = Object.create(THREE.Group.prototype);
Particle.prototype.constructor = Particle;

Particle.prototype.update = function update() {
  let count = this.pointCount;

  while (count > 0) {
    const point = this.points.geometry.vertices[count - 1];

    if (point.y < -this.rangeVertical / 2) {
      point.y = this.rangeVertical / 2;
      point.velocity.y = 0;
    }

    point.velocity.y -= Math.random() * this.speed;

    point.add(point.velocity);
    count -= 1;
  }

  this.points.geometry.verticesNeedUpdate = true;
};

export default Particle;
