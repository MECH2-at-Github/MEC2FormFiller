 async function ccapBillingForm() {
   	// Fetch the PDF with form fields
	let i = 0;
	const formUrl = "./BillingFormPg1-2.pdf";
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
		// Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true })
		// Get the form containing all the fields
	const form = pdfDoc.getForm()

		// Variables and associated PDF field names
	const todayDate = form.getTextField('date.today')
		// Base info
	const caseName = form.getTextField('case.name')
	const caseNumber = form.getTextField('case.number')
		// County and provider address swapped?
	const countyName = form.getTextField('county.name')
	const countyAddress = form.getTextField('county.address')
	const addressTwo = form.getTextField('address_2')
	const countyCityStateZip = form.getTextField('county.city_state_zip')
		// Provider Info
	const providerName = form.getTextField('provider.name')
	const providerAddress = form.getTextField('provider.address')
	const providerCityStateZip = form.getTextField('provider.city_state_zip')
		//Authorization Info
	const childName = form.getTextField('childs.name')
	const familyCopay = form.getTextField('family.copay')
	const providerId = form.getTextField('provider.id')
	const childProviderName = form.getTextField('child_provider_name')
	const ageGroup0 = form.getTextField('age.group.0')
	const ageGroup1 = form.getTextField('age.group.1')
	const authorizedHours = form.getTextField('Authorized.hours.0')
		//Date fields
	const serviceStartDate = form.getTextField('service_date.start')
	const serviceEndDate = form.getTextField('service_date.end')
	const billingStartDate = form.getTextField('billilng_date.start')//sic
	const billingEndDate = form.getTextField('billing_date.end')
	const attendanceStartDate = form.getTextField('attendance_date.start')
	const attendanceEndDate = form.getTextField('attendance_date.end')
	const attendance0 = form.getTextField('attendance.date.0')
	const attendance7 = form.getTextField('attendance.date.7')
		//Worker Info
	const workerName = form.getTextField('worker.name')
	const workerPhone = form.getTextField('worker.phone')

		// PDF field filling - To variable and from variable
	todayDate.setText(new Date().toLocaleDateString());
	caseName.setText(fillFormInfo.caseName)
	caseNumber.setText(fillFormInfo.caseNumber)
	providerName.setText('St. Louis County')
	providerAddress.setText('320 W 2nd St 4th Floor')
	providerCityStateZip.setText('Duluth, MN 55802')
	countyName.setText(fillFormInfo.providerName)//actually provider
	countyAddress.setText('PID: ' + fillFormInfo.providerId)//actually provider
	//addressTwo.setText()
	//countyCityStateZip.setText(fillFormInfo.)//actually provider
	providerId.setText(fillFormInfo.providerId)
	billingStartDate.setText(fillFormInfo.startDate)
	billingEndDate.setText(fillFormInfo.endDate)
	workerName.setText(workerInfo.name)
	workerPhone.setText(workerInfo.phone)
	childProviderName.setText(fillFormInfo.providerName)
	serviceStartDate.setText(fillFormInfo.startDate)
	serviceEndDate.setText(fillFormInfo.endDate)
	familyCopay.setText(fillFormInfo.copayAmount)
	attendanceStartDate.setText(fillFormInfo.startDate)
	attendanceEndDate.setText(fillFormInfo.endDate)
	attendance0.setText(fillFormInfo.attendance0);
	attendance7.setText(fillFormInfo.attendance7);
	childName.setText(fillFormInfo.children.child0.name)
	ageGroup0.setText(fillFormInfo.children.child0.ageCat0)
	ageGroup1.setText(fillFormInfo.children.child0.ageCat1)
	authorizedHours.setText(fillFormInfo.children.child0.authHours)

		//Name the PDF
	pdfEndName = [ "CCAP Billing Form", fillFormInfo.caseNumber, fillFormInfo.caseLastName, new Date(fillFormInfo.startDate).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }).replaceAll("/", "-"), String(fillFormInfo.children.child0.name).split(" ")[0] ].join(" - ")
		// Flatten PDF
	//form.flatten();//Breaks the PDF, unable to open
		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");

	nextChild();
};
async function nextChild() {
	for (let child in fillFormInfo.children) {
		if (child === "child0") { continue }
    	// Fetch the PDF with form fields
	const formUrl = "./BillingFormPg2.pdf";
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
		// Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true })
		// Get the form containing all the fields
	const form = pdfDoc.getForm()
		// Variables and associated PDF field names
		// Base info
	const caseNumber = form.getTextField('case.number')//pg2
		//Authorization Info
	const childName = form.getTextField('childs.name')//pg2
	const familyCopay = form.getTextField('family.copay')//pg2
	const providerId = form.getTextField('provider.id')//pg2
	const childProviderName = form.getTextField('child_provider_name')//pg2
	const ageGroup0 = form.getTextField('age.group.0')//pg2
	const ageGroup1 = form.getTextField('age.group.1')//pg2
	const authorizedHours = form.getTextField('Authorized.hours.0')//pg2
		//Date fields
	const serviceStartDate = form.getTextField('service_date.start')//pg2
	const serviceEndDate = form.getTextField('service_date.end')//pg2
	const attendanceStartDate = form.getTextField('attendance_date.start')//pg2
	const attendanceEndDate = form.getTextField('attendance_date.end')//pg2
	const attendance0 = form.getTextField('attendance.date.0')//pg2
	const attendance7 = form.getTextField('attendance.date.7')//pg2

		// PDF field filling - To variable and from variable
	caseNumber.setText(fillFormInfo.caseNumber)
	providerId.setText(fillFormInfo.providerId)
	childProviderName.setText(fillFormInfo.providerName)
	serviceStartDate.setText(fillFormInfo.startDate)
	serviceEndDate.setText(fillFormInfo.endDate)
	familyCopay.setText(fillFormInfo.copayAmount)
	attendanceStartDate.setText(fillFormInfo.startDate)
	attendanceEndDate.setText(fillFormInfo.endDate)
	attendance0.setText(fillFormInfo.attendance0);
	attendance7.setText(fillFormInfo.attendance7);
	childName.setText(fillFormInfo.children[child].name)
	ageGroup0.setText(fillFormInfo.children[child].ageCat0)
	ageGroup1.setText(fillFormInfo.children[child].ageCat1)
	authorizedHours.setText(fillFormInfo.children[child].authHours)

		//Name the PDF
	pdfEndName = [ "CCAP Billing Form", fillFormInfo.caseNumber, fillFormInfo.caseLastName, new Date(fillFormInfo.startDate).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }).replaceAll("/", "-"), String(fillFormInfo.children[child].name).split(" ")[0] ].join(" - ")
		// Flatten PDF
	//form.flatten();
		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");
	};
};