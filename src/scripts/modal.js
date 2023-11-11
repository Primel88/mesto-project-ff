export function openPopup(element) {
  if (element.classList.contains('popup_type_edit') || element.classList.contains('popup_type_new-card') || element.classList.contains('popup_type_image')) {
      element.classList.add('popup_is-animated');
      setTimeout(() => {
      element.classList.add('popup_is-opened');
      },0);
   }
}

export function closePopup(NamePopup){
   const popup = document.querySelector(NamePopup);
   popup.classList.remove('popup_is-opened');
   setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 400);
}

document.addEventListener('keydown', function(event) {
   if (event.key === "Escape") {
     closePopup('.popup_type_edit');
     closePopup('.popup_type_new-card');
     closePopup('.popup_type_image');
   }
 });

 document.addEventListener('click', function(event) {
  if (event.target.classList.contains('popup')) {
    closePopup('.popup_type_edit');
    closePopup('.popup_type_new-card');
    closePopup('.popup_type_image');
  }
});