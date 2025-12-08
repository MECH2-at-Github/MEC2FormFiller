function strOrObjToHtmlDiv(info) {
	if (typeof info === "string") { return createNewEle('div', { textContent: info.toString() }) }
	if (typeof info === "object") {
		let divContainer = createNewEle('div', { classList: "span-container" })
		Object.entries(info).forEach( ([label, text] = []) => { divContainer.append(createNewEle('span', { textContent: label + ":", classList: "span-label" }), createNewEle('span', { classList: "span-text", textContent: text }) ) })
		return divContainer
	}
}
function utcDate(mdy) {
	let [ utcM, utcD, utcY ] = mdy.split("/")
	utcY = utcY.length === 2 ? utcY.padStart(4, "20") : utcY
}

function createNewEle(nodeName, attribObj={}, dataObj) {
	let newEle = Object.assign(document.createElement(nodeName), attribObj);
	if (dataObj !== undefined) {
		for (const [dataName, dataValue] of Object.entries(dataObj)) { newEle.dataset[dataName] = dataValue }
	}
	return newEle
};