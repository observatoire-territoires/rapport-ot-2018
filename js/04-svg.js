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


	//sizing
	let margin = {top:20, right:0, bottom:40, left: 40};

	let width = 600;
	let height = 400;

	//initiate svg
	let svg = d3.select("#c-svg-04")
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

	//let tx_data = "tx_sm_68_75";
	//let pop_data = "pop_sm_68_75";

	d3.csv("data/data-04.csv").then(function(data){

		console.log(data);

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
		console.log(min);
		console.log(max);
		console.log(popMax);

		//Initiate x Axis
		const xScale = d3.scaleLinear()
			.domain([min,max]) //input
			.range([margin.left, width-margin.right]) //output
			.nice();

		const xAxis = d3.axisBottom(xScale)
			.tickSizeOuter(0);

		//Call x axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height-margin.bottom})`)
			.call(xAxis);

		svg.select(".x_axis")
			.selectAll("text")
			.attr("y", 15);


		function updateData(tx_data, pop_data){
	

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
				.attr("fill",((d)=>{ return colors(d.codgeo);}))
				.merge(newCircles)
				.transition()
				.duration(1500)
				.attr("cx", ((d)=>{ return d.x; }))
				.attr("cy", ((d)=>{ return d.y; }))
				.attr("r",(d)=>{return(Math.sqrt(d[pop_data]/popMax))*50;})
				
		

		}



		input04.addEventListener("input",function(e){
			deplaceOutputBullet2();
			switch (e.target.value) {
			case "0":
				updateData("tx_sm_68_75", "pop_sm_68_75");
				break;
			case "1":
				updateData("tx_sm_75_82", "pop_sm_75_82");
				break;	
			case "2":
				updateData("tx_sm_82_90", "pop_sm_82_90");
				break;
			case "3":
				updateData("tx_sm_90_99", "pop_sm_90_99");
				break;
			case "4":
				updateData("tx_sm_99_09", "pop_sm_99_09");
				break;
			case "5":
				updateData("tx_sm_09_14", "pop_sm_09_14");
				break;
				
			}
		});










		updateData("tx_sm_68_75", "pop_sm_68_75");

		

	}); //read data

	









} //function graph4

graph4();



//initialize the scrollama
//Parallax
const scroller = scrollama();

function handleStepEnter(response) {

	switch(response.index){
	case 0:
		d3.select("#c-svg-04").selectAll("*").remove();
		break;
	case 1:
		graph4();
		break;
	}
}

function handleStepExit(response){
	switch(response.index){
	case 1:
		d3.select("#c-svg-04").selectAll("*").remove();
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
		offset: 0.33
	})
	.onStepEnter(handleStepEnter)
	.onStepExit(handleStepExit);

	