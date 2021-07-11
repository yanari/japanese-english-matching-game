import matches from './matches';
import {
  getRandomCharacters,
  shuffle,
} from './utils';
import './styles.css';

const cards = shuffle(getMatches());

document.addEventListener('DOMContentLoaded', () => {
  let state = {
    flippedCardsIds: [],
    rightMatches: [],
  };

  createBoard(cards);

  function createBoard(cards = []) {
    const grid = document.querySelector('.grid');
    cards.forEach((_, index) => {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/!blank.png');
      card.setAttribute('class', 'card');
      card.setAttribute('data-id', index);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    });
  };

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    state.flippedCardsIds = [
      ...state.flippedCardsIds,
      cardId,
    ];
    this.setAttribute('src', cards[cardId].image);
    if (state.flippedCardsIds.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  };
  
  function checkForMatch() {
    const [optionOneId, optionTwoId] = state.flippedCardsIds;
    if (cards[optionOneId].name === cards[optionTwoId].name) {
      state.rightMatches = [
        ...state.rightMatches,
        ...state.flippedCardsIds,
      ];
    } else {
      setTimeout(() => {
        hideCard(optionOneId);
        hideCard(optionTwoId);
      }, 1000);
    }

    state.flippedCardsIds = [];
  };
  
  function hideCard(id) {
    const allCards = document.querySelectorAll('img.card');
    allCards[id].setAttribute('src', 'images/!blank.png');
  };
});

function getMatches() {
  const random = getRandomCharacters(matches);
  return random.map((character) => {
    return [
      { name: character, image: `images/${character} - Hiragana_1.png` },
      { name: character, image: `images/${character} - Romaji.png` },
    ];
  }).flat();
};

