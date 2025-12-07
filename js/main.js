import { createMockPhotos } from './data.js';
import { renderPhotos } from './renderPhotos.js';
import { closeBigPicture } from './bigPicture.js';

const photosData = createMockPhotos(25);
renderPhotos(photosData);
document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});
