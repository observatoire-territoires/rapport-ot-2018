//storing values in an array
let inputValues = ["1968-1975", "1975-1982", "1982-1990", "1990-1999", "1999-2009", "2009-2014"];

let input03 = document.querySelector("#input-03");
let output03 = document.querySelector("#c-output-03");

let output03Bullet = document.querySelector("#output-03-bullet");

input03.oninput = function(){
	//output03.innerHTML = inputValues[this.value];
	output03Bullet.innerHTML = inputValues[this.value];
};




//set the default value
input03.oninput();


//deplace output bullet during slide
let deplaceOutputBullet = function(){
	let bulletPosition = (input03.value / input03.max);
	output03Bullet.style.left = (bulletPosition * input03.getBoundingClientRect().width)*0.9221018907 + "px";
};


//change svg with range slider
let object03 = document.querySelector("#object-03");

object03.addEventListener("load", function() {

	let svg = object03
		.getSVGDocument()
		.querySelector("#svg-03-section3");

	let mapAll = object03
		.getSVGDocument()
		.querySelectorAll(".per_all");


	//Opacity
	function svg03ChangeOpacity(index) {
		for(let i = 0; i < mapAll.length; i++){
			if(index != i){
				mapAll[i].setAttribute("opacity",0);
			} else {
				mapAll[i].setAttribute("opacity",1);
			}
		}
	}

	//on loading, first svg
	svg03ChangeOpacity(0);

	input03.addEventListener("input",function(e){
		deplaceOutputBullet();
		switch (e.target.value) {
		case "0":
			svg03ChangeOpacity(0);
			break;
		case "1":
			svg03ChangeOpacity(1);
			break;	
		case "2":
			svg03ChangeOpacity(2);
			break;
		case "3":
			svg03ChangeOpacity(3);	
			break;
		case "4":
			svg03ChangeOpacity(4);
			break;
		case "5":
			svg03ChangeOpacity(5);	
			break;
			
		}
	});


	//initialize the scrollama
	//Parallax
	const scroller = scrollama();

	function handleStepEnter(response) {

		switch(response.index){
		case 0:
			svg.style.opacity = "1";
			break;
		}
	}

	function handleStepExit(response){
		switch(response.index){
		case 0:
			svg.style.opacity = "0";
			break;
		}
	}


	scroller
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





	
}); //load listener






//If windows is resized, real-time
window.addEventListener("resize",()=>{
	deplaceOutputBullet();

});


