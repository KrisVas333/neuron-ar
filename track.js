/*!
 * BrAIn Track — vienas tracker'is VISIEMS Kris'o artefaktams
 * ----------------------------------------------------------
 * Kanoninis šaltinis: https://krisvas333.github.io/neuron-ar/track.js
 * Repo:               neuron-ar/track.js  (kopija: Kris BrAIn/assets/track.js)
 *
 * KAIP PRIDĖTI PRIE BET KURIO ARTEFAKTO — viena eilutė į <head>:
 *
 *   <script defer src="https://krisvas333.github.io/neuron-ar/track.js"
 *           data-brand="brainclub" data-artifact="vaiko-zemelapis" data-kind="map"></script>
 *
 * brand:    brainclub | ra | exoclass | bureliai | raic | kris
 * kind:     map | quiz | game | landing | tool | deck
 * artifact: trumpas slug'as, unikalus (pvz. vaiko-zemelapis, darzelis, testas)
 *
 * PRIVATUMAS (GDPR): jokių slapukų, jokių asmens duomenų, jokio banner'io.
 * NIEKADA nesiųsk čia: vardų, el. paštų, vaiko duomenų, atsakymų į testą.
 *
 * ═══════════════════════════════════════════════════════════════
 * 6 STANDARTINIAI ĮVYKIAI — vienodi VISUOSE artefaktuose.
 * Todėl gali palyginti žaidimą su žemėlapiu vienoje lentelėje.
 *
 *   open    ← automatiškai · atidarė
 *   engage  ← automatiškai · pirmas tikras prisilietimas (SUPRATO ką daryti)
 *   dwell   ← automatiškai · 10s / 30s / 2min / 5min (gylis)
 *   value   ← RANKINIS    · artefakto esmė įvyko (kelias / testas baigtas / lygis)
 *   cta     ← RANKINIS    · paspaudė link pinigų ar el. pašto
 *   share   ← automatiškai · pasidalino
 *   error   ← automatiškai · lūžo (SVARBIAUSIA telefonuose)
 *
 * Piltuvėlis, kurį gauni nemokamai:  open → engage → value → cta
 * ═══════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ⚠️ VIENINTELĖ VIETA, kurią reikia užpildyti po Umami registracijos.
  var WEBSITE_ID = '__UMAMI_ID__';
  var HOST = 'https://cloud.umami.is';

  var me = document.currentScript;
  var BRAND    = (me && me.dataset.brand)    || 'unknown';
  var ARTIFACT = (me && me.dataset.artifact) || location.pathname.replace(/\/$/, '').split('/').pop() || 'root';
  var KIND     = (me && me.dataset.kind)     || 'page';

  if (WEBSITE_ID.indexOf('__') === 0) {
    console.warn('[brain-track] WEBSITE_ID neįrašytas — sekimas išjungtas.');
    window.bt = function () {};
    return;
  }

  // --- Umami įkėlimas (cookieless, be banner'io) ---
  var s = document.createElement('script');
  s.defer = true;
  s.src = HOST + '/script.js';
  s.setAttribute('data-website-id', WEBSITE_ID);
  s.setAttribute('data-auto-track', 'false'); // patys valdom, ką siunčiam
  document.head.appendChild(s);

  // --- Bendras siuntėjas: KIEKVIENAS įvykis automatiškai pažymimas brand/artifact/kind ---
  var queue = [];
  function send(name, props) {
    var payload = Object.assign({ brand: BRAND, artifact: ARTIFACT, kind: KIND }, props || {});
    if (window.umami && window.umami.track) window.umami.track(name, payload);
    else queue.push([name, payload]);       // dar neįsikėlė — pastatom į eilę
  }
  s.addEventListener('load', function () {
    queue.splice(0).forEach(function (a) { window.umami.track(a[0], a[1]); });
  });

  /** Viešas API artefaktams: bt('value', {...}) */
  window.bt = send;

  // --- 1. open (automatiškai) ---
  send('open', {
    lang: (document.documentElement.lang || navigator.language || '').slice(0, 2),
    w: innerWidth,
    touch: ('ontouchstart' in window) ? 1 : 0,
    ref: (document.referrer || '').split('/')[2] || 'direct'   // tik domenas, ne pilnas URL
  });

  // --- 2. engage: pirmas TIKRAS prisilietimas (ne scroll'as) ---
  var engaged = false;
  function engage(e) {
    if (engaged) return;
    engaged = true;
    send('engage', { t: Math.round((performance.now()) / 100) / 10 }); // sekundės iki pirmo veiksmo
  }
  ['pointerdown', 'keydown'].forEach(function (t) {
    addEventListener(t, engage, { once: true, passive: true, capture: true });
  });

  // --- 3. dwell: gylio matavimas be sesijų sekimo ---
  [10, 30, 120, 300].forEach(function (sec) {
    setTimeout(function () {
      if (document.visibilityState === 'visible') send('dwell', { s: sec });
    }, sec * 1000);
  });

  // --- 4. share (automatiškai) ---
  var _share = navigator.share && navigator.share.bind(navigator);
  if (_share) navigator.share = function (d) { send('share', { how: 'native' }); return _share(d); };
  addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="facebook"],a[href*="wa.me"],a[href*="messenger"],a[href*="linkedin"],[data-share]');
    if (a) send('share', { how: 'link' });
  }, { passive: true, capture: true });

  // --- 5. error: kodėl telefonai krenta ---
  var errCount = 0;
  addEventListener('error', function (e) {
    if (errCount++ > 3) return;                        // neužtvindom
    send('error', {
      msg: String(e.message || 'unknown').slice(0, 90),
      line: e.lineno || 0
    });
  });
  addEventListener('unhandledrejection', function (e) {
    if (errCount++ > 3) return;
    send('error', { msg: ('promise: ' + (e.reason && e.reason.message || e.reason)).slice(0, 90) });
  });
})();
