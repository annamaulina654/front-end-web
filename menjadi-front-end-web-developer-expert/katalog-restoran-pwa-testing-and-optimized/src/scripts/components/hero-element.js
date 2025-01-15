class HeroElement extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
     <div class="hero">
      <picture>
        <source media="(max-width: 600px)" type="image/webp" srcset="./images/heros/hero-image_4-small.webp">
        <source media="(max-width: 600px)" type="image/jpeg" srcset="./images/heros/hero-image_4-small.jpg">
        <img src="./images/heros/hero-image_4-large.jpg"
          alt="Gambar hero">
      </picture>
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