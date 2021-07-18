import CompleteImage from '../images/general/complete.png';
import BlankImage from '../images/general/blank.png';
import FlowerImage from '../images/general/flower.svg';

import './index.css';

function flower() {
  const img = document.createElement('img');
  
  img.height = 24;
  img.width = 24;
  img.setAttribute('src', FlowerImage);

  return img;
}

function label(text = '') {
  const label = document.createElement('p');
  label.style.display = 'inline-block';
  label.innerText = text;
  return label;
}

export function stamp() {
  const stamp = document.createElement('img');

  stamp.setAttribute('class', 'stamp');
  stamp.setAttribute('src', CompleteImage);

  return stamp;
}

export function button(text = '', clickEvent = () => {}, className) {
  const button = document.createElement('button');

  button.setAttribute('class', 'btn');
  
  if (className) {
    button.classList.add(className);
  }

  button.appendChild(flower());
  button.appendChild(label(text))
  button.appendChild(flower());

  button.addEventListener('click', clickEvent);

  return button;
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