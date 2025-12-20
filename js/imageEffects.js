import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsRadios = document.querySelectorAll('.effects__radio');

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'none',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
  },
};

let currentEffect = 'none';
let slider = null;

function createSlider() {
  if (slider) {
    slider.destroy();
  }

  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    imgPreview.style.filter = 'none';
    effectLevelValue.value = '';
    return;
  }

  effectLevel.classList.remove('hidden');

  slider = noUiSlider.create(effectLevelSlider, {
    start: effect.max,
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    connect: 'lower',
  });

  slider.on('update', (values) => {
    const value = values[0];
    effectLevelValue.value = value;
    applyEffect(value);
  });
}

function applyEffect(value) {
  const effect = EFFECTS[currentEffect];
  let filterValue = '';

  if (effect.unit) {
    filterValue = `${effect.filter}(${value}${effect.unit})`;
  } else {
    filterValue = `${effect.filter}(${value})`;
  }

  imgPreview.style.filter = filterValue;
}

effectsRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      currentEffect = radio.value;
      createSlider();
    }
  });
});

export function resetEffects() {
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }
  currentEffect = 'none';
  createSlider();
}

createSlider();

