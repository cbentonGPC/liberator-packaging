/* site.js — Liberator Packaging shared JS */
(function () {
  'use strict';

  /* ── HAMBURGER MENU ── */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  function closeMenu() {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('body-menu-open');
    navLinks.querySelectorAll('.has-dropdown.open').forEach(function (li) {
      li.classList.remove('open');
    });
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('body-menu-open', isOpen);
      if (!isOpen) {
        navLinks.querySelectorAll('.has-dropdown.open').forEach(function (li) {
          li.classList.remove('open');
        });
      }
    });

    /* mobile dropdown toggles — tap header to expand/collapse */
    navLinks.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          link.closest('.has-dropdown').classList.toggle('open');
        }
      });
    });

    /* close menu when a non-dropdown-header link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        /* skip dropdown parent headers — they toggle the sub-menu, not close the nav */
        if (link.parentElement && link.parentElement.classList.contains('has-dropdown')) return;
        closeMenu();
      });
    });

    /* close on outside click */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('nav') && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }
})();
