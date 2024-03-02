export function toggleSaveButtonLoading(isLoading, saveProfileButton) {
  if (isLoading) {
    saveProfileButton.textContent = 'Сохранение...';
    saveProfileButton.disabled = true;
  } else {
    saveProfileButton.textContent = 'Сохранить';
    saveProfileButton.disabled = false;
  }
}