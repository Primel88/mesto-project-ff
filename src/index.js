import  {createCard } from './scripts/cards.js';
import './pages/index.css';
import  { openPopup, closePopup } from './scripts/modal.js';
import { DeleteCard, PatchAvatar} from './scripts/api.js';


import { getUser, getCards, SaveUser, SaveCard } from './scripts/api.js';

function renderUserData(userData) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileNameInput = document.querySelector('.popup__input_type_name');
  const profileJobInput = document.querySelector('.popup__input_type_description');

  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.about;
}

const list = document.querySelector('.places__list');

export function displayCards(cardsData, userId, deleteCard, createImage){
  cardsData.forEach((element) => {
  const clone = createCard(element, userId, deleteCard, createImage);
  list.appendChild(clone);
});
}

Promise.all([getUser(), getCards()])
.then(([userData, cards]) => {
  renderUserData(userData);
  displayCards(cards, userData._id, deleteCard, createImage);
  updateProfilesAvatar();
})
.catch(err => {
  // Обрабатываем ошибку, если запрос не удался
  console.log('Ошибка при получении данных:', err);
});

function deleteCard(id){
  DeleteCard(id)
  .then(() => {
    const clone = document.querySelector('.places__item');
    clone.remove();
  })
  .catch(error => {
    console.error('Ошибка при удалении карточки:', error);
  });
}


function toggleSaveButtonLoading(isLoading, saveProfileButton) {
  if (isLoading) {
    saveProfileButton.textContent = 'Сохранение...';
    saveProfileButton.disabled = true;
  } else {
    saveProfileButton.textContent = 'Сохранить';
    saveProfileButton.disabled = false;
  }
}

const SaveButton = document.getElementById('button_save_profile');

function updateProfile(){
  editForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const SaveButton = document.getElementById('button_save_profile');

  toggleSaveButtonLoading(true,SaveButton);
  
  const name = document.querySelector('.popup__input_type_name').value;
  const description = document.querySelector('.popup__input_type_description').value;

  SaveUser(name, description)
    .then(data => {
      console.log('Данные пользователя успешно обновлены:', data);
      toggleSaveButtonLoading(false,SaveButton);
    })
    .catch(err => {
      console.log('Ошибка при обновлении данных пользователя:', err);
      toggleSaveButtonLoading(false,SaveButton);
    });
});
}

SaveButton.addEventListener('click', updateProfile);

const SaveButtonCards = document.getElementById('button_save_cards');
const formNewCard = document.querySelector('form[name="new-place"]');

//-------------------------------------------

function addCards() {
  const nameCards = document.querySelector('.popup__input_type_card-name').value;
  const linkCards = document.querySelector('.popup__input_type_url').value;

  toggleSaveButtonLoading(true,SaveButtonCards);

  SaveCard(nameCards, linkCards)
  .then(cardData => {
    console.log('Карточка добавлена:', cardData);
    
    // Создание карточки после успешного сохранения
    const userId = cardData.owner._id;
    const newCard = createCard(cardData, userId, deleteCard, createImage);
    list.prepend(newCard);

    // Очистка полей ввода и закрытие попапа
    document.querySelector('.popup__input_type_card-name').value = '';
    document.querySelector('.popup__input_type_url').value = '';
    closePopup(popupNewCard);
    toggleSaveButtonLoading(false,SaveButtonCards);
  })
  .catch(err => {
    console.log('Ошибка при добавлении карточки:', err);
    toggleSaveButtonLoading(false,SaveButtonCards);
  });
}

formNewCard.addEventListener('submit', function() {
  addCards();
});
//SaveButtonCards.addEventListener('submit', addCards);

const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const newcaption = popupImage.querySelector('.popup__caption');

export function createImage(link, caption) {

  const imageLink = link;
  const textImg = caption;

  imageInPopup.src = imageLink;
  newcaption.textContent = textImg;

  openPopup(popupImage);
  popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)';
}

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
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

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

///////////////////////////////////////////////////////////////////
import { enableValidation } from './scripts/validation.js';

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarButton = document.querySelector('.profile__image');
const removeImagePopup4 = popupAvatar.querySelector('.popup__close');
  
popupAvatarButton.addEventListener('click', function() {
  openPopup(popupAvatar);
});

removeImagePopup4.addEventListener('click', function() {
  closePopup(popupAvatar);
});


function updateProfileAvatar(imageUrl) {
  const profileAvatar = document.querySelector('.profile__avatar');
  profileAvatar.src = imageUrl;
} 

const formAvatar = document.querySelector('form[name="form-avatar"]');
const SaveButtonAvatar=document.getElementById('button_save_avatar');

function updateAvatar(){
  formAvatar.addEventListener('submit', function() {

  toggleSaveButtonLoading(true,SaveButtonAvatar);

  const AvatarInput = document.querySelector('.popup__input_type_avatar');
  const AvatarLink = AvatarInput.value;

  PatchAvatar(AvatarLink)
    .then(data => {
      console.log('Данные аватара успешно обновлены:', data);
      updateProfileAvatar(AvatarLink);
      toggleSaveButtonLoading(false,SaveButtonAvatar);
      AvatarInput.value = '';
      closePopup(popupAvatar);
    })
    .catch(err => {
      console.log('Ошибка при обновлении аватара:', err);
      toggleSaveButtonLoading(false,SaveButtonAvatar);
    });
});
}

SaveButtonAvatar.addEventListener('click', function() {
  updateAvatar();
});

function updateProfilesAvatar() {
  getUser()
    .then(userData => {
      const profileAvatarUrl = userData.avatar;
      const profileAvatar = document.querySelector('.profile__avatar');
      profileAvatar.src = profileAvatarUrl;
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
}

//////////////
