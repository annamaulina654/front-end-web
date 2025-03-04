import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class NavLinks extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <ul class="navbar-nav d-flex align-items-center gap-3">
        <nav-link content="${msg(`Dasbor`)}" to="/"></nav-link>
        <nav-link content="${msg(`Tambah Cerita`)}" to="/transactions/add.html"></nav-link>
        <nav-link content="${msg(`Tentang`)}" to="/about.html"></nav-link>
        <locale-picker class="d-block"></locale-picker>
      </ul>
    `;
  }
}
 
customElements.define('nav-links', NavLinks);