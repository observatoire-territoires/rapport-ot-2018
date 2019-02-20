//small device


//storing values in an array
let inputValuesMin = ["1968-1975", "1975-1982", "1982-1990", "1990-1999", "1999-2009", "2009-2014"];

let input03Min = document.querySelector("#input-03");
let output03Min = document.querySelector("#c-output-03");

let output03BulletMin = document.querySelector("#output-03-bullet");

output03Min.oninput = function(){
	//output03.innerHTML = inputValues[this.value];
	output03BulletMin.innerHTML = inputValuesMin[this.value];
};


//set the default value
output03Min.oninput();

function graph3Min(position){


	//sizing
	let margin = {top:20, right:20, bottom:20, left: 20};

	let width = document.querySelector(".niv2 p").clientWidth;
	let height = 400;


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
		} //function addExtra


		addExtra();

		function render_raster(data, label){

		

			svg
				.append("text")       
				.attr("class","label-change label-change2")      
				.attr("x",90)
				.attr("y",25)
				.attr("fill", "#f0f0f0")
				.text(label);


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



		function addLegend(){
		//Legend

			const legendText = [-2, -1, 0, 1, 2, 3];


			let svgLegend = d3.select("#c-svg-03-legend")
				.append("svg")
				.attr("width", width)
				.attr("height", 70);

			let legend = svgLegend.selectAll(".legend")
				.data(colors.range())
				.enter()
				.append("g")
				.attr("class", "legend");


			
			legend
				.append("rect")
				.attr("x", function (d, i) {
					return (width/2-100) +i * 30;
				})
				.attr("y", 40)
				.attr("width", 23)
				.attr("height", 12)
				.style("stroke", "black")
				.style("stroke-width", 0.1)
				.style("fill", function (d) { return d; });


			legend
				.append("text")
				.attr("fill", "#f0f0f0")
				.attr("x", function (d, i) {
					return (width/2-100+30) + i * 30;
				})
				.attr("dx", -5)
				.attr("y", 60)
				.attr("dy", "0.5em")
				.attr("text-anchor", "middle")
				.text(function (d, i) {
					return legendText[i];
				});

			


			//title legend	
			svgLegend
				.append("text")         
				.attr("x",width/2)
				.attr("y",margin.top/2+5)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("Taux d'évolution de la population due au solde");

			svgLegend
				.append("text")         
				.attr("x",width/2)
				.attr("y",margin.top/2+20)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("migratoire apparent (moyenne annuelle, en %) ");
		}








		//set the default value
		input03Min.oninput();


		//deplace output bullet during slide
		let deplaceOutputBulletMin = function(){
			let bulletPosition = (input03Min.value / input03Min.max);
			output03BulletMin.style.left = (bulletPosition * input03Min.getBoundingClientRect().width)*0.9221018907 + "px";
		};

		render_raster(featureCollection0914.features,inputValuesMin[5]);
		deplaceOutputBulletMin();

		//on loading, first svg
		//render_raster(featureCollection0914.features,inputValues[5]);

		input03Min.addEventListener("input",function(e){

			deplaceOutputBulletMin();

			switch (e.target.value) {
			case "0":
				d3.select(position).selectAll(".label-change2").remove();
				render_raster(featureCollection6875.features,inputValuesMin[0]);
				break;
			case "1":
				d3.select(position).selectAll(".label-change2").remove();
				render_raster(featureCollection7582.features,inputValuesMin[1]);
				break;	
			case "2":
				d3.select(position).selectAll(".label-change2").remove();
				render_raster(featureCollection8290.features,inputValuesMin[2]);
				break;
			case "3":
				d3.select(position).selectAll(".label-change2").remove();
				render_raster(featureCollection9099.features,inputValuesMin[3]);
				break;
			case "4":
				d3.select(position).selectAll(".label-change2").remove();
				render_raster(featureCollection9909.features,inputValuesMin[4]);
				break;
			case "5":
				d3.select(position).selectAll(".label-change2").remove();
				render_raster(featureCollection0914.features,inputValuesMin[5]);
				break;
				
			}
		});




	}); //read csv




} //function graph03



graph3Min("#c-svg-03-min");













