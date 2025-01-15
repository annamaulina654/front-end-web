class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
         <style>
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; /* Ensure it's on top of other content */
        }

        .loading-box {
          background: white;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 8px solid #0F172B;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          margin-top: 10px;
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="loading-container">
        <div class="loading-box">
          <div class="spinner"></div>
          <div class="loading-text">Loading...</div>
        </div>
      </div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
