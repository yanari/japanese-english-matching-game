import CompleteImage from '../images/general/complete.png';
import BlankImage from '../images/general/blank.png';

export function stamp() {
  const stamp = document.createElement('img');

  stamp.setAttribute('class', 'stamp');
  stamp.setAttribute('src', CompleteImage);

  return stamp;
}

export function cardContainer(cards = [], index, flipCard) {
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

  return cardContainer;
}