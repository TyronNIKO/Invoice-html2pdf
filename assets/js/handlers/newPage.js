require('../modules/addNewPage.js')

document.addEventListener('DOMContentLoaded', function () {
	const selectorAddedPage = document.getElementById('btn-new-page')
	if (selectorAddedPage) {
		const html = `<div class="tbl"> <div class="table"> <div class="row"> <div>Qty</div><div>Description</div><div>Total</div></div><div class="row table-row"> <div><input type="text" class="rowQty" value=""></div><div class="desc"> <div class="rowDescription" contenteditable="true"></div></div><div class="price"><span class="curency"></span><input type="number" class="rowPrice" value=""></div></div><div class="table-row-add" title="Добавить строку"></div></div></div>`

		selectorAddedPage.addEventListener('click', function (event) {
			event.preventDefault()
			AddNewPage.init('.page', html, '#element-to-print', '.content')
		})
	}
})
