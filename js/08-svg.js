

function graph08(){
	//change svg with clic button
	let object08 = document.querySelector("#object-08");

	object08.addEventListener("load", function() {


		let width = document.querySelector("#c-svg-08").clientWidth;
		let height = 440;


		let svg = object08
			.getSVGDocument()
			.querySelector("#svg-08-section6");

		let flowAll = object08
			.getSVGDocument()
			.querySelectorAll(".csp-flow");

		let mapAll = object08
			.getSVGDocument()
			.querySelector("#carte_complete");


		svg.setAttribute("width",width);
		svg.setAttribute("height",height);

	

		
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


} //functiongraph08

graph08();