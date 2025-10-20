import { randInt, pick } from './util.js';

const sentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Вика', 'Паша', 'Мария', 'Никита', 'Соня', 'Илья', 'Даша', 'Марк', 'Сергей', 'Полина', 'Олег'];

const descriptions = [
  'Солнечный день', 'Творческий беспорядок', 'С родственником', 'Случайный кадр',
  'Поймал момент', 'Бессонная ночь', 'Под ретро', 'Съёмка на бегу',
  'Проверка нового объектива', 'Кадр без подготовки'
];

function buildMessage() {
  const need = randInt(1, 2);
  let last = null;
  const parts = [];
  while (parts.length < need) {
    const s = pick(sentences);
    if (s !== last) {
      parts.push(s);
      last = s;
    }
  }
  return parts.join(' ');
}

let commentIdSeq = 1;
function makeComment() {
  return {
    id: commentIdSeq++,
    avatar: `img/avatar-${randInt(1, 6)}.svg`,
    message: buildMessage(),
    name: pick(names),
  };
}

function makePhoto(i) {
  const commentsCount = randInt(0, 30);
  const comments = Array.from({ length: commentsCount }, makeComment);

  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: `${pick(descriptions)} — кадр №${i}`,
    likes: randInt(15, 200),
    comments,
  };
}

export function createMockPhotos(count = 25) {
  return Array.from({ length: count }, (_, idx) => makePhoto(idx + 1));
}
