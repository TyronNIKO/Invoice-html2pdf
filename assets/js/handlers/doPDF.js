document.addEventListener('DOMContentLoaded', function () {
	const el = document.getElementById('doPDF')

	if (el) {
		el.addEventListener('click', function (e) {
			const params = new FormData();
			params.append('id', document.querySelector('[id=id]').value)
			params.append('invoice_id', document.querySelector('[id=order-num]').value)
			params.append('patient_name', document.querySelector('[id=patient_name]').value)
			params.append('patient_date', document.querySelector('[id=patient_date]').value)
			params.append('country', document.querySelector('[id=country]').value)
			params.append('currency', document.querySelectorAll('[name=currency]:checked').length === 0 ? '' : document.querySelector('[name=currency]:checked').value)
			params.append('template', document.getElementById('template').value)
			
			const rows = document.querySelectorAll('.table .table-row')
			let rows_data = []
			for (let row of rows) {
				rows_data.push({
					0: row.querySelector('.rowQty').value,
					1: row.querySelector('.rowDescription').innerHTML,
					2: row.querySelector('.rowPrice').value,
				})
			}

			rows_data.forEach((element, index) => {
				for (const [key, value] of Object.entries(element)) {
					params.append(`rows[${index}][${key}]`, value);
				}
			})

			axios({
				url: '/index.php',
				method: 'post',
				data: params,
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then(response => {
				
			})
			.catch(error => {
				
			})
			.finally(() => {
				initHtml2Pdf()
			})
		})
	}

	function initHtml2Pdf() {
		const totalBtn = document.getElementById('total-btn')
		totalBtn.style.display = 'none'
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
				totalBtn.style.display = 'block'
			}, 2000)
		}
	}
})
