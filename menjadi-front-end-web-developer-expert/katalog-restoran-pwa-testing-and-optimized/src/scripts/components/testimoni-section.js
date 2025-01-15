class TestimoniSection extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <section>
        <div class="container">
          <div class="header text-center">
            <h1 class="section-title">Testimonial</h1>
            <h1>Our Clients Say!!!</h1>
          </div>
          <div class="testimonial-carousel">
            <div class="testimonial-item">
              <i class="fa fa-quote-left fa-2x text-primary"></i>
              <p>
                Wonderful! This website makes it easy for me to find new
                restaurants with a complete food selection and reliable reviews.
                It’s very helpful!
              </p>
              <div class="client-info">
                <img
                  class="client-img"
                  src="/images/testi/testimonial-1.jpg"
                  alt="Client 1"
                />
                <div class="client-details">
                  <h2>Fatima</h2>
                  <small>Profession</small>
                </div>
              </div>
            </div>
            <div class="testimonial-item">
              <i class="fa fa-quote-left fa-2x text-primary"></i>
              <p>
                The design is neat and navigation is easy. I can find restaurants
                that match my taste and location in just a few minutes. Thank you!
              </p>
              <div class="client-info">
                <img
                  class="client-img"
                  src="/images/testi/testimonial-4.jpg"
                  alt="Client 2"
                />
                <div class="client-details">
                  <h2>Zahra</h2>
                  <small>Profession</small>
                </div>
              </div>
            </div>
            <div class="testimonial-item">
              <i class="fa fa-quote-left fa-2x text-primary"></i>
              <p>
                I'm very happy to find restaurants with attractive promotions
                through this website. The food options are also diverse, perfect
                for all tastes!
              </p>
              <div class="client-info">
                <img
                  class="client-img"
                  src="/images/testi/testimonial-1.jpg"
                  alt="Client 3"
                />
                <div class="client-details">
                  <h2>Arina</h2>
                  <small>Profession</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      `;
  }
}

customElements.define('testimoni-section', TestimoniSection);