 async function ccapBillingForm(formInfo) {
	const dayInMs = 86400000
	const dateFormat = { year: "2-digit", month: "numeric", day: "numeric" }
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
	const billingStartDate = form.getTextField('billilng_date.start') //sic
	const billingEndDate = form.getTextField('billing_date.end')
	const attendanceStartDate = form.getTextField('attendance_date.start')
	const attendanceEndDate = form.getTextField('attendance_date.end')
	const attendance0 = form.getTextField('attendance.date.0')
	const attendance7 = form.getTextField('attendance.date.7')
		//Worker Info
	const workerName = form.getTextField('worker.name')
	const workerPhone = form.getTextField('worker.phone')

		// PDF field filling - To variable and from variable
	formInfo.startDate = new Date(formInfo.startDate).toLocaleDateString(undefined, dateFormat)
	let startDate = Date.parse(formInfo.startDate)
	let startDatePlus13 = startDate + (13 * dayInMs)
	formInfo.endDate = new Date(startDatePlus13).toLocaleDateString(undefined, dateFormat)
	let startDatePlus7 = startDate + (7 * dayInMs)
	formInfo.attendance7 = new Date(startDatePlus7).toLocaleDateString(undefined, dateFormat)
	
	todayDate.setText(new Date().toLocaleDateString(undefined, dateFormat));
	caseName.setText(formInfo.caseName)
	caseNumber.setText(formInfo.caseNumber)
	providerName.setText(formInfo.billingName)
	providerAddress.setText(formInfo.billingAddress)
	providerCityStateZip.setText(formInfo.billingCSZ)
	countyName.setText(formInfo.providerName) //actually provider
	countyAddress.setText('PID: ' + formInfo.providerIdVal) //actually provider
	//addressTwo.setText()
	//countyCityStateZip.setText(formInfo.) //actually provider
	providerId.setText(formInfo.providerIdVal)
	billingStartDate.setText(formInfo.startDate)
	billingEndDate.setText(formInfo.endDate)
	workerName.setText(formInfo.workerName)
	workerPhone.setText(formInfo.workerPhone)
	childProviderName.setText(formInfo.providerName)
	serviceStartDate.setText(formInfo.startDate)
	serviceEndDate.setText(formInfo.endDate)
	familyCopay.setText(formInfo.copayAmount)
	attendanceStartDate.setText(formInfo.startDate)
	attendanceEndDate.setText(formInfo.endDate)
	attendance0.setText(formInfo.startDate);
	attendance7.setText(formInfo.attendance7);
	childName.setText(formInfo.children[0].name)
	ageGroup0.setText(formInfo.children[0].ageCat0)
	ageGroup1.setText(formInfo.children[0].ageCat1)
	authorizedHours.setText(formInfo.children[0].authHours)

		// Name the PDF
	pdfEndName = [ "CCAP Billing Form", formInfo.caseNumber, formInfo.caseLastName, new Date(formInfo.startDate).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }).replaceAll("/", "-"), String(formInfo.children[0].name).split(" ")[0] ].join(" - ")
		// Flatten PDF
	//form.flatten();//Breaks the PDF, unable to open
		// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
	download(pdfBytes, pdfEndName, "application/pdf");
	
	if (formInfo.children.length === 1) { return };
	formInfo.children.forEach((childInfo, childEnum) => {
		if (childEnum === 0) { return }
		additionalChild(formInfo, childInfo)
	});
};
async function additionalChild(formInfo, childInfo) {
	const formUrl = "./BillingFormPg2.pdf";
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
		// Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true })
		// Get the form containing all the fields
	const form = pdfDoc.getForm()
		// Variables and associated PDF field names
		// Base info
	const caseNumber = form.getTextField('case.number') //pg2
		//Authorization Info
	const childName = form.getTextField('childs.name') //pg2
	const familyCopay = form.getTextField('family.copay') //pg2
	const providerId = form.getTextField('provider.id') //pg2
	const childProviderName = form.getTextField('child_provider_name') //pg2
	const ageGroup0 = form.getTextField('age.group.0') //pg2
	const ageGroup1 = form.getTextField('age.group.1') //pg2
	const authorizedHours = form.getTextField('Authorized.hours.0') //pg2
		//Date fields
	const serviceStartDate = form.getTextField('service_date.start') //pg2
	const serviceEndDate = form.getTextField('service_date.end') //pg2
	const attendanceStartDate = form.getTextField('attendance_date.start') //pg2
	const attendanceEndDate = form.getTextField('attendance_date.end') //pg2
	const attendance0 = form.getTextField('attendance.date.0') //pg2
	const attendance7 = form.getTextField('attendance.date.7') //pg2

		// PDF field filling - To variable and from variable
	caseNumber.setText(formInfo.caseNumber)
	providerId.setText(formInfo.providerId)
	childProviderName.setText(formInfo.providerName)
	serviceStartDate.setText(formInfo.startDate)
	serviceEndDate.setText(formInfo.endDate)
	familyCopay.setText(formInfo.copayAmount)
	attendanceStartDate.setText(formInfo.startDate)
	attendanceEndDate.setText(formInfo.endDate)
	attendance0.setText(formInfo.startDate);
	attendance7.setText(formInfo.attendance7);
	childName.setText(childInfo.name)
	ageGroup0.setText(childInfo.ageCat0)
	ageGroup1.setText(childInfo.ageCat1)
	authorizedHours.setText(childInfo.authHours)

	pdfEndName = [ "CCAP Billing Form", formInfo.caseNumber, formInfo.caseLastName, new Date(formInfo.startDate).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }).replaceAll("/", "-"), String(childInfo.name).split(" ")[0] ].join(" - ")
		// Flatten PDF //form.flatten();
	const pdfBytes = await pdfDoc.save() // Serialize the PDFDocument to bytes (a Uint8Array)
	download(pdfBytes, pdfEndName, "application/pdf"); // Trigger the download
};