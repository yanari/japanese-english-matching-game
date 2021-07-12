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
  let state = {
    flippedCardsIds: [],
    rightMatches: [],
  };
  
  createBoard(cards);
  console.log(consoleTable(cards));
  
  function createBoard() {
    for (let index = 0; index < cards.length; index++) {
      const element = cards[index]; // has image and name
      // Creating HTML elements
      const cardContainer = document.createElement('div');
      const cardBackFace = document.createElement('img');
      const cardFrontFace = document.createElement('img');
      // Setting containers attributes
      cardContainer.setAttribute('class', 'card');
      cardContainer.setAttribute('data-id', index);
      cardContainer.addEventListener('click', flipCard);
      // Setting back face source
      cardBackFace.setAttribute('src', BlankImage);
      // Setting front face source
      cardFrontFace.setAttribute('class', 'front-face');
      cardFrontFace.setAttribute('src', element.image);
      // Appending (order matters)
      cardContainer.appendChild(cardFrontFace);
      cardContainer.appendChild(cardBackFace);
      grid.appendChild(cardContainer);
    }
    allCards = document.querySelectorAll('.card');
  };

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    state.flippedCardsIds = [
      ...state.flippedCardsIds,
      cardId,
    ];
    this.classList.add('flip');
    if (state.flippedCardsIds.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  };
  
  function hideCard(id) {
    allCards[id].classList.remove('flip');
  };

  function disableFlippedCards(first, second) {
    allCards[first].removeEventListener('click', flipCard);
    allCards[second].removeEventListener('click', flipCard);
  }
  
  function checkForMatch() {
    const [optionOneId, optionTwoId] = state.flippedCardsIds;
    if (cards[optionOneId].name === cards[optionTwoId].name) {
      state.rightMatches = [
        ...state.rightMatches,
        ...state.flippedCardsIds,
      ];
      disableFlippedCards(optionOneId, optionTwoId);
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

