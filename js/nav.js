console.log("Etat du document : " + document.readyState);
	
let navBulletMenu = document.querySelectorAll(".nav-bullet-menu");
let niv1HIntro2Button = document.querySelector(".niv1-h-intro-2-button");
let sectionNavBullet = document.querySelectorAll(".section-nav-bullet");



//ALTERNATIVE 1 & ALTERNATIVE 2 could enter in competition :)

/*
		//ALTERNATIVE 1 : COLOR BULLET CLICK EVENT


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
		*/


//CLICK BUTTON INTRO

niv1HIntro2Button.addEventListener("click",function(){
	window.location = "#niv2-c-section1";
});



//ALTERNATIVE 2 : COLOR BULLET SCROLL EVENT

//Color on scroll
Array.from(sectionNavBullet).forEach((el,i)=>{
	console.log(el);
})


let intersectionCallback = function(entries){

	entries.forEach((entry) =>{

		function navScrollColor(i){
			if (entry.boundingClientRect.top<=1 && entry.boundingClientRect.bottom>=0){
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
	const numSteps = 2500;

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

let io_nav = new IntersectionObserver(intersectionCallback, observerOptions);

//->Here the event--------------
//------------------------------
Array.from(sectionNavBullet).forEach((el)=>{
	io_nav.observe(el);
})

	


