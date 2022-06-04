class Node {
    constructor(value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    //insere um no na arvore obedecendo a definicao de arvore binaria de busca
    insert(value) {
        if (!this.contains(value)) {
            this.root = this.add(value, this.root);
            return true;
        }
        return false;
    }

    add(value, previousNode) {
        if (previousNode == null) return new Node(value);
        //verifique a sub-arvore a esquerda
        if (value < previousNode.value) previousNode.leftChild = this.add(value, previousNode.leftChild);
        //verifique a sub-arvore a direita
        else if (value > previousNode.value) previousNode.rightChild = this.add(value, previousNode.rightChild);

        return previousNode;
    }


    //remove um no na arvore obedecendo a definicao de arvore binaria de busca
    remove(value) {
        if (this.contains(value)) {
            this.root = this.withdraw(value, this.root);
            return true;
        }
        return false;
    }

    withdraw(value, node) {
        if (value < node.value) node.leftChild = this.withdraw(value, node.leftChild);
        else if (value > node.value) node.rightChild = this.withdraw(value, node.rightChild);
        else if (node.leftChild == null) node = node.rightChild;
        else if (node.rightChild == null) node = node.leftChild;
        else { //o valor do no atual e o que deve ser removido
            const maxNode = node.leftChild;
            while (maxNode.rightChild != null) maxNode = maxNode.rightChild; //maior no do lado esquerdo
            node.value = maxNode.value; //novo valor do no atual
            node.leftChild = this.withdraw(maxNode.value, node.leftChild); //remocao do maior no do lado esquerdo do no atual
        }
        return node;
    }

    //verifica se existe um determinado valor na arvore
    contains(value, node = this.root) {
        if (node == null) return false;
        else if (value < node.value) return this.contains(value, node.leftChild); //procura na sub-arvore da esquerda
        else if (value > node.value) return this.contains(value, node.rightChild); //procura na sub-arvore da direita
        else return true;
    }

    //retorna a quantidade de nos da arvore
    numberOfNodes(node = this.root) {
        return node == null ? 0 : 1 + this.numberOfNodes(node.leftChild) + this.numberOfNodes(node.rightChild);
    }

    //retorna a altura de uma arvore/sub-arvore
    treeHeight(node = this.root) {
        if (node == null) return -1;
        return 1 + Math.max(this.treeHeight(node.leftChild), this.treeHeight(node.rightChild));
    }

    //verifica se a arvore esta vazia
    isEmpty() {
        return this.root == null;
    }

    //imprime a arvore no percurso "em ordem"
    printInOrder() {
        let inOrder = "InOrder: ";
        inOrder += this.inOrder(this.root);
        console.log(inOrder);
    }

    inOrder(node) {
        let inOrder = "";

        if (node != null) {
            inOrder += this.inOrder(node.leftChild);
            inOrder += node.value + " ";
            inOrder += this.inOrder(node.rightChild);
        }

        return inOrder;
    }

    //imprime a arvore no percurso "pre ordem"
    printPreOrder() {
        let preOrder = "PreOrder: ";
        preOrder += this.preOrder(this.root);
        console.log(preOrder);
    }

    preOrder(node) {
        let preOrder = "";

        if (node != null) {
            preOrder += node.value + " ";
            preOrder += this.preOrder(node.leftChild);
            preOrder += this.preOrder(node.rightChild);
        }

        return preOrder;
    }

    //imprime a arvore no percurso "pos ordem"
    printPostOrder() {
        let postOrder = "PostOrder: ";
        postOrder += this.postOrder(this.root);
        console.log(postOrder);
    }

    postOrder(node) {
        let postOrder = "";

        if (node != null) {
            postOrder = node.value + " ";
            postOrder += this.postOrder(node.leftChild);
            postOrder += this.postOrder(node.rightChild);
        }

        return postOrder;
    }

}