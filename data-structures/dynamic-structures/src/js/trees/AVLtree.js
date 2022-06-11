class Node {
    constructor(value) {
        this.value = value;
        this.balancingFactor = 0;
        this.parent = null;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class AVLtree {
    constructor() {
        this.root = null;
    }

    //insere um no na arvore obedecendo a definicao de arvore avl
    insert(value) {
        if (this.contains(value)) return false;

        const newNode = new Node(value);
        if (this.isEmpty()) this.root = newNode;
        else this.insertAVL(newNode, this.root);

        return true;
    }

    //como a arvore avl e um derivado de arvore binaria de busca, ela segue a msm filosofia de insercao
    insertAVL(nodeToInsert, nodeToCompare) {
        if (nodeToInsert.value < nodeToCompare.value) {
            if (nodeToCompare.leftChild != null) {
                this.insertAVL(nodeToInsert, nodeToCompare.leftChild);
            } else {
                nodeToCompare.leftChild = nodeToInsert;
                nodeToInsert.parent = nodeToCompare;
                this.checkBalance(nodeToCompare); //efetundo o balanceamento apos a insercao
            }
        } else if (nodeToInsert.value > nodeToCompare.value) {
            if (nodeToCompare.rightChild != null) {
                this.insertAVL(nodeToInsert, nodeToCompare.rightChild);
            } else {
                nodeToCompare.rightChild = nodeToInsert;
                nodeToInsert.parent = nodeToCompare;
                this.checkBalance(nodeToCompare); //efetundo o balanceamento apos a insercao
            }
        }
    }

    //checagem de qual rotação de balanceamento usar, assim a efetuando
    checkBalance(node) {
        this.setBalancingFactor(node); //setando o balanceamento do no atual

        if (node.balancingFactor == -2) { //caso 1: H D (p) < H E (p) então H(p) = -2
            if (this.treeHeight(node.leftChild.rightChild) < this.treeHeight(node.leftChild.leftChild)) {
                //caso 1.1: H D (u) < H E (u)
                node = this.rotateRight(node);
            } else if (this.treeHeight(node.leftChild.rightChild) > this.treeHeight(node.leftChild.leftChild)) {
                //caso 1.2: H D (u) > H E (u)
                node = this.doubleRotationLeftRight(node);
            }
        } else if (node.balancingFactor == 2) { //caso 2: H D (p) > H E (p) então H(p) = 2
            if (this.treeHeight(node.rightChild.rightChild) < this.treeHeight(node.rightChild.leftChild)) {
                //caso 2.1: H D (u) < H E (u)
                node = this.doubleRotationRightLeft(node);
            } else if (this.treeHeight(node.rightChild.rightChild) > this.treeHeight(node.rightChild.leftChild)) {
                //caso 2.2: H D (u) > H E (u)
                node = this.rotateLeft(node);
            }
        }

        //balanceamento do pai do no, apos todas as movimentacoes acima
        if (node.parent != null) this.checkBalance(node.parent);
        else this.root = node;
    }

    rotateRight(nodeRoot) {
        //filho a esquerda agora oculpa o lugar de seu pai
        const leftChild = nodeRoot.leftChild;
        leftChild.parent = nodeRoot.parent;

        //configurando o novo pai de leftChild
        if (leftChild.parent != null) {
            if (leftChild.parent.rightChild == nodeRoot) leftChild.parent.rightChild = leftChild;
            else if (leftChild.parent.leftChild == nodeRoot) leftChild.parent.leftChild = leftChild;
        }

        //no, antes pai, agora oculpa lugar de seu filho a esquerda
        nodeRoot.leftChild = leftChild.rightChild;
        if (nodeRoot.leftChild != null) nodeRoot.leftChild.parent = nodeRoot;

        //configurando o novo pai de nodeRoot
        leftChild.rightChild = nodeRoot;
        nodeRoot.parent = leftChild;

        //setando o balanceamento dos envolvidos
        this.setBalancingFactor(nodeRoot);
        this.setBalancingFactor(leftChild);

        return leftChild;
    }

    rotateLeft(nodeRoot) {
        //filho a direita agora oculpa o lugar de seu pai
        const rightChild = nodeRoot.rightChild;
        rightChild.parent = nodeRoot.parent;

        //configurando o novo pai de rightChild
        if (rightChild.parent != null) {
            if (rightChild.parent.rightChild == nodeRoot) rightChild.parent.rightChild = rightChild;
            else if (rightChild.parent.leftChild == nodeRoot) rightChild.parent.leftChild = rightChild;
        }

        //no, antes pai, agora oculpa lugar de seu filho a direita
        nodeRoot.rightChild = rightChild.leftChild;
        if (nodeRoot.rightChild != null) nodeRoot.rightChild.parent = nodeRoot;

        //configurando o novo pai de nodeRoot
        rightChild.leftChild = nodeRoot;
        nodeRoot.parent = rightChild;

        //setando o balanceamento dos envolvidos
        this.setBalancingFactor(nodeRoot);
        this.setBalancingFactor(rightChild);

        return rightChild;
    }

    doubleRotationLeftRight(nodeRoot) {
        //rotaciona a esquerda o filho a esquerda
        nodeRoot.leftChild = this.rotateLeft(nodeRoot.leftChild);
        //depois, rotaciona a direita o nodeRoot
        return this.rotateRight(nodeRoot);
    }

    doubleRotationRightLeft(nodeRoot) {
        //rotaciona a direita o filho a direita
        nodeRoot.rightChild = this.rotateRight(nodeRoot.rightChild);
        //depois, rotaciona a esquerda o nodeRoot
        return this.rotateLeft(nodeRoot);
    }

    //calculo do balanceamento de um no, feito com auxilio da altura dos filhos
    setBalancingFactor(node) {
        node.balancingFactor = this.treeHeight(node.rightChild) - this.treeHeight(node.leftChild);
    }

    //remove elemento da arvore, se o msm existir nela
    remove(value) {
        if (!this.contains(value)) return false;
        else return this.removeAVL(value, this.root);
    }

    removeAVL(value, nodeToCompare) {
        //procurando pelo no a remover
        if (value < nodeToCompare.value) {
            if (nodeToCompare.leftChild != null) return this.remove(value, nodeToCompare.leftChild);
            else return false;
        } else if (value > nodeToCompare.value) {
            if (nodeToCompare.rightChild != null) return this.remove(value, nodeToCompare.rightChild);
            else return false;
        }

        this.removeNode(nodeToCompare);
        return true;
    }

    removeNode(nodeToRemove) {
        //sucessor do no a remover
        let successorNodeLevel1;

        if (nodeToRemove.leftChild == null || nodeToRemove.rightChild == null) {
            if (nodeToRemove.parent == null) {
                this.root = null;
                return;
            }
            //so possui no maximo um filho, portando, o sucessor nao precisa de sucessor
            successorNodeLevel1 = nodeToRemove;
        } else {
            successorNodeLevel1 = this.lookSuccessor(nodeToRemove);
            nodeToRemove.value = successorNodeLevel1.value;
        }

        //sucessor do sucessor do no a remover
        let successorNodeLevel2;

        //selecionando e setando successorNodeLevel2
        if (successorNodeLevel1.leftChild != null) successorNodeLevel2 = successorNodeLevel1.leftChild;
        else successorNodeLevel2 = successorNodeLevel1.rightChild;

        //setando o parent de successorNodeLevel2
        if (successorNodeLevel2 != null) successorNodeLevel2.parent = successorNodeLevel1.parent;

        //setando o novo parent de successorNodeLevel2
        if (successorNodeLevel1.parent == null) {
            this.root = successorNodeLevel2;
        } else {
            if (successorNodeLevel1 == successorNodeLevel1.parent.leftChild) successorNodeLevel1.parent.leftChild = successorNodeLevel2;
            else successorNodeLevel1.parent.rightChild = successorNodeLevel2;
            this.checkBalance(successorNodeLevel1.parent);
        }
    }

    //metodo que retorna um sucessor adequado para um determinado no
    lookSuccessor(predecessorNode) {
        let successorNode;

        //procura pelo menor no a direita da arvore, cuja a raiz e predecessorNode
        if (predecessorNode.rightChild != null) {
            successorNode = predecessorNode.rightChild;
            while (successorNode.leftChild != null) {
                successorNode = successorNode.leftChild;
            }
        } else {
            //procura por um no sucessor, a partir do pai de predecessorNode
            successorNode = predecessorNode.parent;
            while (successorNode != null && predecessorNode == successorNode.rightChild) {
                predecessorNode = successorNode;
                successorNode = predecessorNode.parent;
            }
        }

        return successorNode;
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