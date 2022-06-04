public class BinarySearchTree {

    //classe necessaria para a estrutura ligada
    private static class Node {

        private int value;
        private Node leftChild;
        private Node rightChild;

        public Node(int value) {
            this.value = value;
        }

    }

    private Node root;

    public BinarySearchTree() {
        this.root = null;
    }

    //insere um no na arvore obedecendo a definicao de arvore binaria de busca
    public boolean insert(int value) {
        if (!this.contains(value)) {
            this.root = this.insert(value, this.root);
            return true;
        }
        return false;
    }

    private Node insert(int value, Node previousNode) {
        if (previousNode == null) return new Node(value);

        //verifique a sub-arvore a esquerda
        if (value < previousNode.value) previousNode.leftChild = this.insert(value, previousNode.leftChild);
        //verifique a sub-arvore a direita
        else if (value > previousNode.value) previousNode.rightChild = this.insert(value, previousNode.rightChild);

        return previousNode;
    }

    //remove um no na arvore obedecendo a definicao de arvore binaria de busca
    public boolean remove(int value) {
        if (this.contains(value)) {
            this.root = remove(value, this.root);
            return true;
        }
        return false;
    }

    private Node remove(int value, Node node) {
        if (value < node.value) node.leftChild = this.remove(value, node.leftChild);
        else if (value > node.value) node.rightChild = this.remove(value, node.rightChild);
        else if (node.leftChild == null) node = node.rightChild;
        else if (node.rightChild == null) node = node.leftChild;
        else { //o valor do no atual e o que deve ser removido
            Node maxNode = node.leftChild;
            while (maxNode.rightChild != null) maxNode = maxNode.rightChild; //maior no do lado esquerdo
            node.value = maxNode.value; //novo valor do no atual
            node.leftChild = this.remove(maxNode.value, node.leftChild); //remocao do maior no do lado esquerdo do no atual
        }
        return node;
    }

    //verifica se existe um determinado valor na arvore
    public boolean contains(int value) {
        return this.contains(this.root, value);
    }

    private boolean contains(Node node, int value) {
        if (node == null) return false;
        else if (value < node.value) return this.contains(node.leftChild, value); //procura na sub-arvore da esquerda
        else if (value > node.value) return this.contains(node.rightChild, value); //procura na sub-arvore da direita
        else return true;
    }

    public int numberOfNodes() {
        return this.numberOfNodes(this.root);
    }

    //retorna a quantidade de nos da arvore
    private int numberOfNodes(Node node) {
        return node == null ? 0 : 1 + this.numberOfNodes(node.leftChild) + this.numberOfNodes(node.rightChild);
    }

    public int treeHeight() {
        return this.treeHeight(this.root);
    }

    //retorna a altura de uma arvore/sub-arvore
    private int treeHeight(Node node) {
        if (node == null) return -1;
        return 1 + Math.max(this.treeHeight(node.leftChild), this.treeHeight(node.rightChild));
    }

    //verifica se a arvore esta vazia
    public boolean isEmpty() {
        return this.root == null;
    }

    //imprime a arvore no percurso "em ordem"
    public void inOrder() {
        System.out.print("InOrder: ");
        this.inOrder(this.root);
        System.out.println();
    }

    private void inOrder(Node node) {
        if (node != null) {
            this.inOrder(node.leftChild);
            System.out.print(node.value + " ");
            this.inOrder(node.rightChild);
        }
    }

    //imprime a arvore no percurso "pre ordem"
    public void preOrder() {
        System.out.print("PreOrder: ");
        this.preOrder(this.root);
        System.out.println();
    }

    private void preOrder(Node node) {
        if (node != null) {
            System.out.print(node.value + " ");
            this.preOrder(node.leftChild);
            this.preOrder(node.rightChild);
        }
    }

    //imprime a arvore no percurso "pos ordem"
    public void postOrder() {
        System.out.print("PostOrder: ");
        this.postOrder(this.root);
        System.out.println();
    }

    private void postOrder(Node node) {
        if (node != null) {
            this.postOrder(node.leftChild);
            this.postOrder(node.rightChild);
            System.out.print(node.value + " ");
        }
    }

}
