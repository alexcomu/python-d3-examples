var svg = d3.select('svg')
var data_nodes = [];
var data_links = [];
var nodes = null;
var links = null;

function load(){
    d3.json("/force_data", function(json, error) {
        data_nodes = json.data_nodes;
        data_links = json.data_links;
        
        // create the layout
        var force = d3.layout.force()
                .nodes(data_nodes)
                .links(data_links)
                .size([500,400])
                .on('tick', tick);
        
        // some settings:
        force.charge(-150)
        force.friction(.9)
        force.linkDistance(100)
        force.linkStrength(.1)
        force.theta(.2)
        force.gravity(.1)

        // start the simulation
        force.start();
        
        links = svg.selectAll('line')
                    .data(force.links())
                    .enter()
                    .append('line')
                    .style('stroke', '#ccc')
        
        // reference the selection to a variable
        nodes = svg.selectAll('circle')
            .data(force.nodes())
            .enter()
            .append('circle')
            .style('fill', 'steelblue')
            .attr('r', function(d){
                    return d.amount
            })
            .call(force.drag);
    })
}
            
            
// this function will be called each frame
function tick(){
        if(!nodes) return;
        // this update the circle positions
        nodes.attr('cx', function(d){
                        return d.x;
                })
                .attr('cy', function(d){
                        return d.y;
                })

        // this update the line positions
        links.attr('x1', function(d){
                        return d.source.x
                })
                .attr('y1', function(d){
                        return d.source.y
                })
                .attr('x2', function(d){
                        return d.target.x
                })
                .attr('y2', function(d){
                        return d.target.y
                })
}  

load();