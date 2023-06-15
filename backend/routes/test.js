let array = [false, 1, 0, 1, 2, 0, 1, 3, "a"];

function moveZeros(arr) {
  let allZeroes = [];
  arr.forEach((elem, index) => {
    for (let i = 0; i < elem.length; i++) {
      elem[i] === 0 && allZeroes.push(arr.splice(index, 1));
    }
    elem.forEach((elem2) => {
      elem2 === 0 && allZeroes.push(arr.splice(index, 1));
    });
    // elem === 0 && allZeroes.push(arr.splice(index, 1));
  });
  return [[arr] + [allZeroes]];
}

moveZeros(array);
