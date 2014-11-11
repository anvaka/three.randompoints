// Get random point in triangle (via barycentric coordinates)
// (uniform distribution)
// http://www.cgafaq.info/wiki/Random_Point_In_Triangle
module.exports = randomPointInTriangle;

var vector = new THREE.Vector3();

function randomPointInTriangle(vectorA, vectorB, vectorC) {

  var point = new THREE.Vector3();

  var a = THREE.Math.random16();
  var b = THREE.Math.random16();

  if ((a + b) > 1) {
    a = 1 - a;
    b = 1 - b;
  }

  var c = 1 - a - b;

  point.copy(vectorA);
  point.multiplyScalar(a);

  vector.copy(vectorB);
  vector.multiplyScalar(b);

  point.add(vector);

  vector.copy(vectorC);
  vector.multiplyScalar(c);

  point.add(vector);

  return point;
}
