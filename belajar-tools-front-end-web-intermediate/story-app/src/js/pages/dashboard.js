const Dashboard = {
    async init() {
      await this._initialData();
      this._initialListener();
    },
  
    async _initialData() {
      const fetchRecords = await fetch('/data/DATA.json'); 
      const responseRecords = await fetchRecords.json();
      this._stories = responseRecords.listStory; 
      this._populateStoriesToCard(this._stories); 
      this._populateStoriesDataToCard(this._stories); 
    },

    _initialListener() {
        const recordDetailModal = document.getElementById('recordDetailModal');
        recordDetailModal.addEventListener('show.bs.modal', (event) => {
          const modalTitle = recordDetailModal.querySelector('.modal-title');
          modalTitle.focus();
          const button = event.relatedTarget;
          const dataRecord = this._stories.find((item) => {
            return item.id == button.dataset.recordId;
          });
          this._populateDetailTransactionToModal(dataRecord);
        });
      },

    _populateStoriesDataToCard(stories = null) {
      if (!(typeof stories === 'object')) {
        throw new Error(
          `Parameter stories should be an object. The value is ${stories}`,
        );
      }
    
      if (!Array.isArray(stories)) {
        throw new Error(
          `Parameter stories should be an array. The value is ${stories}`,
        );
      }
    
      const totalStories = stories.length;
      const today = new Date();
      const latestStories = stories.filter((story) => {
        const storyDate = new Date(story.createdAt);
        return (
          storyDate.getFullYear() === today.getFullYear() &&
          storyDate.getMonth() === today.getMonth() &&
          storyDate.getDate() === today.getDate()
        );
      }).length;
    
      document
      .querySelector('#totalStory-card')
      .setAttribute('content', `${totalStories} Cerita`);
      document
      .querySelector('#newStory-card')
      .setAttribute('content', `${latestStories} Cerita`);
    },
      
    _populateStoriesToCard(stories = null) {
      if (!(typeof stories === 'object')) {
        throw new Error(`Parameter stories should be an object.`);
      }
  
      if (!Array.isArray(stories)) {
        throw new Error('Parameter stories should be an array.');
      }
      
  
      const cardContainer = document.querySelector('#transactionCards');
      cardContainer.innerHTML = '<div class="row"></div>'; 
  
      if (stories.length <= 0) {
        cardContainer.innerHTML = `<div class="text-center">Tidak ada cerita untuk ditampilkan</div>`;
        return;
      }
  
      const row = cardContainer.querySelector('.row'); 
      stories.forEach((story) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
      card.setAttribute('data-bs-toggle', 'modal');
      card.setAttribute('data-bs-target', '#recordDetailModal');

      card.setAttribute('data-record-id', `${story.id}`);
        card.innerHTML = this._templateCard(story);
        row.appendChild(card);
      });
    },
  
    _templateCard(story) {
      const { name, description, photoUrl, createdAt } = story;
  
      return `
        <div class="d-flex justify-content-center align-items-center">
          <div class="card text-bg-dark" style=" aspect-ratio: 3/4; width: 300px; max-width: 100%; cursor:pointer">
          <img src="${photoUrl}" class="card-img" alt="Story ${name}" style="object-fit: cover; width: 100%; height: 100%;">
          <div class="card-img-overlay d-flex align-items-end p-3" style="background: rgba(0, 0, 0, 0.5);">
            <h5 class="card-title text-white">${name}</h5>
          </div>
        </div>
        </div>
      `;
    },

    _populateDetailTransactionToModal(transactionRecord) {
      if (!(typeof transactionRecord === 'object')) {
        throw new Error(`Parameter transactionRecord should be an object. The value is ${transactionRecord}`);
      }
      const imgDetailRecord = document.querySelector('#recordDetailModal #imgDetailRecord');
      const imgProfileDetailRecord = document.querySelector('#recordDetailModal #imgProfileDetailRecord');
      const nameDetailRecord = document.querySelector('#recordDetailModal #nameDetailRecord');
      const dateDetailRecord = document.querySelector('#recordDetailModal #dateDetailRecord');
      const descriptionDetailRecord = document.querySelector('#recordDetailModal #descriptionDetailRecord');
      imgDetailRecord.setAttribute('src', transactionRecord.photoUrl);
      imgDetailRecord.setAttribute('alt', transactionRecord.name);
      const profileImagePath = this._getStaticProfileImage();
      imgProfileDetailRecord.setAttribute('src', profileImagePath);
      imgProfileDetailRecord.setAttribute('alt', 'Profil Image');
      nameDetailRecord.textContent = transactionRecord.name;
      dateDetailRecord.textContent = this._formatDate(transactionRecord.createdAt);
      descriptionDetailRecord.textContent = transactionRecord.description;
    },

    _getStaticProfileImage() {
      return '/profile.png';
    },
      
    _formatDate(dateString) {
      const date = new Date(dateString);
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return new Intl.DateTimeFormat('id-ID', options).format(date);
    },
  
  };
  
export default Dashboard;
  