export function ClosePopup(NamePopup){
  if (NamePopup === '.popup_type_edit') {
    const popup = document.querySelector('.popup_type_edit');
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 400);
  } else if (NamePopup === '.popup_type_new-card') {
    const popup = document.querySelector('.popup_type_new-card');
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 400);
  }
}

export function ClosePopupOn(event, popupSelector) {
  if (event.target.classList.contains(popupSelector.replace(".", ""))) {
    const popup = document.querySelector(popupSelector);
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 400);
  }
}

export function ClosePopupOnButton(event, popupSelector) {
  if (event.key === "Escape") {
    const popup = document.querySelector(popupSelector);
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 400);
  }
}