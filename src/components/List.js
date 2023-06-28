export default class List {
  constructor(target, initialState, depth, onClick) {
    this.$target = target;
    this.state = { documentInfo: initialState, isOpen: false}
    this.depth = depth;
    this.onClick = onClick;
    this.$ul = null;
    this.initUl();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  initUl = () => {
    this.$ul = document.createElement('ul');
    this.$ul.className = 'document-ul';
    this.$target.appendChild(this.$ul);
  };

  render = () => {
    this.$ul.innerHTML = `
      <li data-id=${this.state.documentInfo.id} class=depth-0${this.depth}>
        <button class='open-toggle-button'>${
          this.state.isOpen === true ? '▼' : '▶︎'
        }</button>
        <span>${this.state.documentInfo.title}</span>
        <button class='add-toggle-button'>﹢</button>
      </li>
    `;

    if (this.state.isOpen === true) {
      this.state.documentInfo.documents.forEach(document => {
        new List(this.$ul, document, this.depth + 1, this.onClick);
      })
    }

    this.addUlEvent();
  };

  addUlEvent = () => {
    this.$ul.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const $li = event.target.closest('li');
      const $button = event.target.closest('button');
      const { id } = $li.dataset;

      console.log($li, id);
      console.log($button);

      if ($button === null) {
        this.onClick(id);
      } else {
        if ($button.className === 'open-toggle-button') {
          const nextState = {
            ...this.state,
            isOpen: true
          };
          this.setState(nextState);
        } else if ($button.className === 'add-toggle-button') {
          console.log('add-toggle-button click!');
        }
      }
    });
  };
}
