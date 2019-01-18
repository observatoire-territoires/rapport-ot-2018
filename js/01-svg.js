
function getWidthSVG(i){
	const elem = document.querySelectorAll(".scroll-graphic svg");
	return elem[i].getBoundingClientRect().width;
};



function graph1(){

	//sizing
	const width = 320;
	const height = 400;

	//center location mobility type



	//initiate svg
	let svg = d3.select("#c-svg-01")
		.append("svg")
		.attr("height", height)
		.attr("width", "100%")
		.append("g")
		.attr("transform", "translate(" + getWidthSVG(0)/2 +  "," + height/2 + ")");


	//initiate format number
	/*Initiate format number*/
	d3.formatDefaultLocale({
		"decimal": ",",
		"thousands": "\u2009",
		"grouping": [3]
	});


	//the simulation is a collection of forces
	//about where we want our circles to go
	//and how we want our circles interact

	let simulation = d3.forceSimulation()
		.force("x", d3.forceX().strength(0.05))
		.force("y", d3.forceY().strength(0.05))
		.force("collide", d3.forceCollide(5))
		.velocityDecay(0.2);


	//color circles
	let fillColor = d3.scaleOrdinal()
		.domain(["immob", "mob_com", "mob_dep", "mob_reg", "mob_france", "mob_all"])
		.range(["#eaeaea", "#7b7fbc", "#7dbd9f", "#f8c351", "#f18757", "#e85754"]);

	
	
	d3.csv("../data/data-01.csv").then(function(data){
	
		console.log(data); 

		//generate circles
		let circles = svg.selectAll(".people")
			.data(data)
			.enter().append("circle")
			.attr("class", "people")
			.attr("r",2)
			.attr("fill",((d)=>{return fillColor(d.type_mob);}));


		//event click circles
		circles
			.on("click", ((d)=>{
				console.log(d);
			}));



		//moves the SVG circles used to make the bubbles
		//to their new positions
		simulation.nodes(data)
			.on("tick", ticked);


		/*
		* Callback function that is called after every tick of the
		* force simulation.
		* Here we do the acutal repositioning of the SVG circles
		* based on the current x and y values of their bound node data.
		* These x and y values are modified by the force simulation.
		*/


		function ticked(){
			circles
				.attr("cx", ((d)=>{return d.x;}))
				.attr("cy", ((d)=>{return d.y;}));
		}


		//called once for each node and provides
		//the appropriate x position for that node
		function nodeTypeMob(d){
			return 
		}


		//Resize SVG, responsive
		d3.select(window)
			.on("resize", ()=>{
				resize();
			});



		function resize(){
			console.log(getWidthSVG(0));

			svg
				.attr("width", "100%")
				.attr("transform", "translate(" + getWidthSVG(0)/2 +  "," + height/2 + ")");



			
		}




	});

} //function graph1



graph1();



//Sets up the layout buttons to allow for toggling between view modes

function setupButtons(){
	d3.select("#toolbar-01")
		.selectAll(".button")
		.on("click", function(){

			//remove active class from all buttons
			d3.selectAll(".button").classed("active", false);

			//find the button just clicked
			let button = d3.select(this);

			//set it as the active button
			button.classed("active", true);

			//get the id of the buttton
			let buttonId = button.attr("id");
		});
}
//setup the buttons
setupButtons();