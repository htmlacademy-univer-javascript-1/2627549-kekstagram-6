import { debounce } from './util.js';
import { renderPhotos } from './renderPhotos.js';
import { initBigPictureHandlers } from './bigPicture.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let photosData = [];

function getDefaultPhotos() {
  return photosData;
}

function getRandomPhotos() {
  const shuffled = [...photosData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
}

function getDiscussedPhotos() {
  return [...photosData].sort((a, b) => b.comments.length - a.comments.length);
}

function clearPhotos() {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
}

function applyFilter(filterType) {
  clearPhotos();

  let filteredPhotos;
  switch (filterType) {
    case 'random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = getDefaultPhotos();
  }

  renderPhotos(filteredPhotos);
  initBigPictureHandlers();
}

const debouncedApplyFilter = debounce(applyFilter, DEBOUNCE_DELAY);

function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
}

export function initFilters(photos) {
  photosData = photos;

  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  const filterDefault = document.querySelector('#filter-default');
  const filterRandom = document.querySelector('#filter-random');
  const filterDiscussed = document.querySelector('#filter-discussed');

  filterDefault.addEventListener('click', () => {
    setActiveButton(filterDefault);
    debouncedApplyFilter('default');
  });

  filterRandom.addEventListener('click', () => {
    setActiveButton(filterRandom);
    debouncedApplyFilter('random');
  });

  filterDiscussed.addEventListener('click', () => {
    setActiveButton(filterDiscussed);
    debouncedApplyFilter('discussed');
  });
}
