function giveLogicToBttn(n) {
	document.querySelector(`#bttn-0${n}-00`).onclick = function () {
		const toolbar = document.querySelector(`#toolbar-0${n}`);
		initialDisplayValue = toolbar.style.display;

		[...document.querySelectorAll(".secondary-toolbar")].map(toolbar => {
			console.log(toolbar);
			toolbar.style.display = "none";
		});
		[...document.querySelector("#main-toolbar").children].map(toolbar => {
			toolbar.style.borderBottom = "0px solid black";
			toolbar.style.opacity = 0.7;
		});

		if (initialDisplayValue === "none" || initialDisplayValue === "") {
			toolbar.style.display = "flex";
			this.style.borderBottom = "3px solid black";
			this.style.opacity = 1.0;
		}
	};
}

giveLogicToBttn(1);
giveLogicToBttn(2);
giveLogicToBttn(3);



















/*
function svgCircleBuilder(number) {
    return `<svg xmlns = "http://www.w3.org/2000/svg" >
				<ellipse 
					stroke-width = "3"
					ry = "28"
					rx = "28"
					cy = "30"
					cx = "30"
					fill-opacity = "0" 
					stroke-opacity = "0.7" 
					stroke = "#000" 
					fill = "#fff"
				></ellipse>
				<text 
					text-anchor = "start"
					font-family = "Helvetica, Arial, sans-serif"
					font-size = "40"
					y = "45"
					x = "19"
					fill-opacity = "null"
					stroke-opacity = "null"
					stroke-width = "0"
					stroke = "#000"
					fill = "#000000"
				>${number}</text>
			</svg>`;
}

document.querySelector("#circle-01").insertAdjacentHTML("afterbegin", svgCircleBuilder(1));
document.querySelector("#circle-02").insertAdjacentHTML("afterbegin", svgCircleBuilder(2));
document.querySelector("#circle-03").insertAdjacentHTML("afterbegin", svgCircleBuilder(3));
document.querySelector("#circle-04").insertAdjacentHTML("afterbegin", svgCircleBuilder(4));
document.querySelector("#circle-05").insertAdjacentHTML("afterbegin", svgCircleBuilder(5));
document.querySelector("#circle-06").insertAdjacentHTML("afterbegin", svgCircleBuilder(6));
document.querySelector("#circle-07").insertAdjacentHTML("afterbegin", svgCircleBuilder(7));
document.querySelector("#circle-08").insertAdjacentHTML("afterbegin", svgCircleBuilder(8));
document.querySelector("#circle-09").insertAdjacentHTML("afterbegin", svgCircleBuilder(9));

*/