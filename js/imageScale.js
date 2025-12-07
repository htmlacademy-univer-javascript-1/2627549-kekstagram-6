import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const scaleField = document.querySelector('#scale-value');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleSlider = document.getElementById('scale-slider');

noUiSlider.create(scaleSlider, {
  start: [100],
  range: {
    min: 25,
    max: 100
  },
  step: 25,
  connect: [true, false],
  orientation: 'horizontal',
  tooltips: true
});

scaleSlider.noUiSlider.on('update', (values) => {
  const scale = values[0];
  scaleValue.value = `${scale}%`;
  scaleField.value = scale;
  imgPreview.style.transform = `scale(${scale / 100})`;
});

scaleControlSmaller.addEventListener('click', () => {
  scaleSlider.noUiSlider.set(scaleSlider.noUiSlider.get() - 25);
});

scaleControlBigger.addEventListener('click', () => {
  scaleSlider.noUiSlider.set(scaleSlider.noUiSlider.get() + 25);
});
