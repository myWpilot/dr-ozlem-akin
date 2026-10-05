/**
 * Shared Header & Footer Component
 * drozlemakin.com.tr
 * Değişiklik için SADECE bu dosyayı düzenleyin.
 */

(function() {
  const lang = document.documentElement.lang || 'tr';
  const isTR = lang === 'tr';
  const base = isTR ? '' : '../';

  /* ─── NAV ─── */
  const navLinks = isTR
    ? `<li><a href="${base}index.html#kariyer">Kariyer</a></li>
       <li><a href="${base}index.html#uzmanlik">Uzmanlık</a></li>
       <li><a href="${base}index.html#yayinlar">Yayınlar</a></li>
       <li><a href="${base}index.html#yorumlar">Görüşler</a></li>
       <li><a href="${base}index.html#iletisim">İletişim</a></li>
       <li><a href="${base}en/index.html" class="lang-switch">EN</a></li>`
    : `<li><a href="${base}en/index.html#career">Career</a></li>
       <li><a href="${base}en/index.html#expertise">Expertise</a></li>
       <li><a href="${base}en/index.html#publications">Publications</a></li>
       <li><a href="${base}en/index.html#reviews">Reviews</a></li>
       <li><a href="${base}en/index.html#contact">Contact</a></li>
       <li><a href="${base}index.html" class="lang-switch">TR</a></li>`;

  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `
    <a class="nav-logo" href="${base}${isTR ? 'index.html' : 'en/index.html'}">Dr. Özlem Akın</a>
    <button class="nav-hamburger" aria-label="Menü" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="nav-menu">${navLinks}</ul>`;

  document.body.insertBefore(nav, document.body.firstChild);

  /* hamburger toggle */
  const btn = nav.querySelector('.nav-hamburger');
  const menu = nav.querySelector('#nav-menu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  /* close on link click */
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); });
  });

  /* ─── FOOTER ─── */
  const footerText = isTR
    ? `© 2026 Dr. Özlem Akın · Tüm hakları saklıdır. ·
       <a href="https://yeditepehastaneleri.com/doktorlar/ozlem-akin" target="_blank" rel="noopener">Yeditepe Üniversitesi Hastaneleri</a>
       · Tasarım &amp; Geliştirme: <a href="mailto:volkanerentam@gmail.com">Volkan Eren</a>`
    : `© 2026 Dr. Özlem Akın · All rights reserved. ·
       <a href="https://yeditepehastaneleri.com/doktorlar/ozlem-akin" target="_blank" rel="noopener">Yeditepe University Hospitals</a>
       · Design &amp; Development: <a href="mailto:volkanerentam@gmail.com">Volkan Eren</a>`;

  const footer = document.createElement('footer');
  footer.innerHTML = footerText;
  document.body.appendChild(footer);

})();
