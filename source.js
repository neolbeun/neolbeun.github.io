const 선택 = 0;
const 맑음 = 1;
const 화창 = 2;
const 흐림 = 3;
const 구름 = 4;
const 비눈 = 5;
const 폭우 = 6;

function buildDb() {
	let db = {};
	let records = [
		// Default
		[[선택,선택,선택,선택,선택],"100000"],
		// 맑음
		[[맑음,선택,선택,선택,선택],"101000"],
			[[맑음,선택,맑음,선택,선택],"101001"],
			[[맑음,선택,화창,선택,선택],"101001"],
			[[맑음,선택,흐림,선택,선택],"101001"],
		// 화창
		[[화창,선택,선택,선택,선택],"101000"],
			[[화창,선택,맑음,선택,선택],"101010"],
				[[화창,선택,맑음,선택,맑음],"101011"],
				[[화창,선택,맑음,선택,화창],"101011"],
				[[화창,선택,맑음,선택,흐림],"101011"],
			[[화창,선택,화창,선택,선택],"101100"],
				[[화창,선택,화창,화창,선택],"101101"],
				[[화창,선택,화창,흐림,선택],"101101"],
				[[화창,선택,화창,비눈,선택],"101101"],
			[[화창,선택,흐림,선택,선택],"101100"],
				[[화창,선택,흐림,화창,선택],"101101"],
				[[화창,선택,흐림,흐림,선택],"101101"],
				[[화창,선택,흐림,구름,선택],"101101"],
			[[화창,선택,비눈,선택,선택],"101001"],
				[[화창,선택,비눈,흐림,선택],"101101"],
				[[화창,선택,비눈,비눈,선택],"101101"],
		// 흐림
		[[흐림,선택,선택,선택,선택],"110000"],
			[[흐림,맑음,선택,선택,선택],"110001"],
			[[흐림,화창,선택,선택,선택],"110001"],
			[[흐림,구름,선택,선택,선택],"110010"],
				[[흐림,구름,선택,선택,흐림],"110011"],
				[[흐림,구름,선택,선택,비눈],"110011"],
		// 구름
		[[구름,선택,선택,선택,선택],"100100"],
			[[구름,선택,선택,화창,선택],"100110"],
				[[구름,선택,선택,화창,화창],"100111"],
				[[구름,선택,선택,화창,흐림],"100111"],
			[[구름,선택,선택,흐림,선택],"100110"],
				[[구름,선택,선택,흐림,흐림],"100111"],
				[[구름,선택,선택,흐림,구름],"100111"],
			[[구름,선택,선택,비눈,선택],"100101"],
		// 비눈
		[[비눈,선택,선택,선택,선택],"100100"],
			[[비눈,선택,선택,흐림,선택],"100101"],
			[[비눈,선택,선택,구름,선택],"100101"],
			[[비눈,선택,선택,비눈,선택],"100110"],
				[[비눈,선택,선택,비눈,흐림],"100111"],
				[[비눈,선택,선택,비눈,비눈],"100111"],
		// 폭우
		[[폭우,선택,선택,선택,선택],"110000"],
			[[폭우,비눈,선택,선택,선택],"111000"],
				[[폭우,비눈,비눈,선택,선택],"111001"],
				[[폭우,비눈,폭우,선택,선택],"111001"],
			[[폭우,폭우,선택,선택,선택],"110001"]
	];
	
	for (r of records) {
		sel = r[0];
		display = r[1];
		db[encode(sel)] = display;
	}
	
	return db;
}

let Objs, Functions = init();
var State = [0,0,0,0,0];
const db = buildDb();

function encode(l) {
	ret = 0
	for (n of l) {
		ret *= 10;
		ret += n;
	}
	
	return ret;
}

function decode(n) {
	ret = [];
	while (n != 0) {
		ret.push(n % 10);
		n = ~~(n/10);
	}
	
	return ret.reverse();
}

function init() {
	const selectList = ["10am", "11am", "12pm", "1pm", "2pm"];
	const btn = "resetBtn";
	const ret = [];
	const functions = [];
	
	for (sel of selectList) {
		ret.push(document.getElementById(sel));
	}
	
	ret.push(document.getElementById(btn));
	
	return [ret, functions];
}

function setDisplayElementByName(id,display) {
	document.getElementById(id).style.display = display;

	return;
}

function _resetForm(id) {
	const el = document.getElementById(id);

	el.lastElementChild.selectedIndex = 0;
	
	return;
}

function resetFroms() {
	const selectList = ["11am", "12pm", "1pm", "2pm"];
	const firstSelect = "10am";
	
	for (sel of selectList) {
		_resetForm(sel);
		setDisplayElementByName(sel, "none");
	}
	
	_resetForm(firstSelect);
	
	setDisplayElementByName("resetBtn", "none");
	
	state = [0,0,0,0,0];
	
	return;
}

function collectInput() {
	const selectList = ["10am", "11am", "12pm", "1pm", "2pm"];
	const values = []
	
	for (sel of selectList) {
		const el = document.getElementById(sel);
		const idx = el.lastElementChild.selectedIndex;
		values.push(idx);
	}
	
	return values;
}

function updatePage(idx) {
	const newState = collectInput();
	const selectList = ["10am", "11am", "12pm", "1pm", "2pm"];
	
	for (i = 0; i < 5; ++i) {
		if (newState[i] != State[i]) {
			i = i + 1;
			for (; i < 5; ++i) {
				_resetForm(selectList[i]);
			}
		}
	}

	State = collectInput();
	const vis = db[encode(State)];
	
	if (vis == undefined) {
		setDisplayElementByName("warnMessage", "block");
		// button
		setDisplayElementByName("resetBtn", "none");
		for (i = idx + 1; i < 5; ++i) {
			setDisplayElementByName(selectList[i], "none");
		}
	} else {
		for (i = 0; i < 5; ++i) {
			display = vis[i] == "1" ? "block" : "none";
			setDisplayElementByName(selectList[i], display);
		}
		// button
		display = vis[5] == "1" ? "inline" : "none";
		setDisplayElementByName("resetBtn", display);
		// warn Message
		setDisplayElementByName("warnMessage", "none");
	}
	
	return;
}

