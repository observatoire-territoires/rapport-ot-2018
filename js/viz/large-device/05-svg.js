function graph5(){

	function graphScroll(){

		//sizing
		let margin = {top:20, right:0, bottom:40, left: 20};

		let width = document.querySelector(".niv2 p").clientWidth;
		let height = 400;


		//initiate svg
		let svg = d3.select("#c-svg-05")
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





		//Initiate data
		Promise.all([
			d3.json("data/map/dep.json"),
			d3.json("data/map/dep_reg.json"),
			d3.csv("data/csv/data-05.csv")
		]).then(function(data){


			const featureCollection = topojson.feature(data[0], data[0].objects.dep_gen_wgs84); //geojson
			const featureCollectionReg = topojson.feature(data[1], data[1].objects.dep_reg_gen_wgs84); //geojson
			
			//join map and data
			for (let i=0; i< data[2].length;i++){
				const csvId = data[2][i].coddep;
				for (var j=0; j<featureCollection.features.length;j++){
					var jsonId = featureCollection.features[j].properties.coddep;
					if (csvId === jsonId) {
						featureCollection.features[j].properties.tx_19992009 = data[2][i].tx_19992009;
						featureCollection.features[j].properties.tx_20092014 = data[2][i].tx_20092014;
						featureCollection.features[j].properties.quali = data[2][i].quali;
						break;
					}
				}
			}

			//set colors
			let colors = d3.scaleOrdinal()
				.domain(["0_0","0_1","0_2","1_0","1_1","1_2","2_0","2_1","2_2"])
				.range(["#045364","#1a5230","#ad6116","#26a199","#39a065","#e89e3f","#aedbde","#b0d8bd","#fad8af"]);
			
			//projection

			const projection = d3.geoConicConformal() //france projection
				.fitSize([width,height],featureCollection);

			const path = d3.geoPath() //generate path
				.projection(projection); //add projection to path


			let g = svg.append("g"); //conteneur pour le zoom


			//generate dep
			let dep = g.append("g")
				.attr("class", "c-dep")
				.selectAll(".dep")
				.data(featureCollection.features)
				.join("path")
				.attr("d", path)
				.attr("class", "dep")
				.attr("stroke","white")
				.attr("stroke-width",.1)
				.attr("fill", ((d)=>{ return colors(d.properties.quali);}));

			//generate reg
			let region = g.append("g")
				.attr("class","c-reg")
				.append("path")
				.datum(featureCollectionReg)
				.attr("d", path)
				.attr("class", "region");

			//zoom
			svg
				.call(d3.zoom()
					.scaleExtent([1,6]) //deep zoom
					.translateExtent([[0,0],[width, height]])
					.on("zoom", zoomed)
					.on("start", zoomstart)
					.on("end", zoomend)
				);

			function zoomed(){
				g.attr("transform", d3.event.transform);
			}
				
			function zoomstart(){
				dep
					.on("mouseover",null);
			}


			function zoomend(){
				dep
					.on("mouseover", function(d){
						popup
							.transition()
							.duration(50)
							.style("left", d3.event.pageX - 20 + "px")
							.style("top", d3.event.pageY - 100 + "px")
							.style("opacity", 1)
							.style("text-align", "left");
						popup
							.html(`
								<div><strong>${d.properties.libdep}</strong></div>
								<div>
									<div>Croissance migratoire</div>
									<em>1999-2009</em> : <span>${format(d.properties.tx_19992009)} % </span>
									<br>
									<em>2009-2014</em> : <span>${format(d.properties.tx_20092014)} % </span>
								</div>
								`);

						//geographical unit
						d3.select(this)
							.attr("fill-opacity",0.7);


					});
			}


			//Legend
			const legendText = ["Décroissance migratoire sur 1999-2009 et sur 2009-2014",
				"Décroissance migratoire sur 1999-2009 et croissance faible sur 2009-2014",
				"Décroissance migratoire sur 1999-2009 et croissance forte sur 2009-2014",
				"Croissance faible sur 1999-2009 et décroissance sur 2009-2014",
				"Croissance faible sur 1999-2009 et sur 2009-2014",
				"Croissance faible sur 1999-2009 et croissance forte sur 2009-2014",
				"Croissance forte sur 1999-2009 et décroissance sur 2009-2014",
				"Croissance forte sur 1999-2009 et croissance faible sur 2009-2014",
				"Croissance forte sur 1999-2009 et sur 2009-2014"];

			d3.select("#c-svg-05-legend").selectAll("*").remove();


			let svgLegend = d3.select("#c-svg-05-legend")
				.append("svg")
				.attr("width", width)
				.attr("height", 185);



			let legend = svgLegend.selectAll(".legend")
				.data(colors.range())
				.enter()
				.append("g")
				.attr("class", "legend");



			legend
				.append("rect")
				.attr("x", width/3-100)
				.attr("y", function (d, i) {
					return i * 20+10;
				})
				.attr("width", 23)
				.attr("height", 12)
				.style("stroke", "black")
				.style("stroke-width", 0.1)
				.style("fill", function (d) { return d; });

			legend
				.append("text")
				.attr("fill", "#f0f0f0")
				.attr("x", width/3 +30 - 100) //leave 30 pixel space after the <rect>
				.attr("y", function (d, i) {
					return 15 + i * 20;
				})
				.attr("dy", "0.5em")
				.text(function (d, i) {
					return legendText[i];
				});

			/*
			svgLegend
				.append("text")
				.attr("fill", "#f0f0f0")
				.attr("x", width/3-100) //leave 30 pixel space after the <rect>
				.attr("y", 10)
				.attr("dy", "0.5em")
				.text("Typologie de l'évolution de la croissance migratoire");

			svgLegend
				.append("text")
				.attr("fill", "#f0f0f0")
				.attr("x", width/3-100) //leave 30 pixel space after the <rect>
				.attr("y", 25)
				.attr("dy", "0.5em")
				.text("sur 1999-2009 et sur 2009-2014");
				*/



			//add popup

			//create div popup
			let popup = d3.select("body").append("div")
				.attr("class", "my-popup");


			//MOUSE EVENT


			dep
				.on("mouseover", function(d){
					popup
						.transition()
						.duration(50)
						.style("left", d3.event.pageX - 20 + "px")
						.style("top", d3.event.pageY - 100 + "px")
						.style("opacity", 1)
						.style("text-align", "left");
					popup
						.html(`
							<div><strong>${d.properties.libdep}</strong></div>
							<div>
								<div>Évolution migratoire</div>
								<em>1999-2009</em> : <span>${format(d.properties.tx_19992009)} % </span>
								<br>
								<em>2009-2014</em> : <span>${format(d.properties.tx_20092014)} % </span>
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




		




		}); //read csv

	}


	const helpButton5 = document.querySelector("#help-button5");
					
	//initialize the scrollama
	//Parallax
	const scroller2 = scrollama();
	const breakSection = document.querySelectorAll(".break-section3");



	scroller2
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



	function handleStepEnter(response) {
		const selectionTitle = document.querySelector("#c-05-section3 .svg-title");
		switch(response.index){
		case 2:
			graphScroll();
			selectionTitle.style.display = "block";
			helpButton5.style.display = "inline";
			breakSection[2].style.opacity = "1";
			break;
		}
	}

	function handleStepExit(response){
		const selectionTitle = document.querySelector("#c-05-section3 .svg-title");
		switch(response.index){
		case 0:
			d3.select("#c-svg-05-legend").selectAll("*").remove();
			break;
		case 1:
			d3.select("#c-svg-05-legend").selectAll("*").remove();
			break;

		case 2:
			d3.select("#c-svg-05").selectAll("*").remove();
			d3.select("#c-svg-05-legend").selectAll("*").remove();
			selectionTitle.style.display = "none";
			helpButton5.style.display = "none";
			breakSection[2].style.opacity = "0.4";
			break;
		}
	}
	


} //fonction graph5








window.addEventListener("load", function(){
	if(getComputedStyle(document.querySelector(".c-graphic-min")).display == "none")
	{	
		graph5();
	}
});