import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";

import box from "/component/box.js";
import { col } from "/core/utils.js";

const limit = 5000;

b.css(".element", `
background-color: white;
border-color: lightgrey;
border-style:solid;
padding: 20px;
width: 100%;
position: absolute;
height: 100%;
box-shadow: 5px 8px 5px #888888;
`)
b.css(".skip", `
height: 20px; 
width:50px;
position:absolute;
top:2%;
left: 2%
`)
b.css(".solve", `
height: 20px; 
width:50px;
position:absolute;
top:2%;
right: 2%
`)
b.css(".frameTop", `
height: 50%; 
width:50%;
position:absolute;
left: 25%
top: 5%;
z-index: 10;
`)
b.css(".frameBottom", `
height: 40%; 
width:40%;
position:absolute;
left: 30%
bottom: 10%;
z-index: 5;
`)
b.css(".frameHidden", `
height: 40%; 
width:40%;
opacity: 0;
position:absolute;
left: 30%
bottom: 5%;
z-index: 2;
`)
b.css(".myCanvas", `
position: absolute;
right: 2%;
top: 2%;
`)
const tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
function onclickSolve() {
	tl.to(".frameTop", {
		x: 200,
		opacity: 0,
		duration: 1
	});
	tl.to(".frameBottom", {
		top: "5%",
		width: "50%",
		height: "50%",
		left: "25%",
		duration: 1,
	});
	tl.to(".frameHidden", {
		bottom: "10%",
		opacity: 1,
		duration: 1,
	}, "-=1");
	problems[problemIdx] = true;
	problemIdx++;
	if (problemIdx >= problems.length) {
		problemIdx = 0;
	}
	updateProgressBar();


	setTimeout(updating, 2100);
}

let wasClicked = true;
function updating() {
	start += 1;
	if(start < gems.length){
		top = element(gems[start], text[start]);
	}else top = null;
	if(start < gems.length-1){
		bottom = element(gems[start+1], text[start+1]);
	} else bottom = null;
	if(start < gems.length -2){
		hidden = element(gems[start+2], text[start+2])
	} else hidden = null

	tl.to(".frameTop", {
		x: 0,
		opacity: 1,
		duration: 0,
	});
	tl.to(".frameBottom", {
		height: "40%",
		width: "40%",
		left: "30%",
		top: null,
		bottom: "10%",
		opacity: 1,
		duration: 0,
	});
	tl.to(".frameHidden", {
		bottom: "5%",
		opacity: 0,
		duration: 0,
	});
	m.redraw();
}

function onclickSkip() {
	tl.to(".frameTop", {
		x: -200,
		opacity: 0,
		duration: 1
	})
	tl.to(".frameBottom", {
		top: "5%",
		width: "50%",
		height: "50%",
		left: "25%",
		duration: 1,
	});
	tl.to(".frameHidden", {
		bottom: "10%",
		opacity: 1,
		duration: 1,
	}, "-=1");
	problems[problemIdx] = false;
	unsolved.push(problemIdx);
	problemIdx++;
	if (problemIdx >= problems.length) {
		//problemIdx = 0;
	}
	updateProgressBar();



	setTimeout(() => {
		let skippedText = text[start];
		let skippedGem = gems[start];
		text.push(skippedText);
		gems.push(skippedGem)

	}, 500);

	setTimeout(updating, 2000);

}

function updateProgressBar() {
	var progressBarXPos = 50;
	var progressBarYPos = 20;
	var progressBarWidth = 10;
	var progressBarHeight = 300;
	var highlightedChunkAdditionalSize = 10;

	var c = document.querySelector('.myCanvas');
	c.width = 100
	c.height = 500
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);

	ctx.beginPath();
	ctx.beginPath();
	ctx.fillStyle = "#EEEEEE";
	ctx.fillRect(progressBarXPos, progressBarYPos, progressBarWidth, progressBarHeight);
	ctx.stroke();

	for (var i = 0; i < problems.length; i++) {
		var chunkHeight = (progressBarHeight / problems.length);
		var yPos = progressBarYPos + i * chunkHeight;

		var color;
		if (problems[i] == true) {
			color = "#00FF00";
		} else {
			color = "#EEEEEE";
		}

		var realWidth = progressBarWidth;
		var realHeight = chunkHeight;
		var realXPos = progressBarXPos;
		var realYPos = yPos;

		if (i == problemIdx) {
			realWidth += highlightedChunkAdditionalSize;
			realHeight += highlightedChunkAdditionalSize;
			realXPos -= highlightedChunkAdditionalSize / 2;
			realYPos -= highlightedChunkAdditionalSize / 2;
		}

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(realXPos, realYPos, realWidth, realHeight);
		ctx.stroke();
	}
}

const element = (exercise, text) => m("div", { class: "element", id: "frame" }, [
	m("button", {
		onclick: onclickSkip.bind(),
		class: "skip"
	}, "skip"),
	m("button", {
		onclick: onclickSolve.bind(),
		class: "solve"
	}, "solve"),
	m("gem-wrapper" + b`position:absolute; bottom: 2%; left: 2%; width:95%`, { app: exercise }, text)]
);
const exercises = [element('diplain', m('h1', "First Question?")), element('diflashcard', "second element"), element('diplain', "yes this is the third"), element('diplain', "last element")];
const bottomExercise = [element('diflashcard', "second element"), element('diplain', "yes this is the third"), element('diplain', "last element")];
const gems = ["diplain", "diflashcard", "diplain", "diplain"];
const text = ["first damn question", "second shit", "third thingy", "last part"];
const unsolved = [];
let problems
let problemIdx
let start = 0;
let skipped;
let top;
let bottom;
let hidden;







export const plain = ({ query, store, info }) => {
	function App(vnode) {
		//exercises = [element('diplain', m('h1', "First Question?")), element('diflashcard', "second element"), element('diplain', "yes this is the third"), element('diplain', "last element")];
		//bottomExercise = [element('diflashcard', "second element"), element('diplain', "yes this is the third"), element('diplain', "last element")]

		problems = new Array(exercises.length);
		problemIdx = 0;
		//start = 0;
		//top = exercises[start];
		top = element(gems[start], text[start]);
		//bottom = bottomExercise[start];
		//bottom = exercises[start + 1];
		bottom = element(gems[start+1], text[start+1]);
		hidden = element(gems[start+2], text[start+2]);

		const view = _ => [m('div', { class: "frameTop" }, top),
		m('div', { class: "frameBottom" }, bottom),
		m('h1' + b`position:absolute; top:2%; left:2%; z-index:20;`, start),
		m(`canvas`, { class: 'myCanvas', width:100, height:500 }),
		m('div', { class: "frameHidden" }, hidden) //works
		]
		setTimeout(updateProgressBar,100);

		return { view, onclickSolve, onclickSkip, updating, updateProgressBar }
		
	}

	return {
		view: () => [
			m(App)
		]
	}
}
plain.meta = {
	share: true,
	adjust: true,
}
plain.icon = "📄";
plain.presets = true;
plain.persistent = true;
plain.options = [
	{ a: 'text', t: 'string', r: false, d: "", c: 'Text Preset' },
	{ a: 'limit', t: 'number', r: false, d: limit, c: 'Number of chars allowed' },
]

export default plain;
