class Stack {

    constructor() {
        this.items = [];
    }

    // * Métodos de Inserção

    //Empurra um item para o topo desta pilha.
    push(element) {
        this.items.push(element);
    }

    // * Métodos de Consulta

    //Olha para o objeto no topo desta pilha sem removê-lo da pilha.
    peek() {
        return this.items[this.items.length - 1];
    }

    //Retorna o número de elementos nesta lista.
    size() {
        return this.items.length;
    }

    //Retorna verdadeiro se esta lista não contiver elementos.
    isEmpty() {
        return this.items.length === 0;
    }

    //Retorna uma representação string do objeto
    toString() {
        return this.items.toString();
    }

    // * Métodos de Remoção

    //Remove o objeto no topo desta pilha e retorna esse objeto como o valor desta função.
    pop() {
        return this.items.pop();
    }

    //Remove todos os elementos desta lista.
    clear() {
        this.items = [];
    }
    
}