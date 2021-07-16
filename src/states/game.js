import matches, { getRandomCharacters } from '../matches';
import {
  shuffle,
  consoleTable,
} from '../utils';

import { stamp, cardContainer } from '../components';

export const GameState = function(page) {
  const modal = document.getElementById('modal');
  const grid = document.querySelector('.grid');
  const cards = shuffle(getMatches());
  let allCards;
  
  let state = {
    flippedCardsIds: [],
    rightMatches: [],
  };
  
  createBoard(cards);

  console.log(consoleTable(cards));
  
  function createBoard() {
    for (let index = 0; index < cards.length; index++) {
      const container = cardContainer(cards, index, flipCard);
      grid.appendChild(container);
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
      disableAllCards();
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }
  };
  
  function checkForMatch() {
    const [optionOneId, optionTwoId] = state.flippedCardsIds;
    if (cards[optionOneId].name === cards[optionTwoId].name) {
      state.rightMatches = [
        ...state.rightMatches,
        ...state.flippedCardsIds,
      ];
      disableFlippedCards(optionOneId, optionTwoId);
      enableAllCards();
    } else {
      setTimeout(() => {
        hideCard(optionOneId);
        hideCard(optionTwoId);
        enableAllCards();
      }, 1000);
    }

    state.flippedCardsIds = [];

    if (state.rightMatches.length === cards.length) {
      createCompleteStamp();
    }
  };

  function hideCard(id) {
    allCards[id].classList.remove('flip');
  };

  function disableFlippedCards(first, second) {
    allCards[first].removeEventListener('click', flipCard);
    allCards[second].removeEventListener('click', flipCard);
  };

  function disableAllCards() {
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      card.removeEventListener('click', flipCard);
    }
  }

  function enableAllCards() {
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      card.addEventListener('click', flipCard);
    }
  }

  function createCompleteStamp() {
    for (let i = 0; i < allCards.length; i++) {
      const element = allCards[i];
      element.classList.add('disabled');
    }

    modal.appendChild(stamp());
  }

  function getMatches() {
    const random = getRandomCharacters(matches);
    console.log(random.length);
    return random.map((character) => {
      return [
        { name: character, image: require(`../images/cards/${character} - Hiragana_1.png`) },
        { name: character, image: require(`../images/cards/${character} - Romaji.png`) },
      ];
    }).flat();
  };
}
