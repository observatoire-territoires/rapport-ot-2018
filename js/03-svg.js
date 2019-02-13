//storing values in an array
let inputValues = ["1968-1975", "1975-1982", "1982-1990", "1990-1999", "1999-2009", "2009-2014"];

let input03 = document.querySelector("#input-03");
let output03 = document.querySelector("#c-output-03");

let output03Bullet = document.querySelector("#output-03-bullet");

input03.oninput = function(){
	//output03.innerHTML = inputValues[this.value];
	output03Bullet.innerHTML = inputValues[this.value];
};


function graph03(){


	//sizing
	let margin = {top:20, right:20, bottom:20, left: 20};

	let width = document.querySelector("#c-svg-03").clientWidth;
	let height = 400;


	//initiate svg
	let svg = d3.select("#c-svg-03")
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



	//Initiate data
	Promise.all([
		d3.json("data/map/rw_19681975.json"),
		d3.json("data/map/rw_19751982.json"),
		d3.json("data/map/rw_19821990.json"),
		d3.json("data/map/rw_19901999.json"),
		d3.json("data/map/rw_19992009.json"),
		d3.json("data/map/rw_20092014.json")
	]).then(function(data){



		const featureCollection6875 = topojson.feature(data[0], data[0].objects.rw_19681975); //geojson
		const featureCollection7582 = topojson.feature(data[1], data[1].objects.rw_19751982); //geojson
		const featureCollection8290 = topojson.feature(data[2], data[2].objects.rw_19821990); //geojson
		const featureCollection9099 = topojson.feature(data[3], data[3].objects.rw_19901999); //geojson
		const featureCollection9909 = topojson.feature(data[4], data[4].objects.rw_19992009); //geojson
		const featureCollection0914 = topojson.feature(data[5], data[5].objects.rw_20092014); //geojson

		//projection
		const projection = d3.geoConicConformal() //france projection
			.fitSize([width,height],featureCollection6875);

		const path = d3.geoPath() //generate path
			.projection(projection); //add projection to path

		let g = svg.append("g"); //conteneur pour le zoom

		//set colors by region
		let colors = d3.scaleOrdinal()
			.domain(["inf_-2","-2_-1","-1_0","0_1","1_2","2_3","sup_3"])
			.range(["#10524d","#229f97","#add9dc","#f9d7ad","#e89c3f","#ab6016","#693e0f"]);



		function render_raster(data){
		//generate epci
			let rw = g
				.selectAll(".rw")
				.data(data)
				.join("path")
				.attr("d", path)
				.attr("class", "rw")
				.attr("stroke","white")
				.attr("stroke-width",.1)
				.attr("fill", ((d)=>{ return colors(d.properties.classe); }));
		}

	

		//zoom
		svg
			.call(d3.zoom()
				.on("zoom", function(){
					g.attr("transform", d3.event.transform);
				})
				.scaleExtent([1,6]) //deep zoom
				.translateExtent([[0,0],[width, height]])
			);



		//set the default value
		input03.oninput();


		//deplace output bullet during slide
		let deplaceOutputBullet = function(){
			let bulletPosition = (input03.value / input03.max);
			output03Bullet.style.left = (bulletPosition * input03.getBoundingClientRect().width)*0.9221018907 + "px";
		};




		//on loading, first svg
		render_raster(featureCollection6875.features);
		input03.addEventListener("input",function(e){
			deplaceOutputBullet();
			switch (e.target.value) {
			case "0":
				render_raster(featureCollection6875.features);
				break;
			case "1":
				render_raster(featureCollection7582.features);
				break;	
			case "2":
				render_raster(featureCollection8290.features);
				break;
			case "3":
				render_raster(featureCollection9099.features);
				break;
			case "4":
				render_raster(featureCollection9909.features);
				break;
			case "5":
				render_raster(featureCollection0914.features);
				break;
				
			}
		});


		//initialize the scrollama
		//Parallax
		const scroller = scrollama();

		function handleStepEnter(response) {

			switch(response.index){
			case 0:
			
				render_raster(featureCollection6875.features);
				break;
			}
		}

		function handleStepExit(response){
			switch(response.index){
			case 0:
				d3.selectAll(".rw").remove();
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











	}); //read csv




} //function graph03



graph03();












//If windows is resized, real-time
window.addEventListener("resize",()=>{
	deplaceOutputBullet();

});


