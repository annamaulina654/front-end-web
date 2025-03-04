import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class ProfileSection extends LitElement {
  static properties = {
    title: { type: String, reflect: true },
    content: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.title = '';
    this.content = '';
  }

  static styles = css`
    .profile-section {
      margin: 30px auto;
    }

    .profile-section h2 {
      font-size: 1.5rem;
      color: #333;
      border-bottom: 2px solid var(--primary-color, #007bff);
      display: inline-block;
      margin-bottom: 10px;
    }

    .profile-section ul {
      list-style-type: none;
      padding: 0;
    }

    .profile-section ul li {
      margin-bottom: 10px;
    }
  `;

  render() {
    return html`
      <div class="profile-section">
        <h2>${this.title}</h2>
        <div>${unsafeHTML(this.content)}</div>
      </div>
    `;
  }
}

customElements.define('profile-section', ProfileSection);
