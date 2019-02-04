function graph5(){


	//sizing
	let margin = {top:20, right:0, bottom:40, left: 40};

	let width = 600;
	let height = 400;


	//initiate svg
	let svg = d3.select("#c-svg-05")
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
	d3.json("data/map/dep.json").then(function(data){

		console.log(data);





/*projection
------------------------------------------------------
------------------------------------------------------
*/


		const featureCollection = topojson.feature(data, data.objects.dep); //geojson
		const projection = d3.geoConicConformal() //france projection
			.fitSize([width,height],featureCollection);

		const path = d3.geoPath() //generate path
			.projection(projection); //add projection to path


		/*path
		------------------------------------------------------
		------------------------------------------------------
		*/

		svg.selectAll("path")
			.append("g")
			.data(featureCollection.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("class", "feature");








}); //read csv





	


} //fonction graph5


graph5();





//initialize the scrollama
//Parallax
const scroller2 = scrollama();

function handleStepEnter(response) {

	switch(response.index){
	case 1:
		d3.select("#c-svg-05").selectAll("*").remove();
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
