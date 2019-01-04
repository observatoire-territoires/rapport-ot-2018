console.log("Etat du document : " + document.readyState);



function deplaceElementSmallDevice() {

	//Detect large or small viewport
	const breakpoint = "(min-width: 1024px)";
	const largeMedia = window.matchMedia(breakpoint).matches;

	//if largeMedia=true : large device
	//if largeMedia=false: small device
	

	/*If small device, deplace svg after text, if large device replace svg at the end */
	let aside = document.querySelector("aside");
	let breakC01Section1 = document.querySelector("#break-c-01-section1");
	let c01Section1 = document.querySelector("#c-01-section1");
	let breakC02Section2 = document.querySelector("#break-c-02-section2");
	let c02Section2 = document.querySelector("#c-02-section2");


	if (largeMedia==false){

		breakC01Section1.parentNode.insertBefore(c01Section1,breakC01Section1.nextSibling);
		breakC02Section2.parentNode.insertBefore(c02Section2,breakC02Section2.nextSibling);
		console.log("petit écran");
	}

	if (largeMedia==true){

		aside.append(c01Section1);
		aside.append(c02Section2);
		
		console.log("grand écran");
	}

}

//If windows is resized
window.addEventListener("resize",()=>{
	deplaceElementSmallDevice();
});

//If document is complete
document.onreadystatechange = function(){
	if (document.readyState == "complete"){
		deplaceElementSmallDevice();
	}
};