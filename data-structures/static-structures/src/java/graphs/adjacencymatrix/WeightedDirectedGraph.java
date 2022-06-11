//Grafo Direcionado Ponderado

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class WeightedDirectedGraph<TYPE> {

    private final double NULL_EDGE; //valor que representa um aresta inexistente entre dois vertices
    private final ArrayList<TYPE> vertices; //lista que armazena os dados inserido no grafo
    private double[][] adjacencyMatrix; //matriz que forma a estrutura do grafo
    private int currentCapacity; //capacidade atual do vetor adjacencyMatrix

    public WeightedDirectedGraph(int nullLEdge, int startingCapacity) {
        this.NULL_EDGE = nullLEdge;
        this.vertices = new ArrayList<>(startingCapacity);
        this.adjacencyMatrix = this.startAdjacencyMatrix(startingCapacity);
    }

    public WeightedDirectedGraph(int nullLEdge) {
        this.NULL_EDGE = nullLEdge;
        this.vertices = new ArrayList<>(10);
        this.adjacencyMatrix = this.startAdjacencyMatrix(10);
    }

    //metodo que gera uma matriz a partir de um tamanho especifico
    private double[][] startAdjacencyMatrix(int size) {
        this.currentCapacity = size;
        double[][] newAdjacencyMatrix = new double[size][size];

        for (int lineIndex = 0; lineIndex < this.currentCapacity; lineIndex++) {
            for (int columnIndex = 0; columnIndex < this.currentCapacity; columnIndex++) {
                newAdjacencyMatrix[lineIndex][columnIndex] = this.NULL_EDGE; //inicia como arestas inexistentes
            }
        }

        return newAdjacencyMatrix;
    }

    //metodo que adiciona um vertice no grafo, se o mesmo ainda nao existir
    public void addVertex(TYPE data) {
        if (!this.contains(data)) {
            //quando necessario, aumento a capacidade da matriz adjacencia
            if (this.size() == this.currentCapacity) this.increaseCapacity();
            this.vertices.add(data);
        }
    }

    //metodo que aumenta dinamicamente o tamanho da matriz adjacencia
    private void increaseCapacity() {
        //dobra o tamanho da matriz
        double[][] newAdjacencyMatrix = this.startAdjacencyMatrix(this.currentCapacity * 2);

        //copia os valores para a nova matriz, posicao por posicao
        for (int lineIndex = 0; lineIndex < this.currentCapacity; lineIndex++) {
            for (int columnIndex = 0; columnIndex < this.currentCapacity; columnIndex++) {
                if (this.adjacencyMatrix.length > lineIndex && this.adjacencyMatrix[lineIndex].length > columnIndex) {
                    newAdjacencyMatrix[lineIndex][columnIndex] = this.adjacencyMatrix[lineIndex][columnIndex];
                }
            }
        }

        //referencia nova a matriz adjacencia do grafo
        this.adjacencyMatrix = newAdjacencyMatrix;
    }

    //metodo que remove um vertice determinado, assim como suas ligacoes com outros vertices, se ele existir no grafo
    public void removeVertex(TYPE data) {
        if (!this.contains(data)) return;

        //remove as ligacoes com outros vertices
        for (int index = 0; index < this.size(); index++) {
            TYPE endVertex = this.vertices.get(index);
            this.removeEdge(data, endVertex);
            this.removeEdge(endVertex, data);
        }

        //ajusta as linhas da matriz adjacencia com a remocao
        int lineToRemove = this.vertices.indexOf(data);
        for (int line = lineToRemove; line < this.size() - 1; line++) {
            for (int column = 0; column < this.size(); column++) {
                this.adjacencyMatrix[line][column] = this.adjacencyMatrix[line + 1][column];
            }
        }

        //ajusta as colunas da matriz adjacencia com a remocao
        for (int line = 0; line < this.size(); line++) {
            for (int column = lineToRemove; column < this.size() - 1; column++) {
                this.adjacencyMatrix[line][column] = this.adjacencyMatrix[line][column + 1];
            }
        }

        //remove o dado determinado do grafo
        this.vertices.remove(data);
    }

    //metodo que adiciona uma aresta (ligacao entre vertices) no grafo
    public void addEdge(double weight, TYPE startVertex, TYPE endVertex) {
        //recupera os indices dos dados determinados
        int startIndex = this.vertices.indexOf(startVertex);
        int endIndex = this.vertices.indexOf(endVertex);

        //verifica se os indices sao validos
        if (!this.isValidIndex(startIndex, endIndex)) return;

        //define a distancia dos vertices, assim formando a aresta
        this.adjacencyMatrix[startIndex][endIndex] = weight;
    }

    //metodo que remove uma aresta (ligacao entre vertices) do grafo
    public void removeEdge(TYPE startVertex, TYPE endVertex) {
        //recupera os indices dos dados determinados
        int startIndex = this.vertices.indexOf(startVertex);
        int endIndex = this.vertices.indexOf(endVertex);

        //verifica se os indices sao validos
        if (!this.isValidIndex(startIndex, endIndex)) return;

        //remove a distancia dos vertices, assim apagando a aresta
        this.adjacencyMatrix[startIndex][endIndex] = this.NULL_EDGE;
    }

    //metodo que retorna o tamanho do grafo
    public int size() {
        return this.vertices.size();
    }

    //metodo que verifica se um elemento existe no grafo
    public boolean contains(TYPE vertex) {
        return this.vertices.contains(vertex);
    }

    //metodo que faz um busca em profundidade no grafo, a partir de uma origem
    public void depthSearch(TYPE origin) {
        //recupera o indice do dado determinado
        int originIndex = this.vertices.indexOf(origin);
        //verifica se o indice e valido
        if (!this.isValidIndex(originIndex)) return;

        System.out.println("### Busca em Profundidade: ");

        //vetor que guarda a resposta de que se um vertice ja foi visitado
        boolean[] visited = new boolean[this.size()];

        this.depthSearch(originIndex, visited);
    }

    //metodo complementar ao de mesmo nome
    private void depthSearch(int currentVertex, boolean[] visited) {
        visited[currentVertex] = true; //vertice atual visitado

        //verifica se o vertice atual tem ligacao com cada um dos outros vertices
        for (int adjacentVertexIndex = 0; adjacentVertexIndex < visited.length; adjacentVertexIndex++) {
            //passa pelo vertice adjacente ainda nao visitado
            if (!visited[adjacentVertexIndex] && this.adjacencyMatrix[currentVertex][adjacentVertexIndex] != this.NULL_EDGE) {
                System.out.println("Veio de " + this.vertices.get(currentVertex) + " para " + this.vertices.get(adjacentVertexIndex));
                //recursao, agora com o vertice adjacente como vertice atual
                this.depthSearch(adjacentVertexIndex, visited);
            }
        }
    }

    //metodo que faz um busca em largura no grafo, a partir de uma origem
    public void breadthSearch(TYPE origin) {
        //recupera o indice do dado determinado
        int originIndex = this.vertices.indexOf(origin);
        //verifica se o indice e valido
        if (!this.isValidIndex(originIndex)) return;

        System.out.println("### Busca em Largura: ");

        //fila de vertices a serem visitados
        Queue<Integer> verticesToProcess = new LinkedList<>();
        //vetor que guarda a resposta de que se um vertice ja foi visitado
        boolean[] verticesVisited = new boolean[this.size()];

        verticesToProcess.add(originIndex);
        verticesVisited[originIndex] = true;

        this.breadthSearch(verticesToProcess, verticesVisited);
    }

    //metodo complementar ao de mesmo nome
    private void breadthSearch(Queue<Integer> verticesToProcess, boolean[] verticesVisited) {
        //retira o primeiro vertice da fila
        int currentVertex = verticesToProcess.poll();

        //verifica se o vertice atual tem ligacao com cada um dos outros vertices
        for (int adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
            //passa pelo vertice adjacente ainda nao visitado
            if (!verticesVisited[adjacentVertexIndex] && this.adjacencyMatrix[currentVertex][adjacentVertexIndex] != this.NULL_EDGE) {
                System.out.println("Veio de " + this.vertices.get(currentVertex) + " para " + this.vertices.get(adjacentVertexIndex));
                //adicinona o vertice adjacente na fila para processar suas ligacoes
                verticesToProcess.add(adjacentVertexIndex);
                verticesVisited[adjacentVertexIndex] = true; //vertice adjacente visitado
            }
        }

        //enquanto houver vertices na fila, uma recursao acontece passado os dados ja verifcados
        if (!verticesToProcess.isEmpty()) this.breadthSearch(verticesToProcess, verticesVisited);
    }

    //metodo que calcula o menor caminho de uma origem ate todos os vertices que consegue alcancar
    public void dijkstra(TYPE src) {
        int srcIndex = this.vertices.indexOf(src);
        if (!this.isValidIndex(srcIndex)) return;

        //shorterDistance[i] armazena a distancia mais curta de src ao vertice i
        double[] shorterDistance = new double[this.size()];

        //fila que guarda agrupa os vertices visitados
        Queue<Integer> closedVertices = new LinkedList<>();

        //inicializa todas as distâncias
        for (int i = 0; i < this.size(); i++) shorterDistance[i] = Integer.MAX_VALUE;
        //a distancia do vertice de origem ao mesmo e sempre 0
        shorterDistance[srcIndex] = 0;

        //procura o caminho mais curto para todos os vertices
        for (int count = 0; count < this.size() - 1; count++) {
            //pega o vertice com a distancia minima do conjunto de vertices ainda nao visitados
            //na primeira iteracao, src e sempre retornado.

            double minDistance = Integer.MAX_VALUE;
            int currentElementIndex = 0;

            //busca o vertice com a distancia minima do conjunto de vertices ainda nao incluidos no caminho mais curto
            for (int currentVertex = 0; currentVertex < this.size(); currentVertex++) {
                if (!closedVertices.contains(currentVertex) && shorterDistance[currentVertex] <= minDistance) {
                    minDistance = shorterDistance[currentVertex];
                    currentElementIndex = currentVertex;
                }
            }

            //marca como ja visitado
            closedVertices.add(currentElementIndex);

            //atualiza o valor shorterDistance dos vertices adjacentes do vertice atual.
            for (int adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
                /*
                 * o shorterDistance[adjacentVertexIndex] e atualizado somente se nao estiver fechado, existir uma aresta de
                 * currentElementIndex para adjacentVertexIndex e o peso total do caminho de src para adjacentVertexIndex
                 * atraves de currentElementIndex e menor que o valor atual de shorterDistance[adjacentVertexIndex]
                 */
                double distance = shorterDistance[currentElementIndex] + this.adjacencyMatrix[currentElementIndex][adjacentVertexIndex];
                if (!closedVertices.contains(adjacentVertexIndex)
                        && this.adjacencyMatrix[currentElementIndex][adjacentVertexIndex] != this.NULL_EDGE
                        && shorterDistance[currentElementIndex] != Integer.MAX_VALUE
                        && distance < shorterDistance[adjacentVertexIndex]) {
                    shorterDistance[adjacentVertexIndex] = distance;
                }
            }
        }

        //imprime a matriz de distancias calculadas
        System.out.println("Distancia de " + src + " a:");
        for (int index = 0; index < this.size(); index++) {
            String distance = "Nao existe caminho!";
            if (shorterDistance[index] < Integer.MAX_VALUE) distance = shorterDistance[index] + "Km";

            System.out.println(this.vertices.get(index) + " -> " + distance);
        }
    }

    //metodo que verifica a validade de um indice
    private boolean isValidIndex(int... indexes) {
        for (int index : indexes) {
            if (index == -1) {
                return false;
            }
        }
        return true;
    }

}
