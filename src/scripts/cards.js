import { DeleteCard, _getResponseData, PUTlike, DeleteLike, getCards } from "./api";
import { displayCards, createImage } from "../index";

export function createCard(cardData, userId, deleteCard,  imageCallback) {
  // Клонировать шаблон
  const cardTemplate = document.querySelector('#card-template');
  const clone = cardTemplate.content.cloneNode(true);

  // Установить значения вложенных элементов
  const cardTitle = clone.querySelector('.card__title');
  const cardImage = clone.querySelector('.card__image');
  const cardDelete = clone.querySelector('.card__delete-button');
  const cardLike = clone.querySelector('.card__like-button');
  const likeCount = clone.querySelector('.card__like-cifr');
  
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  const allLikes = cardData.likes || []; // Проверяем наличие свойства likes и устанавливаем пустой массив по умолчанию, если свойство отсутствует
  likeCount.textContent = allLikes.length;
  
  const CardID = cardData._id;

  if (cardData.owner && cardData.owner._id === userId) {
    cardDelete.style.display = 'block'; // Показываем иконку удаления
  } else {
    cardDelete.style.display = 'none'; // Скрываем иконку удаления
  }

  const isLikedByUser = allLikes.some(like => like._id === userId);
  if (isLikedByUser) {
    cardLike.classList.add("card__like-button_is-active");
  }

  // Добавить обработчики событий

  // добавить обработчик клика на иконку удаления
  
  cardDelete.addEventListener('click', function() {
    deleteCard(CardID);
  })

  cardLike.addEventListener('click', () => {
    if (cardLike.classList.contains("card__like-button_is-active")) {
      // Убрать лайк
      DeleteLike(CardID)
        .then(updatedCardData => {
          likeCount.textContent = updatedCardData.likes.length;
          cardLike.classList.remove("card__like-button_is-active");
        })
        .catch(error => console.error('Ошибка при удалении лайка:', error));
    } else {
      // Поставить лайк
      PUTlike(CardID)
        .then(updatedCardData => {
          likeCount.textContent = updatedCardData.likes.length;
          cardLike.classList.add("card__like-button_is-active");
        })
        .catch(error => console.error('Ошибка при добавлении лайка:', error));
    }
  });

  cardImage.addEventListener('click', () => {
    const link = cardData.link;
    const caption = cardData.name;
    imageCallback(link, caption);
  });
  
  return clone;
}