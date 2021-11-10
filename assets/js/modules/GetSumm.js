const GetSumm = {
	init() {
		const array = document.querySelectorAll('.price .rowPrice')
		GetSumm.data.summ = 0

		if (array) {
			array.forEach(element => {
				GetSumm.data.summ = Number(GetSumm.data.summ) + Number(element.value)
			})

			document.querySelector('.total .count').innerHTML = GetSumm.data.summ
		}
	},

	data: {
		summ: 0,
	},
}

window.GetSumm = GetSumm
