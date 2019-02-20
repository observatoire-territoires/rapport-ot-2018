

function graph08(){
	//change svg with clic button
	let object08 = document.querySelector("#object-08");

	object08.addEventListener("load", function() {


		let widthO = document.querySelector(".niv2 p").clientWidth;
		let heightO = 440;


		let svgO = object08
			.getSVGDocument()
			.querySelector("#svg-08-section6");

		let flowAll = object08
			.getSVGDocument()
			.querySelectorAll(".csp-flow");

		let mapAll = object08
			.getSVGDocument()
			.querySelector("#carte_complete");


		svgO.setAttribute("width",widthO);
		svgO.setAttribute("height",heightO);

	

		
		//Opacity
		function svg08ChangeOpacity(index) {
			for(let i = 0; i < flowAll.length; i++){
				if(index != i){
					flowAll[i].setAttribute("opacity",0);
				} else {
					flowAll[i].setAttribute("opacity",1);
				}
			}
		}


		/* 
		let labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		labelText.setAttributeNS(null, "x", 0);
		labelText.setAttributeNS(null, "y", 25);
		labelText.setAttributeNS(null, "class", "extra label-change");
		labelText.setAttributeNS(null, "font-family", "MontserratWebMedium");
		labelText.setAttributeNS(null, "font-style", "normal");
		labelText.setAttributeNS(null, "fill", "#f0f0f0");
		labelText.setAttributeNS(null, "font-size", "16px");
		labelText.setAttributeNS(null, "text-anchor", "start");

		labelText.innerHTML = "Toutes catégories";
		svg.appendChild(labelText);
		*/


		function setupButtons(){
			d3.select("#toolbar-08")
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

					switch (buttonId) {
					case "csp-all":
						svg08ChangeOpacity(0);
						break;					
					case "csp-cadres":
						svg08ChangeOpacity(1);
						break;
					case "csp-retraites":
						svg08ChangeOpacity(2);
						break;
					case "csp-etudiants":
						svg08ChangeOpacity(3);
						break;
					case "csp-ouvriers":
						svg08ChangeOpacity(4);
						break;
					}


				
					// Toggle the bubble chart based on
					// the currently clicked button
					//toggleDisplay(buttonId);
				});
		}
		//setup the buttons
		setupButtons();






	}); //load listener


	//Legend

	const width = document.querySelector("#c-svg-08").clientWidth;
	const height = 90;

	let svg = d3.select("#c-svg-08-legend")
		.append("svg")
		.attr("width", width)
		.attr("height", height);


	legendAllFlow();

	function legendAllFlow(){

		

		let allFlow = svg.append("g")
			.attr("class", "all-flow");
		
		
		allFlow
			.append("rect")
			.attr("x", 30+width/3)
			.attr("y", 25)
			.attr("width", 7.2)
			.attr("height",40)
			.attr("fill", "#fff");

		allFlow
			.append("rect")
			.attr("x", 80+width/3)
			.attr("y", 25)
			.attr("width", 2.55)
			.attr("height",40)
			.attr("fill", "#fff");

		allFlow
			.append("rect")
			.attr("x", 130+width/3)
			.attr("y", 25)
			.attr("width", 1.79)
			.attr("height",40)
			.attr("fill", "#fff");

		allFlow
			.append("rect")
			.attr("x", 180+width/3)
			.attr("y", 25)
			.attr("width", 1.09)
			.attr("height",40)
			.attr("fill", "#fff");

		allFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 30+width/3)
			.attr("y", 85)
			.text("40 000");

		allFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 80+width/3)
			.attr("y", 85)
			.text("5 000");


		allFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 130+width/3)
			.attr("y", 85)
			.text("2 500");

		allFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 180+width/3)
			.attr("y", 85)
			.text("1 000");
	}





	function legendByFlow(){

		let byFlow = svg.append("g")
			.attr("class", "by-flow");
		
		
		byFlow
			.append("rect")
			.attr("x", 30+width/3)
			.attr("y", 25)
			.attr("width", 5.33)
			.attr("height",40)
			.attr("fill", "#fff");

		byFlow
			.append("rect")
			.attr("x", 80+width/3)
			.attr("y", 25)
			.attr("width", 3.8)
			.attr("height",40)
			.attr("fill", "#fff");

		byFlow
			.append("rect")
			.attr("x", 130+width/3)
			.attr("y", 25)
			.attr("width", 2.71)
			.attr("height",40)
			.attr("fill", "#fff");

		byFlow
			.append("rect")
			.attr("x", 180+width/3)
			.attr("y", 25)
			.attr("width", 1.72)
			.attr("height",40)
			.attr("fill", "#fff");

		byFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 30+width/3)
			.attr("y", 85)
			.text("10 000");

		byFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 80+width/3)
			.attr("y", 85)
			.text("5 000");


		byFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 130+width/3)
			.attr("y", 85)
			.text("2 000");

		byFlow
			.append("text")
			.attr("fill", "#f0f0f0")
			.attr("x", 180+width/3)
			.attr("y", 85)
			.text("1 000");
	}




	let legendFlow = svg.append("g")
		.attr("class", "legend-text");

	legendFlow
		.append("text")
		.attr("x", width/2)
		.attr("y", 10)
		.attr("text-anchor", "middle")
		.attr("fill", "#f0f0f0")
		.text("Nombre d'individus");




Array.from(document.querySelectorAll(".button-csp")).forEach((el,i)=>{
		el.addEventListener("click", function(e){

			switch (el.id) {
			case "csp-all":
				d3.select("#c-svg-08-legend").selectAll(".all-flow").remove();
				d3.select("#c-svg-08-legend").selectAll(".by-flow").remove();
				legendAllFlow();
				break;					
			case "csp-cadres":
				d3.select("#c-svg-08-legend").selectAll(".all-flow").remove();
				d3.select("#c-svg-08-legend").selectAll(".by-flow").remove();
				legendByFlow();
				break;
			case "csp-retraites":
				d3.select("#c-svg-08-legend").selectAll(".all-flow").remove();
				d3.select("#c-svg-08-legend").selectAll(".by-flow").remove();
				legendByFlow();
				break;
			case "csp-etudiants":
				d3.select("#c-svg-08-legend").selectAll(".all-flow").remove();
				d3.select("#c-svg-08-legend").selectAll(".by-flow").remove();
				legendByFlow();
				break;
			case "csp-ouvriers":
				d3.select("#c-svg-08-legend").selectAll(".all-flow").remove();
				d3.select("#c-svg-08-legend").selectAll(".by-flow").remove();
				legendByFlow();
				break;
			}
		})
})
	







} //functiongraph08

graph08();