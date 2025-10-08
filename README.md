<html>
<head>
    <meta charset="utf-8" />
    <script type="text/javascript" src="./pdf-lib.min.js"></script>
    <script type="text/javascript" src="./download.js"></script>
    <!-- <script type="text/javascript" src="https://unpkg.com/pdf-lib"></script> -->
    <!-- <script type="text/javascript" src="https://unpkg.com/downloadjs@1.4.7"></script> -->
	<script type="text/javascript" src="./csReferral.js"></script>
	<script type="text/javascript" src="./csGoodCause.js"></script>
	<script type="text/javascript" src="./ccapBillingForm.js"></script>
	<title>MEC2 AutoForm</title>
</head>

<body>
	<div id="container">
		<p>Click the button to fill PDF form fields and download the resulting file to your computer. </p>
		<div id="buttonDiv">
			<button class="fillButton" id="fillPDFbutton">Fill PDF</button>
			<button class="fillButton" style="display: none" id="fillPDFbuttonMin">Fill PDF (2 pg Good Cause)</button>
		</div>
		<div style="display: none; margin-bottom: 20px;" id="billingForm">
			<div id="periodDiv">
				<button class="directionButton" id="decrementPeriod">«</button>
				<span>Period Start:</span>
				<span id="periodStart" style="width: 9.5ch;"></span>
				<button class="directionButton" id="incrementPeriod">»</button>
			</div>
			<div id="copayDiv" style="line-height: 25px;">
				<span>Copay: $</span>
				<input id="copayAmount" type="number" style="width: 6ch; align-self: end; -webkit-appearance: none; -moz-appearance: textfield;"></input>
			</div>
		</div>
		<p>Default download location is "This PC → Downloads"</p>
	</div>
</body>

<script type="text/javascript">	
	const { PDFDocument } = PDFLib;
	const fillFormInfo = JSON.parse(new URLSearchParams(decodeURI(window.location.search)).get('parm1'));
	if (fillFormInfo.pdfType === "csForms") {
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
	document.getElementById('fillPDFbutton').focus()

	document.getElementById('buttonDiv').addEventListener('click', function(event) {
		if (event.target.nodeName !== "BUTTON") { return }
		if (fillFormInfo.pdfType === "csForms") {
			csReferral(fillFormInfo);
			csGoodCause(fillFormInfo, event.target.id);
		} else if (fillFormInfo.pdfType === "BillingForm") {
			ccapBillingForm(fillFormInfo);
		}
	})
/*
	function goFillForm(min) {
		if (fillFormInfo.pdfType === "csForms") {
			csReferral(fillFormInfo);
			csGoodCause(fillFormInfo, min);
		} else if (fillFormInfo.pdfType === "BillingForm") {
			ccapBillingForm(fillFormInfo);
		} else {
		return;
		};
	};
*/
</script>
<style type="text/css">
	body {
		background-color: rgba(185 185 185 / .50);
		font-family: system-ui;
	}
	#container {
		padding: 2rem 0;
		max-width: 800px;
	}
	p, #container, img, button {
		margin: auto;
		text-align: center;
	}
	p {
		padding: .5rem 0;
		max-width: 600px;
	}
	#buttonDiv, #billingForm > div {
		display: flex;
		align-items: center;
		& button {
			display: flex;
			cursor: pointer;
		}
		& .fillButton {
			background-color: rgba(169 169 169 / .8);
			padding: 1rem 2rem;
			font-size: 1.5rem;
			border-radius: 10px;
		}
		& .directionButton {
			background-color: rgba(169 169 169 / .4);
			padding: 0 .4rem 4px;
			line-height: 20px;
			font-size: 140%;
			margin: 0 3px 5px;
			border: 1px solid;
			border-radius: 4px;
		}
	}
	#billingForm > div {
		justify-content: center;
	}
	#buttonDiv {
		flex-direction: column;
		padding: 3rem 0;
		gap: 4rem;
	}
	.fillButton:focus {
		outline: 2px solid;
		outline-color: lightseagreen !important;
	}
	#billingForm > div {
		display: flex;
		gap: 5px;
	}
	input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	  margin: 0;
	}
</style>
</html>