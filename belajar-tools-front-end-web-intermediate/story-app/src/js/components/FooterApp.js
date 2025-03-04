import { html, css, LitElement } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class FooterApp extends LitElement {
  static styles = css`
    :host {
      color: black;
      text-align: center;
    }

    h2 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.5rem 0;
    }
  `;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <h2 class="text-center">Story App</h2>
      <p class="text-center">${msg(`Temukan dan bagikan cerita yang menginspirasi.`)}</p>
      <p class="text-center">&copy; ${msg(`2025 Anna Maulina. Semua hak dilindungi.`)}</p>
    `;
  }
}

customElements.define('footer-app', FooterApp);
