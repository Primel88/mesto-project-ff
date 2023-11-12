export function openPopup(element) {
    element.classList.add('popup_is-animated');
    setTimeout(() => {
    element.classList.add('popup_is-opened');
    },0);
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(element){
   element.classList.remove('popup_is-opened');
   setTimeout(() => {
    element.classList.remove('popup_is-animated');
  }, 400);
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
      closePopup(popupOpened);
  }
}

document.addEventListener('click', function(event) {
  const modalOpened = document.querySelector('.popup_is-opened');

  if (event.target.classList.contains('popup')) {
    closePopup(modalOpened);
  }
});