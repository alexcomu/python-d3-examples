var n = 40,
    data = [];
for (var i=n; i--;) data.push(0);

var width = 960,
    height = 500;

var x = d3.scale.linear().domain([0, n - 1]).range([0, width]);
var y = d3.scale.linear().domain([0, 100]).range([height, 0]);

var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

var path = svg.append("g")
  .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line);

tick();

function tick() {
  d3.json("/utils_data", function(json, error) {
      data.push(json.usage);
      path
          .attr("d", line)
          .attr("transform", null)
          .attr('stroke', function(d){
            if(d[d.length-1] > 70){
                return "red";
            }else if(d[d.length-1] > 45){
                return "orange";
            }
            return "black";
          })
        .transition()
          .duration(500)
          .ease("linear")
          .attr("transform", "translate(" + x(-1) + ")")
          .each("end", tick); 

      data.shift();
  });
}