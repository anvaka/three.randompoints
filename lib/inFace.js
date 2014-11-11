// Get random point in face (triangle) (uniform distribution)
module.exports = randomPointInFace;

var randomInTriangle = require('./inTriangle.js');

function randomPointInFace(face, geometry) {
  return randomInTriangle(
    geometry.vertices[face.a],
    geometry.vertices[face.b],
    geometry.vertices[face.c]
  );
}
