import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";

import box from "/component/box.js";
import { col } from "/core/utils.js";

const limit = 5000;


export const plain = ({ query, store, info }) => {

	const enabled = () => store()?.text != query()?.text;

	const tools = () => [
		m(`button`, {//+b`p 0 0.5ex; m 0.2ex; bc goldenrod; c white; br 0.5ex; cursor: pointer`, {
			disabled: !enabled(),
			onclick: () => { store(undefined); info(undefined) }
		}, 'reset')
	]

	const value = m.stream.merge([store, query]).map(([s, q]) => {
		let text = s?.text ?? q?.text ?? ''
		return text.substr(0, q?.limit ?? limit)
	})

	const i = store.map(v => {
		let _
		if (!v)
			_ = { icn: plain.icon, col: col.unset };
		else if (v.text && v.text.length > 0)
			_ = { icn: '📝', sub: v.text.length, col: col.green };
		else
			v = { icn: plain.icon, sub: 'ε', col: col.red };
		v && info(_);
		return _;
	});

	const element = () => {
		m("div" + b`
	background-color: red;
	padding: 20px;
	width: 50%;
	position: absolute;
	`, { class: "element", id: "element" }, m("gem-wrapper", { app: 'diplain' }, null))
	};
	const INTERVAL = 1000;

	function App(vnode) {
		let wasClicked = true;

		var problems = new Array(7);
		var problemIdx = 0;

		function onclickFunction() {
		 if(wasClicked){
			anime({
				targets: vnode.dom.querySelectorAll('.element'),
				translateY: 200,
				easing: 'easeInQuad',
				duration: (el, i) => i * INTERVAL + INTERVAL
			  })
			  wasClicked = false;
		 }else{
			anime({
				targets: vnode.dom.querySelectorAll('.element'),
				translateY: 0,
				easing: 'easeInQuad',
				duration: (el, i) => i * INTERVAL + INTERVAL
			  })
			  wasClicked = true;
		 }
		 updateProgressBar();
		}

		function skip() {
			problems[problemIdx] = false;
			problemIdx++;
			if (problemIdx >= problems.length)
			{
				problemIdx = 0;
			}
			updateProgressBar();
		}

		function solve() {
			problems[problemIdx] = true;
			problemIdx++;
			if (problemIdx >= problems.length)
			{
				problemIdx = 0;
			}
			updateProgressBar();
		}

		function updateProgressBar() {
			var progressBarXPos = 700;
			var progressBarYPos = 20;
			var progressBarWidth = 50;
			var progressBarHeight = 300;

			var c = document.querySelector('.myCanvas');
			c.width = 1000
			c.height = 500
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);

			ctx.beginPath();
			ctx.beginPath();
			ctx.fillStyle = "#EEEEEE";
			ctx.fillRect(progressBarXPos, progressBarYPos, progressBarWidth, progressBarHeight);  
			ctx.stroke();

			for (var i = 0; i < problems.length; i++)
			{
				var chunkHeight = (progressBarHeight / problems.length);
				var yPos = progressBarYPos + i * chunkHeight;

				var color;
				if (problems[i] == true) {
					color = "#00FF00";
				} else {
					color = "#EEEEEE";
				}

				ctx.beginPath();
				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.fillRect(progressBarXPos, yPos, progressBarWidth, chunkHeight);  
				ctx.stroke();
			}
		}
		
		const view = _ => [m('div.frame' + b`background-color: blue`, 
		
			m("div" + b`
			background-color: red;
			padding: 20px;
			width: 50%;
			position: absolute;
			`,  {class: "element"},
				m("gem-wrapper" + b`position:relative`, { app: 'diplain' }, 
					m("button" + b`
						height: 20px; 
						width:50px`, {
							onclick: onclickFunction.bind()
						}, null),
					m("button" + b`
					height: 20px; 
					width:50px`, {
						onclick: skip.bind()
					}, null),
					m("button" + b`
					height: 20px; 
					width:50px`, {
						onclick: solve.bind()
					}, null),
			)),
		), m(`canvas`,{class:'myCanvas'})]
	  
		return { view, onclickFunction, }
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
