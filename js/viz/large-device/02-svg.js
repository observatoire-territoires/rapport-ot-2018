function graph2() {



	//sizing
	let margin = { top: 20, right: 20, bottom: 60, left: 100 };

	let width = document.querySelector(".niv2 p").clientWidth;
	let height = 400;

	//initiate svg
	let svg = d3.select("#c-svg-02")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.attr("viewBox", "0 0 " + width + " " + height);

	//initiate format number
	/*Initiate format number*/
	d3.formatDefaultLocale({
		"decimal": ",",
		"thousands": "\u2009",
		"grouping": [3]
	});

	let format = d3.format(".2n");

	d3.csv("data/csv/data-02.csv").then(function (data) {


		//Conversion number
		data.forEach((d) => {
			d.meme_com = +d.meme_com,
			d.change_com = +d.change_com,
			d.change_dep = +d.change_dep,
			d.change_reg = +d.change_reg,
			d.change_int = +d.change_int;
		});

		//select righ-key values
		let keys = data.columns.slice(1, 6);


		//Initiate x Axis
		const xScale = d3.scaleLinear()
			.domain([0, 35])
			.rangeRound([margin.left, width - margin.right]);

		//Initiate y Axis
		const yScale = d3.scaleBand()
			.domain(data.map((d) => { return d.periode; }))
			.rangeRound([margin.top, height - margin.bottom])
			.paddingInner(0.5)
			.align(0.1);

		//Initiate z Axis
		const zScale = d3.scaleOrdinal()
			.domain(keys)
			.range(["#7b7fbd", "#7dbd9f", "#f8c352", "#f18757", "#e85654"]);


		const xAxis = d3.axisBottom(xScale)
			.tickFormat((d) => { return d + " %"; });
		const yAxis = d3.axisLeft(yScale)
			.tickSizeOuter(0);


		const stack = d3.stack();


		//Call Axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(xAxis);

		svg.select(".x_axis")
			.selectAll("text")
			.attr("y", 10);

		svg
			.append("g")
			.attr("class", "axis y_axis")
			.attr("transform", `translate(${margin.left},0)`)
			.call(yAxis)
			.select(".domain").remove();


		//Call Z	
		const serie = svg
			.selectAll(".serie")
			.data(stack.keys(keys)(data))
			.enter().append("g")
			.attr("class", "serie")
			.attr("fill", ((d) => { return zScale(d.key); }));

		serie
			.selectAll("rect")
			.data((d) => { return d; })
			.enter()
			.append("rect")
			.attr("x", ((d) => { return xScale(d[0]); }))
			.attr("y", ((d) => { return yScale(d.data.periode); }))
			.attr("width", ((d) => { return xScale(d[1]) - xScale(d[0]); }))
			.attr("height", yScale.bandwidth());


		//Text label xAxis
		svg
			.append("text")
			.attr("class", "label")
			.attr("transform",
				"translate(" + (width - margin.right) + " ," + (height - margin.bottom / 4) + ")")
			.style("text-anchor", "end")
			.attr("fill", "#f0f0f0")
			.text("Part des ménages ayant changé de logement");


		//create div popup
		let popup = d3.select("body").append("div")
			.attr("class", "my-popup");


		//MOUSE EVENT


		d3.selectAll("rect")
			.on("mouseover", function (d) {
				popup
					.transition()
					.duration(50)
					.style("left", d3.event.pageX - 20 + "px")
					.style("top", d3.event.pageY - 120 + "px")
					.style("opacity", 1)
					.style("text-align", "left");
				popup
					.html(`
						<div>
							<em>Chgt de logement dans la même commune</em> : <span>${format(d.data.meme_com)} % </span>
							<br>
							<em>Chgt de commune dans le même département</em> : <span>${format(d.data.change_com)} % </span>
							<br>
							<emChgt de département dans la même région</em> : <span>${format(d.data.change_dep)} % </span>
							<br>
							<em>Chgt de région en France</em> : <span>${format(d.data.change_reg)} % </span>
							<br>
							<em>Arrivée depuis l'étranger</em> : <span>${format(d.data.change_int)} % </span>
						</div>
						`);


			})
			.on("mouseout", function (d) {
				popup
					.transition()
					.duration(100)
					.style("opacity", 0);


			});


		//Legend
		const legendText = ["Changement de logement dans la même commune", "Changement de commune dans le même département", "Changement de département dans la même région", "Changement de région en France", "Arrivée depuis l'étranger"];

		let svgLegend = d3.select("#c-svg-02-legend")
			.append("svg")
			.attr("width", width)
			.attr("height", 100);



		let legend = svgLegend.selectAll(".legend")
			.data(zScale.range())
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






	}); //read csv








} //fonction graph2


window.addEventListener("load", function(){
	if(getComputedStyle(document.querySelector(".c-graphic-min")).display == "none")
	{
		graph2();
	}
});