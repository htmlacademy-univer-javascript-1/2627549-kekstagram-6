import { scaleSlider, imgPreview, scaleValue, scaleField } from './imageScale.js';
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    scaleSlider.noUiSlider.set(100);
    imgPreview.style.transform = 'scale(1)';
    scaleValue.value = '100%';
    scaleField.value = 100;
  });
});
