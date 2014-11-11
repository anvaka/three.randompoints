/**
 * Get uniformly distributed random points in mesh
 */
var triangleArea = require('./triangleArea');
var randomPointInFace = require('./inFace');

function randomPointsInGeometry(geometry, n) {
  //  - create array with cumulative sums of face areas
  //  - pick random number from 0 to total area
  //  - find corresponding place in area array by binary search
  //  - get random point in face
  var face, i,
    faces = geometry.faces,
    vertices = geometry.vertices,
    il = faces.length,
    totalArea = 0,
    cumulativeAreas = [];

  // precompute face areas
  for (i = 0; i < il; i++) {
    face = faces[i];

    face._area = triangleArea(vertices[face.a], vertices[face.b], vertices[face.c]);
    totalArea += face._area;

    cumulativeAreas[i] = totalArea;
  }

  // pick random face weighted by face area
  var r, index, result = [];

  for (i = 0; i < n; i++) {
    r = THREE.Math.random16() * totalArea;

    index = binarySearchIndices(r);
    result[i] = randomPointInFace(faces[index], geometry);
  }

  return result;

  // binary search cumulative areas array
  function binarySearchIndices(value) {
    return binarySearch(0, cumulativeAreas.length - 1);

    function binarySearch(start, end) {
      // return closest larger index if exact number is not found
      if (end < start) return start;

      var mid = start + Math.floor((end - start) / 2);

      if (cumulativeAreas[mid] > value) {
        return binarySearch(start, mid - 1);
      } else if (cumulativeAreas[mid] < value) {
        return binarySearch(mid + 1, end);
      } else {
        return mid;
      }
    }
  }
}
