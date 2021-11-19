const OpenModal = {
  init: () => {
    document.addEventListener("click", function (event) {
      let modal = event.target.hasAttribute("[data-get-modal]") || event.target.closest("[data-get-modal]");
      let closeModal = event.target.hasAttribute("[data-close-modal]") || event.target.closest("[data-close-modal]");
      const modalsWrap = document.querySelector(".modals");
      const overlay = event.target.classList.contains("modals__modal") || event.target.classList.contains("modals__modal-row");

      if (modal) {
        SuperHandler.addBodyClass('modal--open').hideScroll().modalOpen(modal.getAttribute('data-get-modal'));
      }

      if (closeModal) {
        return SuperHandler.removeBodyClass('modal--open').showScroll().modalClose(closeModal.getAttribute('data-close-modal'))
      }

      if (overlay && document.body.classList.contains("hide--scroll") && !document.body.classList.contains("modal--inf")) {
        SuperHandler.removeBodyClass('modal--open').showScroll();
        Array.from(modalsWrap.querySelectorAll(".is--show")).forEach((element) => {
          element.classList.remove("is--show");
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", OpenModal.init);
window.OpenModal = OpenModal;