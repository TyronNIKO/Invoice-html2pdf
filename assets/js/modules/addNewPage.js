const AddNewPage = {
	init(selectorForClone, html, selectorForAppend, selectorForContent) {
		const forAppend = document.querySelector(selectorForAppend)
		const forClone = document.querySelector(selectorForClone)

		if (forAppend && forClone && html !== '' && selectorForContent !== '') {
			AddNewPage.methods.cloned(forAppend, forClone, html, selectorForContent)
			AddNewPage.methods.setIndexForPages(selectorForClone)
            AddNewPage.methods.moveTotal(selectorForClone)
            AddNewPage.methods.setNumberOfPages()
			AddNewField.init()
			Currency.init()
			SetPrice.init()
		} else {
			alert('error selectors/selector not found')
		}
	},

	methods: {
		cloned(selectorForAppend, selectorForClone, html, selectorForContent) {
			const result = selectorForClone.cloneNode(true)
			result.querySelector(selectorForContent).innerHTML = html
			selectorForAppend.append(result)
		},

		setIndexForPages(selector) {
			document.querySelectorAll(selector).forEach((item, index) => {
				index++
				if (index > 0) {
					item.setAttribute('data-index', index)
				}
			})
		},
        setNumberOfPages() {
			document.querySelectorAll('.page_number').forEach((item, index) => {
				index++
				if (index > 0) {
					item.innerHTML = index
				}
			})
		},
		remove() {
			const index = prompt('Укажите индекс страницы для удаления', '')
			const page = document.querySelector(`[data-index='${index}']`)
			if (page && Number(index) !== 1) {
				page.remove()
			} else {
				alert('Страницы с таким индексом не существует')
			}
		},
	},
}

window.AddNewPage = AddNewPage
