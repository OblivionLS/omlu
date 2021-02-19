﻿import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";
import {col} from "/core/utils.js";
import box from "/component/box.js";

const app = ({query, store, info, target, context}) => {

  // default values
  query = query.map(q => ({
	  mode: q.mode || 'editor',
	  id: query().id,
  }));
  
  // input 
  console.log('query.id', query().id);
  const input = m.stream( (store() && store().id) || query().id || '' );
  store.map(v => {
	let _ = {
		icn: '📟',
		sub: v ? (v.id!=''?'✅':'❌') : '🚫',
		col: v ? (v.id!='' ? col.green : col.red ) : col.unset,
	}; info && info(_);
	return v ? input(v.id) : input( query().id || '')
  });
  
  const src = input.map(v => {
	v = v.replace(/^.*\//,'');
	if (v=='') return undefined;
	//if (query().mode == 'code') return "https://makecode.microbit.org/---codeembed#pub:"+v;
	if (query().mode == 'run') return "https://makecode.microbit.org/---run?id="+v;
	if (query().mode == 'editor') return "https://makecode.microbit.org/#pub:"+v;
  });
  
  // 		col: q.col || [col.red, col.green, col.unset]

  return { view: () => m(box, {
	  icon: `📟 microbit (${query().mode})`,
	  sub: store() ? (store().id!=''?'✅':'❌') : '🚫',
	  tools:[
		 m('input'+b`margin-left: 1em`, {
			print: console.log(input()),
			value: input(),
			oninput: ({target}) => store({id: target.value}),
		}),
		m('button', { onclick: () => store(undefined)},'reset')
	  ]
	}, m('div'+b`
		text-align: center;
		height:${query().mode=='run' ? '170px': '350px'};
		width: 100%;
		overflow: hidden`,
	[
		src() ? m('iframe'+b`width: ${query().mode=='run'?'200px':'100%'}; height:100%;	`, {
			src: src(),
			allowfullscreen: "allowfullscreen",
			frameborder:"0",
			sandbox: "allow-popups allow-scripts allow-same-origin",
			
		}) : m('div', m('br'),  m.trust('<br>add your id from <a target="microbit" href="https://makecode.microbit.org/">microbit.org</a><br><br>'), m('img', {
			src: img
		}))
	]) )}
}
app.meta = {
	share: true,
	adjust: true,
}
app.persistent = true;
app.options = [
	{a: 'id', t: 'text', r: true, d: '', c: 'Project id to show' },
];
	
export default app;

const img = "data:image/png;base64,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";