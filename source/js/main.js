'use strict';

const body = document.querySelector('.page__body');
const header = body.querySelector('.page-header');
const navMain = body.querySelector('.nav');
const navToggle = body.querySelector('.nav__toggle');
const navLinks = body.querySelectorAll('.nav a');
const logo = body.querySelector('.logo');
const user = body.querySelector('.user');

body.classList.remove('nojs');
navMain.classList.add('nav--opened');
user.classList.add('user--nonav');
logo.classList.add('logo--nonav');
header.classList.add('page-header--nonav');


const navSvitches = () => {
  if (navMain.classList.contains('nav--closed')) {
    navMain.classList.remove('nav--closed');
    navMain.classList.add('nav--opened');
    header.classList.remove('page-header--nav');
    header.classList.add('page-header--nonav');
    logo.classList.remove('logo--nav');
    logo.classList.add('logo--nonav');
    user.classList.remove('user--nav');
    user.classList.add('user--nonav');

    /*
    pageMain.classList.remove('not-available');
    pageFooter.classList.remove('not-available');
    headerMain.classList.remove('not-available');
    */
  } else {
    navMain.classList.add('nav--closed');
    navMain.classList.remove('nav--opened');
    header.classList.add('page-header--nav');
    header.classList.remove('page-header--nonav');
    logo.classList.add('logo--nav');
    logo.classList.remove('logo--nonav');
    user.classList.add('user--nav');
    user.classList.remove('user--nonav');
    /*
    pageMain.classList.add('not-available');
    pageFooter.classList.add('not-available');
    headerMain.classList.add('not-available');
    */
  }
};

navToggle.addEventListener('click', navSvitches);
navLinks.forEach(link => {
  link.addEventListener('click', navSvitches);
});
