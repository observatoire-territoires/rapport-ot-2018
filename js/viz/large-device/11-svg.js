function graph11(){


	//sizing
	let margin = {top:20, right:20, bottom:40, left: 20};

	let width = document.querySelector(".niv2 p").clientWidth;
	let height = 400;


	//initiate svg
	let svg = d3.select("#c-svg-11")
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
		d3.json("data/map/epci.json"),
		d3.json("data/map/epci_reg.json"),
		d3.csv("data/csv/data-11.csv")
	]).then(function(data){


		//set colors
		let colors = d3.scaleOrdinal()
			.domain(["0_0","0_1","1_0","1_1",""])
			.range(["#ddb544", "#d077a8","#e5484e","#7d84c0","#646464"]);



		

		const featureCollection = topojson.feature(data[0], data[0].objects.epci_gen); //geojson
		const featureCollectionReg = topojson.feature(data[1], data[1].objects.epci_reg_gen); //geojson
		
		
		//join map and data
		for (let i=0; i< data[2].length;i++){
			const csvId = data[2][i].codepci;
			for (var j=0; j<featureCollection.features.length;j++){
				var jsonId = featureCollection.features[j].properties.codepci;
				if (csvId === jsonId) {
					featureCollection.features[j].properties.cat_cs3 = data[2][i].cat_cs3;
					featureCollection.features[j].properties.cat_cs6 = data[2][i].cat_cs6;
					featureCollection.features[j].properties.cat_cs7 = data[2][i].cat_cs7;
					featureCollection.features[j].properties.cat_cs8 = data[2][i].cat_cs8;
					featureCollection.features[j].properties.lib_cs3 = data[2][i].lib_cs3;
					featureCollection.features[j].properties.lib_cs6 = data[2][i].lib_cs6;
					featureCollection.features[j].properties.lib_cs7 = data[2][i].lib_cs7;
					featureCollection.features[j].properties.lib_cs8 = data[2][i].lib_cs8;
					break;
				}
			}
		}
		
		
		
		
		//projection
		const projection = d3.geoConicConformal() //france projection
			.fitSize([width,height],featureCollection);

		const path = d3.geoPath() //generate path
			.projection(projection); //add projection to path

		let g = svg.append("g"); //conteneur pour le zoom

		//generate epci
		let epci = g.append("g")
			.attr("class","c-epci")
			.selectAll(".epci")
			.data(featureCollection.features)
			.join("path")
			.attr("d", path)
			.attr("class", "epci")
			.attr("stroke","white")
			.attr("stroke-width",.1)
			.attr("fill", "#646464");

		//.attr("fill", ((d)=>{ return colors(d.properties.cat_cs3); }));

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
			epci
				.on("mouseover",null);
		}

		function zoomend(){
			
			let marker = document.querySelector("#label-change-csp");

			switch (marker.textContent) {
			case "Groupes socioprofessionnels":
				showPopupCsp("");
				break;
			case "Étudiants":
				showPopupCsp("lib_cs8");
				break;
			case "Retraités":
				showPopupCsp("lib_cs7");
				break;
			case "Ouvriers et employés":
				showPopupCsp("lib_cs6");
				break;
			case "Cadres et prof. int. sup.":
				showPopupCsp("lib_cs3");
				break;
					

			}

	
			


		}
		


		function addExtra(){
		
		
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


		} //function addExtra


		addExtra();


		//LEGEND
		
		const legendText = ["Faible part du groupe et forte baisse de cette part",
			"Forte part du groupe et forte baisse de cette part",
			"Faible aprt du groupe et forte hausse de cette part",
			"Forte part du groupe et forte hausse de cette part"];

		let svgLegend = d3.select("#c-svg-11-legend")
			.append("svg")
			.attr("width", width)
			.attr("height", 85);

		let legend = svgLegend.selectAll(".legend")
			.data(colors.range())
			.enter()
			.append("g")
			.attr("class", "legend");


		/*
		svgLegend
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", width/2) //leave 30 pixel space after the <rect>
			.attr("y", 10)
			.attr("dy", "0.5em")
			.attr("text-anchor", "middle")
			.text("Part du groupe socioprofessionnel dans la population présente");

		svgLegend
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", width/2) //leave 30 pixel space after the <rect>
			.attr("y", 25)
			.attr("dy", "0.5em")
			.attr("text-anchor", "middle")
			.text("et évolution de cette part due aux mobilités résidentielles");
		*/



		legend
			.append("rect")
			.attr("x", width/3 -20)
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
			.attr("x", width/3+10) //leave 30 pixel space after the <rect>
			.attr("y", function (d, i) {
				return 15 + i * 20;
			})
			.attr("dy", "0.5em")
			.text(function (d, i) {
				return legendText[i];
			});





		//add popup

		//create div popup
		let popup = d3.select("body").append("div")
			.attr("class", "my-popup");


		//MOUSE EVENT

		

		function showPopupCsp(lib_cs){
			epci
				.on("mouseover", function(d){
					popup
						.transition()
						.duration(50)
						.style("left", d3.event.pageX - 20 + "px")
						.style("top", d3.event.pageY - 30 + "px")
						.style("opacity", 1)
						.style("text-align", "left");

					popup
						.html(`
							<div><strong>${d.properties.libepci}</strong></div>
							<div>${d.properties[lib_cs]}</div>
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

		}


		//Text label xAxis
		function changeLabel(label){
			svg
				.append("text")       
				.attr("class","extra label-change")  
				.attr("id", "label-change-csp")    
				.attr("x",margin.left)
				.attr("y",25)
				.attr("fill", "#fff")
				.text(label);
		}


		//initialize the scrollama
		//Parallax
		const scroller = scrollama();

		function handleStepEnter(response) {

			switch(response.index){
			case 0:
				d3.select("#c-svg-11").selectAll(".label-change").remove();
				changeLabel("Groupes socioprofessionnels");
				showPopupCsp("");
				epci
					.transition()
         			.duration(250)
					.attr("fill", "#646464");
				break;
			case 1:
				d3.select("#c-svg-11").selectAll(".label-change").remove();
				changeLabel("Étudiants");
				showPopupCsp("lib_cs8");
				epci
					.transition()
           			.duration(250)
					.attr("fill", ((d)=>{ return colors(d.properties.cat_cs8); }));
				break;
			case 2:
				d3.select("#c-svg-11").selectAll(".label-change").remove();
				changeLabel("Retraités");
				showPopupCsp("lib_cs7");
				epci
					.transition()
           			.duration(250)
					.attr("fill", ((d)=>{ return colors(d.properties.cat_cs7); }));
				break;
			case 3:
				d3.select("#c-svg-11").selectAll(".label-change").remove();
				changeLabel("Ouvriers et employés");
				showPopupCsp("lib_cs6");
				epci
					.transition()
           			.duration(250)
					.attr("fill", ((d)=>{ return colors(d.properties.cat_cs6); }));
				break;
			case 4:
				d3.select("#c-svg-11").selectAll(".label-change").remove();
				changeLabel("Cadres et prof. int. sup.");
				showPopupCsp("lib_cs3");
				epci
					.transition()
           			.duration(250)
					.attr("fill", ((d)=>{ return colors(d.properties.cat_cs3); }));
				break;

			}
		}

		function handleStepExit(response){
		
		}


		scroller
			.setup({
				container: ".scroll",
				graphic: ".scroll-graphic",
				text: ".scroll-text",
				step: ".break-11",
				debug: false,
				offset: 0.6
			})
			.onStepEnter(handleStepEnter)
			.onStepExit(handleStepExit);




}); //read csv





	


} //fonction graph11

window.addEventListener("load", function(){
	if(getComputedStyle(document.querySelector(".c-graphic-min")).display == "none")
	{
		graph11();
	}
});




