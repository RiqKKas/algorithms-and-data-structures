public class Queue<T> {

    // * Atributos

    private T[] elements;
    private int size;

    // * Construtores

    public Queue(int capacity) {
        this.elements = (T[]) new Object[capacity];
        this.size = 0;
    }

    public Queue() {
        this(10);
    }

    // * Métodos de Controle Interno

    //Aumenta a capacidade do array interno dessa instância List, se necessário, dinamicamente
    private void ensureCapacity() {
        if (this.size == this.elements.length) {
            T[] newElements = (T[]) new Object[this.size * 2];

            for (int i = 0; i < this.size; i++) newElements[i] = this.elements[i];

            this.elements = newElements;
        }
    }

    // * Métodos de Inserção

    //Insere o elemento especificado no final desta fila
    public void enqueue(T element) {
        this.ensureCapacity();

        if (this.size < this.elements.length) {
            this.elements[this.size] = element;
            this.size++;
        }
    }

    // * Métodos de Consulta

    //Retorna o número de elementos nesta lista.
    public int size() {
        return this.size;
    }

    //Retorna verdadeiro se esta lista não contiver elementos.
    public boolean isEmpty() {
        return this.size == 0;
    }

    //Recupera, mas não remove, o cabeçalho desta fila ou retorna nullse esta fila estiver vazia.
    public T peek() {
        if (this.isEmpty()) return null;
        return this.elements[0];
    }

    //Retorna uma representação string do objeto
    public String toString() {
        StringBuilder queue = new StringBuilder();

        queue.append("[");

        for (int i = 0; i < this.size - 1; i++) {
            queue.append(this.elements[i]);
            queue.append(", ");
        }

        if (this.size > 0) queue.append(this.elements[this.size - 1]);

        queue.append("]");

        return queue.toString();
    }

    // * Métodos de Remoção

    //Recupera e remove o cabeçalho desta fila ou retorna nullse esta fila estiver vazia.
    public T dequeue() {
        if (this.isEmpty()) return null;

        T firstElement = this.elements[0];

        for (int i = 0; i < this.size - 1; i++) this.elements[i] = this.elements[i + 1];
        this.size--;

        return firstElement;
    }

    //Remove todos os elementos desta lista.
    public void clear() {
        for (int i = 0; i < this.size; i++) this.elements[i] = null;
        this.size = 0;
    }

}
