async function csGoodCause(min) {
    	// Fetch the PDF with form fields
		console.log(min)
	const formUrl = min === "fillPDFbuttonMin" ? "./CSGoodCausePgs78.pdf" : "./CSGoodCause.pdf";
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
		// Load a PDF with form fields
	const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true })
		// Get the form containing all the fields
	const form = pdfDoc.getForm()
	
		// List all needed PDF field names
	const cpName = form.getTextField('form1[0].P1[0].ParentName[0]')
	const ncpName = form.getTextField('form1[0].P1[0].OtherParentName[0]')
	const caseNumber = form.getTextField('form1[0].P1[0].AssistanceCaseNo[0]')
		// Info fields data
    caseNumber.setText(fillFormInfo.caseNumber);
	cpName.setText(fillFormInfo.cpInfo);
	ncpName.setText(fillFormInfo.ncpInfo);
	
	   //Name the PDF
	const pdfEndName = "Client Statement of Good Cause - " + fillFormInfo.caseNumber + " - " + String(fillFormInfo.cpInfo).split(",")[0] + " - " + String(fillFormInfo.ncpInfo).split(",")[0] + ".pdf"

		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");
};