class ServicesSection extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <section>
        <div class="container">
          <div class="header">
            <h2 class="section-title">Our Services</h2>
          </div>
          <div class="grid">
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-medal"></i>
                <h3>Best Restaurant Choices</h3>
                <p>
                  Explore top-rated restaurants with diverse local and
                  international dishes.
                </p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-star"></i>
                <h3>Quality Food</h3>
                <p>Enjoy high-quality meals made with fresh, authentic ingredients.</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-cart-plus"></i>
                <h3>Online Order</h3>
                <p>Easily order online and have your favorite meals prepared quickly.</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-headset"></i>
                <h3>24/7 Service</h3>
                <p>Our team is available anytime for assistance and recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      `;
  }
}

customElements.define('services-section', ServicesSection);