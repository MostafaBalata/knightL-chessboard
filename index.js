/**
 * 
 * Applying the BDF algorithm to find the shortest path between
 * certain point on the chessboard to another one
 * 
 */

class Node {
  constructor(x, y, dist) {
    // row index
    this.x = x;
    // column index
    this.y = y;
    // the distenation between the current node and the root
    this.dist = dist;
  }
  toString() {
    return `${this.x}, ${this.y}`;
  }
}

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.adjList = new Map();
  }

  addVertex(v) {
    this.adjList.set(v, []);
  }

  addEdge(v, w) {
    this.adjList.get(v).push(w)
  }
  // Breadth First Traversal for a Graph
  bfs(startingNode, destX, destY) {
    let visited = [];

    for (let i = 0; i < this.noOfVertices; i++) {
      visited[i] = false;
    }

    let queue = [];
    visited[startingNode] = true;
    let level = 0;

    queue.push(new Node(0, 0, level));
    while (queue.length) {
      const element = queue.shift();
      const list = this.adjList.get(node(element.x, element.y));
      level = element.dist;

      if (element == node(destX, destY)) {
        return element.dist;
      }

      for (let i in list) {
        const neigh = list[i];
        if (!visited[neigh]) {
          visited[neigh] = true;
          const node = neigh.split(", ")
          queue.push(new Node(node[0], node[1], level + 1));
        }
      }
    }
    return -1;
  }
}

function node(x, y) {
  return new Node(x, y).toString();
}

function knightlOnAChessboard(n, a, b) {
  const g = new Graph(n * n);
  let chess = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (chess[i] == undefined) chess[i] = [];
      g.addVertex(node(i, j));

      if (i + a < n && j + b < n)
        g.addEdge(node(i, j), node(i + a, j + b))

      if (0 <= i - a && i - a < n && 0 <= j - b && j - b < n)
        g.addEdge(node(i, j), node(i - a, j - b))

      if (0 <= i - a && i - a < n && 0 <= j + b && j + b < n)
        g.addEdge(node(i, j), node(i - a, j + b))


      if (0 <= i + a && i + a < n && 0 <= j - b && j - b < n)
        g.addEdge(node(i, j), node(i + a, j - b))

      if (0 <= i + b && i + b < n && 0 <= j + a && j + a < n && a != b)
        g.addEdge(node(i, j), node(i + b, j + a))

      if (0 <= i - b && i - b < n && 0 <= j - a && j - a < n && a != b)
        g.addEdge(node(i, j), node(i - b, j - a))

      if (0 <= i - b && i - b < n && 0 <= j + a && j + a < n && a != b)
        g.addEdge(node(i, j), node(i - b, j + a))

      if (0 <= i + b && i + b < n && 0 <= j - a && j - a < n && a != b) {
        g.addEdge(node(i, j), node(i + b, j - a))
      }
    }
  }
  return g.bfs(node(0, 0), n - 1, n - 1);
}


const n = 5;
const limit = [...Array(n).keys()].splice(1)
console.log(limit.map(a => limit.map(b => knightlOnAChessboard(n, a, b))).map(x => x.join(' ')).join("\n") + "\n")

/**
 *  Expected output
 * 4 4 2 8
 * 4 2 4 4
 * 2 4 -1 -1
 * 8 4 -1 1
 */
