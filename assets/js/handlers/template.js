require('../modules/GetTemplate.js')

document.addEventListener('DOMContentLoaded', function () {
	GetTemplate.init()


  document.querySelectorAll('[data-clinic]').forEach(element => {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      GetTemplate.methods.setTemplate(element.getAttribute("data-clinic"))
      GetTemplate.methods.setStamp(element.getAttribute("data-clinic"))
    })
  })
})
