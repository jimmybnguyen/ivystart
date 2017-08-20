$(function(){

	var width = 800;
	var height = 400;

	var padding = 30;

	var svg = d3.select("#treatment-graph").append("svg")
					.attr("width", width)
					.attr("height", height)
					.style("background-color", "white");

	var dummyData = [{
	    "Client": "ABC",
	    "sale": "3",
	    "year": "1"
	}, {
	    "Client": "ABC",
	    "sale": "7",
	    "year": "2"
	}, {
	    "Client": "ABC",
	    "sale": "5",
	    "year": "3"
	}, {
	    "Client": "ABC",
	    "sale": "1",
	    "year": "4"
	}, {
	    "Client": "ABC",
	    "sale": "8",
	    "year": "5"
	}, {
	    "Client": "XYZ",
	    "sale": "9",
	    "year": "1"
	}, {
	    "Client": "XYZ",
	    "sale": "4",
	    "year": "2"
	}, {
	    "Client": "XYZ",
	    "sale": "2",
	    "year": "3"
	}, {
	    "Client": "XYZ",
	    "sale": "3",
	    "year": "4"
	}, {
	    "Client": "XYZ",
	    "sale": "4",
	    "year": "5"
	}];


	xScale = d3.scale.linear()
	.range([padding, width-padding])
	.domain([d3.min(dummyData, function(d){
		return d.year;
	}), d3.max(dummyData, function(d){
		return d.year;
	})]);

	yScale = d3.scale.linear()
	.range([height - padding, padding])
	.domain([parseInt(d3.min(dummyData, function(d){
		return d.sale;
	})) - 1, parseInt(d3.max(dummyData, function(d){
		return d.sale;
	})) + 1]);

	xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
  
	yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

    svg.append('g')
    .attr("class", "axis")
	.attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

    svg.append('g')
    .attr('class', 'axis')
	.attr("transform", "translate(" + (padding) + ",0)")
    .call(yAxis);

    var dataGroup = d3.nest()
					.key(function(d){
						return d.Client;
					})
					.entries(dummyData);

	var lineGen = d3.svg.line()
					.x(function(d){
						return xScale(d.year);
					})
					.y(function(d){
						return yScale(d.sale);
					});


	var colorLines = ["#00b359", "#ff944d"]

	dataGroup.forEach(function(d, i){
		svg.append('path')
			.attr('d', lineGen(d.values))
			.attr('stroke', colorLines[i])
			.attr('stroke-width', 3)
			.attr('fill', 'none');
	});

});
