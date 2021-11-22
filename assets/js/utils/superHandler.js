const SuperHandler = {
  addBodyClass: function (classname) {
    document.body.classList.add(classname);
    return this;
  },

  removeBodyClass: function (classname) {
    document.body.classList.remove(classname);
    return this;
  },

  hideScroll: function () {
    hideScroll();
    return this;
  },

  showScroll: function () {
    showScroll();
    return this;
  },

  modalOpen: function (modalKey) {
    const modal = document.querySelector("[data-modal=" + modalKey + "]");

    setTimeout(() => {
      modal.classList.add("is--show");
    }, 300);

    return this;
  },

  modalClose: function (modalKey) {
    const modal = document.querySelector("[data-modal=" + modalKey + "]");

    modal.classList.remove("is--show");
    return this;
  }
}

window.SuperHandler = SuperHandler;