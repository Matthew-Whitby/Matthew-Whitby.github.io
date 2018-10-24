function vecToMatrix(v){
  var m = [];
  m[0] = [v.x];
  m[1] = [v.y];
  m[2] = [v.z];
  m[3] = [v.w];
  return m;
}

function matmul(a, b) {
  var m = vecToMatrix(b);
  return matrixToVec(matmul(a, m));
}

function matmul4(a, b, fourth) {
  var m = vecToMatrix(b);

  return matrixToVec4(matmul(a, m));
}

function matrixToVec4(m) {
  var v = new P4Vector(0,0,0,0);
  v.x = m[0][0];
  v.y = m[1][0];
  v.z = m[2][0];
  v.w = m[3][0];
  return v;
}

function matmul(a, b) {
  var colsA = (a[0] == null) ? 1 : a[0].length;
  if(a.length == null) a = vecToMatrix(a);
  var rowsA = a.length;
  var colsB = (b[0] == null) ? 1 : b[0].length;
  if(b.length == null)  b = vecToMatrix(b);
  var rowsB = b.length;
  if (colsA != rowsB) {
    return null;
  }

  var result = [];
  for(var i = 0; i < rowsA; i++){
    result.push([0]);
    for(var j = 0; j < colsB; j++){
      result[i].push([0]);
    }
  }


  for (var i = 0; i < rowsA; i++) {
    for (var j = 0; j < colsB; j++) {
      var sum = 0;
      for (var k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
   return result;
}
