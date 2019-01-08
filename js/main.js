console.log("Etat du document : " + document.readyState);


let breakC01Section1 = document.querySelector("#break-c-01-section1");
let breakC02Section2 = document.querySelector("#break-c-02-section2");
let breakC03Section3 = document.querySelector("#break-c-03-section3");
let breakC04Section3 = document.querySelector("#break-c-04-section3");
let breakC05Section3 = document.querySelector("#break-c-05-section3");

let scrollNumber = document.querySelectorAll(".scroll-number");

let c01Section1 = document.querySelector("#c-01-section1");
let c02Section2 = document.querySelector("#c-02-section2");
let c03Section3 = document.querySelector("#c-03-section3");
let c04Section3 = document.querySelector("#c-04-section3");
let c05Section3 = document.querySelector("#c-05-section3");
let c06Section4 = document.querySelector("#c-06-section4");
let c07Section4 = document.querySelector("#c-07-section4");
let c08Section5 = document.querySelector("#c-08-section5");
let c09Section5 = document.querySelector("#c-09-section5");
let c10Section6 = document.querySelector("#c-10-section6");
let c11Section6 = document.querySelector("#c-11-section6");

//initialize the scrollama
const scroller = scrollama();

function handleStepEnter(response) {

	switch(response.index){
	case 0:
		c03Section3.style.display = "block";
		c04Section3.style.display = "none";
		c05Section3.style.display = "none";
		break;
	case 1:
		c03Section3.style.display = "none";
		c04Section3.style.display = "block";
		c05Section3.style.display = "none";
		break;
	case 2:
		c03Section3.style.display = "none";
		c04Section3.style.display = "none";
		c05Section3.style.display = "block";
		break;
	case 3:
		c06Section4.style.display = "block";
		c07Section4.style.display = "none";
		break;
	case 4:
		c06Section4.style.display = "none";
		c07Section4.style.display = "block";
		break;
	case 5:
		c08Section5.style.display = "none";
		c09Section5.style.display = "block";
		break;
	case 6:
		c08Section5.style.display = "block";
		c09Section5.style.display = "none";
		break;
	case 7:
		c10Section6.style.display = "none";
		c11Section6.style.display = "block";
		break;
	case 8:
		c10Section6.style.display = "block";
		c11Section6.style.display = "none";
		break;
	}
}




scroller
	.setup({
		container: ".scroll",
		graphic: ".scroll-graphic",
		text: ".scroll-text",
		step: ".break",
		debug: false,
		offset: 0.33
	})
	.onStepEnter(handleStepEnter);


/*
//SCROLLAMA LAMA

function handleStepEnter(){
	c01Section1.style.position = "sticky";
}

function handleStepExit(){
	c01Section1.style.position = "relative";
}


// instantiate the scrollama
const scroller = scrollama();



// setup the instance, pass callback functions
scroller
	.setup({
		step: "#niv2-c-section1",
		debug: true,
		offset: 1
	})
	.onStepEnter(handleStepEnter)
	.onStepExit(handleStepExit);
*/



//SMALL AND LARGE DEVICE POSITIONNING GRAPHIC
//-----------------------------------------------------
//-----------------------------------------------------

/*

function deplaceElementSmallDevice() {

	//Detect large or small viewport
	const breakpoint = "(min-width: 1024px)";
	const largeMedia = window.matchMedia(breakpoint).matches;

	//if largeMedia=true : large device
	//if largeMedia=false: small device
	

	//If small device, deplace svg after text, if large device replace svg at the end


	if (largeMedia==false){

		breakC01Section1.parentNode.insertBefore(c01Section1,breakC01Section1.nextSibling);
	//	breakC02Section2.parentNode.insertBefore(c02Section2,breakC02Section2.nextSibling);
	//	breakC03Section3.parentNode.insertBefore(c03Section3,breakC03Section3.nextSibling);
	//	breakC04Section3.parentNode.insertBefore(c04Section3,breakC04Section3.nextSibling);
	//	breakC05Section3.parentNode.insertBefore(c05Section3,breakC05Section3.nextSibling);
		
	
		console.log("petit écran");
	}

	if (largeMedia==true){

		scrollNumber[0].append(c01Section1);



		console.log("grand écran");
	}

}


//If windows is resized, real-time
window.addEventListener("resize",()=>{
	deplaceElementSmallDevice();
});

//If document is complete, press F5 or on location
document.onreadystatechange = function(){
	if (document.readyState == "complete"){
		deplaceElementSmallDevice();
	}
};

*/