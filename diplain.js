import m from "/vendor/mithril.js";
import b from "/vendor/bss.js"
import {compress} from "/core/utils.js";

const limit = 5000;

// 
const color = {
	gray100 : '#FBFBFB',
	gray200 : '#F8F8F8',
	gray300 : '#D9D9D9',
	gray400 : '#B6B6B6',
	gray800 : '#333333',
	gray900 : '#111111',
	pink 	: '#D742FB',
	rosa 	: '#FF87FF',
	lavendel: '#B196FF',
	violett : '#7C4DFF',
	blue 	: '#84CEFF',
	lightBlue:'#B2FFFF',
	green 	: '#00FF93',
	neoGreen: '#94FF57',
}

const icon = {
	reset:  		m('svg[id="reset"][fill="black"][width="24"][height="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
					m('path[d="M8,4 L21,4 C22.1045695,4 23,4.8954305 23,6 L23,18 C23,19.1045695 22.1045695,20 21,20 L8,20 C7.49479181,20 7.26688156,19.8135296 6.80345396,19.3176949 C6.75712534,19.2681266 6.7099247,19.2160219 6.66192355,19.1616204 C6.47807387,18.9532567 6.31421472,18.7494307 6.23177872,18.6401844 L0.698291721,12 L1.23177872,11.3598156 L6.18176877,5.42511074 C6.28584987,5.27697368 6.44363308,5.06720208 6.62702438,4.85177708 C6.70024349,4.7657685 6.77251996,4.68522946 6.84400957,4.61079521 C7.22963038,4.20929073 7.51572647,4 8,4 Z M8.14992562,6.14822292 C8.01407942,6.30779792 7.88980013,6.47302632 7.76822128,6.6401844 L3.30164767,12.0000727 L7.79436009,17.3925528 C7.87696028,17.5005693 8.01456988,17.6717433 8.16160145,17.8383796 C8.1974634,17.8790233 8.23193807,17.9170798 8.2646108,17.9520373 C8.28044249,17.9689761 8.29568185,17.9849966 8.31020844,18 L21,18 L21,5.99999999 L8.28281512,6 C8.24198403,6.04270247 8.19723122,6.09265426 8.14992562,6.14822292 Z M14,10.5857864 L16.2928932,8.29289322 L17.7071068,9.70710678 L15.4142136,12 L17.7071068,14.2928932 L16.2928932,15.7071068 L14,13.4142136 L11.7071068,15.7071068 L10.2928932,14.2928932 L12.5857864,12 L10.2928932,9.70710678 L11.7071068,8.29289322 L14,10.5857864 Z"]')
	),
	standalone: 	m('svg[id="standalon"][fill="black"][width="24"][height="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]', 
	  				m('path[fill-rule="evenodd"][d="M19,14 L19,19 C19,20.1045695 18.1045695,21 17,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L10,5 L10,7 L5,7 L5,19 L17,19 L17,14 L19,14 Z M18.9971001,6.41421356 L11.7042068,13.7071068 L10.2899933,12.2928932 L17.5828865,5 L12.9971001,5 L12.9971001,3 L20.9971001,3 L20.9971001,11 L18.9971001,11 L18.9971001,6.41421356 Z"]')
	),
	fullscreen: 	m('svg[id="fullscreen"][fill="black"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]', 
	  				m('polygon[fill-rule="evenodd"][points="13.414 12 19 17.586 19 14 21 14 21 21 14 21 14 19 17.586 19 12 13.414 6.414 19 10 19 10 21 3 21 3 14 5 14 5 17.586 10.586 12 5 6.414 5 10 3 10 3 3 10 3 10 5 6.414 5 12 10.586 17.586 5 14 5 14 3 21 3 21 10 19 10 19 6.414"]')
	),
}


b.css('.box',`
	border-left: 7px solid ${color.green};
	padding: 0;
	margin: 0;
	width: 100%;
	background-color: ${color.gray200};
`)

b.css('.button',` 
	height: 2rem;
	padding: 0;
	margin: 0;
	display: flex;
	border: ${color.green};
	background-color: white;
	border-radius: .25rem;
	transition: all .25s ease-in-out;
`)
b.css('.button:focus',`outline: none; border: none;`) 
b.css('.button:active',`outline: none; border: none;`) 
b.css('.button:hover',`background: ${color.green}; cursor:pointer;`) 

