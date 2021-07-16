import { button } from '../components';
import './new_styles.css';

export const NewGameState = function(app) {
  const container = document.createElement('section');

  const title = document.createElement('h1');

  title.innerText = 'Hiragana Master';

  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'button-container')

  const playButton = button('Play', () => {
    const event = new Event('play')
    document.dispatchEvent(event);
  });
  const rulesButton = button('Rules');

  buttonContainer.appendChild(playButton);
  buttonContainer.appendChild(rulesButton);

  container.appendChild(title);
  container.appendChild(buttonContainer);

  app.appendChild(container);
}