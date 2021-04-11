$(document).ready(() => {
  const padding = {top:20, right:100, bottom:20, left:100};
  const w = 500;
  const h = 500;
  let r = Math.min(w, h)/2;
  let rotation = 0;
  let oldrotation = 0;
  let color = d3.scale.category20();

  const prize_data = [
    {prize:"Question 1", message:"What CSS property is used for specifying the area between the content and its border?"},
    {prize:"Question 2", message:"What CSS property is used for changing the font?"},
    {prize:"Question 3", message:"What CSS property is used for changing the color of text?"},
    {prize:"Question 4", message:"What CSS property is used for changing the boldness of text?"}, 
    {prize:"Question 5", message:"What CSS property is used for changing the size of text?"},
    {prize:"Question 6", message:"What CSS property is used for changing the background color of a box?"},
    {prize:"Question 7", message:"Which word is used for specifying an HTML tag that is inside another tag?"},
    {prize:"Question 8", message:"Which side of the box is the third number in: margin:1px 1px 1px 1px; ?"},
    {prize:"Question 9", message:"What are the fonts that don't have serifs at the ends of letters called?"},
    {prize:"Question 10", message:"With CSS selectors, what character prefix should one use to specify a class?"},
    {prize:"Question 11", message:"With CSS selectors, what character prefix should one use to specify an ID?"},
    {prize:"Question 12", message:"In an HTML document, which tag holds all of the content people see?"},
    {prize:"Question 13", message:"In an HTML document, which tag indicates an unordered list?"},
    {prize:"Question 14", message:"In an HTML document, which tag indicates the most important heading of your document?"},
    {prize:"Question 15", message:"What CSS property is used for specifying the area outside a box?"},
    {prize:"Question 16", message:"What type of bracket is used for HTML tags?"},
    {prize:"Question 17", message:"What type of bracket is used for CSS rules?"},
    {prize:"Question 18", message:"Which HTML tag is used for specifying a paragraph?"},
    {prize:"Question 19", message:"What should always be the very first line of code in your HTML?"},
    {prize:"Question 20", message:"What HTML tag holds all of the metadata tags for your page?"}
  ];


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
      .attr("fill", function(d, i){ return color(i); })
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
              .text(prize_data[picked].message);

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