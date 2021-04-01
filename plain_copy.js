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
	const INTERVAL = 1000
	function App(vnode) {
		const oncreate = () => anime({
		  targets: vnode.dom.querySelectorAll('.box'),
		  translateY: 200,
		  opacity: 1,
		  loop: true,
		  easing: 'easeInQuad',
		  duration: (el, i) => i * INTERVAL + INTERVAL
		})
		
		const view = _ => m('div.frame' + b`background-color: blue`, m('.box',
		m("div" + b`
			background-color: red;
			padding: 20px;
			width: 50%;
			position: absolute;
		`, { class: "element", id: "element" }, m("gem-wrapper", { app: 'diplain' }, null)),
	))
	  
		return { view, oncreate }
	  }

	return {
		view: () => [ m(App)
			// 		m("div" + b`
			// background-color: red;
			// padding: 20px;
			// width: 50%;
			// position: absolute;
			// `, { class: "element", id: "element" }, m("gem-wrapper", { app: 'diplain' }, null)),

			// m("script", anime({
			// 	targets: element,
			// 	translateX: 250
			// }))
			
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
