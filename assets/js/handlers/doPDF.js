document.addEventListener('DOMContentLoaded', function () {
	const el = document.getElementById('doPDF')

	if (el) {
		el.addEventListener('click', function (e) {		
			let options = {
				id: document.querySelector('[id=id]').value,
				invoice_id: document.querySelector('[id=order-num]').value,
				patient_name: document.querySelector('[id=patient_name]').value,
				patient_date: document.querySelector('[id=patient_date]').value,
				country: document.querySelector('[id=country]').value,
				currency: document.querySelectorAll('[name=currency]:checked').length === 0 ? '' : document.querySelector('[name=currency]:checked').value,
				template: document.getElementById("template").value,
			}	

			axios({
				method: 'post',
				url: '/index.php',
				data: options,
				dataType: 'json',
			})
			.then(response => {
				
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				initHtml2Pdf()
			})
		})
	}

	function initHtml2Pdf() {
    const totalBtn = document.getElementById("total-btn")
    totalBtn.style.display = "none"
		try {
			const element = document.getElementById('element-to-print')
		  html2pdf()
				.from(element)
				.set({
					margin: 0,
					filename: 'invoice.pdf',
					image: { type: 'jpeg', quality: 1 },
					html2canvas: {
						backgroundColor: '#ccc',
						dpi: 300,
						scale: 4,
						letterRendering: true,
						useCORS: true,
					},
					jsPDF: {
						unit: 'mm',
						format: 'a4',
						compressPDF: true,
						orientation: 'portrait',
					},
				})
				.save()
		} catch (error) {
			console.log(error)
		} finally {
      setTimeout(() => {
        totalBtn.style.display = "block"
      }, 2000);
		}
	}
})
