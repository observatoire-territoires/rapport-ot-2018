console.log("Etat du document : " + document.readyState);
	

		let navLinkMenu = document.querySelectorAll(".nav-link-menu");
		let navBulletMenu = document.querySelectorAll(".nav-bullet-menu");
		let niv1HIntro2Button = document.querySelector(".niv1-h-intro-2-button");
		let niv1CHeader = document.querySelector("#niv1-c-header");
		let niv2CSection1 = document.querySelector("#niv2-c-section1");
		let niv2CSection2 = document.querySelector("#niv2-c-section2");
		let niv2CSection3 = document.querySelector("#niv2-c-section3");
		let niv2CSection4 = document.querySelector("#niv2-c-section4");
		let niv2CSection5 = document.querySelector("#niv2-c-section5");
		let niv2CSection6 = document.querySelector("#niv2-c-section6");
		let niv2CSection7 = document.querySelector("#niv2-c-section7");


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




		//ALTERNATIVE 2 : COLOR BULLET SCROLL EVENT

		//Color on scroll

		let intersectionCallback = function(entries){

			entries.forEach(entry =>{

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

				switch(entry.target){
				case niv1CHeader:
					navScrollColor(0);
					break;
				case niv2CSection1:
					navScrollColor(1);
					break;
				case niv2CSection2:
					navScrollColor(2);
					break;
				case niv2CSection3:
					navScrollColor(3);
					break;
				case niv2CSection4:
					navScrollColor(4);
					break;
				case niv2CSection5:
					navScrollColor(5);
					break;
				case niv2CSection6:
					navScrollColor(6);
					break;
				case niv2CSection7:
					navScrollColor(7);
					break;
				} 
			});

		};

		function thresholdList(){
			let thresholds = [];
			const numSteps = 500;

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
		io_nav.observe(niv1CHeader);
		io_nav.observe(niv2CSection1);
		io_nav.observe(niv2CSection2);
		io_nav.observe(niv2CSection3);
		io_nav.observe(niv2CSection4);
		io_nav.observe(niv2CSection5);
		io_nav.observe(niv2CSection6);
		io_nav.observe(niv2CSection7);
	


