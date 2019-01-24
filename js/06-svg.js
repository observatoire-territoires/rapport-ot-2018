function graph6(){


	//sizing
	let margin = {top:20, right:20, bottom:20, left: 25};

	let width = 600;
	let height = 400;

	//initiate svg
	let svg = d3.select("#c-svg-06")
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
	d3.csv("data/data-06.csv").then(function(data){

		//Conversion number
		data.forEach((d)=>{
			d["111"] = +d["111"];
			d["112"] = +d["112"];
			d["120"] = +d["120"];
			d["211"] = +d["211"];
			d["212"] = +d["212"];
			d["221"] = +d["221"];
			d["222"] = +d["222"];
			d["300"] = +d["300"];
			d["400"] = +d["400"];
		});

		//select key values
		let keys = data.columns.slice(1,10);

		//return min & max values
		let max = d3.max(data, (d)=>{return d3.max(keys,(key)=>{return d[key];});});
		let min = d3.min(data, (d)=>{return d3.min(keys,(key)=>{return d[key];});});


		//calculate min
		
		//Initiate x Axis
		const xScale = d3.scaleLinear()
			.domain(d3.extent(data, ((d)=>{return d.year;}))) //input
			.range([margin.left, width-margin.right]); //output

		const yScale = d3.scaleLinear()
			.domain([min,max]).nice() //input
			.range([height-margin.bottom, margin.top]); //output


		const xAxis = d3.axisBottom(xScale)
			.tickSizeOuter(0);

		const yAxis = d3.axisRight(yScale)
			.tickSize(width)
			.tickFormat((d)=>{return d+"%";}); //add unit


		//111
		let line = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["111"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line
	
		//112
		let line2 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["112"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//120
		let line3 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["120"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//211
		let line4 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["211"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//212
		let line5 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["212"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//221
		let line6 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["221"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//222
		let line7 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["222"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//300
		let line8 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["300"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line
			
		//400
		let line9 = d3.line()
			.x((d)=>{return xScale(d.year);}) //set the x values for the line generator
			.y((d)=>{return yScale(d["400"]);}) //set the y values for the line generator
			.curve(d3.curveMonotoneX); //apply smoothing to the line

		//Call x axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height-margin.bottom})`)
			.call(xAxis)
			.select(".domain").remove();


		//Call y axis
		svg
			.append("g")
			.attr("class", "axis y_axis")
			.attr("transform",`translate(${margin.left},0)`)
			.call(yAxis)
			.select(".domain").remove();

		svg.select(".y_axis")
			.selectAll("line")
			.attr("stroke-dasharray", "3");
	
		svg.select(".y_axis")
			.selectAll("text")
			.attr("x",-2)
			.attr("dy",3);


		//Call line
		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line2);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line3);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line4);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line5);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line6);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line7);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line8);

		svg
			.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line9);


		//Color line
		const color = ["#c90c10","#f49829","#f9d333","#a31876",
			"#ca75ad","#0a9ba2","#8acdd2","#ccc1da","#f2f4ee"];

		let lines = document.querySelectorAll(".line");

		Array.from(lines).forEach((el,i)=>{
			el.setAttribute("stroke",color[i]);
		});

		/*Resize SVG, responsive*/

		console.log("Etat du document : " + document.readyState);
		if (document.readyState == "loading") {
			document.addEventListener("DOMContentLoaded", ()=>{
				resize();

			});
		} else {
			resize();

		}

		d3.select(window)
			.on("resize", ()=>{
				resize();

			});


		/*Resize SVG*/
		function resize(){

			/*Update width and height*/
			width = parseInt(d3.select("#c-svg-06").style("width"), 10);
			height = parseInt(d3.select("#c-svg-06").style("height"),10);
			console.log("width window : " + window.innerWidth);
			/*Resize chart*/
			xScale.range([margin.left, width-margin.right]);

			yAxis.tickSize(width);

			d3.select(svg.node().parentNode)
				.style("width", width);

			svg
				.attr("width",width);
		

		}












	}); //d3.csv











}


graph6();