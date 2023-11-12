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
    const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
  }
}

 document.addEventListener('click', function(event) {
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const popupImage = document.querySelector('.popup_type_image');

  if (event.target.classList.contains('popup')) {
    if (popupEdit.classList.contains('popup_is-opened')) {
      closePopup(popupEdit);
    }
    if (popupNewCard.classList.contains('popup_is-opened')) {
      closePopup(popupNewCard);
    }
    if (popupImage.classList.contains('popup_is-opened')) {
      closePopup(popupImage);
    }
  }
});