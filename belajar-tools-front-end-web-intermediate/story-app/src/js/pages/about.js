const About = {
  async init() {
    await this._initialData();
  },
  
  async _initialData() {
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
      });
    }
  }
};
  
export default About;