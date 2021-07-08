function preload() {
  data = loadStrings("resources/small-graph.txt");
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  background(255);

  var graph = Graph.fromText(data);

  graph.p5display()
  console.log(graph.edges)
  console.log(graph.nodes)
  stroke(255,0,0)
  graph.display()

  const mst = graph.prims()
  mst.p5display()
}

function draw() {
}