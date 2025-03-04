const Add = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
    }
  },

  _getFormData() {
    const descriptionInput = document.querySelector('#validationCustomDescription');
    const photoInput = document.querySelector('#validationCustomPhoto');

    return {
      description: descriptionInput.value,
      photo: photoInput.files[0],  
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    if (formData.photo && formData.photo.size > 5000000) { 
      alert('File size exceeds the limit of 5MB');
      return false;
    }

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
