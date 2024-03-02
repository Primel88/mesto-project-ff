import { createCard } from "./scripts/card.js";
import "./pages/index.css";
import { openPopup, closePopup, closePopupIfOutside } from "./scripts/modal.js";
import { updateAvatar } from "./scripts/api.js";
import { getUser, getCards, saveUserData, saveCard } from "./scripts/api.js";
import { toggleSaveButtonLoading } from "./scripts/utils.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

const popups = document.querySelectorAll(".popup");

// Для каждого попапа добавляем слушатель клика
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupIfOutside(popup));
});

function renderUserData(userData) {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
}

const list = document.querySelector(".places__list");

export function displayCards(cardsData, userId, createImage) {
  cardsData.forEach((element) => {
    const clone = createCard(element, userId, createImage);
    list.appendChild(clone);
  });
}

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    renderUserData(userData);
    displayCards(cards, userData._id, createImage);
    updateProfilesAvatar(userData);
  })
  .catch((err) => {
    // Обрабатываем ошибку, если запрос не удался
    console.log("Ошибка при получении данных:", err);
  });

const buttonSubmitEditProfileForm = document.getElementById(
  "button_save_profile",
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function updateProfile() {
  toggleSaveButtonLoading(true, buttonSubmitEditProfileForm);

  const name = document.querySelector(".popup__input_type_name").value;
  const description = document.querySelector(
    ".popup__input_type_description",
  ).value;

  saveUserData(name, description)
    .then((data) => {
      console.log("Данные пользователя успешно обновлены:", data);
      profileTitle.textContent = name;
      profileDescription.textContent = description;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных пользователя:", err);
    })
    .finally(() => {
      toggleSaveButtonLoading(false, buttonSubmitEditProfileForm);
    });
}

const editProfileForm = document.querySelector('form[name="edit-profile"]');

editProfileForm.addEventListener("submit", function () {
  updateProfile();
});

const saveButtonCards = document.getElementById("button_save_cards");
const formNewCard = document.querySelector('form[name="new-place"]');

//-------------------------------------------

function addCards() {
  const nameCards = document.querySelector(
    ".popup__input_type_card-name",
  ).value;
  const linkCards = document.querySelector(".popup__input_type_url").value;

  toggleSaveButtonLoading(true, saveButtonCards);

  saveCard(nameCards, linkCards)
    .then((cardData) => {
      console.log("Карточка добавлена:", cardData);

      // Создание карточки после успешного сохранения
      const userId = cardData.owner._id;
      const newCard = createCard(cardData, userId, createImage);
      list.prepend(newCard);
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      toggleSaveButtonLoading(false, saveButtonCards);
    });
}

formNewCard.addEventListener("submit", function () {
  addCards();
});
//SaveButtonCards.addEventListener('submit', addCards);

const popupImage = document.querySelector(".popup_type_image");
const imageInPopup = popupImage.querySelector(".popup__image");
const newcaption = popupImage.querySelector(".popup__caption");

function createImage(link, caption) {
  const imageLink = link;
  const textImg = caption;

  imageInPopup.src = imageLink;
  imageInPopup.alt = textImg;
  newcaption.textContent = textImg;

  openPopup(popupImage);
  popupImage.style.backgroundColor = "rgba(0, 0, 0, .9)";
}

const profiletTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__description");

const nameValue = profiletTitle.innerText;
const jobValue = jobTitle.innerText;

const buttonOpenEdit = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

buttonOpenEdit.addEventListener("click", function () {
  const profileNameInput = document.querySelector(".popup__input_type_name");
  const profileJobInput = document.querySelector(
    ".popup__input_type_description",
  );

  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;

  clearValidation(editPopup, validationConfig);
  openPopup(editPopup);
});

buttonOpenAddCardPopup.addEventListener("click", function () {
  document.querySelector(".popup__input_type_card-name").value = "";
  document.querySelector(".popup__input_type_url").value = "";
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "+") {
    clearValidation(popupNewCard, validationConfig);
    openPopup(popupNewCard);
  }
});

// PopupEdit takeTEXT in popup

const formEditProfile = editPopup.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description",
);

const buttonCloseEditProfilePopup = editPopup.querySelector(".popup__close");
const buttonCloseAddCardPopup = popupNewCard.querySelector(".popup__close");
const buttonCloseImagePopup = popupImage.querySelector(".popup__close");

buttonCloseEditProfilePopup.addEventListener("click", function () {
  closePopup(editPopup);
});

buttonCloseAddCardPopup.addEventListener("click", function () {
  closePopup(popupNewCard);
});

buttonCloseImagePopup.addEventListener("click", function () {
  closePopup(popupImage);
});

///////////////////////////////////////////////////////////////////

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarButton = document.querySelector(".profile__image");
const buttonCloseAvatarForm = popupAvatar.querySelector(".popup__close");

popupAvatarButton.addEventListener("click", function () {
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

buttonCloseAvatarForm.addEventListener("click", function () {
  closePopup(popupAvatar);
});

const profileAvatar = document.querySelector(".profile__avatar");
function updateProfileAvatar(imageUrl) {
  profileAvatar.src = imageUrl;
}

const formAvatar = document.querySelector('form[name="form-avatar"]');
const saveButtonAvatar = document.getElementById("button_save_avatar");
const avatarInput = document.querySelector(".popup__input_type_avatar");

function updateAvatars() {
  toggleSaveButtonLoading(true, saveButtonAvatar);

  const avatarLink = avatarInput.value;

  if (!avatarLink) {
    toggleSaveButtonLoading(false, saveButtonAvatar);
    return;
  } else {
    updateAvatar(avatarLink)
      .then((data) => {
        console.log("Данные аватара успешно обновлены:", data);
        updateProfileAvatar(avatarLink);
        closePopup(popupAvatar);
      })
      .catch((err) => {
        console.log("Ошибка при обновлении аватара:", err);
      })
      .finally(() => {
        toggleSaveButtonLoading(false, saveButtonAvatar);
      });
  }
}

formAvatar.addEventListener("click", function () {
  updateAvatars();
  const avatarInput = document.querySelector(".popup__input_type_avatar");
  avatarInput.value = "";
});

function updateProfilesAvatar(userData) {
  const profileAvatarUrl = userData.avatar;
  const profileAvatar = document.querySelector(".profile__avatar");
  profileAvatar.src = profileAvatarUrl;
}
