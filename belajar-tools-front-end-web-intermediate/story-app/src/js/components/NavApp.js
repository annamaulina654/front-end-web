import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
 
class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };
 
  constructor() {
    super();
    this._checkAvailabilityProperty()
  }
 
  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(`Atribut "brandName" harus diterapkan pada elemen ${this.localName}`);
    }
  }
 
  render() {
    return html`
 
      <nav class="navbar navbar-expand-lg bg-primary fixed-top">
      <div class="container">
        <a class="navbar-brand">${this.brandName}</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas-lg offcanvas-end bg-primary" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <nav-links class="ms-auto mb-2 mb-lg-0">
        </div>
        </div>
    </div>
    </nav>

    `;
  }
}
 
customElements.define('nav-app', NavApp);