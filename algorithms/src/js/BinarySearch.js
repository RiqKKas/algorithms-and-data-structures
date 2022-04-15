class BinarySearch {

    static iterative(key, orderedVector) {
        if (!(orderedVector instanceof Array) || typeof key !== 'number') {
            throw new Error("it is necessary to validate the types of data reported.");
        }

        let inferiorLimit = 0;
        let upperLimit = orderedVector.length - 1;
        let middle;

        while (inferiorLimit <= upperLimit) {
            middle = parseInt((inferiorLimit + upperLimit) / 2);

            if (key === orderedVector[middle])
                return middle;
            else if (key < orderedVector[middle])
                upperLimit = middle - 1;
            else
                inferiorLimit = middle + 1;
        }

        return -1;
    }

    static recursive(key, orderedVector, leftInferiorLimit, rightUpperLimit) {
        if (typeof key !== 'number'
            || !(orderedVector instanceof Array)
            || typeof leftInferiorLimit !== 'number'
            || typeof rightUpperLimit !== 'number') {
            throw new Error("it is necessary to validate the types of data reported.");
        }

        const middle = parseInt((leftInferiorLimit + rightUpperLimit) / 2);

        if (key === orderedVector[middle]) {
            return middle;
        }

        if (leftInferiorLimit >= rightUpperLimit) {
            return -1;
        }
        else if (key > orderedVector[middle]) {
            return this.recursive(key, orderedVector, middle + 1, rightUpperLimit);
        }
        else {
            return this.recursive(key, orderedVector, leftInferiorLimit, middle - 1);
        }
    }
}

const vector = [2, 4, 5, 32, 73];

console.log(BinarySearch.iterative(73, vector)); //out: 4
console.log(BinarySearch.recursive(32, vector, 0, vector.length - 1)); //out: 3