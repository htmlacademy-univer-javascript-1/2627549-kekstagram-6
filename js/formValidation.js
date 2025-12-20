import Pristine from 'pristinejs';

const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__error',
  successClass: 'img-upload__success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

pristine.addValidator(
  document.querySelector('.text__hashtags'),
  (value) => {
    const hashtags = value.trim().split(' ');
    if (hashtags.length > 5) {
      return false;
    }
    for (const tag of hashtags) {
      if (!/^#[A-Za-z0-9]{1,20}$/.test(tag)) {
        return false;
      }
    }
    return true;
  },
  'Хэштеги должны быть не более 20 символов и не содержать пробелов.'
);

pristine.addValidator(
  document.querySelector('.text__description'),
  (value) => value.length <= 140,
  'Комментарий не может быть длиннее 140 символов.'
);

export { pristine };
