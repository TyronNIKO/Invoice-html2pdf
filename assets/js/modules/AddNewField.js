const AddNewField = {
	init() {
		const pages = document.querySelectorAll('.page')

		pages.forEach(element => {
			if (!element.querySelector('.table-row-add')) {
				element.querySelector('.tbl').insertAdjacentHTML('beforeend', AddNewField.helpers.btn)
			}
		})
	},

	helpers: {
		btn: '<button type="button" class="table-row-add" title="Добавить строку" onclick="AddNewField.methods.addField(event)"></button>',
		field: `<div class="row table-row">
    <div><input type="text" class="rowQty" value=""></div>
    <div class="desc">
      <div class="rowDescription" contenteditable="true"></div>
    </div>
    <div class="price"><span class="curency"></span><input type="text" class="rowPrice" value=""></div>

    <button type="button" class="table-row-remove" onclick="AddNewField.methods.remove(event)">X</button>
 	</div>`,
		html: `<div class="tbl"> <div class="table"> <div class="row"> <div>Qty</div><div>Description</div><div>Total</div></div><div class="row table-row"> <div><input type="text" class="rowQty" value=""></div><div class="desc"> <div class="rowDescription" contenteditable="true"></div></div><div class="price"><span class="curency"></span><input type="text" class="rowPrice" value=""></div></div></div></div><div class="row page_number"></div>`,

		validationAddField(parent, table) {
			if (table.clientHeight + 37 < parent.clientHeight) return true
			return false
		},

		scrollTop(page) {
			window.scroll({
				top: page.nextElementSibling.offsetTop,
				behavior: 'smooth'
			});
		}
	},

	methods: {
		addField(event) {
			event.preventDefault()
			const parent = event.target.closest('.tbl')
			const table = parent.querySelector('.table')
			const page = parent.closest('.page')
			if (AddNewField.helpers.validationAddField(parent, table)) {
				table.insertAdjacentHTML('beforeend', AddNewField.helpers.field)
				Textarea.init()
			} else {
				if (page.nextElementSibling === null) {
					AddNewPage.init('.page', AddNewField.helpers.html, '#element-to-print', '.content')
					AddNewField.helpers.scrollTop(page)
				} else {
					AddNewField.helpers.scrollTop(page)
				}
			}

			Currency.init();
			SetPrice.init();
		},

		remove(event) {
			event.preventDefault()
			const result = confirm('Точно хотите удалить?')

			if (result) {
				event.target.closest('.table-row').remove()
			}
		},
	},
}

window.AddNewField = AddNewField
