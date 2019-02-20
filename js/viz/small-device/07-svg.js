//small device

//storing values in an array
let inputValues3Min = ["1968-1975", "1975-1982", "1982-1990", "1990-1999", "1999-2009", "2009-2014"];

let input07Min = document.querySelector("#input-07");
let output07Min = document.querySelector("#c-output-07");

let output07BulletMin = document.querySelector("#output-07-bullet");

input07Min.oninput = function(){
	output07BulletMin.innerHTML = inputValues3Min[this.value];
};




//set the default value
input07Min.oninput();


//deplace output bullet during slide
let deplaceOutputBullet3Min = function(){
	let bulletPosition = (input07Min.value / input07Min.max);
	output07BulletMin.style.left = (bulletPosition * input07Min.getBoundingClientRect().width)*0.9221018907 + "px";
};



//If windows is resized, real-time
window.addEventListener("resize",()=>{
	deplaceOutputBullet3Min();

});



//d3 processing img

function graph7(position){


	//sizing
	let margin = {top:110, right:40, bottom:60, left: 50};

	let width = document.querySelector(".niv2 p").clientWidth;
	let height = 500;

	//initiate svg
	let svg = d3.select(position)
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

	let format = d3.format(".2n");
	let formatPop = d3.format(",.0f");
	let format2 = d3.format("");

	d3.csv("data/csv/data-07.csv").then(function(data){

		//detect if a string contains only digits
		data.forEach((d,i)=>{
			for (let key in d){
				if (+d[key]===+d[key]) {
					d[key] = +d[key];
				}
			}
		});


		//select key values
		let xKeys = data.columns.slice(14,20);
		let yKeys = data.columns.slice(20,28);
		let popKey = data.columns.slice(2,8);
		let colorKey = data.columns.slice(8,14);

		//return min & max values
		let xMax = d3.max(data, (d)=>{return d3.max(xKeys,(key)=>{return d[key];});});
		let xMin = d3.min(data, (d)=>{return d3.min(xKeys,(key)=>{return d[key];});});

		let yMax = d3.max(data, (d)=>{return d3.max(yKeys,(key)=>{return d[key];});});
		let yMin = d3.min(data, (d)=>{return d3.min(yKeys,(key)=>{return d[key];});});

		let popMax = d3.max(data, (d)=>{ return d3.max(popKey, (key)=>{ return d[key];});});
		
		let colorMin = d3.min(data, (d)=>{return d3.min(colorKey,(key)=>{return d[key];});});
		let colorMax = d3.max(data, (d)=>{ return d3.max(colorKey, (key)=>{ return d[key];});});

		//Initiate x Axis
		const xScale = d3.scaleLinear()
			.domain([xMin, xMax])
			.range([margin.left, width-margin.right]).nice();

		
		//Initiate y Axis
		const yScale = d3.scaleLinear()
			.domain([yMin, yMax])
			.range([height-margin.bottom, margin.top]).nice();


		const xAxis = d3.axisBottom(xScale)
			.ticks(5)
			.tickSizeOuter(0)
			.tickFormat((d)=>{return format2(d)+" %";});

		const yAxis = d3.axisLeft(yScale)
			.ticks(5)
			.tickSizeOuter(0)
			.tickFormat((d)=>{return format2(d)+" %";});

		//Call Axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height-margin.bottom})`)
			.call(xAxis);

		svg
			.select(".x_axis")
			.selectAll("text")
			.attr("y", 10);


		svg
			.append("g")
			.attr("class", "axis y_axis")
			.attr("transform",`translate(${margin.left},0)`)
			.call(yAxis);
			

		//Call vertical line
		svg
			.append("line")
			.attr("x1", xScale(0))
			.attr("x2", xScale(0))
			.attr("y1", margin.top)
			.attr("y2", height-margin.bottom)
			.attr("stroke", "#fff")
			.attr("stroke-width",2);


		//Call horizontal line
		svg
			.append("line")
			.attr("x1", margin.left)
			.attr("x2", width-margin.right)
			.attr("y1", yScale(0))
			.attr("y2", yScale(0))
			.attr("stroke", "#fff")
			.attr("stroke-width",2);


		//color
		const colorsFill = d3.scaleLinear()
			.domain([colorMin, -0.25, 0, 0.5, 1, colorMax])
			.range(["#c8c6c6", "#dbecdb","#b79bc9","#7959a2","#5d36bc"]);


		const colorsStroke = d3.scaleOrdinal()
			.domain(111,112,120,211,212,221,222,300,400)
			.range(["#c90c10","#f49829","#f9d333","#a31876",
				"#ca75ad","#0a9ba2","#8acdd2","#ccc1da","#f2f4ee"]);


		function addExtra(){
			//Text label xAxis
			svg
				.append("text")       
				.attr("fill", "#f0f0f0")
				.attr("class","extra label-change")      
				.attr("x",margin.left)
				.attr("y",25)
				.text("Période");
			
			//Horizontal line
			svg
				.append("line")
				.attr("class","extra line-extra")
				.attr("x1",margin.left)
				.attr("y1",5)
				.attr("x2",180+margin.left)
				.attr("y2",5)
				.attr("stroke", "#fff");

			svg
				.append("line")
				.attr("class","extra line-extra")
				.attr("x1",margin.left)
				.attr("y1",35)
				.attr("x2",180+margin.left)
				.attr("y2",35)
				.attr("stroke", "#fff");


			//Text label yAxis
			svg
				.append("text")       
				.attr("fill", "#f0f0f0")
				.attr("class","label")      
				.attr("y",margin.top/2+25)
				.attr("x", margin.left/2)
				.style("text-anchor", "start")
				.text("Taux d'évolution de la population");

			//Text label yAxis
			svg
				.append("text")       
				.attr("fill", "#f0f0f0")
				.attr("class","label")      
				.attr("y",margin.top/2+40)
				.attr("x", margin.left/2)
				.style("text-anchor", "start")
				.text("due au solde migratoire apparent");


			//Text label xAxis
			svg
				.append("text")       
				.attr("class","label")      
				.attr("transform",
					"translate(" + ((width-margin.right)) + " ," + (height-margin.bottom/3) + ")")
				.style("text-anchor", "end")
				.attr("fill", "#f0f0f0")
				.text("Taux d'évolution de la population");

			//Text label xAxis
			svg
				.append("text")       
				.attr("class","label")      
				.attr("transform",
					"translate(" + ((width-margin.right)) + " ," + (height-margin.bottom/3+15) + ")")
				.style("text-anchor", "end")
				.attr("fill", "#f0f0f0")
				.text("due au solde naturel");



		} //function addExtra


		addExtra();


		//Legend

		let legendColor = svg.selectAll(".legend")
			.data(colorsFill.range())
			.enter()
			.append("g")
			.attr("class", "legend");


		
		legendColor
			.append("rect")
			.attr("x", function (d, i) {
				return 3*width/7+i * 30;
			})
			.attr("y", margin.top/2+20)
			.attr("width", 23)
			.attr("height", 12)
			.style("stroke", "black")
			.style("stroke-width", 0.1)
			.style("fill", function (d) { return d; });


		legendColor
			.append("text")
			.attr("x", function (d, i) {
				return 3*width/7 + i * 30;
			})
			.attr("dx", -5)
			.attr("y", margin.top/2+40)
			.attr("dy", "0.5em")
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text(function (d, i) {
				return format(colorsFill.domain()[i]);
			});

		svg
			.append("text")
			.attr("x", 3*width/7 + 5 * 30)
			.attr("dx", -5)
			.attr("y", margin.top/2+40)
			.attr("dy", "0.5em")
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text(format(colorsFill.domain()[5]));

		svg
			.append("text")         
			.attr("x",3*width/7-40)
			.attr("y",margin.top/2+5)
			.attr("text-anchor", "start")
			.attr("fill", "#f0f0f0")
			.text("Taux de croissance annuel moyen (%)");


		function updateData(pop_data, tx_pop_data, tx_sn_data, tx_sm_data, label){

			svg
				.append("text")       
				.attr("fill", "#f0f0f0")
				.attr("class","label-change label-change2")      
				.attr("x",70+margin.left)
				.attr("y",25)
				.text(label);


			//simulation force
			let simulation = d3.forceSimulation(data)
				.force("x", d3.forceX((d)=>{ return xScale(d[tx_sn_data]);}).strength(1))
				.force("y", d3.forceY((d)=>{ return yScale(d[tx_sm_data]);}).strength(1))
				.stop();

			for (let i=0; i<data.length;i++) simulation.tick();

			let newCircles = svg.selectAll(".circles")
				.data(data, ((d)=>{ return d.codgeo; }));


			newCircles.exit()
				.transition()
				.duration(1000)
				.attr("cx", 0)
				.attr("cy", height/2 - margin.bottom/2)
				.remove();

				
			let	g = newCircles
				.enter()
				.append("g")
				.attr("id", ((d)=>{ return "g-" + d.codgeo;}));

			//circle
			g.append("circle")
				.attr("class", "circles")
				.attr("r",1)
				.attr("cx", ((d)=>{ return d.x; }))
				.attr("cy", ((d)=>{ return d.y; }))
				.attr("stroke", ((d)=>{ return colorsStroke(d.codgeo); }))
				.attr("stroke-width", 3)
				.merge(newCircles)
				.transition()
				.duration(1500)
				.attr("fill", ((d)=>{ return colorsFill(d[tx_pop_data]); }))
				.attr("cx", ((d)=>{ return d.x; }))
				.attr("cy", ((d)=>{ return d.y; }))
				.attr("r",(d)=>{return(Math.sqrt(d[pop_data]/popMax))*50;});







			//add popup

			//create div popup
			let popup = d3.select("body").append("div")
				.attr("class", "my-popup");


			//MOUSE EVENT


			g
				.on("mouseover", function(d){
					popup
						.transition()
						.duration(50)
						.style("left", d3.event.pageX - 20 + "px")
						.style("top", d3.event.pageY - 10 + "px")
						.style("opacity", 1)
						.style("text-align", "left");
					popup
						.html(`
							<div><strong>${d.libgeo}</strong></div>
							<div>
								<div>Taux d'évolution de la population</div>
								<em>Total</em> : <span>${format(d[tx_pop_data])} % </span>
								<br>
								<em>Due au solde naturel</em> : <span>${format(d[tx_sn_data])} % </span>
								<br>
								<em>Due au solde migratoire</em> : <span>${format(d[tx_sm_data])} % </span>
							</div>
							`);

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




		} //function update data


		let circleLegend = svg
			.append("g")
			.attr("class","circle-legend");

		circleLegend
			.append("text")         
			.attr("class", "label-circle")  
			.attr("x",6*width/7)
			.attr("y",20)
			.attr("fill", "#f0f0f0")
			.text("Population");


		circleLegend
			.append("circle")
			.attr("cx", 6*width/7)
			.attr("cy", margin.top/2+45)
			.attr("r", Math.sqrt(popMax/popMax)*50);

		circleLegend
			.append("circle")
			.attr("cx", 6*width/7)		
			.attr("cy", margin.top/2+40+(Math.sqrt(20E6/popMax)*50)/2)
			.attr("r", Math.sqrt(20E6/popMax)*50);

		circleLegend
			.append("circle")
			.attr("cx", 6*width/7)		
			.attr("cy", margin.top/2+40+(Math.sqrt(20E6/popMax)*50))
			.attr("r", Math.sqrt(5E6/popMax)*50);
	
		circleLegend
			.append("text")
			.attr("class", "label-circle")
			.attr("x", 6*width/7)
			.attr("y", margin.top/3+5)
			.text("39 M");

		circleLegend
			.append("text")
			.attr("class", "label-circle")
			.attr("x", 6*width/7)
			.attr("y", margin.top/2+Math.sqrt(20E6/popMax)*50/2-3)
			.text("5 M");

		circleLegend
			.append("text")
			.attr("class", "label-circle")
			.attr("x", 6*width/7)
			.attr("y",  margin.top/2+15+Math.sqrt(20E6/popMax)*50)
			.text("1 M");





		updateData("pop_2014", "tx_pop_2014", "tx_pop_sn_2014", "tx_pop_sm_2014", inputValues3Min[5]);
		deplaceOutputBullet3Min();

		input07Min.addEventListener("input",function(e){
			deplaceOutputBullet3Min();
			switch (e.target.value) {
			case "0":
				d3.selectAll(".label-change2").remove();
				updateData("pop_1975", "tx_pop_1975", "tx_pop_sn_1975", "tx_pop_sm_1975", inputValues3Min[0]);
				break;
			case "1":
				d3.selectAll(".label-change2").remove();
				updateData("pop_1982", "tx_pop_1982", "tx_pop_sn_1982", "tx_pop_sm_1982", inputValues3Min[1]);
				break;	
			case "2":
				d3.selectAll(".label-change2").remove();
				updateData("pop_1990", "tx_pop_1990", "tx_pop_sn_1990", "tx_pop_sm_1990", inputValues3Min[2]);
				break;
			case "3":
				d3.selectAll(".label-change2").remove();
				updateData("pop_1999", "tx_pop_1999", "tx_pop_sn_1999", "tx_pop_sm_1999", inputValues3Min[3]);
				break;
			case "4":
				d3.selectAll(".label-change2").remove();
				updateData("pop_2009", "tx_pop_2009", "tx_pop_sn_2009", "tx_pop_sm_2009", inputValues3Min[4]);
				break;
			case "5":
				d3.selectAll(".label-change2").remove();
				updateData("pop_2014", "tx_pop_2014", "tx_pop_sn_2014", "tx_pop_sm_2014", inputValues3Min[5]);
				break;
				
			}
		});


		




		

	}); //read data

	









} //function graph7


graph7("#c-svg-07-min");

