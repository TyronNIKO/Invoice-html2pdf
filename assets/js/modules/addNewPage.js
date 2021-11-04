const AddNewPage = {
  init(selectorForClone, html, selectorForAppend, selectorForContent) {
    const forAppend = document.querySelector(selectorForAppend)
    const forClone = document.querySelector(selectorForClone)

    if ( forAppend && forClone && html !== '' && selectorForContent !== '') {
      AddNewPage.methods.cloned(forAppend, forClone, html, selectorForContent)
      AddNewPage.methods.setIndexForPages(selectorForClone)
    } else {
      alert("error selectors/selector not found")
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
        if ( index > 0) {
          item.setAttribute("data-index", index)
        }
      })
    }
  },

}

window.AddNewPage = AddNewPage
