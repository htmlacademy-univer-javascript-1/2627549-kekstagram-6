const API_URL = 'https://26.javascript.pages.academy/kekstagram';

export async function getPhotos() {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Не удалось загрузить фотографии: ${error.message}`);
  }
}

export async function uploadPhoto(formData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Не удалось отправить фотографию: ${error.message}`);
  }
}

