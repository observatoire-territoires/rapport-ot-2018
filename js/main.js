console.log("Etat du document : " + document.readyState);



//STICKY


//SCROLLAMA LAMA




// instantiate the scrollama
const scroller = scrollama();


function handleStepEnter(response){
	let elem = document.querySelector("#c-01-section1");
	elem.style.position = "sticky"
}

function handleStepExit(response){
	let elem = document.querySelector("#c-01-section1");
	elem.style.position = "relative"
	console.log(elem)
	console.log(response);
}


// setup the instance, pass callback functions
scroller
	.setup({
		step: "#niv2-c-section1",
		debug: false,
		offset:1
	})
	.onStepEnter(handleStepEnter)
	.onStepExit(handleStepExit);





//NEW SKELETON
/*
function deplaceElementSmallDevice() {

	//Detect large or small viewport
	const breakpoint = "(min-width: 1024px)";
	const largeMedia = window.matchMedia(breakpoint).matches;

	//if largeMedia=true : large device
	//if largeMedia=false: small device

	if (largeMedia==false){

		console.log("petit écran");
	}

	if (largeMedia==true){
	
		console.log("grand écran");
	}

}
*/

//OLD SKELETON 


function deplaceElementSmallDevice() {

	//Detect large or small viewport
	const breakpoint = "(min-width: 1024px)";
	const largeMedia = window.matchMedia(breakpoint).matches;

	//if largeMedia=true : large device
	//if largeMedia=false: small device
	

	//If small device, deplace svg after text, if large device replace svg at the end
	let aside = document.querySelector("aside");
	let breakC01Section1 = document.querySelector("#break-c-01-section1");
	let c01Section1 = document.querySelector("#c-01-section1");
	let breakC02Section2 = document.querySelector("#break-c-02-section2");
	let c02Section2 = document.querySelector("#c-02-section2");
	let breakC03Section3 = document.querySelector("#break-c-03-section3");
	let c03Section3 = document.querySelector("#c-03-section3");
	let breakC04Section3 = document.querySelector("#break-c-04-section3");
	let c04Section3 = document.querySelector("#c-04-section3");
	let breakC05Section3 = document.querySelector("#break-c-05-section3");
	let c05Section3 = document.querySelector("#c-05-section3");


	if (largeMedia==false){

		breakC01Section1.parentNode.insertBefore(c01Section1,breakC01Section1.nextSibling);
		breakC02Section2.parentNode.insertBefore(c02Section2,breakC02Section2.nextSibling);
		breakC03Section3.parentNode.insertBefore(c03Section3,breakC03Section3.nextSibling);
		breakC04Section3.parentNode.insertBefore(c04Section3,breakC04Section3.nextSibling);
		breakC05Section3.parentNode.insertBefore(c05Section3,breakC05Section3.nextSibling);
		
	
		console.log("petit écran");
	}

	if (largeMedia==true){

		aside.append(c01Section1);
	//	aside.append(c02Section2);
	//	aside.append(c03Section3);
	//	aside.append(c04Section3);
	//	aside.append(c05Section3);
		
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