const Currency = {
  init() {
    const array = document.querySelectorAll(".choose-currency input");
    if ( array ) {
      Currency.methods.selected(array);
      Currency.methods.selectedBefore(array);
    }
  },

  methods: {
    selectedBefore(array) {
      array.forEach(element => {
        if (element.checked) {
          Currency.data.selectedCurrency = Currency.data.arrayCurrency[element.value]
          Currency.methods.addedCurrency();
        }
      });
    },

    selected(array) {
      array.forEach(element => {
        element.addEventListener("change", function() {
          Currency.data.selectedCurrency = Currency.data.arrayCurrency[element.value]
          Currency.methods.addedCurrency();
        });
      });
    },

    addedCurrency() {
      document.querySelectorAll(".curency").forEach(element => {
        element.innerHTML = Currency.data.selectedCurrency
      })
    }
  },

  data: {
    selectedCurrency: "",
    arrayCurrency: ['$', '₪', '€']
  }
}

window.Currency = Currency;