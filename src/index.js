import { initialCards, cardCreate } from './scripts/cards.js'
import './pages/index.css';
import { openPopup, insertText, openPopupwithkey } from './scripts/openPopup.js';
import SavePopup from './scripts/SavePopup.js';
import { ClosePopup, ClosePopupOnButton, ClosePopupOn } from './scripts/ClosePopup';
import  forminMassiv from './scripts/NewCard.js';

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
  popup.style.display = 'block';
}

// вывести карточки на страницу
const list = document.querySelector('.places__list');

initialCards.forEach((element) => {
  const clone = cardCreate(element, deleteCard, like, ImageCard);
  list.appendChild(clone);
});

const Open = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const NewPopup = document.querySelector('.profile__add-button');
const Popup_New_Card = document.querySelector('.popup_type_new-card');
const Popup_Image = document.querySelector('.popup_type_image');

const saveButton = editPopup.querySelector('.popup__button');

Open.addEventListener('click', function(){
openPopup('.popup_type_edit');
insertText();
});

NewPopup.addEventListener('click', function(){
  openPopup('.popup_type_new-card');
});

document.addEventListener('keydown', function() {
  openPopupwithkey(event);
});

saveButton.addEventListener('click', SavePopup());

const removeImagePopup1 = editPopup.querySelector('.popup__close');
const removeImagePopup2 = Popup_New_Card.querySelector('.popup__close');
const removeImagePopup3 = Popup_Image.querySelector('.popup__close');

removeImagePopup1.addEventListener('click', function() {
  ClosePopup('.popup_type_edit');
});

removeImagePopup2.addEventListener('click', function() {
  ClosePopup('.popup_type_new-card');
});

removeImagePopup3.addEventListener('click', function() {
  ClosePopup('.popup_type_image');
});

document.addEventListener('click', function(event) {
  ClosePopupOn(event, '.popup_type_edit');
  ClosePopupOn(event, '.popup_type_new-card');
  ClosePopupOn(event, '.popup_type_image');
});

document.addEventListener('keydown', function(event) {
  ClosePopupOnButton(event, '.popup_type_edit');
  ClosePopupOnButton(event, '.popup_type_new-card');
  ClosePopupOnButton(event, '.popup_type_image');
});

//-------------------------------------------------------------

const form = document.querySelector('form[name="new-place"]');

form.addEventListener('submit', forminMassiv);