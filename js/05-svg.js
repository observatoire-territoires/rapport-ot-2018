function graph5(){


	//sizing
	let margin = {top:20, right:0, bottom:40, left: 20};

	let width = document.querySelector("#c-svg-05").clientWidth;
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



	//Initiate data
	Promise.all([
		d3.json("data/map/dep.json"),
		d3.json("data/map/dep_reg.json"),
		d3.csv("data/data-05.csv")
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
					featureCollection.features[j].properties.tx_2009_2014 = data[2][i].tx_20092014;
					featureCollection.features[j].properties.quali = data[2][i].quali;
					break;
				}
			}
		}

		//set colors
		let colors = d3.scaleOrdinal()
			.domain(["0_0","0_1","0_2","1_0","1_1","2_1","2_0","2_1","2_2"])
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
			.on("zoom", function(){
				g.attr("transform", d3.event.transform);
			})
			.scaleExtent([1,6]) //deep zoom
			.translateExtent([[0,0],[width, height]])
		);



}); //read csv





	


} //fonction graph5








//initialize the scrollama
//Parallax
const scroller2 = scrollama();

function handleStepEnter(response) {

	switch(response.index){
	case 1:
		break;
	case 2:
		graph5();
		break;
	}
}

function handleStepExit(response){
	switch(response.index){
	case 2:
		d3.select("#c-svg-05").selectAll("*").remove();
		break;
	}
}


scroller2
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
