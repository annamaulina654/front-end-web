class HeroElement extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
     <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Nikmati Hidangan Istimewa di Tempat Terbaik</h1>
          <p class="hero__tagline">
            Dari cita rasa lokal hingga internasional, temukan pilihan kuliner
            terbaik di sekitarmu.
          </p>
        </div>
      </div>
      `;
  }
}

customElements.define('hero-element', HeroElement);