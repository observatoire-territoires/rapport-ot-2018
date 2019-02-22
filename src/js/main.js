console.log("Etat du document : " + document.readyState);


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


		firstVisit(largeMedia);
		
	}

	if (largeMedia==true){
		
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