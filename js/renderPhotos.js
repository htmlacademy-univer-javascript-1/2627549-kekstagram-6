import { openBigPicture } from './bigPicture.js';

export function renderPhotos(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = document.getElementById('picture').content.cloneNode(true);
    const imgElement = pictureElement.querySelector('img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    likesElement.textContent = `${photo.likes} лайков`;
    commentsElement.textContent = `${photo.comments.length} комментариев`;
    pictureElement.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
