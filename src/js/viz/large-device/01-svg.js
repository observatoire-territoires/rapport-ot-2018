

function graph1(){


	//sizing
	let margin = {top:50, right:20, bottom:50, left: 20};
	let width = document.querySelector(".niv2 p").clientWidth;
	const height = 600;

	//center location mobility type



	//initiate svg
	let svg = d3.select("#c-svg-01")
		.append("svg")
		.attr("height", height)
		.attr("width", width);
		

	let g = svg.append("g")
		.attr("transform", "translate(" + width/2 +  ","  + height/2 + ")");

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

	

	//color circles
	let fillColor = d3.scaleOrdinal()
		.domain(["immob", "mob_com", "mob_dep", "mob_reg", "mob_france", "mob_all"])
		.range(["#eaeaea", "#7b7fbc", "#7dbd9f", "#f8c351", "#f18757", "#e85754"]);

	
	
	d3.csv("data/csv/data-01-ld.csv").then(function(data){
	
		let simulation = d3.forceSimulation()
			.force("x", d3.forceX().strength(0.05).x(nodeXTypeMobilityPos))
			.force("y", d3.forceY().strength(0.05).y(nodeTypeMobilityPos))
			.force("collide", d3.forceCollide(5))
			.force("charge", d3.forceManyBody().strength(-1));


		//	simulation.alpha(1).restart();


		let typeMobilityCenters = {
			"mob_com":{x:  width/6, y:-2*height/6},
			"mob_dep":{x:  width/6, y: -height/6},
			"mob_reg":{x:  width/6, y: 0},
			"mob_france":{x: width/6, y:  height/6},
			"mob_all":{x: width/6, y: 2*height/6},
			"immob":{x: -width/6, y: 0}
		};

		function nodeTypeMobilityPos(d){
			return typeMobilityCenters[d.type_mob].y;
		}
		
		function nodeXTypeMobilityPos(d){
			return typeMobilityCenters[d.type_mob].x;
		}



		let circles = g.append("g")
			.selectAll(".people");

			
		// Apply the general update pattern to the circles
		circles = circles.data(data);

		circles.exit().remove();

		circles = circles
			.enter().append("circle")
			.attr("class", "people")
			.attr("r",2)
			.attr("fill",((d)=>{return fillColor(d.type_mob);}))
			.merge(circles);

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
		* This function joins the nodes array to circle elements
		* and updates their positions
		*/

		function ticked(){
			circles
				.attr("cx", ((d)=>{return d.x;}))
				.attr("cy", ((d)=>{return d.y;}));
		}



		function addExtra(){
			//Text label xAxis
			svg
				.append("text")       
				.attr("class","extra label-change")      
				.attr("x",20)
				.attr("y",25)
				.attr("fill", "#f0f0f0")
				.text("En 2014, en France");
			
			//Horizontal line
			svg
				.append("line")
				.attr("class","extra line-extra")
				.attr("x1",20)
				.attr("y1",5)
				.attr("x2",180)
				.attr("y2",5)
				.attr("stroke", "#fff");

			svg
				.append("line")
				.attr("class","extra line-extra")
				.attr("x1",20)
				.attr("y1",35)
				.attr("x2",180)
				.attr("y2",35)
				.attr("stroke", "#fff");
		} //function addExtra


		addExtra();

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 50+width/4) //leave 30 pixel space after the <rect>
			.attr("y", height/3-margin.top)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("89 % des individus");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 50+width/4) //leave 30 pixel space after the <rect>
			.attr("y", height/3-margin.top+15)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("n'ont pas changé de logement");



		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", height/6-margin.top)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("4 % sont restés");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", height/6-margin.top+15)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("dans la même commune");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 2*height/6-margin.top)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("4,1 % ont changé de commune");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 2*height/6-margin.top+15)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("au sein du même département");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 3*height/6-margin.top)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("1,2 % ont changé de département");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 3*height/6-margin.top+15)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("au sein de la même région");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 4*height/6-margin.top)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("1,6 % ont changé");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 4*height/6-margin.top+15)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("de région");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x", 4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 5*height/6-margin.top)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("0,4 % sont arrivés");

		svg
			.append("text")
			.attr("class","label-text")
			.attr("x",4*width/6) //leave 30 pixel space after the <rect>
			.attr("y", 5*height/6-margin.top+15)
			.attr("text-anchor", "middle")
			.attr("fill", "#f0f0f0")
			.text("de l'étranger");


	



	}); //read csv
	

} //function graph1




window.addEventListener("load", function(){
	if(getComputedStyle(document.querySelector(".c-graphic-min")).display == "none")
	{
		graph1();
	}
});