async function csReferral(formInfo) {
		// Fetch the PDF with form fields
	const formUrl = "./CSReferral.pdf";
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
		// Load a PDF with form fields
	const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true })
		// Get the form containing all the fields
	const form = pdfDoc.getForm()
	
		// List all needed PDF field names
	const caseNumber = form.getTextField('caseNumber0');
	const workerName = form.getTextField('form1[0].P1[0].sfOUO[0].Worker[0]');
	const workerPhone = form.getTextField('form1[0].P1[0].sfOUO[0].Phone[0]');
	const cpInfoLast = form.getTextField('form1[0].P1[0].sfInfo[0].NameLast[0]');
	const cpInfoFirst = form.getTextField('form1[0].P1[0].sfInfo[0].NameFirst[0]');
	const ncpInfoLast = form.getTextField('form1[0].P1[0].sfOtherParent[0].NameLast[0]');
	const ncpInfoFirst = form.getTextField('form1[0].P1[0].sfOtherParent[0].NameFirst[0]');
	const childrenObj = {
		child0: form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[0].ChildName[0]'),
		child1: form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[1].ChildName[0]'),
		child2: form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[2].ChildName[0]'),
		child3: form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[3].ChildName[0]'),
		child4: form.getTextField('form1[0].P1[0].sfChildren[0].Children[0].Row1[4].ChildName[0]'),
	}	
	
		// Info fields data
	caseNumber.setText(formInfo.caseNumber);
	Array.from(['caseNumber1', 'caseNumber2', 'caseNumber3', 'caseNumber4', ]).forEach(field => { form.getTextField(field).setText(formInfo.caseNumber); })
	workerName.setText(formInfo.workerName ? formInfo.workerName + " - CCAP" : "CCAP");
	workerPhone.setText(formInfo.workerPhone ?? "");
	cpInfoFirst.setText(formInfo.cpInfo.first);
	cpInfoLast.setText(formInfo.cpInfo.last);
	ncpInfoFirst.setText(formInfo.ncpInfo?.first);
	ncpInfoLast.setText(formInfo.ncpInfo?.last);
	formInfo.childList.forEach((childName, i) => { childrenObj["child" + i].setText(childName) })

		//Name the PDF
	const pdfEndName = ["Referral to Support and Collections", formInfo.caseNumber, formInfo.cpInfo.last, (formInfo.ncpInfo?.last + " " ?? "") + "(required)" ].join(" - ") + ".pdf"

		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");
};