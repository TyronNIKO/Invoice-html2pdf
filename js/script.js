document.addEventListener('DOMContentLoaded', function () {
	let element = document.getElementById('element-to-print')
	// var element = document.querySelector(".container");
	let opt
	let orderNum = document.querySelector('#order-num')
	let curOrderNum = document.querySelector('.curr-order-num span')
	let filename_order
	let btn_doPDF = document.querySelector('.doPDF')
	let table = document.querySelector('.table')
	let priceArr = document.querySelectorAll('.table .price input')
	let rows = document.querySelector('.table-row')
	let btn = document.createElement('div')

	let summ
	let total = document.querySelector('.total span.count')
	let curerncySelect = document.querySelectorAll('.choose-currency input')
	let curencyList = document.querySelectorAll('.curency')
	let curerncyArr = ['$', '₪', '€']
	let templateSelect = document.querySelectorAll('.controls .btn-template')
	let newPageBtn = document.querySelector('.controls .btn-page')
	let delBtn = document.querySelector('.delBtn')
	let clinic = {
		assutatop: {
			img: {
				header: './img/AssutaTop_off__top@1200px.png',
				footer: './img/AssutaTop_bottom@1200px.png',
			},
		},
		assutacomplex: {
			img: {
				header: './img/AssutaComplex_top@1200px.png',
				footer: './img/AssutaComplex_bottom@1200px.png',
			},
		},
		ichilovtop: {
			img: {
				header: './img/IchilovTop_top@1200px.png',
				footer: './img/IchilovTop_bottom@1200px.png',
			},
		},
		ichilovcomplex: {
			img: {
				header: './img/IchilovComplex_top@1200px.png',
				footer: './img/IchilovComplex_bottom@1200px.png',
			},
		},
	}
	let template = document.querySelector('#template').value
	let count = false
	let ro = new ResizeObserver(entries => {
		for (let entry of entries) {
			let cs = window.getComputedStyle(entry.target)
			CheckContenSize()
			console.log(childsSumm)
			let height = content.offsetHeight - (164 + 25 + 160 + 90)
			console.log(height)
			console.log(count)
			if (height < childsSumm && count === false) {
				console.log('time to do magic')
				let a = document.querySelector('.container')
				let b = document.querySelector('#element-to-print')
				a = a.cloneNode(true)
				document.querySelector('body').appendChild(a)
				count = true
			}
			// console.log('watching element:', entry.target);
			// console.log(entry.contentRect.top, ' is ', cs.paddingTop);
			// console.log(entry.contentRect.left, ' is ', cs.paddingLeft);
			// console.log(entry.borderBoxSize[0].inlineSize, ' is ', cs.width);
			// console.log(entry.borderBoxSize[0].blockSize, ' is ', cs.height);
			// if (entry.target.handleResize)
			//     entry.target.handleResize(entry);
		}
	})
	let childsSumm
	let content = document.querySelector('.content')
	let contentTable = document.querySelector('.content .table')
	let childs = contentTable.children
	let textarea = contentTable.querySelectorAll('textarea')

	let SetTemplate = function (e) {
		let val = e.target.dataset.clinic
		template = val

		document.querySelectorAll('.header img').forEach(element => {
			console.log(element)
			element.src = clinic[val].img.header
		})

		document.querySelectorAll('.footer img').forEach(element => {
			element.src = clinic[val].img.footer
		})
	}
	let SetCurency = function (e) {
		console.log(e.target.value)
		curencyList.forEach(item => {
			item.innerHTML = curerncyArr[e.target.value - 1]
		})
	}
	let PdfSettings = function (e) {
		filename_order = e.target.value
		opt = {
			margin: 0,
			filename: 'invoice' + '_' + filename_order + '.pdf',
			image: {
				type: 'jpeg',
				quality: 1,
			},
			html2canvas: {
				scale: 1,
			},
			jsPDF: {
				unit: 'in',
				format: 'letter',
				orientation: 'portrait',
			},
		}
	}

	let SetDate = function () {
		let date = new Date(),
			day = date.getDate(),
			month = date.getMonth(),
			year = date.getFullYear()
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		if (day < 10) {
			day = '0' + day
		}
		document.querySelector('.order-date .curr-date span').innerHTML = day + '-' + months[month] + '-' + year
	}
	let ChangeOrder = function (e) {
		curOrderNum.innerHTML = e.target.value
		console.log('changed')
	}
	let GetPrice = function (e) {
		let val,
			sum = 0
		priceArr.forEach(element => {
			val = parseInt(element.value)
			// console.log("97 el val",val,typeof val);
			if (!val) {
				// console.log("NaN");
			} else if (val >= 0) {
				// console.log("not nan and more than 0");
				sum += val
			} else if (val < 0) {
				// console.log("not nan and less than 0");
				sum += val
			}
		})
		summ = sum
		return summ
	}
	let ChangeTotal = function () {
		// console.log("summ",summ);
		total.textContent = summ + '.00'
	}
	let CheckContenSize = function () {
		childsSumm = 30
		for (let i = 0; i < childs.length; i++) {
			childsSumm += childs[i].offsetHeight + 5
		}
	}
	let RowAddingBtn = function () {
		btn.classList.add('table-row-add')
		btn.setAttribute('title', 'Добавить строку')
		table.append(btn)
	}

    let statusNewPage = false

	let AddNewTableRow = function (currentTarget) {
		let a = document.createElement('div')
		a.classList.add('row', 'table-row')
		// a.setAttribute('data-row','');
		a.innerHTML = `<div><input type="text" class="rowQty"></div><div class="desc"><div contenteditable="true" class="rowDescription"></div></div><div class="price"><span class="curency"></span><input type="number" class="rowPrice"></div>`
		if (currentTarget.closest('.table').clientHeight + 37 > currentTarget.closest('.tbl').clientHeight) {
            if (!statusNewPage) {
                AddNewPage()
                initTextareaField()
                $("html, body").animate({ scrollTop: $(window).scrollTop() + 800 }, 600);
            } else {
                $("html, body").animate({ scrollTop: $(window).scrollTop() + 800 }, 600);

                const array = document.querySelectorAll(".content");
                const array2 = array[array.length-1].querySelectorAll('.row.table-row')
                array2[array2.length - 1].insertAdjacentHTML('afterend', '<div><input type="text" class="rowQty"></div><div class="desc"><div contenteditable="true" class="rowDescription"></div></div><div class="price"><span class="curency"></span><input type="number" class="rowPrice"></div>');
            }

            statusNewPage = true
            
		} else {
			currentTarget.closest('.table').append(a)
			initTextareaField()
		}
	}
	let AddNewPage = function () {
		console.log('new page')
        statusNewPage = true
		let a = document.querySelector('.header')
		let b = document.querySelector('.content')
		let c = document.querySelector('.footer')
		a = a.cloneNode(true)
		b = b.cloneNode(false)
		c = c.cloneNode(true)

		b.innerHTML = `<div class="tbl"> <div class="table"> <div class="row"> <div>Qty</div><div>Description</div><div>Total</div></div><div class="row table-row"> <div><input type="text" class="rowQty" value=""></div><div class="desc"> <div class="rowDescription" contenteditable="true"></div></div><div class="price"><span class="curency"></span><input type="number" class="rowPrice" value=""></div></div><div class="table-row-add" title="Добавить строку"></div></div></div>`
		document.querySelector('#element-to-print').append(a, b, c)

		ContentBlock.init()
	}
	let doPDF = function () {
		// New Promise-based usage:

		savePDFdata()

		html2pdf().set(opt).from(element).save()

		setTimeout(function () {
			window.location.href = '/'
		}, 5000)
	}

	let savePDFdata = function (is_del = false) {
		let rows_data = []
		let rows = document.querySelectorAll('.table .table-row')
		for (let row of rows) {
			rows_data.push({
				0: row.querySelector('.rowQty').value,
				1: row.querySelector('.rowDescription').value,
				2: row.querySelector('.rowPrice').value,
			})
		}

		let data = {
			id: document.querySelector('[id=id]').value,
			invoice_id: document.querySelector('[id=order-num]').value,
			patient_name: document.querySelector('[id=patient_name]').value,
			patient_date: document.querySelector('[id=patient_date]').value,
			country: document.querySelector('[id=country]').value,
			currency: document.querySelectorAll('[name=currency]:checked').length === 0 ? '' : document.querySelector('[name=currency]:checked').value,
			template: template,
			rows: rows_data,
		}
		if (is_del) {
			data.del = 1
		}

		$.ajax({
			url: '/index.php',
			data: data,
			type: 'POST',
			async: false,
			dataType: 'json',
		})
			.done(function (data) {
				if (data.status == 1) {
					// window.location.href = '/';
				} else if (data.status == 2) {
					window.location.href = '/'
				} else {
					alert('Ошибка! Обновите страницу и попробуйте снова!')
				}
			})
			.fail(function () {
				alert('Ошибка! Обновите страницу и попробуйте снова!')
			})
	}

	let delPDFdata = function () {
		if (confirm('Вы уверены, что хотите удалить инвойс?')) {
			savePDFdata(true)
		}
	}

	/*Inits*/
	SetDate()
	templateSelect.forEach(item => {
		item.addEventListener('click', SetTemplate)
	})
	curerncySelect.forEach(item => {
		item.addEventListener('change', SetCurency)
	})
	orderNum.addEventListener('change', e => {
		ChangeOrder(e)
		PdfSettings(e)
	})
	priceArr.forEach(function (element) {
		element.addEventListener('change', e => {
			GetPrice(e)
			ChangeTotal(e)
		})
	})
	RowAddingBtn()
	document.addEventListener('click', function (event) {
		if (event.target.classList.contains('table-row-add')) {
			AddNewTableRow(event.target)
		}
	})
	// btn.addEventListener('click', AddNewTableRow)
	newPageBtn.addEventListener('click', AddNewPage)
	if (delBtn != null) {
		delBtn.addEventListener('click', delPDFdata)
	}
	/*Check if textarea resize and overflow size of container*/
	// textarea.forEach(area => {
	//     ro.observe(area);
	// })
	btn_doPDF.addEventListener('click', doPDF)

	/** rowDescription **/
	function initTextareaField() {
		const textareaField = document.querySelectorAll('.rowDescription')

		textareaField.forEach(element => {
			element.addEventListener('keypress', function (event) {
				const currentTextarea = event.currentTarget
				const heightTbl = currentTextarea.closest('.tbl').clientHeight
				const heightTable = currentTextarea.closest('.table').clientHeight

				if (heightTable > heightTbl) {
					event.preventDefault()
                    const currentRow = `<div class="row table-row">${event.target.closest('.row').innerHTML}</div>`
                    event.target.closest('.row').remove();
                    if (!statusNewPage) {
                        AddNewPage()
                        initTextareaField()
                        $("html, body").animate({ scrollTop: $(window).scrollTop() + 800 }, 600);

                        const array = document.querySelectorAll(".content");
                        
                        array[array.length-1].querySelector('.row.table-row').innerHTML = currentRow
                    } else {
                        $("html, body").animate({ scrollTop: $(window).scrollTop() + 800 }, 600);

                        const array = document.querySelectorAll(".content");
                        const array2 = array[array.length-1].querySelectorAll('.row.table-row')
                        array2[array2.length - 1].insertAdjacentHTML('afterend', currentRow);
                    }
        
                    statusNewPage = true
				}
			})
		})
	}

        
    initTextareaField()
})

const ContentBlock = {
	init() {
		const section = document.querySelectorAll('.content')
		section.forEach(element => {
			element.querySelector('.tbl').style.height = element.querySelector('.tbl').clientHeight + 'px'
			element.querySelector('.tbl').style.flex = '0 0 auto'
		})
	},
}

window.ContentBlock = ContentBlock

window.onload = function (e) {
	ContentBlock.init()
}
