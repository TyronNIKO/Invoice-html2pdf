const SetPrice = {
	init() {
		const array = document.querySelectorAll('.price .rowPrice')

		if (array) {
			array.forEach(element => {
				setInputFilter(element, function (value) {
					return /^-?\d*[.,]?\d*$/.test(value)
				})
			})
		}
	},
}

window.SetPrice = SetPrice
