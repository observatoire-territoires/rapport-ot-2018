

function graph1(){


	//sizing
	let width = document.querySelector(".niv2 p").clientWidth;
	const height = 400;

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

	let simulation = d3.forceSimulation()
		.force("x", d3.forceX().strength(0.05))
		.force("y", d3.forceY().strength(0.05))
		.force("collide", d3.forceCollide(5))
		.force("charge", d3.forceManyBody().strength(-1));


	//color circles
	let fillColor = d3.scaleOrdinal()
		.domain(["immob", "mob_com", "mob_dep", "mob_reg", "mob_france", "mob_all"])
		.range(["#eaeaea", "#7b7fbc", "#7dbd9f", "#f8c351", "#f18757", "#e85754"]);

	
	
	d3.csv("data/csv/data-01.csv").then(function(data){
	
		

		let circles = g.append("g")
			.selectAll(".people");


		function updateData(myData){

			
			// Apply the general update pattern to the circles
			circles = circles.data(myData);

			circles.exit().remove();

			circles = circles
				.enter().append("circle")
				.attr("class", "people")
				.attr("r",2)
				.attr("fill",((d)=>{return fillColor(d.type_mob);}))
				.merge(circles);

			//moves the SVG circles used to make the bubbles
			//to their new positions
			simulation.nodes(myData)
				.on("tick", ticked);

		} //update data
		
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
				.attr("cy", ((d)=>{return d.y+20;}));
		}

		//event click circles
		circles
			.on("click", ((d)=>{
				console.log(d);
			}));

		let propMobilityCenters = {
			"0":{x: 50-width/4, y: height/2},
			"1":{x: 50+width/4, y: height/2}
		};

		/*
		* Provides a x value for each node to be used with the split by year
		* x force.
		*/
		function nodePropMobilityPos(d) {
			return propMobilityCenters[d.value].x;
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


		//GroupCircles
		function groupCircles(){

			updateData(data);
			//reset the 'x' force to draw the circles to the center
			simulation.force("x", d3.forceX().strength(0.05));
			simulation.force("charge", d3.forceManyBody().strength(-1));
			//reset the alpha value and restart the simulation
			simulation.alpha(1).restart();


			


		}


		//SplitCircles
		function splitCircles(){

			updateData(data);
			//reset the 'x' force to draw the circles to their year centers
			simulation.force("x", d3.forceX().strength(0.05).x(nodePropMobilityPos));
			//reset the alpha value and restart the simulation
			simulation.alpha(1).restart();


			d3.select("#c-svg-01").selectAll(".label-text").remove();
			d3.select("#c-svg-01").selectAll(".label-line").remove();

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 50+width/4) //leave 30 pixel space after the <rect>
				.attr("y", 70)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("89 % des individus");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 50+width/4) //leave 30 pixel space after the <rect>
				.attr("y", 85)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("n'ont pas changé de logement");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 55+3*width/4) //leave 30 pixel space after the <rect>
				.attr("y", 150)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("11 % des individus");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 55+3*width/4) //leave 30 pixel space after the <rect>
				.attr("y", 165)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("ont changé de logement");

		}


		//Five circle
		function fiveCircles(){


			d3.select("#c-svg-01").selectAll(".label-text").remove();
			d3.select("#c-svg-01").selectAll(".label-line").remove();

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 10+width/6) //leave 30 pixel space after the <rect>
				.attr("y", 120)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("4 % sont restées");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 10+width/6) //leave 30 pixel space after the <rect>
				.attr("y", 135)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("dans la même commune");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 10+2*width/6) //leave 30 pixel space after the <rect>
				.attr("y", 300)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("4,1 % ont changé de commune");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 10+2*width/6) //leave 30 pixel space after the <rect>
				.attr("y", 315)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("au sein du même département");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 10+width/2) //leave 30 pixel space after the <rect>
				.attr("y", 120)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("1,2 % ont changé de département");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 10+width/2) //leave 30 pixel space after the <rect>
				.attr("y", 135)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("au sein de la même région");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 5+2*width/3) //leave 30 pixel space after the <rect>
				.attr("y", 300)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("1,6 % ont changé");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 5+2*width/3) //leave 30 pixel space after the <rect>
				.attr("y", 315)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("de région");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 5*width/6) //leave 30 pixel space after the <rect>
				.attr("y", 120)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("0,4 % sont arrivés");

			svg
				.append("text")
				.attr("class","label-text")
				.attr("x", 5*width/6) //leave 30 pixel space after the <rect>
				.attr("y", 135)
				.attr("text-anchor", "middle")
				.attr("fill", "#f0f0f0")
				.text("de l'étranger");


			//Vertical Line
			svg
				.append("line")
				.attr("class", "label-line")
				.attr("x1", 10+width/6)
				.attr("x2", 10+width/6)
				.attr("y1",155)
				.attr("y2", 175)
				.attr("stroke", "#f0f0f0")
				.attr("stroke-width",1);



			svg
				.append("line")
				.attr("class", "label-line")
				.attr("x1", 10+2*width/6)
				.attr("x2", 10+2*width/6)
				.attr("y1",260)
				.attr("y2", 280)
				.attr("stroke", "#f0f0f0")
				.attr("stroke-width",1);

			svg
				.append("line")
				.attr("class", "label-line")
				.attr("x1", 10+width/2)
				.attr("x2", 10+width/2)
				.attr("y1",155)
				.attr("y2", 175)
				.attr("stroke", "#f0f0f0")
				.attr("stroke-width",1);

			svg
				.append("line")
				.attr("class", "label-line")
				.attr("x1", 5+2*width/3)
				.attr("x2", 5+2*width/3)
				.attr("y1",260)
				.attr("y2", 280)
				.attr("stroke", "#f0f0f0")
				.attr("stroke-width",1);


			svg
				.append("line")
				.attr("class", "label-line")
				.attr("x1", 5*width/6)
				.attr("x2", 5*width/6)
				.attr("y1",155)
				.attr("y2", 175)
				.attr("stroke", "#f0f0f0")
				.attr("stroke-width",1);



			let data2 = data.filter((d)=>{return d.value == "1";});
			updateData(data2);

			let typeMobilityCenters = {
				"mob_com":{x: -2*width/6, y: height/2},
				"mob_dep":{x: -width/6, y: height/2},
				"mob_reg":{x: 0, y: height/2},
				"mob_france":{x: width/6, y: height/2},
				"mob_all":{x: 2*width/6, y: height/2},
				"immob":{x:0,y:0}
			};
	
			function nodeTypeMobilityPos(d){
				return typeMobilityCenters[d.type_mob].x;
			}
			
			//reset the 'x' force to draw the circles to their year centers
			simulation.force("x", d3.forceX().strength(0.05).x(nodeTypeMobilityPos));
			//reset the alpha value and restart the simulation
			simulation.alpha(1).restart();
		}

		//Sets up the layout buttons to allow for toggling between view modes

		




		//initialize the scrollama
		//Parallax
		const scroller = scrollama();

		function handleStepEnter(response) {

			switch(response.index){
			case 0:

				splitCircles();
				break;
			case 1:
				fiveCircles();
				break;
			}
		}

		function handleStepExit(response){
			switch(response.index){
			case 0:

				break;
			}
		}


		scroller
			.setup({
				container: ".scroll",
				graphic: ".scroll-graphic",
				text: ".scroll-text",
				step: ".break-01",
				debug: false,
				offset: 0.33
			})
			.onStepEnter(handleStepEnter)
			.onStepExit(handleStepExit);


		updateData(data);


	}) //import data
		.catch(function(error){
			console.log(error);
		});





	

} //function graph1




window.addEventListener("load", function(){
	if(getComputedStyle(document.querySelector(".c-graphic-min")).display == "none")
	{
		graph1();
	}
});