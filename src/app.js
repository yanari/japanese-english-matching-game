import matches from './matches';
import {
  consoleTable,
  getRandomCharacters,
  shuffle,
} from './utils';
import BlankImage from './images/blank.png';
import CompleteImage from './images/complete.png';
import './styles.css';

const modal = document.getElementById('modal');
const grid = document.querySelector('.grid');
const cards = shuffle(getMatches());
let allCards;

document.addEventListener('DOMContentLoaded', () => {
  console.log(allCards);
  let state = {
    flippedCardsIds: [],
    rightMatches: [],
  };
  
  createBoard(cards);
  console.log(consoleTable(cards));
  
  function createBoard() {
    for (let index = 0; index < cards.length; index++) {
      const card = document.createElement('img');
      card.setAttribute('src', BlankImage);
      card.setAttribute('class', 'card');
      card.setAttribute('data-id', index);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
    allCards = document.querySelectorAll('img');
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

    if (state.rightMatches.length === cards.length) {
      createCompleteStamp();
    }
  };
  
  function hideCard(id) {
    allCards[id].setAttribute('src', BlankImage);
  };

  function createCompleteStamp() {
    for (let i = 0; i < allCards.length; i++) {
      const element = allCards[i];
      element.classList.add('disabled');
    }
    const stamp = document.createElement('img');

    stamp.setAttribute('class', 'stamp');
    stamp.setAttribute('src', CompleteImage);
    modal.setAttribute('class', 'modal');
    modal.appendChild(stamp);
  }
});

function getMatches() {
  const random = getRandomCharacters(matches);
  return random.map((character) => {
    return [
      { name: character, image: require(`./images/${character} - Hiragana_1.png`) },
      { name: character, image: require(`./images/${character} - Romaji.png`) },
    ];
  }).flat();
};

