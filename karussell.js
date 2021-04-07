import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";

import box from "/component/box.js";
import { col } from "/core/utils.js";

const limit = 5000;

b.css(".element", `
background-color: white;
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
left: 2%
`)
b.css(".solve", `
height: 20px; 
width:50px;
position:absolute;
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
bottom: 5%;
z-index: 5;
`)
b.css(".frameHidden", `
height: 30%; 
width:30%;
position:absolute;
left: 35%
bottom: -20%;
z-index: 2;
`)

let exercises;
let bottomExercise
let top;
let bottom;
let start; 



let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
function onclickSolve() {
	tl.to(".frameTop", {
		x: 200,
		opacity: 0,
		duration: 1
	});
	tl.to(".frameBottom", {
		y: '-100%',
		scale: 1.3,
		duration: 1,
	});

	setTimeout(() => {
		start += 1;
		console.log("start was updated to: " + start
	);}, 1000);

	setTimeout(updating, 2100);

}

let wasClicked = true;
function updating() {
	console.log(start);

	tl.to(".frameTop", {
		x: 0,
		opacity: 1,
		duration: 0
	});
	tl.to(".frameBottom", {
		y: '0%',
		scale: 1,
		duration: 0,
	});
	m.redraw();
}

function onclickSkip() {
	if (wasClicked) {
		gsap.to(".frameTop", {
			x: -200,
			opacity: 0,
			duration: 1
		})
		wasClicked = false;
	} else {
		gsap.to(".frameTop", {
			y: 0,
			duration: 1
		})

		wasClicked = true
	}

}

export const plain = ({ query, store, info }) => {
	function App(vnode) {
		let element = (exercise, text) => m("div", { class: "element", id: "frame" }, [
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
		
		exercises = [element('diplain', "first element"), element('diflashcard', "second element"), element('diplain', "yes this is the third"), element('diplain', "last element")];
		bottomExercise = [element('diflashcard', "second element"), element('diplain', "yes this is the third"), element('diplain', "last element")]
		// top = exercises[0];
		// bottom = m("div", { class: "element", id: "frame" }, "default element");
		// bottom = exercises.slice(1, 2);
		start = 0;

		const view = _ => [m('div', { class: "frameTop" }, exercises[start]),
		m('div', { class: "frameBottom" }, bottomExercise[start]),
		m('h1' + b`position:absolute; top:2%; left:2%; z-index:20;`, start)
			// m('div', {class:"frameHidden"}, exercises[2])
		]


		return { view, onclickSolve, onclickSkip, updating }
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
