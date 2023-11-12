export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Фотография Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Фотография Челябинской области",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Село Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Место камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Холмогорский район",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал",
  },
];

export function createCard(cardData, deleteCallback, likeCallback, imageCallback) {
  // клонировать шаблон
  const cardTemplate = document.querySelector('#card-template');
  const clone = cardTemplate.content.cloneNode(true);

  // установить значения вложенных элементов
  const cardTitle = clone.querySelector('.card__title');
  const cardImage = clone.querySelector('.card__image');
  const cardDelete = clone.querySelector('.card__delete-button');
  const cardLike = clone.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  // добавить обработчик клика на иконку удаления
  cardDelete.addEventListener('click', (evt) => {
    deleteCallback(evt);
  });

  cardLike.addEventListener('click', (evt) => {
    likeCallback(evt);
  });

  cardImage.addEventListener('click', (evt) => {
    const link = cardImage.getAttribute('src');
    const caption = cardImage.getAttribute('alt');
    imageCallback(link, caption);
  });
  
  return clone;
}