class AddNote extends HTMLElement {
  static observedAttributes = ["cursor", "flex-direction", "justify-content"];

  constructor() {
    super();

    this._cursor = this.getAttribute("cursor");
    this._flexDirection = this.getAttribute("flex-direction");
    this._justifyContent = this.getAttribute("justify-content");

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        ${this.localName} {
            cursor: ${this._cursor};
            flex-direction: ${this._flexDirection};
            justify-content: ${this._justifyContent};
        }
      `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
        ${this._style.outerHTML}
  
        <li class="add-box">
            <div class="icon"><i class="uil uil-plus"></i></div>
            <p>Tambah Catatan</p>
        </li>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;

    this.render();
  }
}

customElements.define("add-note", AddNote);
