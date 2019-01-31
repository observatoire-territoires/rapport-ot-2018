function graph5(){


	//sizing
	let margin = {top:20, right:0, bottom:40, left: 40};

	let width = 600;
	let height = 400;


	//initiate svg
	let svg = d3.select("#c-svg-05")
		.append("svg")
		.attr("height", height)
		.attr("width", "100%");

	//initiate format number
	/*Initiate format number*/
	d3.formatDefaultLocale({
		"decimal": ",",
		"thousands": "\u2009",
		"grouping": [3]
	});


	//Initiate data
	d3.csv("data/data-05.csv").then(function(data){

		console.log(data);

		data.forEach((d)=>{
			d.tx_19992009 = +d.tx_19992009,
			d.tx_20092014 = +d.tx_20092014;	
		});

		//select key values
		let keys = data.columns.slice(2,4);

		//return min & max values
		let min = d3.min(data, (d)=>{ return d3.min(keys, (key)=>{ return d[key];});});
		let max = d3.max(data, (d)=>{ return d3.max(keys, (key)=>{ return d[key];});});

		console.log(min);
		console.log(max);



		//Initiate y Axis
		const yScale = d3.scaleLinear()
			.domain([min,max]).nice() //input
			.range([height-margin.bottom, margin.top]); //output


		const yAxis = d3.axisRight(yScale)
			.tickSize(width);


		//Call y Axis
		let borderLines = svg.append("g")
			.attr("class", "border-lines")
		borderLines.append("line")
			.attr("id", "left-border-line")
			.attr("x1", margin.left).attr("y1", margin.top)
			.attr("x2", margin.left).attr("y2", config.height-margin.bottom);
		borderLines.append("line")
			.attr("id", "right-border-line")
			.attr("x1", width-margin.right).attr("y1", margin.top)
			.attr("x2", width-margin.right).attr("y2", config.height-margin.bottom);


	}); //read csv

















	


} //fonction graph5








//initialize the scrollama
//Parallax
const scroller2 = scrollama();

function handleStepEnter(response) {

	switch(response.index){
	case 1:
		d3.select("#c-svg-05").selectAll("*").remove();
		break;
	case 2:
		graph5();
		break;
	}
}

function handleStepExit(response){
	switch(response.index){
	case 2:
		d3.select("#c-svg-05").selectAll("*").remove();
		break;
	}
}


scroller2
	.setup({
		container: ".scroll",
		graphic: ".scroll-graphic",
		text: ".scroll-text",
		step: ".break-section3",
		debug: false,
		offset: 0.33
	})
	.onStepEnter(handleStepEnter)
	.onStepExit(handleStepExit);
