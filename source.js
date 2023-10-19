function setDisplayElementByName(id,display) {
	document.getElementById(id).style.display = display;
	
	return;
}

function _resetForm(id) {
	const el = document.getElementById(id);

	// set select as default option (맑음)
	el.lastElementChild.selectedIndex = 0;
	
	return;
}

function resetFroms() {
	const selectList = ["12pm", "1pm"];
	const firstSelect = "10am";
	
	for (sel of selectList) {
		_resetForm(sel);
		setDisplayElementByName(sel, "none");
	}
	
	_resetForm(firstSelect);
	
	setDisplayElementByName("resetBtn", "none");
	
	return;
}
