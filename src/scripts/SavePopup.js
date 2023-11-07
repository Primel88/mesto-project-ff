export default function SavePopup() {
const formElement = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value
    const jobValue = jobInput.value;
    const NameValue = nameInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const NameText = document.querySelector('.profile__title');
    const JobText = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    NameText.textContent = NameValue;
    JobText.textContent = jobValue;
}
formElement.addEventListener('submit', handleFormSubmit);
}