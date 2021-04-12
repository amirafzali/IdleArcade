$(document).ready(() => {
  const padding = {top:20, right:100, bottom:20, left:100};
  const w = 500;
  const h = 500;
  let r = Math.min(w, h)/2;
  let rotation = 0;
  let oldrotation = 0;

  const prize_data = [
    {prize:"500 Tickets", message:""},
    {prize:"Prize 2", message:""},
    {prize:"Prize 3", message:""},
    {prize:"Prize 4", message:""}, 
    {prize:"Prize 5", message:""},
    {prize:"500 Tickets", message:""},
    {prize:"Prize 7", message:""},
    {prize:"Prize 8", message:""},
    {prize:"Prize 9", message:""},
    {prize:"Prize 10", message:""},
    {prize:"500 Tickets", message:""},
    {prize:"Prize 12", message:""},
    {prize:"Prize 13", message:""},
    {prize:"Prize 14", message:""},
    {prize:"Prize 15", message:""},
    {prize:"500 Tickets", message:""},
    {prize:"Prize 17", message:""},
    {prize:"Prize 18", message:""},
    {prize:"Prize 19", message:""},
    {prize:"Prize 20", message:""}
  ];
  const cat1 = new Set([0, 5, 10, 15])
  const cat2 = new Set([1, 4, 6, 9, 11, 14, 16, 19])

  var svg = d3.select('.wheel')
      .append("svg")
      .data([prize_data])
      .attr("width",  w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom);

  var container = svg.append("g")
      .attr("class", "chartholder")
      .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

  var vis = container
      .append("g");
      
  var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "slice");
      
  arcs.append("path")
      .attr("fill", function(d, i){ 
        if (cat1.has(i)) return "#FF0000";
        else if (cat2.has(i)) return "#BBBBBB";
        else return "#FF0000";
      })
      .attr("d", function (d) { return arc(d); });

  // add the text
  arcs.append("text").attr("transform", function(d){
          d.innerRadius = 0;
          d.outerRadius = r;
          d.angle = (d.startAngle + d.endAngle)/2;
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
      })
      .attr("text-anchor", "end")
      .text(function(d, i) {
          return prize_data[i].prize;
      });

  container.on("click", spin);

  function spin(){
      container.on("click", null);

      let ps = 360/prize_data.length
      let rng = Math.floor((Math.random() * 5000) + 360);
          
      rotation = (Math.round(rng / ps) * ps);
      
      picked = Math.round(prize_data.length - (rotation % 360)/ps);
      picked = picked >= prize_data.length ? (picked % prize_data.length) : picked;

      rotation += 90 - Math.round(ps/2);

      vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function(){
          //populate question
          d3.select(".question")
              .text("You won " + prize_data[picked].prize + "!");

          oldrotation = rotation;
          container.on("click", spin);
        });
  }

  //make arrow
  svg.append("g")
      .attr("transform", "translate(" + (padding.left + w + padding.right/1.2) + "," + (h/2 + padding.top) + ")")
      .append("path")
      .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
      .style({"fill":"#BBBBBB"});

  //draw spin circle
  container.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 60)
      .style({"fill":"black","cursor":"pointer"});

  //spin text
  container.append("text")
      .attr("x", 0)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("SPIN")
      .style({"fill":"#BBBBBB", "font-weight":"bold", "font-size":"25px"});

  function rotTween() {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
      return "rotate(" + i(t) + ")";
    };
  }
});