const hideScroll = () => {
  let intElemScrollTop = parseInt(window.pageYOffset);
  const body = document.body;
  let topElem = body.style.top;
  body.classList.add('hide--scroll');
  body.style.position = 'fixed';
  topElem = intElemScrollTop * (-1);
  body.style.top = topElem + 'px';
  body.setAttribute('data-current-pos', intElemScrollTop);
};

window.hideScroll = hideScroll;

const showScroll = () => {
  const body = document.body;
  body.classList.remove('hide--scroll');
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, document.body.getAttribute('data-current-pos'));
  body.removeAttribute('data-current-pos');
}

window.showScroll = showScroll;