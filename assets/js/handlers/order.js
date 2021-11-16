document.addEventListener('DOMContentLoaded', function () {
  const orderInput = document.getElementById("order-num")
  const field = document.querySelector(".curr-order-num span");

  if ( orderInput && field) {
    field.innerHTML = orderInput.value
    orderInput.addEventListener("input", function() {
      field.innerHTML = this.value
    })
  }
})