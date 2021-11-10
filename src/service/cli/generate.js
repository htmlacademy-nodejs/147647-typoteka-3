'use strict';

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const THREE_MONTH_AGO = 3;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const ANNOUNCEMENTS = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const AnnouncementsRestrict = {
  MIN: 1,
  MAX: 5,
};

const generateDate = () => {
  const now = Date.now();
  const today = new Date();
  const threeMonthAgo = today.setMonth(today.getMonth() - THREE_MONTH_AGO);
  const targetDate = new Date(getRandomInt(threeMonthAgo, now));

  return `${targetDate.getFullYear()}-${targetDate.getMonth() < 10 ? '0' + targetDate.getMonth() : targetDate.getMonth()}-${targetDate.getDay() < 10 ? '0' + targetDate.getDay() : targetDate.getDay()} ${targetDate.getHours() < 10 ? '0' + targetDate.getHours() : targetDate.getHours()}:${targetDate.getMinutes() < 10 ? '0' + targetDate.getMinutes() : targetDate.getMinutes()}:${targetDate.getSeconds() < 10 ? '0' + targetDate.getSeconds() : targetDate.getSeconds()}`;
}

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(ANNOUNCEMENTS).slice(AnnouncementsRestrict.MIN, AnnouncementsRestrict.MAX).join(` `),
    fullText: shuffle(ANNOUNCEMENTS).slice(AnnouncementsRestrict.MIN, getRandomInt(0, ANNOUNCEMENTS.length - 1)).join(` `),
    createdDate: generateDate(),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  run(args = []) {
    const [count] = args;

    if (count > MAX_COUNT) {
      return console.error(`Не больше ${MAX_COUNT} публикаций`);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFileSync(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};
