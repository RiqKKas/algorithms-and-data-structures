class PriorityQueueElement {
      constructor(element, priority) {
        this.element = element;
        this.priority = priority;
      }  
}

class PriorityQueue {

    constructor() {
        this.items = [];
    }

    // * Métodos de Inserção

    /* Insere o elemento especificado nesta fila de prioridade, de acordo com a prioridade do elemento. */
    enqueue(element, priority) {
        const priorityQueueElement = new PriorityQueueElement(element, priority);
        let added = false;

        for(let i = 0; i < this.items.length; i++) {
            if(priorityQueueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, priorityQueueElement);
                added = true;
                break;
            }
        }

        if (!added) this.items.push(priorityQueueElement);
    }

    // * Métodos de Consulta

    //Recupera, mas não remove, o cabeçalho desta fila ou retorna undefined se esta fila estiver vazia.
    peek() {
        return this.items[0].element;
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
        let elements = "";

        for(let i = 0; i < this.items.length - 1; i++) elements += this.items[i].element + ", ";

        if (this.items.length > 0) elements += this.items[this.items.length - 1].element;

        return elements;
    }

    // * Métodos de Remoção

    //Recupera e remove o cabeçalho desta fila ou retorna undefined, se esta fila estiver vazia.
    dequeue() {
        return this.items.shift();
    }

    //Remove todos os elementos desta lista.
    clear() {
        this.items = [];
    }

}