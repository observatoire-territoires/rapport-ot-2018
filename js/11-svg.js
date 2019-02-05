function graph11(){


	//sizing
	let margin = {top:20, right:0, bottom:40, left: 40};

	let width = 600;
	let height = 400;


	//initiate svg
	let svg = d3.select("#c-svg-11")
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



	//Initiate data
	Promise.all([
		d3.json("data/map/epci.json"),
		d3.json("data/map/epci_reg.json")
	]).then(function(data){

		console.log(data);




		//projection

		const featureCollection = topojson.feature(data[0], data[0].objects.epci_gen_wgs84); //geojson
		const featureCollectionReg = topojson.feature(data[1], data[1].objects.epci_reg_gen_wgs84); //geojson
		const projection = d3.geoConicConformal() //france projection
			.fitSize([width,height],featureCollection);

		const path = d3.geoPath() //generate path
			.projection(projection); //add projection to path


		//generate epci
		svg.selectAll(".dep")
			.append("g")
			.data(featureCollection.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("class", "dep");

		//generate reg
		svg.selectAll(".region")
			.append("g")
			.data(featureCollectionReg.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("class", "region");





}); //read csv





	


} //fonction graph11


graph11();




