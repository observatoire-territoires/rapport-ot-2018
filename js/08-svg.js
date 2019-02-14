

function graph08(){
	//change svg with clic button
	let object08 = document.querySelector("#object-08");

	object08.addEventListener("load", function() {


		let width = document.querySelector("#c-svg-08").clientWidth;
		let height = 400;

		console.log(width)


		let svg = object08
			.getSVGDocument()
			.querySelector("#svg-08-section6");

		let mapAll = object08
			.getSVGDocument()
			.querySelectorAll(".csp-flow");

		svg.setAttribute("width",width);
		svg.setAttribute("height",height);
		
		
		//Opacity
		function svg08ChangeOpacity(index) {
			for(let i = 0; i < mapAll.length; i++){
				if(index != i){
					mapAll[i].setAttribute("opacity",0);
				} else {
					mapAll[i].setAttribute("opacity",1);
				}
			}
		}

		

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