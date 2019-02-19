function graph6(){


	//sizing
	let margin = {top:35, right:20, bottom:30, left: 50};

	let width = document.querySelector("#c-svg-06").clientWidth;
	let height = 400;

	//initiate svg
	let svg = d3.select("#c-svg-06")
		.append("svg")
		.attr("height", height)
		.attr("width", width);

	//initiate format number
	/*Initiate format number*/
	d3.formatDefaultLocale({
		"decimal": ",",
		"thousands": "\u2009",
		"grouping": [3]
	});

	let format2 = d3.format("");

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

		const yAxis = d3.axisLeft(yScale)
			.ticks(5)
			.tickSizeOuter(0)
			.tickFormat((d)=>{return format2(d)+" %";}); //add unit



		//Call x axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height-margin.bottom})`)
			.call(xAxis);

		svg.select(".x_axis")
			.selectAll("text")
			.attr("y", 10);

			
		//Call y axis
		svg
			.append("g")
			.attr("class", "axis y_axis")
			.attr("transform",`translate(${margin.left},0)`)
			.call(yAxis);


	
		svg.select(".y_axis")
			.selectAll("text")
			.attr("x",-10)
			.attr("dy",3);



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

		//Call horizontal line
		svg
			.append("line")
			.attr("x1", margin.left)
			.attr("x2", width-margin.right)
			.attr("y1", yScale(0))
			.attr("y2", yScale(0))
			.attr("stroke", "#fff")
			.attr("stroke-width",2);



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



		



		//Text label yAxis
		svg
			.append("text")       
			.attr("class","label")      
			.attr("fill", "#f0f0f0")
			.attr("y",margin.top/3)
			.attr("x", margin.left/2)
			.style("text-anchor", "start")
			.text("Taux d'évolution de la population");

		//Text label yAxis
		svg
			.append("text")       
			.attr("class","label")     
			.attr("fill", "#f0f0f0") 
			.attr("y",margin.top/3+15)
			.attr("x", margin.left/2)
			.style("text-anchor", "start")
			.text("due a solde migratoire apparent");



		//add popup

		//create div popup
		let popup = d3.select("body").append("div")
			.attr("class", "my-popup");


		//MOUSE EVENT


		d3.selectAll(".line")
			.on("mouseover", function(d,i){
				popup
					.transition()
					.duration(50)
					.style("left", d3.event.pageX - 20 + "px")
					.style("top", d3.event.pageY - 30 + "px")
					.style("opacity", 1)
					.style("text-align", "left");
				
				switch (i) {
				case 0:
					popup
						.html(`
							<div><strong>Grands pôles</strong></div>
							`);
					break;
				case 1:
					popup
						.html(`
							<div><strong>Couronnes de grands pôles</strong></div>
							`);
					break;
				case 2:
					popup
						.html(`
							<div><strong>Communes multipolarisées des grandes aires urbaines</strong></div>
							`);
					break;
				case 3:
					popup
						.html(`
							<div><strong>Pôles moyens</strong></div>
							`);
					break;
				case 4:
					popup
						.html(`
							<div><strong>Couronnes des pôles moyens</strong></div>
							`);
					break;
				case 5:
					popup
						.html(`
							<div><strong>Petits pôles</strong></div>
							`);
					break;
				case 6:
					popup
						.html(`
							<div><strong>Couronnes des petits pôles</strong></div>
							`);
					break;
				case 7:
					popup
						.html(`
							<div><strong>Autres communes multipolarisées</strong></div>
							`);
					break;
				case 8:
					popup
						.html(`
							<div><strong>Communes isolées, hors influence des pôles</strong></div>
							`);
					break;
				}
					

				//geographical unit
				d3.select(this)
					.attr("fill-opacity",0.7);

			})
			.on("mouseout", function(d){
				popup
					.transition()
					.duration(100)
					.style("opacity", 0);


				//geographical unit
				d3.select(this)
					.attr("fill-opacity",1);

			});





		//Legend
		const legendText = ["Grands pôles", "Couronnes de grands pôles", "Communes multipolarisées des grandes aires urbaines", "Pôles moyens", "Couronnes des pôles moyens", "Petits pôles", "Couronnes des petits pôles", "Autres communes multipolarisées", "Communes isolées, hors influence des pôles"];

		let svgLegend = d3.select("#c-svg-06-legend")
			.append("svg")
			.attr("width", width)
			.attr("height", 180);



		let legend = svgLegend.selectAll(".legend")
			.data(color)
			.enter()
			.append("g")
			.attr("class", "legend");




		legend
			.append("rect")
			.attr("x", 10 + margin.left)
			.attr("y", function (d, i) {
				return i * 20+5;
			})
			.attr("width", 23)
			.attr("height", 12)
			.style("stroke", "black")
			.style("stroke-width", 0.1)
			.style("fill", function (d) { return d; });

		legend
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 40 + margin.left) //leave 30 pixel space after the <rect>
			.attr("y", function (d, i) {
				return 10 + i * 20;
			})
			.attr("dy", "0.5em")
			.text(function (d, i) {
				return legendText[i];
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













} //function graph6


graph6();