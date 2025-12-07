import { createMockPhotos } from './data.js';
import { renderPhotos } from './renderPhotos.js';


const photosData = createMockPhotos(25);

window.photosData = photosData;

renderPhotos(photosData);
