const Textarea = {
	init() {
		const array = document.querySelectorAll('.rowDescription')

		if (array) {
			Textarea.initialized(array)
		}
	},

	initialized(array) {
		array.forEach(element => {
			element.addEventListener('keypress', Textarea.methods.type)
		})
	},

	methods: {
		type(event) {
			const parent = event.target.closest('.tbl')
			const table = parent.querySelector('.table')
			const page = parent.closest('.page')

			if (!AddNewField.helpers.validationAddField(parent, table)) {
				event.preventDefault()
				let newPage = confirm('Не достаточно места, перенести на новую страницу?')
				let tableRow = event.target.closest('.table-row')

				if (newPage) {
					if (page.nextElementSibling === null) {
						AddNewPage.init('.page', AddNewField.helpers.html, '#element-to-print', '.content')
						AddNewField.helpers.scrollTop(page)
					} else {
						AddNewField.helpers.scrollTop(page)
					}
				}
			}
		},
	},
}

window.Textarea = Textarea
