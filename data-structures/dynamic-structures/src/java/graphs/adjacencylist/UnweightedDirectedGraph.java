//Grafo Direcionado Não Ponderado

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class UnweightedDirectedGraph<TYPE> {

    //classe cujo os objetos representam as arestas do grafo
    private static class Edge<TYPE> {
        private Vertex<TYPE> startVertex;
        private Vertex<TYPE> endVertex;

        public Edge(Vertex<TYPE> startVertex, Vertex<TYPE> endVertex) {
            this.startVertex = startVertex;
            this.endVertex = endVertex;
        }
    }

    //classe cujo os objetos representam os vertices do grafo
    private static class Vertex<TYPE> {
        private TYPE data;
        private ArrayList<Edge<TYPE>> inputEdges; //ligacoes de entrada do vertice
        private ArrayList<Edge<TYPE>> outgoingEdges; //ligacoes de saida do vertice

        public Vertex(TYPE data) {
            this.data = data;
            this.inputEdges = new ArrayList<>();
            this.outgoingEdges = new ArrayList<>();
        }
    }

    private ArrayList<Vertex<TYPE>> vertices; //todos os vertices presentes no grafo
    private ArrayList<Edge<TYPE>> edges; //todos as arestas presentes no grafo

    public UnweightedDirectedGraph() {
        this.vertices = new ArrayList<>();
        this.edges = new ArrayList<>();
    }

    //metodo que adiciona um vertice no grafo, se o mesmo ainda nao existir
    public void addVertex(TYPE data) {
        if (!this.contains(data)) {
            Vertex<TYPE> newVertex = new Vertex<>(data);
            this.vertices.add(newVertex);
        }
    }

    //metodo que remove um vertice determinado, assim como suas ligacoes com outros vertices, se ele existir no grafo
    public void removeVertex(TYPE data) {
        if (this.contains(data)) {
            Vertex<TYPE> vertexToRemove = this.getVertex(data);

            //remove as ligacoes com outros vertices
            for (Vertex<TYPE> currentVertex : this.vertices) {
                this.removeEdge(vertexToRemove.data, currentVertex.data);
                this.removeEdge(currentVertex.data, vertexToRemove.data);
            }

            //remove o vertice determinado do grafo
            this.vertices.remove(vertexToRemove);
        }
    }

    //metodo que adiciona uma aresta (ligacao entre vertices) no grafo
    public void addEdge(TYPE startData, TYPE endData) {
        //verifica se os dados(vertices) existem no grafo
        if (!this.contains(startData) || !this.contains(endData) ) return;

        //recupera os objetos
        Vertex<TYPE> startVertex = this.getVertex(startData);
        Vertex<TYPE> endVertex = this.getVertex(endData);

        //forma a aresta
        Edge<TYPE> newEdge = new Edge<>(startVertex, endVertex);

        //adiciona a aresta no seu devido lugar nos vertices
        startVertex.outgoingEdges.add(newEdge);
        endVertex.inputEdges.add(newEdge);

        //adiciona a aresta no grafo
        this.edges.add(newEdge);
    }

    //metodo que remove uma aresta (ligacao entre vertices) do grafo
    public void removeEdge(TYPE startData, TYPE endData) {
        //recupera os objetos
        Vertex<TYPE> startVertex = this.getVertex(startData);
        Vertex<TYPE> endVertex = this.getVertex(endData);
        Edge<TYPE> edge = this.getEdge(startVertex, endVertex);

        //verifica se os dados(vertices e aresta) existem no grafo
        if (!this.contains(startData) || !this.contains(endData) || edge == null) return;

        //remove a aresta do seu devido lugar nos vertices
        startVertex.outgoingEdges.remove(edge);
        endVertex.inputEdges.remove(edge);

        //remove a aresta do grafo
        this.edges.remove(edge);
    }

    //metodo que retorna um determinado vertice presente no grafo
    private Vertex<TYPE> getVertex(TYPE dado) {
        for (Vertex<TYPE> currentVertex : this.vertices) {
            if (currentVertex.data.equals(dado)) {
                return currentVertex;
            }
        }
        return null;
    }

    //metodo que retorna uma determinada aresta presente no grafo
    private Edge<TYPE> getEdge(Vertex<TYPE> startVertex, Vertex<TYPE> endVertex) {
        for (Edge<TYPE> currentEdge : this.edges) {
            if (currentEdge.startVertex.equals(startVertex) && currentEdge.endVertex.equals(endVertex)) {
                return currentEdge;
            }
        }
        return null;
    }

    //metodo que retorna o tamanho do grafo
    public int size() {
        return this.vertices.size();
    }

    //metodo que verifica se um elemento existe no grafo
    public boolean contains(TYPE data) {
        Vertex<TYPE> vertex = this.getVertex(data);
        if (vertex != null) return this.vertices.contains(vertex);
        else return false;
    }

    //metodo que faz um busca em profundidade no grafo, a partir de uma origem
    public void depthSearch(TYPE origin) {
        if (!this.contains(origin)) return;
        Vertex<TYPE> originVertex = this.getVertex(origin);

        //recupera o indice do dado determinado
        int originIndex = this.vertices.indexOf(originVertex);

        System.out.println("### Busca em Profundidade: ");

        //vetor que guarda a resposta de que se um vertice ja foi visitado
        boolean[] visited = new boolean[this.size()];

        this.depthSearch(originIndex, visited);
    }

    //metodo complementar ao de mesmo nome
    private void depthSearch(int currentVertexIndex, boolean[] visited) {
        visited[currentVertexIndex] = true; //vertice atual visitado
        Vertex<TYPE> currentVertex = this.vertices.get(currentVertexIndex);

        //verifica se o vertice atual tem ligacao com cada um dos outros vertices
        for (int adjacentVertexIndex = 0; adjacentVertexIndex < visited.length; adjacentVertexIndex++) {
            Vertex<TYPE> adjacentVertex = this.vertices.get(adjacentVertexIndex);
            Edge<TYPE> edge = this.getEdge(currentVertex, adjacentVertex);

            //passa pelo vertice adjacente ainda nao visitado
            if (!visited[adjacentVertexIndex] && edge != null) {
                System.out.println("Veio de " + currentVertex.data + " para " + adjacentVertex.data);
                //recursao, agora com o vertice adjacente como vertice atual
                this.depthSearch(adjacentVertexIndex, visited);
            }
        }
    }

    //metodo que faz um busca em largura no grafo, a partir de uma origem
    public void breadthSearch(TYPE origin) {
        if (!this.contains(origin)) return;
        Vertex<TYPE> originVertex = this.getVertex(origin);

        //recupera o indice do dado determinado
        int originIndex = this.vertices.indexOf(originVertex);

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
        int currentVertexIndex = verticesToProcess.poll();
        Vertex<TYPE> currentVertex = this.vertices.get(currentVertexIndex);

        //verifica se o vertice atual tem ligacao com cada um dos outros vertices
        for (int adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
            Vertex<TYPE> adjacentVertex = this.vertices.get(adjacentVertexIndex);
            Edge<TYPE> edge = this.getEdge(currentVertex, adjacentVertex);

            //passa pelo vertice adjacente ainda nao visitado
            if (!verticesVisited[adjacentVertexIndex] && edge != null){
                System.out.println("Veio de " + currentVertex.data + " para " + adjacentVertex.data);
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
        if (!this.contains(src)) return;
        Vertex<TYPE> srcVertex = this.getVertex(src);
        int srcIndex = this.vertices.indexOf(srcVertex);

        //shorterDistance[i] armazena a distancia mais curta de src ao vertice i
        int[] shorterDistance = new int[this.size()];

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
            Vertex<TYPE> currentVertex = this.vertices.get(currentElementIndex);

            //atualiza o valor shorterDistance dos vertices adjacentes do vertice atual.
            for (int adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
                Vertex<TYPE> adjacentVertex = this.vertices.get(adjacentVertexIndex);
                Edge<TYPE> edge = this.getEdge(currentVertex, adjacentVertex);

                /*
                 * o shorterDistance[adjacentVertexIndex] e atualizado somente se nao estiver fechado, existir uma aresta de
                 * currentElementIndex para adjacentVertexIndex e o peso total do caminho de src para adjacentVertexIndex
                 * atraves de currentElementIndex e menor que o valor atual de shorterDistance[adjacentVertexIndex]
                 */

                if (edge != null) {
                    int distance = shorterDistance[currentElementIndex] + 1;

                    if (!closedVertices.contains(adjacentVertexIndex)
                            && shorterDistance[currentElementIndex] != Integer.MAX_VALUE
                            && distance < shorterDistance[adjacentVertexIndex]) {
                        shorterDistance[adjacentVertexIndex] = distance;
                    }
                }
            }
        }

        //imprime a matriz de distancias calculadas
        System.out.println("Distancia de " + src + " a:");
        for (int index = 0; index < this.size(); index++) {
            String distance = "Nao existe caminho!";
            if (shorterDistance[index] < Integer.MAX_VALUE) distance = shorterDistance[index] + " vertice(s)";

            System.out.println(this.vertices.get(index).data + " -> " + distance);
        }
    }

}
