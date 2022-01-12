'use strict';

const body = document.querySelector('.page__body');

const form = body.querySelector('.subscription__form');
const email = document.querySelector('#email');

body.classList.remove('nojs');

let isStorageSupport = true;
let storageEmail = '';
try {
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

if (storageEmail) {
  email.value = storageEmail;
}

if (form) {
  form.addEventListener('submit', () => {
    if (isStorageSupport) {
      if (email.value) {
        localStorage.setItem('email', email.value);
      }
    }
  });
}

(() => {
  const header = body.querySelector('.page-header');
  if (header) {
    const headerToggle = body.querySelector('.page-header__toggle');
    const navLinks = body.querySelectorAll('nav a');
    const navSvitches = () => {
      if (header.classList.contains('page-header--open')) {
        header.classList.remove('page-header--open');
        header.classList.add('page-header--close');
        body.classList.remove('not-available');
      } else {
        header.classList.add('page-header--open');
        header.classList.remove('page-header--close');
        body.classList.add('not-available');
      }
    };
    headerToggle.addEventListener('click', navSvitches);
    navLinks.forEach(link => {
      link.addEventListener('click', navSvitches);
    });
  }
})();

(() => {
  const popupEvents = (popupOpenButtonClassName, popupCloseButtonClassName, popupId) => {
    const popupOpen = document.querySelectorAll(`.${popupOpenButtonClassName}`);
    const showPopup = (evt) => {
      evt.preventDefault();
      const popupTemplate = body.querySelector(`#${popupId}`).content.querySelector('.popup');
      const popup = popupTemplate.cloneNode(true);
      const overlay = document.createElement('div');
      body.appendChild(overlay);
      overlay.classList.add('overlay');
      document.body.append(popup);
      const eMail = popup.querySelector('#e-mail');
      eMail.focus();
      const popupCloseButton = body.querySelector(`.${popupCloseButtonClassName}`);
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
  popupEvents('user__popup', 'login__close-button', 'login');
  popupEvents('nav__link--login', 'login__close-button', 'login');
})();

(() => {
  const filtersOpenButton = document.querySelector('.filters__open-button');
  if (filtersOpenButton) {
    const filtersCloseButton = document.querySelector('.filters__close-button');
    const filters = document.querySelector('.filters__wrapper');
    const showFilters = (evt) => {
      evt.preventDefault();
      filters.classList.add('filters__wrapper--open');
      filters.classList.remove('filters__wrapper--close');
    };
    const closeFilters = (evt) => {
      evt.preventDefault();
      filters.classList.add('filters__wrapper--close');
      filters.classList.remove('filters__wrapper--open');
    };
    filtersOpenButton.addEventListener('click', showFilters);
    filtersCloseButton.addEventListener('click', closeFilters);
  }
})();

(() => {
  const filtersForm = document.querySelector('.filters__form');
  const clearFormButton = document.querySelector('.filters__reset');

  if (clearFormButton) {
    clearFormButton.addEventListener('click', () => {
      filtersForm.reset();
    });
  }
})();
