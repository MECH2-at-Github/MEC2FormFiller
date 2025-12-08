const { PDFDocument } = PDFLib;
const fillFormInfo = JSON.parse(new URLSearchParams(decodeURI(window.location.search)).get('parm1'));
if (fillFormInfo.pdfType === "ChildSupportForms") {
	document.getElementById('fillPDFbuttonMin').style.display = "block"
} else if (fillFormInfo.pdfType === "BillingForm") {
	const weekInMs = 86400000 * 14
	const dateFormat = '{ year: "2-digit", month: "numeric", day: "numeric" }'
	document.getElementById('periodStart').textContent = fillFormInfo.startDate
	document.getElementById('copayAmount').value = fillFormInfo.copayAmount
	document.getElementById('billingForm').style.display = "block"
	document.getElementById('periodDiv').addEventListener('click', function(event) {
		if (event.target.nodeName !== "BUTTON") { return }
		let newStartDate = getNewStartDate(event.target.id)
		function getNewStartDate(changeDirection) {
			let startDate = Date.parse(document.getElementById('periodStart').textContent)
			switch (changeDirection) {
				case "incrementPeriod":
				return new Date(startDate + weekInMs).toLocaleDateString(undefined, dateFormat)
				break
				case "decrementPeriod":
				return new Date(startDate - weekInMs).toLocaleDateString(undefined, dateFormat)
				break
			}
		}
		document.getElementById('periodStart').textContent = newStartDate
		fillFormInfo.startDate = newStartDate
	})
	document.getElementById('copayAmount').addEventListener('blur', function(event) {
		fillFormInfo.copayAmount = event.target.value
	})
}
(function outputDataOnPage() {
	let dataOutput = document.getElementById('dataOutput')
	for (let data in fillFormInfo) {
		let info = fillFormInfo[data]
		dataOutput.appendChild( createNewEle('div') )
		.append( createNewEle('label', { textContent: data + ":" }), strOrObjToHtmlDiv(info) )
	}
})();
document.getElementById('fillPDFbutton').focus()

document.getElementById('buttonDiv').addEventListener('click', function(event) {
	if (event.target.nodeName !== "BUTTON") { return }
	if (fillFormInfo.pdfType === "ChildSupportForms") {
		csReferral(fillFormInfo);
		csGoodCause(fillFormInfo, event.target.id);
	} else if (fillFormInfo.pdfType === "BillingForm") {
		ccapBillingForm(fillFormInfo);
	}
})
