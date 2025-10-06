async function csReferral() {
		// Fetch the PDF with form fields
	const formUrl = "./CSReferral.pdf";
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
		// Load a PDF with form fields
	const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true })
		// Get the form containing all the fields
	const form = pdfDoc.getForm()
	
		// List all needed PDF field names
	const caseNumber = form.getTextField('caseNumber0');
	//const caseNumber = form.getTextField('form1[0].P1[0].sfOUO[0].CaseNumber[0]');
	const workerName = form.getTextField('form1[0].P1[0].sfOUO[0].Worker[0]');
	const workerPhone = form.getTextField('form1[0].P1[0].sfOUO[0].Phone[0]');
	const cpNameLast = form.getTextField('form1[0].P1[0].sfInfo[0].NameLast[0]');
	const cpNameFirst = form.getTextField('form1[0].P1[0].sfInfo[0].NameFirst[0]');
	const ncpNameLast = form.getTextField('form1[0].P1[0].sfOtherParent[0].NameLast[0]');
	const ncpNameFirst = form.getTextField('form1[0].P1[0].sfOtherParent[0].NameFirst[0]');
	const childOneName = form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[0].ChildName[0]');
	const childTwoName = form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[1].ChildName[0]');
	const childThreeName = form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[2].ChildName[0]');
	const childFourName = form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[3].ChildName[0]');
	const childFiveName = form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[4].ChildName[0]');
	
	
		// Info fields data
	caseNumber.setText(fillFormInfo.caseNumber);
	form.getTextField('caseNumber1').setText(fillFormInfo.caseNumber);
	form.getTextField('caseNumber2').setText(fillFormInfo.caseNumber);
	form.getTextField('caseNumber3').setText(fillFormInfo.caseNumber);
	form.getTextField('caseNumber4').setText(fillFormInfo.caseNumber);
	workerName.setText(workerInfo.name + "- CCAP");
	workerPhone.setText(workerInfo.phone);
	cpNameLast.setText(String(fillFormInfo.cpInfo).split(",")[0]);
	cpNameFirst.setText(String(fillFormInfo.cpInfo).split(" ")[1]);
	ncpNameLast.setText(String(fillFormInfo.ncpInfo).split(",")[0]);
	ncpNameFirst.setText(String(fillFormInfo.ncpInfo).split(" ")[1]);
	childOneName.setText(fillFormInfo.child0);
	childTwoName.setText(fillFormInfo.child1);
	childThreeName.setText(fillFormInfo.child2);
	childFourName.setText(fillFormInfo.child3);
	childFiveName.setText(fillFormInfo.child4);

		//Name the PDF
	const pdfEndName = "Referral to Support and Collections - " + fillFormInfo.caseNumber + " - " + String(fillFormInfo.cpInfo).split(",")[0] + " - " + String(fillFormInfo.ncpInfo).split(",")[0] + ".pdf"

		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");
};