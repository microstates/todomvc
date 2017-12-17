import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';

const router = new Navigo(null, true);

export default class TodoApp extends Component {
  @tracked mode: string = 'all';

  constructor(options) {
    super(options);

    router
    .on({
      '/': () => { this.mode = 'all'; },
      '/active': () => { this.mode = 'active'; },
      '/completed': () => { this.mode = 'completed'; },
    })
    .resolve();
  }

}
