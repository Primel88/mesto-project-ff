import { putLike, deleteLike, deleteCard } from "./api";

export function createCard(cardData, userId, createImage) {
  // Клонировать шаблон
  const cardTemplate = document.querySelector("#card-template");
  const clone = cardTemplate.content.cloneNode(true);

  // Установить значения вложенных элементов
  const cardTitle = clone.querySelector(".card__title");
  const cardImage = clone.querySelector(".card__image");
  const cardDelete = clone.querySelector(".card__delete-button");
  const cardLike = clone.querySelector(".card__like-button");
  const likeCount = clone.querySelector(".card__like-cifr");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  const allLikes = cardData.likes || []; // Проверяем наличие свойства likes и устанавливаем пустой массив по умолчанию, если свойство отсутствует
  likeCount.textContent = allLikes.length;

  const cardId = cardData._id;

  if (cardData.owner && cardData.owner._id === userId) {
    cardDelete.style.display = "block"; // Показываем иконку удаления
  } else {
    cardDelete.style.display = "none"; // Скрываем иконку удаления
  }

  const isLikedByUser = allLikes.some((like) => like._id === userId);
  if (isLikedByUser) {
    cardLike.classList.add("card__like-button_is-active");
  }

  cardDelete.addEventListener("click", function () {
    deleteCards(cardId);
  });

  cardLike.addEventListener("click", () => {
    if (cardLike.classList.contains("card__like-button_is-active")) {
      removeLike(cardLike, cardId, likeCount, deleteLike);
    } else {
      handleLike(cardLike, cardId, likeCount, putLike);
    }
  });

  cardImage.addEventListener("click", () => {
    const link = cardData.link;
    const caption = cardData.name;
    createImage(link, caption);
  });

  return clone;
}

function deleteCards(id) {
  deleteCard(id)
    .then(() => {
      const clone = document.querySelector(".places__item");
      clone.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

function handleLike(cardLike, cardId, likeCount, putLikeHandler) {
  putLikeHandler(cardId)
    .then((updatedCardData) => {
      likeCount.textContent = updatedCardData.likes.length;
      cardLike.classList.add("card__like-button_is-active");
    })
    .catch((error) => console.error("Ошибка при добавлении лайка:", error));
}

function removeLike(cardLike, cardId, likeCount, removeLikeHandler) {
  removeLikeHandler(cardId)
    .then((updatedCardData) => {
      likeCount.textContent = updatedCardData.likes.length;
      cardLike.classList.remove("card__like-button_is-active");
    })
    .catch((error) => console.error("Ошибка при добавлении лайка:", error));
}
