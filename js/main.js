console.log("Etat du document : " + document.readyState);

/*
const breakC01Section1 = document.querySelector("#break-c-01-section1");
const breakC02Section2 = document.querySelector("#break-c-02-section2");
const breakC03Section3 = document.querySelector("#break-c-03-section3");
const breakC04Section3 = document.querySelector("#break-c-04-section3");
const breakC05Section3 = document.querySelector("#break-c-05-section3");
const breakC06Section4 = document.querySelector("#break-c-06-section4");
const breakC07Section5 = document.querySelector("#break-c-07-section5");
const breakC08Section6 = document.querySelector("#break-c-08-section6");
const breakC10Section7 = document.querySelector("#break-c-10-section7");
const breakC11Section8 = document.querySelector("#break-c-11-section8");

const c01Section1 = document.querySelector("#c-01-section1");
const c02Section2 = document.querySelector("#c-02-section2");
const c03Section3 = document.querySelector("#c-03-section3");
const c04Section3 = document.querySelector("#c-04-section3");
const c05Section3 = document.querySelector("#c-05-section3");
const c06Section4 = document.querySelector("#c-06-section4");
const c07Section5 = document.querySelector("#c-07-section5");
const c08Section6 = document.querySelector("#c-08-section6");
const c10Section7 = document.querySelector("#c-10-section7");
const c11Section8 = document.querySelector("#c-11-section8");

const scrollGraphic1 = document.querySelector("#scroll-graphic1");
const scrollGraphic2 = document.querySelector("#scroll-graphic2");
const scrollGraphic3 = document.querySelector("#scroll-graphic3");
const scrollGraphic4 = document.querySelector("#scroll-graphic4");
const scrollGraphic5 = document.querySelector("#scroll-graphic5");
const scrollGraphic6 = document.querySelector("#scroll-graphic6");
const scrollGraphic7 = document.querySelector("#scroll-graphic7");
const scrollGraphic8 = document.querySelector("#scroll-graphic8");
*/

const cGraphic = document.querySelectorAll(".c-graphic");
const cGraphicMin = document.querySelectorAll(".c-graphic-min");


//FOOTER NOTE

//Display div when note apparead in viewport

let notesStep = document.querySelectorAll(".notes-step");
let notesBoxRef = document.querySelectorAll(".notes-box-ref");

//already declared in nav.js
let noteIsInViewport = function(elem){
	let bounding = elem.getBoundingClientRect();
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
		bounding.bottom <= (window.innerHeight  || document.documentElement.clientHeight)
	);
};



//->Here the event--------------
//------------------------------


