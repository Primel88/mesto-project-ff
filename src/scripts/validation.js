export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      clearValidation(formElement, settings); // Очищаем поля и делаем кнопку неактивной после сабмита
    });
    setEventListeners(formElement, settings);
    clearValidation(formElement, settings); // Вызываем при открытии формы
  });
}

export function clearValidation(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.value = ""; // Очищаем поле ввода
    hideInputError(formElement, inputElement, settings);
  });

  toggleButtonState(inputList, buttonElement, settings);
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings); // Обновленная строка
    });
  });

  toggleButtonState(inputList, buttonElement, settings); // Добавленная строка
}

function checkInputValidity(formElement, inputElement, settings) {
  if (inputElement.validity.valueMissing) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else if (inputElement.type === "url" && !inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else if (!isValidCharacters(inputElement.value)) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function isValidCharacters(value) {
  return /^[a-zA-Zа-яА-Я\s-]*$/.test(value);
}

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}

function toggleButtonState(inputList, buttonElement, settings) {
  const isValid = inputList.every(
    (inputElement) => inputElement.validity.valid
  );
  if (isValid) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
}
