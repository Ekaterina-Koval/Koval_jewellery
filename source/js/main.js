'use strict';

const body = document.querySelector('.page__body');


body.classList.remove('nojs');

(() => {
  const header = body.querySelector('.page-header');
  const navMain = body.querySelector('.nav');
  const navToggle = body.querySelector('.nav__toggle');
  const navLinks = body.querySelectorAll('.nav a');
  const logo = body.querySelector('.logo');
  const navSvitches = () => {
    if (navMain.classList.contains('nav--open')) {
      navMain.classList.remove('nav--open');
      navMain.classList.add('nav--close');
      header.classList.remove('page-header--nav');
      header.classList.add('page-header--nonav');
      logo.classList.remove('logo--nav');
      logo.classList.add('logo--nonav');
      body.classList.remove('not-available');
    } else {
      navMain.classList.add('nav--open');
      navMain.classList.remove('nav--close');
      header.classList.add('page-header--nav');
      header.classList.remove('page-header--nonav');
      logo.classList.add('logo--nav');
      logo.classList.remove('logo--nonav');
      body.classList.add('not-available');
    }
  };
  navToggle.addEventListener('click', navSvitches);
  if (window.matchMedia('(max-width: 1024px)').matches) {
    navLinks.forEach(link => {
      link.addEventListener('click', navSvitches);
    });
  }
})();

(() => {
  const popupEvents = (popupOpenButtonClassName, popupId) => {
    const popupOpen = document.querySelectorAll(`.${popupOpenButtonClassName}`);
    const showPopup = (evt) => {
      evt.preventDefault();
      const popupTemplate = body.querySelector(`#${popupId}`).content.querySelector('.popup');
      const popup = popupTemplate.cloneNode(true);
      const overlay = document.createElement('div');
      body.appendChild(overlay);
      overlay.classList.add('overlay');
      document.body.append(popup);
      const popupCloseButton = body.querySelector('.popup__close-button');
      if (body.getElementsByClassName('popup').length > 0) {
        body.classList.add('not-available');

        const escClose = (e) => {
          const escKeycode = 27;
          if (e.keyCode === escKeycode) {
            e.preventDefault();
            popup.remove();
            body.classList.remove('not-available');
            overlay.classList.remove('overlay');
            document.removeEventListener('keydown', escClose);
          }
        };
        const buttonClose = () => {
          if (evt.target.className !== 'popup') {

            evt.preventDefault();
            popup.remove();
            body.classList.remove('not-available');
            overlay.classList.remove('overlay');
            popupCloseButton.removeEventListener('click', buttonClose);
          }
        };
        const clickClose = () => {
          if (evt.target.className !== 'popup') {
            popup.remove();
            body.classList.remove('not-available');
            overlay.classList.remove('overlay');
            document.removeEventListener('click', clickClose);
          }
        };
        popupCloseButton.addEventListener('click', buttonClose);
        document.addEventListener('keydown', escClose);
        overlay.addEventListener('click', clickClose);
      }
    };
    popupOpen.forEach((buttonItem) => buttonItem.addEventListener('click', showPopup));
  };
  popupEvents('user__popup', 'login');
  popupEvents('filters__open-button', 'filters');
})();
