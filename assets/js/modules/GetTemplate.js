const GetTemplate = {
	init() {
		const currentTemplate = document.getElementById('template').value

		if (currentTemplate) {
			const selector = document.querySelector(`[data-clinic='${currentTemplate}']`)

			if (selector) {
				document.querySelectorAll('[data-clinic]').forEach(element => {
					element.classList.remove('is--active')
				})
				selector.classList.add('is--active')
        GetTemplate.methods.setImg(currentTemplate)
			}
		}
	},

	methods: {
		setTemplate(name) {
			document.getElementById('template').value = name

			GetTemplate.init()
		},

		setImg(name) {
			const headerArray = document.querySelectorAll('.header')

      headerArray.forEach(element => {
        element.querySelector("img").setAttribute("src", `./img/${name}-header.png`)
      });

      const footerArray = document.querySelectorAll('.footer')

      footerArray.forEach(element => {
        element.querySelector("img").setAttribute("src", `./img/${name}-footer.png`)
      });
		},
	},
}

window.GetTemplate = GetTemplate
