$(document).ready(() => {
  const padding = {top:20, right:100, bottom:20, left:100};
  const w = 500;
  const h = 500;
  let r = Math.min(w, h)/2;
  let rotation = 0;
  let oldrotation = 0;
  let spinsLeft = 3;
  let winnings = 0;

  let cat1Prize = Math.round(5 + (10 * getTPS())).toLocaleString() + " Tickets"
  let cat2Prize = Math.round(50 + (60 * getTPS())).toLocaleString() + " Tickets"
  let cat3Prize = Math.round(10 + (15 * getTPS())).toLocaleString() + " Tickets"
  const prize_data = [
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""},
    {prize:"3 More Spins", message:""},
    {prize: cat1Prize, message:""}, 
    {prize: cat3Prize, message:""},
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""},
    {prize: cat2Prize, message:""},
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""},
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""},
    {prize:"3 More Spins", message:""},
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""},
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""},
    {prize: ownsUpgrade("upgrade10") ? (100 + 300 * getTPS()).toLocaleString() + " Tickets" : "Upgrade Clicks", message:""},
    {prize: cat1Prize, message:""},
    {prize: cat3Prize, message:""}
  ];
  const cat1 = new Set([0, 3, 5, 8, 10, 13, 15, 18])
  const cat2 = new Set([2, 7, 12])

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
      if (cat1.has(i)) return "#C3B1E1";
      else if (cat2.has(i)) return "#DDD000";
      else if (i === 17) return "#DD0000"
      else return "#00BBBB"
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

  container.on("click", () => {
    spin();
    document.getElementById("spins").innerHTML = spinsLeft;
  });

  function spin(){
    container.on("click", null);

    spinsLeft--;

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
        //Get prize
        let prizeWon = prize_data[picked].prize;
        let message = "You won " + prizeWon + "!"
        if (picked === 17 && !ownsUpgrade("upgrade10")) message += " Clicks now give 25% of TPS!"
        d3.select(".prize")
            .text(message);
        getPrize(prizeWon)
        oldrotation = rotation;
        if (spinsLeft === 0) {
          container.on('click', null);
          d3.select(".header").text("No more spins left!")
          addTickets(winnings)
          //CLOSE WINDOW
          return;
        }
        else container.on("click", () => {
          spin();
          document.getElementById("spins").innerHTML = spinsLeft;
        });
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

  const getPrize = (prize) => {
    if (prize.endsWith("Tickets")) {
      let amount = Number(prize.split(" ")[0].replace(/,/g, ""));
      winnings += amount
      d3.select(".total").style({"display":"block"})
      document.getElementById("winnings").innerHTML = winnings.toLocaleString();
    }
    else if (prize.endsWith("Clicks")) {
      addUpgrade("upgrade10")
    }
    else {
      spinsLeft += 3;
      document.getElementById("spins").innerHTML = spinsLeft;
    }
  };

});