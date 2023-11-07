export function openPopup(Name) {
  if (Name === '.popup_type_edit') {
    const popup = document.querySelector('.popup_type_edit');
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add('popup_is-opened');
    }, 0);
  } else if (Name === '.popup_type_new-card') {
    const popup = document.querySelector('.popup_type_new-card');
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add('popup_is-opened');
    }, 0);
  }
}

export function openPopupwithkey(event){
  if (event.key === "+"){
    document.querySelector('.popup_type_new-card').style.display = "block";
  }
}

export function insertText() {
  let Name = document.querySelector('.profile__title').innerText;
  let Job = document.querySelector('.profile__description').innerText;
  document.querySelector('.popup__input_type_name').value = Name;
  document.querySelector('.popup__input_type_description').value = Job;
}