document.addEventListener("scroll",function(){
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


//BUTTTON HELP
const cHelpButton = document.querySelectorAll(".c-help-button");
const helpButton = document.querySelectorAll(".help-button");
const helpBody = document.querySelectorAll(".help-body");

let displayToggle = 1;


function showHelpButton(i){
	helpBody[i].style.display = "block";
	cHelpButton[i].style.borderWidth = "1px";
	cHelpButton[i].style.background = " #282828";
}

function hideHelpButton(i){
	helpBody[i].style.display = "none";
	cHelpButton[i].style.borderWidth = "0px";
	cHelpButton[i].style.background = "none";
}

Array.from(helpButton).forEach((el,i)=>{
	el.addEventListener("click",function(){
		displayToggle++;

		if (displayToggle % 2 ==0){
			showHelpButton(i);
		} else {
			hideHelpButton(i);
		}

	});

});



//SECTION 3 BREAK SCROLLING
//-----------------------------------------------------
//-----------------------------------------------------





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

		/*
		breakC01Section1.parentNode.insertBefore(c01Section1,breakC01Section1.nextSibling);			
		breakC02Section2.parentNode.insertBefore(c02Section2,breakC02Section2.nextSibling);
		breakC03Section3.parentNode.insertBefore(c03Section3,breakC03Section3.nextSibling);
		breakC04Section3.parentNode.insertBefore(c04Section3,breakC04Section3.nextSibling);
		breakC05Section3.parentNode.insertBefore(c05Section3,breakC05Section3.nextSibling);
		breakC06Section4.parentNode.insertBefore(c06Section4,breakC06Section4.nextSibling);
		breakC07Section5.parentNode.insertBefore(c07Section5,breakC07Section5.nextSibling);
		breakC08Section6.parentNode.insertBefore(c08Section6,breakC08Section6.nextSibling);
		breakC10Section7.parentNode.insertBefore(c10Section7,breakC10Section7.nextSibling);
		breakC11Section8.parentNode.insertBefore(c11Section8,breakC11Section8.nextSibling);
		*/

		Array.from(cGraphic).forEach((el)=>{
			el.style.display = "none";
		});

		Array.from(cGraphicMin).forEach((el)=>{
			el.style.display = "block";
		});
		console.log(cGraphicMin)

		firstVisit(largeMedia);
		
	}

	if (largeMedia==true){
		
		/*
		scrollGraphic1.appendChild(c01Section1);
		scrollGraphic2.appendChild(c02Section2);
		scrollGraphic3.appendChild(c03Section3);
		scrollGraphic3.appendChild(c04Section3);
		scrollGraphic3.appendChild(c05Section3);
		scrollGraphic4.appendChild(c06Section4);
		scrollGraphic5.appendChild(c07Section5);
		scrollGraphic6.appendChild(c08Section6);
		scrollGraphic7.appendChild(c10Section7);
		scrollGraphic8.appendChild(c11Section8);
		*/

		Array.from(cGraphic).forEach((el)=>{
			el.style.display = "block";
		});
		console.log(cGraphicMin)
		Array.from(cGraphicMin).forEach((el)=>{
			el.style.display = "none";
		});
		

		//POP-UP ALERT------------------------
		//------------------------------------
		
		firstVisit(largeMedia);

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





//ALERT FIRST VISIT--------------------
//-------------------------------------


const alertLargeDevice = document.querySelector("#alert-large-device");
const alertSmallDevice = document.querySelector("#alert-small-device");
const body = document.querySelector("body");
const selectionGlobal = document.querySelector(".global");
const selectionHtml = document.querySelector("html");



function firstVisit(match){



	Array.from(document.querySelectorAll(".button-alert")).forEach((el,i)=>{
		el.addEventListener("click",function(){
			i == 0 ? hideAlertLargeDevice() : hideAlertSmallDevice();
		});

	});

	document.onkeydown = function (e) {
		e = e || window.event;
		if (e.keyCode == 27 || e.keyCode == 13 || e.keyCode == 8) {
			match ? hideAlertLargeDevice(): hideAlertSmallDevice();


			Array.from(helpButton).forEach((d,i)=>{
				hideHelpButton(i);
			});
		}
	};

	if (window.sessionStorage.getItem("nouvelleSession")){

		console.log("ce n'est pas la première visite");
		match ? hideAlertLargeDevice(): hideAlertSmallDevice();

		
	} else {

		window.sessionStorage.setItem("nouvelleSession","true");
		console.log("c'est la première visite");
		match ? showAlertLargeDevice() : showAlertSmallDevice();
	}
}


function showAlertLargeDevice(){
	alertLargeDevice.style.display = "flex";
	body.style.overflow = "hidden";
	selectionHtml.style.overflow = "hidden";
	selectionGlobal.style.opacity = 0.2;
	selectionGlobal.style.pointerEvents = "none";
	selectionGlobal.style.userSelect = "none";
}

function hideAlertLargeDevice(){
	alertLargeDevice.style.display = "none";
	body.style.overflow = "initial";
	selectionHtml.style.overflow = "initial";
	selectionGlobal.style.opacity = 1;
	selectionGlobal.style.pointerEvents = "initial";
	selectionGlobal.style.userSelect = "initial";
}

function showAlertSmallDevice(){
	alertSmallDevice.style.display = "flex";
	body.style.overflow = "hidden";
	selectionHtml.style.overflow = "hidden";
	selectionGlobal.style.opacity = 0.2;
	selectionGlobal.style.pointerEvents = "none";
	selectionGlobal.style.userSelect = "none";
}

function hideAlertSmallDevice(){
	alertSmallDevice.style.display = "none";
	body.style.overflow = "initial";
	selectionHtml.style.overflow = "initial";
	selectionGlobal.style.opacity = 1;
	selectionGlobal.style.pointerEvents = "initial";
	selectionGlobal.style.userSelect = "initial";
}