function graph10(){
	

	//sizing
	let margin = {top:20, right:20, bottom:40, left: 20};

	let width = document.querySelector("#c-svg-10").clientWidth;
	let height = 400;


	//initiate svg
	let svg = d3.select("#c-svg-10")
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
		d3.csv("data/csv/data-10.csv")
	]).then(function(data){



		const featureCollection = topojson.feature(data[0], data[0].objects.epci_gen); //geojson
		const featureCollectionReg = topojson.feature(data[1], data[1].objects.epci_reg_gen); //geojson

		//join map and data
		for (let i=0; i< data[2].length;i++){
			const csvId = data[2][i].codepci;
			for (var j=0; j<featureCollection.features.length;j++){
				var jsonId = featureCollection.features[j].properties.codepci;
				if (csvId === jsonId) {
					featureCollection.features[j].properties.clust = data[2][i].clust;
					featureCollection.features[j].properties.cat = data[2][i].cat;
					break;
				}
			}
		}


		//set colors by region
		let colors = d3.scaleOrdinal()
			.domain(["1","2","3","4","5","6"])
			.range(["#53995c","#7cc18b","#e8e774","#eec05d","#c4431d","#e08343"]);

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
			.attr("fill", ((d)=>{ return colors(d.properties.clust); }));


		/*
			.filter((d)=>{ return d.properties.clust == "1"})
			.attr("fill", ((d)=>{ 
				let value = d.properties.clust;
				return value ? colors(value)
					: "#646464";
			}));
*/

		//generate reg
		let region = g.append("g")
			.attr("class","c-reg")
			.append("path")
			.datum(featureCollectionReg)
			.attr("d", path)
			.attr("class", "region");



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


		//Legend

		function addLegend(){
			d3.select("#c-svg-10-legend").selectAll("*").remove();
			const legendText = ["Retraités","Profil diversifié, plutôt âgé", "Ouvriers et jeunes enfants", "Employés et ouvriers", "Jeunes adultes, étudiants et cadres", "Trentenaires, cadres et prof. int."];

			let svgLegend = d3.select("#c-svg-10-legend")
				.append("svg")
				.attr("width", width)
				.attr("height", 125);

	
			let legend = svgLegend.selectAll(".legend")
				.data(colors.range())
				.enter()
				.append("g")
				.attr("class", "legend");


			legend
				.append("rect")
				.attr("x", width/3+30)
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
				.attr("x", width/3+60) //leave 30 pixel space after the <rect>
				.attr("y", function (d, i) {
					return 15 + i * 20;
				})
				.attr("dy", "0.5em")
				.text(function (d, i) {
					return legendText[i];
				});

		}

		addLegend();


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
							`);

					//geographical unit
					d3.select(this)
						.attr("fill-opacity",0.7);
				});
		}


		//add popup

		//create div popup
		let popup = d3.select("body").append("div")
			.attr("class", "my-popup");


		//MOUSE EVENT


		epci
			.on("mouseover", function(d){
				console.log(d)
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



		//Text label xAxis
		function changeLabel(label, color){
			svg
				.append("text")       
				.attr("fill", "#f0f0f0")
				.attr("class","extra label-change")      
				.attr("x",margin.left)
				.attr("y",25)
				.text(label)
				.attr("fill", color);
		}


		
		//initialize the scrollama
		//Parallax
		const scroller = scrollama();

		function handleStepEnter(response) {

			switch(response.index){
			case 0:
				addLegend();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Toutes catégories","#fff");
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ return colors(d.properties.clust); }));
				break;
			case 1:
				d3.select("#c-svg-10-legend").selectAll("*").remove();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Jeunes adultes, étudiants et cadres", colors.range()[4]);
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ 
						let value = d.properties.clust;
						return value == 5 ?  colors.range()[4]
							: "#646464";
					}));
				break;
			case 2:
				d3.select("#c-svg-10-legend").selectAll("*").remove();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Trentenaires, cadres et prof. int.", colors.range()[5]);
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ 
						let value = d.properties.clust;
						return value == 6 ? colors.range()[5]
							: "#646464";
					}));
				break;
			case 3:
				d3.select("#c-svg-10-legend").selectAll("*").remove();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Employés et ouvriers", colors.range()[3]);
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ 
						let value = d.properties.clust;
						return value == 4 ? colors.range()[3]
							: "#646464";
					}));
				break;
			case 4:
				d3.select("#c-svg-10-legend").selectAll("*").remove();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Ouvriers et jeunes enfants", colors.range()[2]);
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ 
						let value = d.properties.clust;
						return value == 3 ? colors.range()[2]
							: "#646464";
					}));
				break;

			case 5:
				d3.select("#c-svg-10-legend").selectAll("*").remove();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Profil diversifié, plutôt âgé", colors.range()[1]);
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ 
						let value = d.properties.clust;
						return value == 2 ? colors.range()[1]
							: "#646464";
					}));
				break;		
				
			case 6:
				d3.select("#c-svg-10-legend").selectAll("*").remove();
				d3.select("#c-svg-10").selectAll(".label-change").remove();
				changeLabel("Retraités", colors.range()[0]);
				epci
					.transition()
					.duration(250)
					.attr("fill", ((d)=>{ 
						let value = d.properties.clust;
						return value == 1 ? colors.range()[0]
							: "#646464";
					}));
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
				step: ".break-10",
				debug: false,
				offset: 0.6
			})
			.onStepEnter(handleStepEnter)
			.onStepExit(handleStepExit);

	}); //read csv





	


} //function graph10


graph10();




