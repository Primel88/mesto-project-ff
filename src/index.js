import  {createCard, initialCards } from './scripts/cards.js';
import './pages/index.css';
import  { openPopup, closePopup } from './scripts/modal.js';

// функция удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

function like(evt) {
  const buttonLike = evt.target.closest('.card__like-button');
  buttonLike.classList.toggle('card__like-button_is-active');
}

  const popupImage = document.querySelector('.popup_type_image');
  const imageInPopup = popupImage.querySelector('.popup__image');
  const newcaption = popupImage.querySelector('.popup__caption');

function createImage(link, caption) {

  const imageLink = link;
  const textImg = caption;

  imageInPopup.src = imageLink;
  newcaption.textContent = textImg;

  openPopup(popupImage);
  popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)';
}

// вывести карточки на страницу
const list = document.querySelector('.places__list');

initialCards.forEach((element) => {
  const clone = createCard(element, deleteCard, like, createImage);
  list.appendChild(clone);
});

const profiletTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');

const nameValue = profiletTitle.innerText;
const jobValue = jobTitle.innerText;
document.querySelector('.popup__input_type_name').value = nameValue;
document.querySelector('.popup__input_type_description').value = jobValue;

const buttonOpenEdit = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newPopup = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

buttonOpenEdit.addEventListener('click', function(){
  openPopup(editPopup);
});

newPopup.addEventListener('click', function(){
  openPopup(popupNewCard);
});

document.addEventListener('keydown', function(event) {
  if (event.key === "+") {
    openPopup(popupNewCard);
  }
});

// PopupEdit takeTEXT in popup

const editForm = editPopup.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
  
function handleFormSubmitEdit(evt) {
    evt.preventDefault();
  
    // Получите значение полей jobInput и nameInput из свойства value
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
  
    // Вставьте новые значения с помощью textContent
    profiletTitle.textContent = nameValue;
    jobTitle.textContent = jobValue;
    
    closePopup(editPopup);
}

editForm.addEventListener('submit', handleFormSubmitEdit);

const removeImagePopup1 = editPopup.querySelector('.popup__close');
const removeImagePopup2 = popupNewCard.querySelector('.popup__close');
const removeImagePopup3 = popupImage.querySelector('.popup__close');

removeImagePopup1.addEventListener('click', function() {
  closePopup(editPopup);
});

removeImagePopup2.addEventListener('click', function() {
  closePopup(popupNewCard);
});

removeImagePopup3.addEventListener('click', function() {
  closePopup(popupImage);
});

//-------------------------------------------------------------
const formNewCard = document.querySelector('form[name="new-place"]');
const nameInputNewcard = formNewCard.querySelector('.popup__input_type_card-name');
const linkInputNewcard = formNewCard.querySelector('.popup__input_type_url');

function createformcard(event) {
  event.preventDefault();

  const placeName = nameInputNewcard.value;
  const link = linkInputNewcard.value;

  const cardData = {
    name: placeName,
    link: link,
    alt: placeName,
  };

  const newCard = createCard(cardData, deleteCard, like, createImage);
  list.prepend(newCard);

  nameInputNewcard.value = '';
  linkInputNewcard.value = '';
  
  closePopup(popupNewCard);
}

formNewCard.addEventListener('submit', createformcard);