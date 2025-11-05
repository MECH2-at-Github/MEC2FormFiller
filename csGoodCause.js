async function csGoodCause(formInfo, min) {
    	// Fetch the PDF with form fields
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
    caseNumber.setText(formInfo.caseNumber);
	cpName.setText([ formInfo.cpInfo.last, formInfo.cpInfo.first ].join(", "));
	let ncpNameLastFirst = formInfo.ncpInfo?.last ? [ formInfo.ncpInfo?.last, formInfo.ncpInfo?.first ].join(", ") : ""
	ncpName.setText(ncpNameLastFirst);
	
	   //Name the PDF
	const pdfEndName = [ "Client Statement of Good Cause", formInfo.caseNumber, formInfo.cpInfo.last, (formInfo.ncpInfo?.last ? formInfo.ncpInfo.last + " " : "") + "(optional)" ].join(" - ") + ".pdf"

		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");
};