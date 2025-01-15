class FooterBar extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
     <footer>
      <div class="footer-container">
        <div class="footer-logo">
          <h2>FoodSpot</h2>
          <p>Menghubungkan Anda dengan cita rasa terbaik.</p>
        </div>
        <div class="footer-social">
          <h3>Follow Us</h3>
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 FoodSpot. All rights reserved.</p>
      </div>
    </footer>
      `;
  }
}

customElements.define('footer-bar', FooterBar);