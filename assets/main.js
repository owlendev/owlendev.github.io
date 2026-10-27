(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var current = root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var next = current === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    drawStars();
  });

  // Mobile menu
  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('nav-links');
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // "Request a demo" pre-fills the email subject with the product name
  var email = document.getElementById('contact-email');
  var baseHref = email.getAttribute('href');
  document.querySelectorAll('.demo-link').forEach(function (a) {
    a.addEventListener('click', function () {
      var subject = 'Demo request: ' + a.dataset.product;
      email.setAttribute('href', baseHref.replace(/subject=[^&]*/, 'subject=' + encodeURIComponent(subject)));
    });
  });

  // Owl eyes follow the cursor, and blink now and then
  var owl = document.getElementById('big-owl');
  var pupils = owl.querySelector('.pupils');
  var lids = owl.querySelector('.lids');
  if (!reduceMotion) {
    window.addEventListener('pointermove', function (e) {
      var r = owl.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2);
      var dy = e.clientY - (r.top + r.height * 0.47);
      var dist = Math.hypot(dx, dy) || 1;
      var k = Math.min(1, dist / 300) * 3;
      pupils.style.transform = 'translate(' + (dx / dist) * k + 'px,' + (dy / dist) * k + 'px)';
    });
    (function blink() {
      setTimeout(function () {
        lids.classList.remove('blink');
        void lids.getBBox();
        lids.classList.add('blink');
        blink();
      }, 2500 + Math.random() * 4000);
    })();
  }

  // Starfield
  var canvas = document.getElementById('stars');
  var ctx = canvas.getContext('2d');
  var stars = [];
  function drawStars() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var rgb = getComputedStyle(root).getPropertyValue('--star').trim();
    if (!stars.length) {
      var n = Math.round((w * h) / 9000);
      for (var i = 0; i < n; i++) {
        stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2, a: Math.random() * 0.6 + 0.15 });
      }
    }
    ctx.clearRect(0, 0, w, h);
    stars.forEach(function (s) {
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + rgb + ',' + s.a * (rgb.indexOf('255') === 0 ? 1 : 0.35) + ')';
      ctx.fill();
    });
  }
  drawStars();
  window.addEventListener('resize', drawStars);

  // Fade sections in on scroll
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section .container > *').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
