public class PriorityQueue<T> {

    // * Atributos

    private T[] elements;
    private int size;

    // * Construtores

    public PriorityQueue(int capacity) {
        this.elements = (T[]) new Object[capacity];
        this.size = 0;
    }

    public PriorityQueue() {
        this(10);
    }

    // * Métodos de Controle Interno

    //Verifica se o índice é válido
    private void checkIndex(int index) {
        if (index < 0 || index > this.size) throw new IllegalArgumentException("Posição Inválida");
    }

    //Aumenta a capacidade do array interno dessa instância List, se necessário, dinamicamente
    private void ensureCapacity() {
        if (this.size == this.elements.length) {
            T[] newElements = (T[]) new Object[this.size * 2];

            for (int i = 0; i < this.size; i++) newElements[i] = this.elements[i];

            this.elements = newElements;
        }
    }

    // * Métodos de Inserção

    /* Insere o elemento especificado nesta fila de prioridade, de acordo com o critério Comparable
    do objeto do tipo da Fila. */
    public void enqueue(T element) {
        Comparable<T> key = (Comparable<T>) element;

        int index;
        for (index = 0; index < this.size; index++) {
            if (key.compareTo(this.elements[index]) < 0) break;
        }

        this.checkIndex(index);
        this.ensureCapacity();

        for (int i = this.size; i > index; i--) this.elements[i] = this.elements[i - 1];

        this.elements[index] = element;
        this.size++;
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
        StringBuilder priorityQueue = new StringBuilder();

        priorityQueue.append("[");

        for (int i = 0; i < this.size - 1; i++) {
            priorityQueue.append(this.elements[i]);
            priorityQueue.append(", ");
        }

        if (this.size > 0) priorityQueue.append(this.elements[this.size - 1]);

        priorityQueue.append("]");

        return priorityQueue.toString();
    }

    // * Métodos de Remoção

    //Recupera e remove o cabeçalho desta fila ou retorna null, se esta fila estiver vazia.
    public T dequeue() {
        if (this.isEmpty()) return null;

        T firstElement = this.elements[0];

        for (int i = 0; i < this.size - 1; i++) this.elements[i] = this.elements[i + 1];
        this.size--;

        return firstElement;
    }

}
