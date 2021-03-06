window.axios = require('axios')
window.$ = require('jquery')
require('html2canvas')

require('./utils/setInputFilter.js')
require('./handlers/newPage.js')
require('./handlers/newField.js')
require('./handlers/currency.js')
require('./handlers/order.js')
require('./handlers/setPrice.js')
require('./handlers/getSum.js')
require('./handlers/template.js')
require('./handlers/doPDF.js')
require('./utils/safariModal.js')
require('./utils/superHandler.js')
require('./modules/OpenModal.js')
