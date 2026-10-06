/**
 * Shared Header & Footer Component
 * drozlemakin.com.tr
 * Değişiklik için SADECE bu dosyayı düzenleyin.
 */

(function() {
  const lang = document.documentElement.lang || 'tr';
  const isTR = lang === 'tr';
  const path = window.location.pathname;

  /* ─── AKTİF SAYFA TESPİTİ ─── */
  function isActive(href) {
    if (href.startsWith('/#') || href.startsWith('/en/#')) return false;
    return path === href || path === href + 'index.html';
  }
  function a(href, label, cls) {
    const active = isActive(href) ? ' active" aria-current="page' : '';
    const extra = cls ? ` ${cls}` : '';
    return `<a href="${href}" class="${(cls||'') + active}">${label}</a>`;
  }

  /* ─── NAV LİNKLERİ ─── */
  const navLinks = isTR
    ? `<li>${a('/#kariyer',            'Kariyer')}</li>
       <li>${a('/uzmanlik-alanlari/',  'Uzmanlık Alanları')}</li>
       <li>${a('/yayinlar/',           'Yayınlar')}</li>
       <li>${a('/hakkinda/',           'Hakkında')}</li>
       <li>${a('/#yorumlar',           'Görüşler')}</li>
       <li>${a('/#iletisim',           'İletişim')}</li>
       <li>${a('/en/',                 'EN', 'lang-switch')}</li>`
    : `<li>${a('/en/#career',          'Career')}</li>
       <li>${a('/en/expertise/',       'Expertise')}</li>
       <li>${a('/en/publications/',    'Publications')}</li>
       <li>${a('/en/about/',           'About')}</li>
       <li>${a('/en/#reviews',         'Reviews')}</li>
       <li>${a('/en/#contact',         'Contact')}</li>
       <li>${a('/',                    'TR', 'lang-switch')}</li>`;

  /* ─── NAV STİLLERİ (sadece components.js kullanan sayfalarda inject edilir) ─── */
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    #site-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid #E5EAF0; padding: 0 clamp(1rem,5vw,3rem); display: flex; align-items: center; justify-content: space-between; height: 60px; }
    @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) #site-nav { background: rgba(15,17,23,0.92); border-color: #1e2535; } }
    :root[data-theme="dark"] #site-nav { background: rgba(15,17,23,0.92); border-color: #1e2535; }
    .nav-logo { font-size: 1.1rem; font-weight: 700; color: #1A5FB8; text-decoration: none; white-space: nowrap; }
    .nav-links { display: flex; gap: clamp(0.5rem,2vw,1.5rem); list-style: none; align-items: center; margin: 0; padding: 0; }
    .nav-links a { font-size: 0.85rem; font-weight: 500; color: #374151; text-decoration: none; transition: color 0.2s; }
    .nav-links a:hover, .nav-links a.active { color: #2F80ED; }
    .nav-links a.active { font-weight: 600; }
    .nav-links a.lang-switch { border: 1.5px solid #2F80ED; border-radius: 20px; padding: 0.15rem 0.6rem; font-size: 0.78rem; color: #2F80ED; }
    .nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
    .nav-hamburger span { width: 22px; height: 2px; background: #1F2937; border-radius: 2px; transition: all 0.25s; }
    @media (max-width: 768px) {
      .nav-hamburger { display: flex; }
      .nav-links { display: none; position: absolute; top: 60px; left: 0; right: 0; background: #fff; flex-direction: column; gap: 0; padding: 0.5rem 0; box-shadow: 0 6px 20px rgba(0,0,0,0.1); border-bottom: 1px solid #E5EAF0; }
      .nav-links.open { display: flex; }
      .nav-links li { width: 100%; }
      .nav-links a { display: block; padding: 0.85rem 1.5rem; font-size: 0.95rem; }
      .nav-links a.lang-switch { margin: 0.5rem 1.5rem; display: inline-block; width: auto; }
    }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) .nav-links { background: #0f1117; }
      :root:not([data-theme="light"]) .nav-links a { color: #cbd5e1; }
      :root:not([data-theme="light"]) .nav-hamburger span { background: #e2e8f0; }
    }
    :root[data-theme="dark"] .nav-links { background: #0f1117; }
    :root[data-theme="dark"] .nav-links a { color: #cbd5e1; }
    :root[data-theme="dark"] .nav-hamburger span { background: #e2e8f0; }
    footer { background: #1F2937; color: rgba(255,255,255,0.9); text-align: center; padding: 1.5rem 1rem; font-size: 0.82rem; font-weight: 500; }
    footer a { color: #fff; text-decoration: underline; font-weight: 600; }
  `;
  document.head.appendChild(navStyle);

  /* ─── NAV INJECT ─── */
  const logoHref = isTR ? '/' : '/en/';
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', isTR ? 'Ana navigasyon' : 'Main navigation');
  nav.innerHTML = `
    <a class="nav-logo" href="${logoHref}">Dr. Özlem Akın</a>
    <button class="nav-hamburger" aria-label="${isTR ? 'Menü' : 'Menu'}" aria-expanded="false">
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
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); });
  });

  /* ─── FOOTER INJECT ─── */
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
