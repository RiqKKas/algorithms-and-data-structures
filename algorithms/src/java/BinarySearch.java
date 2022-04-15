public class BinarySearch {

    public static void main(String[] args) {
        int[] vector = new int[5];
        vector[0] = 2;
        vector[1] = 4;
        vector[2] = 5;
        vector[3] = 32;
        vector[4] = 73;
        System.out.println(interactiveBinarySearch(73, vector)); //out: 4
        System.out.println(recursiveBinarySearch(32, vector, 0, vector.length - 1)); //out: 3
    }

    public static int interactiveBinarySearch(int key, int[] orderedVector) {
        int inferiorLimit = 0;
        int upperLimit = orderedVector.length - 1;
        int middle;

        while (inferiorLimit <= upperLimit) {
            middle = (inferiorLimit + upperLimit) / 2;
            if (key == orderedVector[middle]) {
                return middle;
            }
            if (key < orderedVector[middle]) {
                upperLimit = middle - 1;
            } else {
                inferiorLimit = middle + 1;
            }
        }
        return -1;
    }

    public static int recursiveBinarySearch(int key, int[] orderedVector, int leftInferiorLimit, int rightUpperLimit) {
        int middle = (leftInferiorLimit + rightUpperLimit) / 2;

        if (orderedVector[middle] == key) {
            return middle;
        }
        if (leftInferiorLimit >= rightUpperLimit) {
            return -1;
        } else if (orderedVector[middle] < key) {
            return recursiveBinarySearch(key, orderedVector, middle + 1, rightUpperLimit);
        } else {
            return recursiveBinarySearch(key, orderedVector, leftInferiorLimit, middle - 1);
        }
    }

}
