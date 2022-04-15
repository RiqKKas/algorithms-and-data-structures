function sequentialSearch(key, vector) {
    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === (key)) {
            return i;
        }
    }
    return -1;
}

const vector = [2, 4, 5, 32, 73];
console.log(sequentialSearch(5, vector)); //out: 2