import { getPhotos } from './api.js';
import { renderPhotos } from './renderPhotos.js';
import { initBigPictureHandlers } from './bigPicture.js';
import { initUploadForm } from './formUpload.js';
import 'nouislider/dist/nouislider.css';
import './imageScale.js';
import './imageEffects.js';

async function loadPhotos() {
  try {
    const photosData = await getPhotos();
    renderPhotos(photosData);
    initBigPictureHandlers();
  } catch (error) {
    const picturesContainer = document.querySelector('.pictures');
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = 'text-align: center; padding: 20px; color: red; font-size: 18px;';
    errorMessage.textContent = `Ошибка загрузки фотографий: ${error.message}`;
    picturesContainer.appendChild(errorMessage);
  }
}

loadPhotos();
initUploadForm();
