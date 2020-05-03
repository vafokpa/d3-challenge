// // Define SVG area dimensions
var svgWidth = 760;
var svgHeight = 460;

// // Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 50
};

// // Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// // to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("./assets/data/data.csv").then(function(newsData) {

    console.log(newsData);

    // Formatting the Data
    newsData.forEach(function(data) {

        data.poverty = +data.poverty
        data.obesity = +data.obesity
        data.age = +data.age

        // console.log(data.poverty)
        // console.log(data.obesity)
    });
    

    // Creating the Scales

    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(newsData, d => d.poverty))
    .range([0, chartWidth]);


    var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(newsData, d => d.obesity))
    .range([chartHeight, 0]);



    // Creating Axes

    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);


    //Appending the Axes to the chartGroup

    // Bottom Axis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    // Left Axis
    chartGroup.append("g")
    .call(yAxis);


    // Creating the Circles using data binding

    var circles = chartGroup.selectAll("scatter")
        .data(newsData)
        .enter()
        .append("circle")
        .attr("r","13")
        .attr("cx", (d,i) => xLinearScale(newsData[i].poverty))
        .attr("cy", (d,i) => yLinearScale(newsData[i].obesity))
        .attr("fill", "pink")
        .attr("stroke", "black")
        .style("fill-opacity",0.7);

    
    var text = chartGroup.selectAll("scatter")
        .data(newsData)
        .enter()
        .append("text")
        .attr("x", (d,i) => xLinearScale(newsData[i].poverty))
        .attr("y", (d,i) => yLinearScale(newsData[i].obesity))
        .text((d,i) => newsData[i].abbr)
        .attr("fill", "black")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")

    // Creating the x-labels

        chartGroup.append("text")
        .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.top + 5})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .text("Percentage of Population in Poverty (%)");

    // Creating the y-labels

        chartGroup.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", - chartMargin.left + 5)
        .attr("x", chartMargin.top/2 - 70)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Percentage of Population Obese (%)");


});




  