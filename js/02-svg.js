function graph2(){



	//sizing
	let margin = {top:20, right:20, bottom:40, left: 100};

	let width = document.querySelector("#c-svg-02").clientWidth;
	let height = 400;

	//initiate svg
	let svg = d3.select("#c-svg-02")
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


	d3.csv("data/data-02.csv").then(function(data){

		console.log(data);

		//Conversion number
		data.forEach((d)=>{
			d.change_com = +d.change_com,
			d.change_dep = +d.change_dep,
			d.change_reg = +d.change_reg,
			d.change_int = +d.change_int;
		});

		//select righ-key values
		let keys = data.columns.slice(1,5);
		

		//Initiate x Axis
		const xScale = d3.scaleLinear()
			.domain([0,22])
			.rangeRound([margin.left, width-margin.right]);

		//Initiate y Axis
		const yScale = d3.scaleBand()
			.domain(data.map((d)=>{ return d.periode; }))
			.rangeRound([margin.top, height-margin.bottom])
			.paddingInner(0.5)
			.align(0.1);

		//Initiate z Axis
		const zScale = d3.scaleOrdinal()
			.domain(keys)
			.range(["#7b7fbd","#7dbd9f","#f8c352","#f18757","#e85654"]);


		const xAxis = d3.axisBottom(xScale)
			.tickFormat((d)=>{ return d+"%"; });;
		const yAxis = d3.axisLeft(yScale)
			.tickSizeOuter(0);


		const stack = d3.stack();


		//Call Axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height-margin.bottom})`)
			.call(xAxis);

		svg
			.append("g")
			.attr("class", "axis y_axis")
			.attr("transform",`translate(${margin.left},0)`)
			.call(yAxis)
			.select(".domain").remove();


		//Call Z	
		const serie = svg
			.selectAll(".serie")
			.data(stack.keys(keys)(data))
			.enter().append("g")
			.attr("class", "serie")
			.attr("fill", ((d)=>{ return zScale(d.key); }))

		serie
			.selectAll("rect")
			.data((d)=>{ return d; })
			.enter()
			.append("rect")
			.attr("x", ((d)=>{ return xScale(d[0]); }))
			.attr("y", ((d)=>{ return yScale(d.data.periode); }))
			.attr("width", ((d)=>{ return xScale(d[1])-xScale(d[0]); }))
			.attr("height", yScale.bandwidth());


	}); //read csv






















} //fonction graph2

graph2();