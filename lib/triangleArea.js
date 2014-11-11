var vector1 = new THREE.Vector3();
var vector2 = new THREE.Vector3();

return function triangleArea(vectorA, vectorB, vectorC) {
  vector1.subVectors(vectorB, vectorA);
  vector2.subVectors(vectorC, vectorA);
  vector1.cross(vector2);

  return 0.5 * vector1.length();
};
