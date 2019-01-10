console.log("Etat du document : " + document.readyState);


let breakC01Section1 = document.querySelector("#break-c-01-section1");
let breakC02Section2 = document.querySelector("#break-c-02-section2");
let breakC03Section3 = document.querySelector("#break-c-03-section3");
let breakC04Section3 = document.querySelector("#break-c-04-section3");
let breakC05Section3 = document.querySelector("#break-c-05-section3");
let breakC06Section4 = document.querySelector("#break-c-06-section4");
let breakC07Section4 = document.querySelector("#break-c-07-section4");
let breakC08Section5 = document.querySelector("#break-c-08-section5");
let breakC09Section5 = document.querySelector("#break-c-09-section5");
let breakC10Section6 = document.querySelector("#break-c-10-section6");
let breakC11Section6 = document.querySelector("#break-c-11-section6");



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




//FOOTER NOTE

//Display div when note apparead in viewport

let notesStep = document.querySelectorAll(".notes-step");
let notesBoxRef = document.querySelectorAll(".notes-box-ref");


let noteIsInViewport = function(elem){
	let bounding = elem.getBoundingClientRect();
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
		bounding.bottom <= (window.innerWidth || document.documentElement.clientHeight)
	);		
};


//->Here the event--------------
//------------------------------

document.addEventListener("scroll",function(){
	console.log(notesStep[0].getBoundingClientRect().top);
	for (let i=0;i<notesStep.length;i++){
		if (noteIsInViewport(notesStep[i])){
			//is in viewport
			notesBoxRef[i].classList.add("notes-box-div-visible");
		} else {
			//is not in viewport
			notesBoxRef[i].classList.remove("notes-box-div-visible");
		}
	}
});





//SMALL AND LARGE DEVICE POSITIONNING GRAPHIC
//-----------------------------------------------------
//-----------------------------------------------------



function deplaceElementSmallDevice() {

	//Detect large or small viewport
	const breakpoint = "(min-width: 1024px)";
	const largeMedia = window.matchMedia(breakpoint).matches;

	//if largeMedia=true : large device
	//if largeMedia=false: small device
	

	//If small device, deplace svg after text, if large device replace svg at the end


	if (largeMedia==false){

		breakC01Section1.parentNode.insertBefore(c01Section1,breakC01Section1.nextSibling);
		breakC02Section2.parentNode.insertBefore(c02Section2,breakC02Section2.nextSibling);
		breakC03Section3.parentNode.insertBefore(c03Section3,breakC03Section3.nextSibling);
		breakC04Section3.parentNode.insertBefore(c04Section3,breakC04Section3.nextSibling);
		breakC05Section3.parentNode.insertBefore(c05Section3,breakC05Section3.nextSibling);
		breakC06Section4.parentNode.insertBefore(c06Section4,breakC06Section4.nextSibling);
		breakC07Section4.parentNode.insertBefore(c06Section4,breakC07Section4.nextSibling);
		breakC08Section5.parentNode.insertBefore(c06Section4,breakC08Section5.nextSibling);
		breakC09Section5.parentNode.insertBefore(c06Section4,breakC09Section5.nextSibling);
		breakC10Section6.parentNode.insertBefore(c06Section4,breakC10Section6.nextSibling);
		breakC11Section6.parentNode.insertBefore(c06Section4,breakC11Section6.nextSibling);
	
		console.log("petit écran");
		


		
	}

	if (largeMedia==true){

		scrollNumber[0].append(c01Section1);
		scrollNumber[1].append(c02Section2);
		scrollNumber[2].append(c03Section3);
		scrollNumber[2].append(c04Section3);
		scrollNumber[2].append(c05Section3);
		scrollNumber[3].append(c06Section4);
		scrollNumber[3].append(c07Section4);
		scrollNumber[4].append(c08Section5);
		scrollNumber[4].append(c09Section5);
		scrollNumber[5].append(c10Section6);
		scrollNumber[5].append(c11Section6);

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

		console.log("grand écran");
	}

}






//->Here the event--------------
//------------------------------
	
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