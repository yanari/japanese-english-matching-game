import { GameState } from './pages/game';
import { NewGameState } from './pages/new';
import './styles.css';

const app = document.getElementById('app');
const modal = document.getElementById('modal');

class PageState {
  constructor() {
    let currentState;
    
    this.init = function () {
      this.change(new NewGameState(app));
    };
    
    this.change = function (state) {
      currentState = state;
    };
  }
}

const page = new PageState();

page.init();

document.addEventListener('play', (event) => {
  app.innerHTML = '';
  modal.innerHTML = '';
  modal.removeAttribute('class', 'modal');
  page.change(new GameState(app, modal));

  event.preventDefault();
});