b.css(".buttonText",`
	margin: 0;
	margin-right: 0.6rem;
	padding: 0.5rem;
	font-size: 0.875rem;
`)

b.css(".buttonIcon",`
	padding: 4px;
	background-color: ${color.green};
	border-radius: .25rem 0 0 .25rem;
	display: flex;
	align-items: center;
`)

b.css(".header",`
	display: flex;
	justify-content: space-between;
	padding: 0.625rem;
	margin: 0;
`)

b.css(".headerLeft",`
	align-items: center;		
	display: flex;
	width: 33%;
	font-size: 0.875rem;
	justify-content: flex-start;
`)

b.css(".headerCenter",`
	align-items: center;		
	display: flex;
	width: 33%;
	font-size: 0.875rem;
	justify-content: center;
`)

b.css(".headerRight",`
	align-items: center;
	display: flex;
	width: 33%;
	font-size: 0.875rem;
	justify-content: flex-end; 
`)

b.css(".xOfMax",`
	padding: 0.625rem;
	font-size: 0.875rem;
`)

b.css(".contentBox",`
	overflow: visible;
	padding: 0.625rem;
	display: table outside;
	font-size: 0.875rem;
	color: ${color.gray400};
	background: transparent;
`)

b.css(".textArea",`
	resize: none;
	outline: none;
	padding: 0.625rem;
	border: 1px solid ${color.gray200};
	background: white;
	width: 100%;
	color: black;
	font-size: 1.25rem;
	text-align: left;
`)
b.css('.textArea:focus',`border: 1px solid ${color.green};`) 



export const diplain = ({query, store, info}) => {
	
	const value = m.stream.merge([store, query]).map(([s,q])=> {
	  let text = s?.text ?? q?.text ?? ''
		return text.substr(0, q?.limit ?? limit)
	})

//	const enabledReset = () => store()?.text != query()?.text;

	const onClickedReset = () => { store(undefined); info(undefined) }

	const onClickedStandalone = () => {
		window.open('https://gem.omlu.ch/app#0='+compress({
			a: 'diplain', q: JSON.stringify(query()), s: store()
		}, "_"))
	}

	const onClickedFullScreen = () => {
		//not implemented yet
	  }

	const button = (icon, text, onClickedFunction) => 
		m('button.button', 
		{
			//	disabled: !enabled(),
			onclick: onClickedFunction.bind()
		},
		m('div.buttonIcon', icon), text ? m('span.buttonText', text) : null 
	);

	const xOfMax = ()=> m('span.xOfMax', (value() && (value().length+'/'+ (query()?.limit ?? limit))) || '0/'+limit);
	
	const spacer = () => m('span', {style : 'width:4px;'})

	return { 
		view: () => 
		m('div.box',  
			m('div.header',
				m('div.headerLeft', 
					button(icon.reset, 'Reset', onClickedReset)
				),
				m('div.headerCenter'),
				m('div.headerRight',
					xOfMax(), 
					button(icon.fullscreen ,'', onClickedFullScreen), 
					spacer(),
					button(icon.standalone ,'', onClickedStandalone)
				)
			),
			m('div.contentBox',
				m('textarea.textArea',
					{
						value: value(),
						oncreate: ({dom}) => {
							var offset = dom.offsetHeight - dom.clientHeight + 3;
							dom.style['box-sizing'] = 'border-box';
							dom.style.height = 'auto';
							dom.style.height = dom.scrollHeight + offset + 'px';
							dom.addEventListener('input', ({target}) => {
							target.style.height = 'auto';
							target.style.height = target.scrollHeight + offset + 'px';
							});
						},
						oninput: ({target: t}) =>  {
							store({text: t.value.substr(0, query()?.limit || limit)});
						}
					}
				)
			)
		)
	}
}
diplain.meta = {
	share: false,
	adjust: true,
}
diplain.icon = "📄";
diplain.presets = true;
diplain.persistent = true;
diplain.options = [
	{a: 'text', t: 'string', r: false, d: "", c: 'Text Preset' },
	{a: 'limit', t: 'number', r: false, d: limit, c: 'Number of chars allowed' },
]

export default diplain;
