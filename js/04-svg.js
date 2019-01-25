//storing values in an array
let inputValues2 = ["1968-1975", "1975-1982", "1982-1990", "1990-1999", "1999-2009", "2009-2014"];

let input04 = document.querySelector("#input-04");
let output04 = document.querySelector("#c-output-04");

let output04Bullet = document.querySelector("#output-04-bullet");

input04.oninput = function(){
	//output03.innerHTML = inputValues[this.value];
	output04Bullet.innerHTML = inputValues2[this.value];
};




//set the default value
input04.oninput();


//deplace output bullet during slide
let deplaceOutputBullet2 = function(){
	let bulletPosition = (input04.value / input04.max);
	output04Bullet.style.left = (bulletPosition * input04.getBoundingClientRect().width)*0.9221018907 + "px";
};


input04.addEventListener("input",function(e){

	deplaceOutputBullet2();

});


//If windows is resized, real-time
window.addEventListener("resize",()=>{
	deplaceOutputBullet2();

});



//d3 processing img

function graph4(){


	//sizing
	let margin = {top:20, right:0, bottom:40, left: 40};

	let width = 600;
	let height = 400;

	//initiate svg
	let svg = d3.select("#c-svg-04")
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


	d3.csv("data/data-04.csv").then(function(data){

		console.log(data);

		//select key values
		let keys = data.columns.slice(8,14);

		//return min & max values
		let max = d3.max(data, (d)=>{return d3.max(keys,(key)=>{return d[key];});});
		let min = d3.min(data, (d)=>{return d3.min(keys,(key)=>{return d[key];});});
		
		console.log(min)
		console.log(max)

		//Initiate x Axis
		const xScale = d3.scaleLinear()
			.domain([min,max]) //input
			.range([margin.left, width-margin.right]); //output

		const xAxis = d3.axisBottom(xScale);

		//Call x axis
		svg
			.append("g")
			.attr("class", "axis x_axis")
			.attr("transform", `translate(0,${height-margin.bottom})`)
			.call(xAxis);


			

	})






















}; //function graph4



//initialize the scrollama
//Parallax
const scroller = scrollama();

function handleStepEnter(response) {

	switch(response.index){
	case 0:
		graph4();
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
		step: ".break-04",
		debug: false,
		offset: 0.33
	})
	.onStepEnter(handleStepEnter)
	.onStepExit(handleStepExit);