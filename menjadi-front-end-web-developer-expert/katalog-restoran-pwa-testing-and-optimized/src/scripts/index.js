import 'regenerator-runtime';
import '../styles/main.css';
import './components/index.js';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('navbar-menu'),
  drawer: document.querySelector('.nav__list'),
  content: document.querySelector('main'),
  hero: document.querySelector('hero-element'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

console.log('Hello Coders! :)');
