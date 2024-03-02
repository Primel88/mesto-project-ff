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

export function closePopupIfOutside(popup) {
  return function(event) {
      // Проверяем, был ли клик вне области попапа
      if (!event.target.closest('.popup__content')) {
          closePopup(popup);
      }
  };
}