class NavbarMenu extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
        <nav id="drawer" class="nav">
        <div class="logo">
          <p>FoodSpot</p>
        </div>
        <button id="menu" class="header__menu">☰</button>
        <ul class="nav__list">
          <li class="nav__item"><a href="#/home">Home</a></li>
          <li class="nav__item"><a href="#/favorite">Favorite</a></li>
          <li class="nav__item">
            <a href="https://github.com/annamaulina654">About Us</a>
          </li>
        </ul>
      </nav>
      `;
  }
}

customElements.define('navbar-menu', NavbarMenu);