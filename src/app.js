import { GameState } from './states/game';
import {} from './states/new';
import './styles.css';

class PageState {
  constructor() {
    let currentState;

    this.init = function () {
      this.change(new GameState());
    };

    this.change = function (state) {
      currentState = state;
    };
  }
}

const page = new PageState();

page.init();
