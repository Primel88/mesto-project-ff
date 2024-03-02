
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'dddbca6d-963b-42af-bfce-8e4e83bcead5',
    'Content-Type': 'application/json'
  }
}

export function _getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => _getResponseData(res));
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(res => _getResponseData(res));
}

export function saveUserData(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  })
  .then(res => _getResponseData(res));
}

export function saveCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
  .then(res => _getResponseData(res));
}

export function deleteCard(id){
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => _getResponseData(res));
}

export function putLike(id){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => _getResponseData(res));
}

export function deleteLike(id){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => _getResponseData(res));
}

export function updateAvatar(avatarLink){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar:avatarLink
    }),
  })
  .then(res => _getResponseData(res));
}