require('../modules/GetSumm.js')

document.addEventListener('DOMContentLoaded', function () {
	GetSumm.init()

	if (document.querySelector('.total .count')) {
		document.querySelector('.total .count').innerHTML = GetSumm.data.summ
	}

	document.getElementById('total-btn').addEventListener('click', function (e) {
		e.preventDefault()
    GetSumm.init()
	})
})
