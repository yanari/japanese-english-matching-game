const RANDOM_CARDS_LENGTH = 10;

export const getRandomCharacters = (array = []) => {
  const cards = new Set();
  while (cards.size < RANDOM_CARDS_LENGTH) {
    const randomIndex = Math.floor(Math.random() * array.length);
    cards.add(array[randomIndex]);
  }
  return [...cards];
};

export default [
  'A',
  'Chi',
  'E',
  'Fu',
  'Ha',
  'He',
  'Hi',
  'Ho',
  'I',
  'Ka',
  'Ke',
  'Ki',
  'Ko',
  'Ku',
  'Ma',
  'Me',
  'Mi',
  'Mo',
  'Mu',
  'N',
  'Na',
  'Ne',
  'Ni',
  'No',
  'Nu',
  'O',
  'Ra',
  'Re',
  'Ri',
  'Ro',
  'Ru',
  'Sa',
  'Se',
  'Shi',
  'So',
  'Su',
  'Ta',
  'Te',
  'To',
  'Tsu',
  'U',
  'Wa',
  'Wo',
  'Ya',
  'Yo',
  'Yu',
];