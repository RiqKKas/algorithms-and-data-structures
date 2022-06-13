import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class DirectedGraph<TYPE> {

    private static class Edge<TYPE> {
        private double weight;
        private Vertex<TYPE> startVertex;
        private Vertex<TYPE> endVertex;

        public Edge(double weight, Vertex<TYPE> startVertex, Vertex<TYPE> endVertex) {
            this.weight = weight;
            this.startVertex = startVertex;
            this.endVertex = endVertex;
        }
    }

    private static class Vertex<TYPE> {
        private TYPE data;
        private ArrayList<Edge<TYPE>> inputEdges;
        private ArrayList<Edge<TYPE>> outgoingEdges;

        public Vertex(TYPE data) {
            this.data = data;
            this.inputEdges = new ArrayList<>();
            this.outgoingEdges = new ArrayList<>();
        }

        public void addInputEdge(Edge<TYPE> edge) {
            this.inputEdges.add(edge);
        }

        public void addOutgoingEdge(Edge<TYPE> edge) {
            this.outgoingEdges.add(edge);
        }
    }

    private ArrayList<Vertex<TYPE>> vertices;
    private ArrayList<Edge<TYPE>> edges;

    public DirectedGraph() {
        this.vertices = new ArrayList<>();
        this.edges = new ArrayList<>();
    }

    public void addVertex(TYPE data) {
        Vertex<TYPE> newVertex = new Vertex<>(data);
        this.vertices.add(newVertex);
    }

    public void addEdge(double weight, TYPE startData, TYPE endData) {
        Vertex<TYPE> startVertex = this.getVertex(startData);
        Vertex<TYPE> endVertex = this.getVertex(endData);

        Edge<TYPE> newEdge = new Edge<>(weight, startVertex, endVertex);

        startVertex.addOutgoingEdge(newEdge);
        endVertex.addInputEdge(newEdge);

        this.edges.add(newEdge);
    }

    private Vertex<TYPE> getVertex(TYPE dado){
        for (Vertex<TYPE> currentVertex : this.vertices) {
            if (currentVertex.data.equals(dado)) {
                return currentVertex;
            }
        }

        return null;
    }

    public void breadthFirstSearch() {
        ArrayList<Vertex<TYPE>> marked = new ArrayList<>();
        Queue<Vertex<TYPE>> toVisit = new LinkedList<>();

        Vertex<TYPE> currentVertex = this.vertices.get(0);
        marked.add(currentVertex);
        toVisit.add(currentVertex);

        System.out.println(currentVertex.data);

        while (toVisit.size() > 0) {
            currentVertex = toVisit.poll();

            for (int index = 0; index < currentVertex.outgoingEdges.size(); index++) {
                Vertex<TYPE> nextVertex = currentVertex.outgoingEdges.get(index).endVertex;

                if (!marked.contains(nextVertex)) {
                    marked.add(nextVertex);
                    System.out.println(nextVertex.data);
                    toVisit.add(nextVertex);
                }
            }
        }
    }

}
