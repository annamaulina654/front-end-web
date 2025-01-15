class FooterBar extends HTMLElement {
  static observedAttributes = ["color", "background-color", "display"];

  constructor() {
    super();

    this._color = this.getAttribute("color");
    this._backgroundColor = this.getAttribute("background-color");
    this._display = this.getAttribute("display");
    this._boxShadow = this.getAttribute("box-shadow");

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      ${this.localName} {
        color: ${this._color};
        background-color: ${this._backgroundColor};
        display: ${this._display};
        box-shadow: ${this._boxShadow};
      }
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}

        <div>
          Anna Maulina &copy; 2024
        </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;

    this.render();
  }
}

customElements.define("footer-bar", FooterBar);
