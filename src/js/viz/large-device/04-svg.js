//storing values in an array
let inputValues2 = ["1968-1975", "1975-1982", "1982-1990", "1990-1999", "1999-2009", "2009-2014"];

let input04 = document.querySelector("#input-04");
let output04 = document.querySelector("#c-output-04");

let output04Bullet = document.querySelector("#output-04-bullet");

input04.oninput = function(){
	//output03.innerHTML = inputValues[this.value];
	output04Bullet.innerHTML = inputValues2[this.value];
};




//set the default value
input04.oninput();


//deplace output bullet during slide
let deplaceOutputBullet2 = function(){
	let bulletPosition = (input04.value / input04.max);
	output04Bullet.style.left = (bulletPosition * input04.getBoundingClientRect().width)*0.9221018907 + "px";
};



//If windows is resized, real-time
window.addEventListener("resize",()=>{
	deplaceOutputBullet2();

});


//d3 processing img

function graph4(){


	function scrollGraph4(){


		//sizing
		let margin = {top:60, right:20, bottom:70, left: 20};

		let width = document.querySelector(".niv2 p").clientWidth;
		let height = 400;

		//initiate svg
		let svg = d3.select("#c-svg-04")
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

		//let tx_data = "tx_sm_68_75";
		//let pop_data = "pop_sm_68_75";


		d3.csv("data/csv/data-04.csv").then(function(data){


			data.forEach((d)=>{
				d.pop_sm_68_75 = +d.pop_sm_68_75,
				d.pop_sm_75_82 = +d.pop_sm_75_82,
				d.pop_sm_82_90 = +d.pop_sm_82_90,
				d.pop_sm_90_99 = +d.pop_sm_90_99,
				d.pop_sm_99_09 = +d.pop_sm_99_09,
				d.pop_sm_09_14 = +d.pop_sm_09_14,
				d.tx_sm_68_75 = +d.tx_sm_68_75,
				d.tx_sm_75_82 = +d.tx_sm_75_82,
				d.tx_sm_82_90 = +d.tx_sm_82_90,
				d.tx_sm_90_99 = +d.tx_sm_90_99,
				d.tx_sm_99_09 = +d.tx_sm_99_09,
				d.tx_sm_09_14 = +d.tx_sm_09_14;
			});


			//set colors by region
			let colors = d3.scaleOrdinal()
				.domain(["01","02","03","04","11","24","27","28","32","44",
					"52","53","75","76","84","93","94"])
				.range(["#faa61a","#fec641","#bb529e","#b71f2b","#ccecfa","#d8c470","#a7d48c","#f8d6c7",
					"#bcbcbc","#f9f49b","#eec0d9","#abdfeb","#cfe295","#f79868","#9fc9eb","#f9b132","#a9d9bc"]);
			

			//select key values
			let keys = data.columns.slice(8,14);

			//return min & max values
			let max = d3.max(data, (d)=>{return d3.max(keys,(key)=>{return d[key];});});
			let min = d3.min(data, (d)=>{return d3.min(keys,(key)=>{return d[key];});});
			
			let popKey = data.columns.slice(2,8);
			let popMax = d3.max(data, (d)=>{ return d3.max(popKey, (key)=>{ return d[key];});});


			//Initiate x Axis
			const xScale = d3.scaleLinear()
				.domain([min,max]) //input
				.range([margin.left, width-margin.right]) //output
				.nice();

			const xAxis = d3.axisBottom(xScale)
				.tickSizeOuter(0)
				.tickFormat((d)=>{ return format2(d)+" %"; });


			function addExtra(){
				//Text label xAxis
				svg
					.append("text")       
					.attr("class","extra label-change")      
					.attr("x",20)
					.attr("y",25)
					.attr("fill", "#f0f0f0")
					.text("Période");
				
				//Horizontal line
				svg
					.append("line")
					.attr("class","extra line-extra")
					.attr("x1",margin.left)
					.attr("y1",5)
					.attr("x2",180)
					.attr("y2",5)
					.attr("stroke", "#fff");

				svg
					.append("line")
					.attr("class","extra line-extra")
					.attr("x1",margin.left)
					.attr("y1",35)
					.attr("x2",180)
					.attr("y2",35)
					.attr("stroke", "#fff");

				/*
				//Text label xAxis
				svg
					.append("text")       
					.attr("class","label extra")      
					.attr("transform",
						"translate(" + ((width-margin.right)) + " ," + (height-margin.bottom/3) + ")")
					.style("text-anchor", "end")
					.attr("fill", "#f0f0f0")
					.text("Taux d'évolution de la population");

				//Text label xAxis
				svg
					.append("text")       
					.attr("class","label extra")      
					.attr("transform",
						"translate(" + ((width-margin.right)) + " ," + (height-margin.bottom/3+15) + ")")
					.style("text-anchor", "end")
					.attr("fill", "#f0f0f0")
					.text("due au solde migratoire apparent");
				*/

			} //function addExtra



			addExtra();






			//Call x axis
			svg
				.append("g")
				.attr("class", "axis x_axis")
				.attr("transform", `translate(0,${height-margin.bottom})`)
				.call(xAxis);

			svg.select(".x_axis")
				.selectAll("text")
				.attr("y", 10);


			//Call vertical line
			svg
				.append("line")
				.attr("x1", xScale(0))
				.attr("x2", xScale(0))
				.attr("y1", margin.top)
				.attr("y2", height-margin.bottom)
				.attr("stroke", "#fff")
				.attr("stroke-width",2);


			function updateData(tx_data, pop_data, label){
		
				svg
					.append("text")       
					.attr("class","label-change label-change2")      
					.attr("x",90)
					.attr("y",25)
					.attr("fill", "#f0f0f0")
					.text(label);

				//simulation force
				let simulation = d3.forceSimulation(data)
					.force("x", d3.forceX((d)=>{ return xScale(d[tx_data]);}).strength(1))
					.force("y", d3.forceY(height/2 - margin.bottom/2))
					.force("collide", d3.forceCollide().radius((d)=>{return(Math.sqrt(d[pop_data]/popMax))*50;}))
					.stop();

				for (let i=0; i<data.length;i++) simulation.tick();

				let newCircles = svg.selectAll(".circles")
					.data(data, ((d)=>{ return d.codgeo; }));


				newCircles.exit()
					.transition()
					.duration(200)
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
					.attr("fill",((d)=>{ return colors(d.codgeo);}))
					.merge(newCircles)
					.transition()
					.duration(1500)
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
									<div>Solde migratoire annuel moyen</div>
									<span>${formatPop(d[pop_data])} </span>
									<div>Taux d'évolution de la population</div>
									<span>${format(d[tx_data])} % </span>
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


			} //function updatedata

			let circleLegend = svg
				.append("g")
				.attr("class","circle-legend");

			circleLegend
				.append("text")         
				.attr("class", "label-circle")  
				.attr("x",6*width/7-20)
				.attr("y",25)
				.attr("fill", "#f0f0f0")
				.text("Solde migratoire annuel moyen");


			circleLegend
				.append("circle")
				.attr("cx", 6*width/7-20)
				.attr("cy", margin.top+40)
				.attr("r", Math.sqrt(popMax/popMax)*50);

			circleLegend
				.append("circle")
				.attr("cx", 6*width/7-20)		
				.attr("cy", margin.top+40+(Math.sqrt(25000/popMax)*50)/2)
				.attr("r", Math.sqrt(25000/popMax)*50);

			circleLegend
				.append("circle")
				.attr("cx", 6*width/7-20)		
				.attr("cy", margin.top+40+(Math.sqrt(25000/popMax)*50))
				.attr("r", Math.sqrt(5000/popMax)*50);
		
			circleLegend
				.append("text")
				.attr("class", "label-circle")
				.attr("x", 6*width/7-20)
				.attr("y", margin.top/2+15)
				.text(formatPop(popMax));

			circleLegend
				.append("text")
				.attr("class", "label-circle")
				.attr("x", 6*width/7-20)
				.attr("y", margin.top/2+Math.sqrt(25000/popMax)*50+15)
				.text(formatPop(5000));

			circleLegend
				.append("text")
				.attr("class", "label-circle")
				.attr("x", 6*width/7-20)
				.attr("y",  margin.top/2+2*Math.sqrt(25000/popMax)*50+15)
				.text(formatPop(1000));


			

			input04.addEventListener("input",function(e){
				deplaceOutputBullet2();
				switch (e.target.value) {
				case "0":
					d3.selectAll(".label-change2").remove();
					updateData("tx_sm_68_75", "pop_sm_68_75", inputValues2[0]);
					break;
				case "1":
					d3.selectAll(".label-change2").remove();
					updateData("tx_sm_75_82", "pop_sm_75_82", inputValues2[1]);
					break;	
				case "2":
					d3.selectAll(".label-change2").remove();
					updateData("tx_sm_82_90", "pop_sm_82_90", inputValues2[2]);
					break;
				case "3":
					d3.selectAll(".label-change2").remove();
					updateData("tx_sm_90_99", "pop_sm_90_99", inputValues2[3]);
					break;
				case "4":
					d3.selectAll(".label-change2").remove();
					updateData("tx_sm_99_09", "pop_sm_99_09", inputValues2[4]);
					break;
				case "5":
					d3.selectAll(".label-change2").remove();
					updateData("tx_sm_09_14", "pop_sm_09_14", inputValues2[5]);
					break;
					
				}
			});

			
			updateData("tx_sm_09_14", "pop_sm_09_14", inputValues2[5]);
			deplaceOutputBullet2();

			

		}); //read data
	}

	const helpButton4 = document.querySelector("#help-button4");
	const breakSection = document.querySelectorAll(".break-section3");

	//initialize the scrollama
	//Parallax
	const scroller = scrollama();
	
	function handleStepEnter(response) {
		const selectionTitle = document.querySelector("#c-04-section3 .svg-title");
		switch(response.index){
		case 1:
			selectionTitle.style.display = "block";
			scrollGraph4();
			helpButton4.style.display = "inline";
			breakSection[1].style.opacity = "1";
			break;
		}
	}
	
	function handleStepExit(response){
		const selectionTitle = document.querySelector("#c-04-section3 .svg-title");
		switch(response.index){
		case 1:
			d3.select("#c-svg-04").selectAll("*").remove();
			selectionTitle.style.display = "none";
			helpButton4.style.display = "none";
			breakSection[1].style.opacity = "0.4";
			break;
		}
	}
	
	scroller
		.setup({
			container: ".scroll",
			graphic: ".scroll-graphic",
			text: ".scroll-text",
			step: ".break-section3",
			debug: false,
			offset: 0.6
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleStepExit);
		


	





} //function graph4





window.addEventListener("load", function(){
	if(getComputedStyle(document.querySelector(".c-graphic-min")).display == "none")
	{
		graph4();
	}
});