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
            <h5 class="section-title">Our Services</h5>
          </div>
          <div class="grid">
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-medal"></i>
                <h5>Best Restaurant Choices</h5>
                <p>
                  Explore top-rated restaurants with diverse local and
                  international dishes.
                </p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-utensils"></i>
                <h5>Quality Food</h5>
                <p>Enjoy high-quality meals made with fresh, authentic ingredients.</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-cart-plus"></i>
                <h5>Online Order</h5>
                <p>Easily order online and have your favorite meals prepared quickly.</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-content">
                <i class="fa fa-3x fa-headset"></i>
                <h5>24/7 Service</h5>
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