import { pristine } from './formValidation.js';
import { uploadPhoto } from './api.js';
import { resetScale } from './imageScale.js';
import { resetEffects } from './imageEffects.js';

const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const uploadSubmit = document.querySelector('#upload-submit');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
  resetScale();
  resetEffects();
  pristine.reset();
  hideMessage();
}

function showMessage(template) {
  const message = template.content.cloneNode(true);
  const messageElement = message.querySelector('section');
  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector('button');
  closeButton.addEventListener('click', () => {
    messageElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      messageElement.remove();
    }
  }, { once: true });
}

function hideMessage() {
  const existingMessage = document.querySelector('.success, .error');
  if (existingMessage) {
    existingMessage.remove();
  }
}

async function handleFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  uploadSubmit.disabled = true;
  const submitText = uploadSubmit.textContent;
  uploadSubmit.textContent = 'Отправка...';

  try {
    const formData = new FormData(uploadForm);
    await uploadPhoto(formData);
    closeUploadForm();
    showMessage(successTemplate);
  } catch (error) {
    showMessage(errorTemplate);
  } finally {
    uploadSubmit.disabled = false;
    uploadSubmit.textContent = submitText;
  }
}

export function initUploadForm() {
  uploadInput.addEventListener('change', () => {
    openUploadForm();
  });

  uploadCancel.addEventListener('click', () => {
    closeUploadForm();
  });

  uploadForm.addEventListener('submit', handleFormSubmit);

  uploadForm.addEventListener('reset', () => {
    resetScale();
    resetEffects();
    pristine.reset();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
      const activeElement = document.activeElement;
      if (activeElement !== hashtagsInput && activeElement !== descriptionInput) {
        closeUploadForm();
      }
    }
  });

  hashtagsInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  descriptionInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
}

