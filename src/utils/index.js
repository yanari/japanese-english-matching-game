const RANDOM_CARDS_LENGTH = 10;

export const getRandomCharacters = (array = []) => {
  const cards = new Set();
  while (cards.size < RANDOM_CARDS_LENGTH) {
    const randomIndex = Math.floor(Math.random() * array.length);
    cards.add(array[randomIndex]);
  }
  return [...cards];
};

export const shuffle = (array = []) => {
  let result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
