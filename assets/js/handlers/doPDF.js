document.addEventListener('DOMContentLoaded', function () {
	const el = document.getElementById('doPDF')
	if (el && id) {
		el.addEventListener('click', function (e) {
			const params = new FormData();
			params.append('id', document.querySelector('[id=id]').value)
			params.append('invoice_id', document.querySelector('[id=order-num]').value)
			params.append('patient_name', document.querySelector('[id=patient_name]').value)
			params.append('patient_date', document.querySelector('[id=patient_date]').innerHTML)
			params.append('country', document.querySelector('[id=country]').value)
            params.append('cur_date', document.querySelector('.curr-date span').innerHTML)
			params.append('currency', document.querySelectorAll('[name=currency]:checked').length === 0 ? '' : document.querySelector('[name=currency]:checked').value)
			params.append('template', document.getElementById('template').value)
			const rows = document.querySelectorAll('.table .table-row')
			let rows_data = []
            let clearpath = location.href.replace(/[^/]*$/, "");
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
				url: clearpath+'/index.php',
				method: 'post',
				data: params,
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then(response => {
			})
			.catch(error => {
			})
			.finally(() => {
                let checkOrder = document.querySelector('#order-num').value,
                checkName = document.querySelector('#patient_name').value;
                if(checkOrder > 3 && checkName){
                    initHtml2Pdf()
                }else{
                    alert("Введите Order № и имя пациента!")
                }
			})
		})
	}
	function initHtml2Pdf() {
		const totalBtn = document.getElementById('total-btn')
        const patientDate = document.querySelector('.patient_date')
		totalBtn.style.display = 'none'
        patientDate.style.display = 'none'
		const removeFieldElement = document.querySelectorAll(".table-row-remove")
		removeFieldElement.forEach(element => {
			element.style.display = 'none'
		})
		try {
			const element = document.getElementById('element-to-print')
			html2pdf()
				.from(element)
				.set({
					margin: 0,
					filename: `${document.getElementById('order-num').value}_${document.getElementById('patient_name').value}.pdf`,
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
                patientDate.style.display = 'block'
				removeFieldElement.forEach(element => {
					element.style.display = 'flex'
				})
			}, 2000)
		}
	}
})
