export function openBigPicture(photo) {
  const bigPictureContainer = document.querySelector('.big-picture');
  const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
  const likesCount = bigPictureContainer.querySelector('.likes-count');
  const commentsCount = bigPictureContainer.querySelector('.comments-count');
  const socialComments = bigPictureContainer.querySelector('.social__comments');
  const socialCaption = bigPictureContainer.querySelector('.social__caption');
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialComments.innerHTML = '';
  photo.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(li);
  });
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export function closeBigPicture() {
  const bigPictureContainer = document.querySelector('.big-picture');

  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');
}
