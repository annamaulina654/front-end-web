import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
 
class ModalTransaction extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }
 
  render() {
    return html`
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content bg-purple">
          <div class="modal-header bg-yellow">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${msg(`Detail Cerita`)}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center mb-3">
              <img src="../public/profile.png" alt="" id="imgProfileDetailRecord" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
              
              <div>
                <h5 class="mb-1" id="nameDetailRecord"></h5>
                <p class="mb-0"><small class="text-body-secondary" id="dateDetailRecord"></small></p>
              </div>
            </div>
    
            <p id="descriptionDetailRecord"></p>
    
            <img src="" alt="" id="imgDetailRecord" class="img-fluid">
          </div>
          <div class="modal-footer bg-yellow">
            <button type="button" class="btn btn-purple" data-bs-dismiss="modal">${msg(`Tutup`)}</button>
          </div>
        </div>
      </div>
    `;
  }
}
 
customElements.define('modal-transaction', ModalTransaction);