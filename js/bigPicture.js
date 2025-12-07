export function openBigPicture(photo) {
  const bigPictureContainer = document.querySelector('.big-picture');
  const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
  const likesCount = bigPictureContainer.querySelector('.likes-count');
  const commentsCount = bigPictureContainer.querySelector('.comments-count');
  const socialComments = bigPictureContainer.querySelector('.social__comments');
  const socialCaption = bigPictureContainer.querySelector('.social__caption');
  const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
  const commentCountDisplay = bigPictureContainer.querySelector('.social__comment-count');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialComments.innerHTML = '';

  let visibleCommentsCount = 5;

  commentCountDisplay.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  function renderComments() {
    socialComments.innerHTML = '';

    const visibleComments = photo.comments.slice(0, visibleCommentsCount);
    visibleComments.forEach((comment) => {
      const li = document.createElement('li');
      li.classList.add('social__comment');
      li.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;
      socialComments.appendChild(li);
    });

    commentCountDisplay.textContent = `${visibleComments.length} из ${photo.comments.length} комментариев`;
    if (visibleCommentsCount >= photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  renderComments();

  commentsLoader.addEventListener('click', () => {
    visibleCommentsCount += 5;
    renderComments();
  });

  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export function closeBigPicture() {
  const bigPictureContainer = document.querySelector('.big-picture');

  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');
}
