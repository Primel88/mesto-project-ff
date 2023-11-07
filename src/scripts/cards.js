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

export function cardCreate(cardData, deleteCallback, likeCallback, ImageCallback) {
  // клонировать шаблон
  const cardTemplate = document.querySelector('#card-template');
  const clone = cardTemplate.content.cloneNode(true);

  // установить значения вложенных элементов
  const cardTitle = clone.querySelector('.card__title');
  const cardImage = clone.querySelector('.card__image');
  const cardDelete = clone.querySelector('.card__delete-button');
  const cardLike = clone.querySelector('.card__like-button');
  const imageButton = clone.querySelector('.popup__button');

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
    ImageCallback(evt);
  });
  
  return clone;
}