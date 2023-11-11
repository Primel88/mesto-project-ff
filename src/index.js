import  {cardCreate, initialCards } from './scripts/cards.js';
import './pages/index.css';
import  { openPopup, closePopup } from './scripts/modal.js';

// функция удаления карточки
export function deleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

export function like(evt) {
  const likeButton = evt.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

export function ImageCard(evt) {
  evt.preventDefault();
  const popup = document.querySelector('.popup.popup_type_image');
  const image = popup.querySelector('.popup__image');
  const caption = popup.querySelector('.popup__caption');

  const imageUrl = evt.target.src;
  const text_Img = evt.target.getAttribute('alt');

  image.src = imageUrl;
  caption.textContent = text_Img;
  popup.classList.add('popup_is-animated');
    setTimeout(() => {
    popup.classList.add('popup_is-opened');
    },0);
  popup.style.backgroundColor = 'rgba(0, 0, 0, .9)';
}

// вывести карточки на страницу
const list = document.querySelector('.places__list');

initialCards.forEach((element) => {
  const clone = cardCreate(element, deleteCard, like, ImageCard);
  list.appendChild(clone);
});

const nameValue = document.querySelector('.profile__title').innerText;
const jobValue = document.querySelector('.profile__description').innerText;
document.querySelector('.popup__input_type_name').value = nameValue;
document.querySelector('.popup__input_type_description').value = jobValue;

const open = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newPopup = document.querySelector('.profile__add-button');
const popup_New_Card = document.querySelector('.popup_type_new-card');

const saveButton = editPopup.querySelector('.popup__button');

open.addEventListener('click', function(){
  openPopup(editPopup);
});

newPopup.addEventListener('click', function(){
  openPopup(popup_New_Card);
});

const popup_Image = document.querySelector('.popup_type_image');

const click = document.querySelector('.card__image');

click.addEventListener('click', function(){
    openPopup(popup_Image);
})

document.addEventListener('keydown', function(event) {
  if (event.key === "+") {
    openPopup('.popup_type_new-card');
  }
});

 function SavePopup() {
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  
  function handleFormSubmit(evt) {
      evt.preventDefault();
  
      // Получите значение полей jobInput и nameInput из свойства value
      const jobValue = jobInput.value;
      const nameValue = nameInput.value;
  
      // Выберите элементы, куда должны быть вставлены значения полей
      const nameText = document.querySelector('.profile__title');
      const jobText = document.querySelector('.profile__description');
  
      // Вставьте новые значения с помощью textContent
      nameText.textContent = nameValue;
      jobText.textContent = jobValue;
  }
  editPopup.addEventListener('submit', handleFormSubmit);
  }

saveButton.addEventListener('click', SavePopup());

const removeImagePopup1 = editPopup.querySelector('.popup__close');
const removeImagePopup2 = popup_New_Card.querySelector('.popup__close');
const removeImagePopup3 = popup_Image.querySelector('.popup__close');

removeImagePopup1.addEventListener('click', function() {
  closePopup('.popup_type_edit');
});

removeImagePopup2.addEventListener('click', function() {
  closePopup('.popup_type_new-card');
});

removeImagePopup3.addEventListener('click', function() {
  closePopup('.popup_type_image');
});

//-------------------------------------------------------------
const form = document.querySelector('form[name="new-place"]');
function createformcard(event) {
  event.preventDefault();

  const nameInput = form.querySelector('.popup__input_type_card-name');
  const linkInput = form.querySelector('.popup__input_type_url');
  const cardContainer = document.querySelector('.places__list');

  const placeName = nameInput.value;
  const link = linkInput.value;

  const cardData = {
    name: placeName,
    link: link,
    alt: placeName,
  };

  const newCard = cardCreate(cardData, deleteCard, like, ImageCard);
  cardContainer.prepend(newCard);

  nameInput.value = '';
  linkInput.value = '';
}

form.addEventListener('submit', createformcard);