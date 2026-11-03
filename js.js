document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var CLAVE = 'demoVisto';

  function marcarVisto() {
    try {
      sessionStorage.setItem(CLAVE, '1');
    } catch (e) {}
  }

  /* ---------- AVISO DE DEMOSTRACIÓN ---------- */
  var overlay = document.getElementById('demoOverlay');
  var demoBtn = document.getElementById('demoClose');
  var avisoAbierto = false;

  function cerrarAviso() {
    if (!avisoAbierto) return;
    avisoAbierto = false;
    marcarVisto();
    overlay.classList.add('is-hidden');
    body.classList.remove('no-scroll');
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 450);
  }

  if (overlay && demoBtn) {
    /* El script del <head> pone "demo-visto" si el aviso no debe salir */
    var ocultar = document.documentElement.classList.contains('demo-visto');

    if (ocultar) {
      overlay.style.display = 'none';
    } else {
      avisoAbierto = true;
      body.classList.add('no-scroll');
      demoBtn.addEventListener('click', cerrarAviso);
      demoBtn.focus();
    }
  }

  /* ---------- MENÚ HAMBURGUESA ---------- */
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('sideMenu');
  var backdrop = document.getElementById('menuBackdrop');

  function menuAbierto() {
    return menu.classList.contains('is-open');
  }

  function abrirMenu() {
    menu.classList.add('is-open');
    backdrop.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    body.classList.add('no-scroll');
  }

  function cerrarMenu() {
    menu.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    body.classList.remove('no-scroll');
  }

  if (toggle && menu && backdrop) {
    toggle.addEventListener('click', function () {
      if (menuAbierto()) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    backdrop.addEventListener('click', cerrarMenu);

    var enlaces = menu.querySelectorAll('a');
    for (var i = 0; i < enlaces.length; i++) {
      enlaces[i].addEventListener('click', cerrarMenu);
    }
  }

  /* ---------- TECLA ESC ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (avisoAbierto) {
      cerrarAviso();
    } else if (menu && menuAbierto()) {
      cerrarMenu();
      toggle.focus();
    }
  });
});