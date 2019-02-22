console.log("Etat du document : " + document.readyState);
	
let navBulletMenu = document.querySelectorAll(".nav-bullet-menu");
let niv1HIntro2Button = document.querySelector(".niv1-h-intro-2-button");
let sectionNavBullet = document.querySelectorAll(".section-nav-bullet");




//ALTERNATIVE 1 & ALTERNATIVE 2 could enter in competition :)

/*
//ALTERNATIVE 1 : COLOR BULLET CLICK EVENT

let navLinkMenu = document.querySelectorAll(".nav-link-menu");

//Color on click nav link
function navColor() {
	for(let i = 0; i < navLinkMenu.length; i++){
		if(this != navLinkMenu[i]){
			navBulletMenu[i].style.backgroundColor = "#fff";
		} else {
			navBulletMenu[i].style.backgroundColor = "#779933";
		}
	}
}

//->Here the event--------------
//------------------------------
Array.from(navLinkMenu).forEach((el)=>{
	el.addEventListener("click",navColor);
});


//Color on click header button
function navButtonColor() {
	navBulletMenu[1].style.backgroundColor = "#779933";
	let navBulletMenuCopy = Array.from(navBulletMenu);
	navBulletMenuCopy.splice(1,1);

	navBulletMenuCopy.forEach((el)=>{
		el.style.backgroundColor = "#fff";
	});
}


//->Here the event--------------
//------------------------------
niv1HIntro2Button.addEventListener("click",navButtonColor);
	
}

*/

//CLICK BUTTON INTRO

niv1HIntro2Button.addEventListener("click",function(){
	window.location = "#onze_pour_cent_des_francais_ont_demenage_en_2014";
});



//ALTERNATIVE 2 : COLOR BULLET SCROLL EVENT

//with boundingrect
function alternativeColorBullet(){
	
	let navBulletMenu = document.querySelectorAll(".nav-bullet-menu");

	let sectionIsInViewport = function(elem){
		let bounding = elem.getBoundingClientRect();
		return (
			bounding.top <= 10 &&
			bounding.bottom >= 10
		);		

	};

	for (let i=0;i<sectionNavBullet.length;i++){
		if (sectionIsInViewport(sectionNavBullet[i])){
			//is in viewport
			navBulletMenu[i].classList.add("nav-bullet-menu-visible");
		} else {
			//is not in viewport
			navBulletMenu[i].classList.remove("nav-bullet-menu-visible");
		}
	}

	document.addEventListener("scroll",function(){
		for (let i=0;i<sectionNavBullet.length;i++){
			if (sectionIsInViewport(sectionNavBullet[i])){
				//is in viewport
				navBulletMenu[i].classList.add("nav-bullet-menu-visible");
			} else {
				//is not in viewport
				navBulletMenu[i].classList.remove("nav-bullet-menu-visible");
			}
		}
	});
}

//with interaction observer

//Color on scroll

let intersectionCallback = function(entries){

	entries.forEach((entry) =>{
		function navScrollColor(i){
			if (entry.boundingClientRect.top<=10 && entry.boundingClientRect.bottom>=-10){
				navBulletMenu[i].style.backgroundColor = "#779933";
				let navBulletMenuCopy = Array.from(navBulletMenu);
				navBulletMenuCopy.splice(i,1);

				navBulletMenuCopy.forEach((el)=>{
					el.style.backgroundColor = "#fff";
				});
			}
		}

		Array.from(sectionNavBullet).forEach((el,i)=>{
			if (el==entry.target){
				navScrollColor(i);
			}
		});	
	});
};

function thresholdList(){
	let thresholds = [];
	const numSteps = 3500;

	for (let i=1;i<=numSteps;i++){
		let ratio = i/numSteps;
		thresholds.push(ratio);
	}

	thresholds.push(0);
	return thresholds;
}


let observerOptions = {
	root: null,
	rootMargin: "0px",
	threshold: thresholdList()
};



//->Here the event--------------
//------------------------------


if("IntersectionObserver" in window) {
	//it is ok, client web can observe
	let io_nav = new IntersectionObserver(intersectionCallback, observerOptions);

	Array.from(sectionNavBullet).forEach((el)=>{
		io_nav.observe(el);
	});
} else{
	//client web not implement intersetion observer
	alternativeColorBullet();
}

	
