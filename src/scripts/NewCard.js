import { cardCreate } from '../scripts/cards'
import { deleteCard, like, ImageCard } from '../index.js';

export default function forminMassiv() {
  const form = document.querySelector('form[name="new-place"]');
  const NameInput = form.querySelector('.popup__input_type_card-name');
  const linkInput = form.querySelector('.popup__input_type_url');
  const cardContainer = document.querySelector('.places__list');

    event.preventDefault();

    const placeName = NameInput.value;
    const link = linkInput.value;

    const CardData = {
      name: placeName,
      link: link,
      alt: placeName,
    };

    const NewCard = cardCreate(CardData, deleteCard, like, ImageCard);
    cardContainer.prepend(NewCard);

    NameInput.value = '';
    linkInput.value = '';
}