/*!
 * kv-track.js · one tracking line for every public Kris page (CLAUDE.md rule 16, 2026-09-30)
 * Served at: https://krisvas333.github.io/neuron-ar/kv/kv-track.js
 *
 *   <script src="https://krisvas333.github.io/neuron-ar/kv/kv-track.js" data-mode="full" defer></script>
 *
 * data-mode="full" (default) · parents / providers / team pages
 *   - always: anonymous cookieless events (Umami via ../track.js): open, engage, dwell,
 *     kv_view {repo, path, src}, kv_click {el, href, txt}
 *   - Microsoft Clarity (krisvas project y4gk0je1j0) loads ONLY after „Leisti".
 *     Choice is remembered in localStorage (same origin for all krisvas333.github.io repos).
 *     Sessions are tagged repo + path + src so one Clarity project filters per page.
 * data-mode="kids" · pages children use
 *   - NO banner, NO Clarity, NO cookies, NO localStorage, no click text. Anonymous events only.
 *
 * Skips what the page already has: an existing track.js is reused, an existing Clarity tag
 * means this file adds no Clarity and no banner. Change consent: kvConsent('grant'|'deny'|'reset').
 */
(function () {
  'use strict';
  if (window.__kvTrack) return;
  window.__kvTrack = 1;

  var CLARITY_ID = 'y4gk0je1j0';
  var TRACK_SRC = 'https://krisvas333.github.io/neuron-ar/track.js';
  var KEY = 'kv-consent';

  var me = document.currentScript;
  var MODE = me && me.getAttribute('data-mode') === 'kids' ? 'kids' : 'full';
  var KIDS = MODE === 'kids';

  var seg = location.pathname.split('/').filter(Boolean);
  var onPages = location.hostname === 'krisvas333.github.io';
  var REPO = onPages ? (seg[0] || 'root') : location.hostname;
  var PATH = ('/' + (onPages ? seg.slice(1) : seg).join('/')).slice(0, 120);
  var SRC = 'direct';
  try {
    var q = new URLSearchParams(location.search);
    SRC = (q.get('src') || q.get('utm_source') || 'direct').slice(0, 40);
  } catch (e) {}

  /* ---------- 1. anonymous events (cookieless) ---------- */
  var pending = [];
  function ev(name, props) {
    var p = { repo: REPO, path: PATH, src: SRC, mode: MODE };
    for (var k in props || {}) p[k] = props[k];
    try { if (window.bt) window.bt(name, p); else pending.push([name, p]); } catch (e) {}
  }
  function flush() {
    if (!window.bt) return false;
    pending.splice(0).forEach(function (a) { try { window.bt(a[0], a[1]); } catch (e) {} });
    return true;
  }

  var hasTracker = !!window.bt;
  if (!hasTracker) {
    var ss = document.getElementsByTagName('script');
    for (var i = 0; i < ss.length; i++) {
      if (/(^|\/)track\.js(\?|$)/.test(ss[i].getAttribute('src') || '')) { hasTracker = true; break; }
    }
  }
  if (!hasTracker) {
    var t = document.createElement('script');
    t.src = TRACK_SRC;
    t.defer = true;
    t.setAttribute('data-brand', 'kris');
    t.setAttribute('data-artifact', (REPO + PATH).replace(/\/$/, '').slice(0, 80));
    t.setAttribute('data-kind', KIDS ? 'kids' : 'page');
    t.addEventListener('load', flush);
    document.head.appendChild(t);
  } else {
    // page's own track.js may still be loading: retry for ~10 s
    var tries = 0;
    (function wait() { if (!flush() && tries++ < 20) setTimeout(wait, 500); })();
  }

  ev('kv_view', {});

  var clicks = 0;
  document.addEventListener('click', function (e) {
    if (clicks >= 25 || !e.target || !e.target.closest) return;
    var el = e.target.closest('a,button,[role="button"],summary,input[type="submit"],input[type="button"],[data-track]');
    if (!el) return;
    clicks++;
    var p = { el: el.tagName.toLowerCase(), id: (el.id || '').slice(0, 30) };
    var href = el.getAttribute('href');
    if (href) {
      try {
        var u = new URL(href, location.href);
        p.href = u.host === location.host ? u.pathname.slice(0, 80) : u.host;
      } catch (x) {}
    }
    if (!KIDS && el.tagName !== 'INPUT') p.txt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30);
    ev('kv_click', p);
  }, { passive: true, capture: true });

  if (KIDS) return;

  /* ---------- 2. Clarity, only after consent (full mode) ---------- */
  if (window.clarity || document.querySelector('script[src*="clarity.ms"]')) return; // page runs its own

  function getC() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setC(v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) {} }

  var clarityOn = false;
  function loadClarity() {
    if (clarityOn) return;
    clarityOn = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    try {
      window.clarity('consent');
      window.clarity('set', 'repo', REPO);
      window.clarity('set', 'path', PATH);
      window.clarity('set', 'src', SRC);
    } catch (e) {}
  }

  var host = null;
  function hide() { if (host && host.parentNode) host.parentNode.removeChild(host); host = null; }

  function choose(v) {
    setC(v);
    hide();
    ev('kv_consent', { v: v });
    if (v === 'grant') loadClarity();
  }

  function banner() {
    if (host || !document.body) return;
    host = document.createElement('div');
    host.setAttribute('data-kv-consent', '');
    var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    root.innerHTML =
      '<style>' +
      ':host{all:initial}' +
      '.b{position:fixed;left:16px;right:16px;bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483000;' +
      'max-width:560px;margin:0 auto;box-sizing:border-box;background:#FFFFFF;color:#0A0A0A;' +
      'border:1px solid #0A0A0A;border-radius:4px;padding:14px 16px;box-shadow:0 4px 18px rgba(0,0,0,.12);' +
      'font:400 16px/1.5 Inter,-apple-system,"Segoe UI",system-ui,sans-serif;letter-spacing:.01em;' +
      'display:flex;flex-wrap:wrap;gap:10px 12px;align-items:center}' +
      'p{margin:0;flex:1 1 260px}' +
      'b{font-weight:600}' +
      '.r{display:flex;gap:8px}' +
      'button{font:600 16px/1 Inter,-apple-system,system-ui,sans-serif;min-height:44px;min-width:72px;padding:0 16px;' +
      'border-radius:4px;cursor:pointer;border:1px solid #0A0A0A;background:#FFFFFF;color:#0A0A0A}' +
      'button.y{background:#D90429;border-color:#D90429;color:#FFFFFF}' +
      'button:focus-visible{outline:3px solid #0A0A0A;outline-offset:2px}' +
      '</style>' +
      '<div class="b" role="region" aria-label="Sutikimas dėl sekimo">' +
      '<p>Leisk <b>Microsoft Clarity</b> įrašyti paspaudimus ir slinkimą, kad matytume, kur puslapis painus, ir jį taisytume. ' +
      'Be sutikimo renkam tik anoniminę statistiką, be slapukų.</p>' +
      '<div class="r"><button class="y" type="button" data-v="grant">Leisti</button>' +
      '<button type="button" data-v="deny">Ne</button></div></div>';
    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-v]') : null;
      if (b) choose(b.getAttribute('data-v'));
    });
    document.body.appendChild(host);
  }

  window.kvConsent = function (v) {
    if (v === 'reset') { setC(null); banner(); return; }
    choose(v === 'grant' ? 'grant' : 'deny');
  };

  var c = getC();
  if (c === 'grant') loadClarity();
  else if (c !== 'deny') {
    if (document.body) banner();
    else document.addEventListener('DOMContentLoaded', banner);
  }
})();
