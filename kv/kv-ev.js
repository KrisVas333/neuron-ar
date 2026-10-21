/*!
 * kv-ev.js · decision events for Kris pages → Supabase kris-life-os.public.kv_events (+ Umami via bt, + Clarity event if consented)
 * Served at: https://krisvas333.github.io/neuron-ar/kv/kv-ev.js   (added 2026-10-21, rule 16)
 *
 *   <script src="https://krisvas333.github.io/neuron-ar/kv/kv-ev.js" data-page="sveiki" data-mode="full" defer></script>
 *
 * Why: track.js → Umami has no API key in the brain, so nobody could READ the numbers. kv_events is ours:
 * bin/welcome-te-readout.py reads it (token RPC), and every event answers one decision (see wiki/meta/tracking-plan-welcome-te-2026-10.md).
 *
 * PRIVACY: no cookies, no localStorage, no ids, no free text, no names/emails. anon key = INSERT only (RLS).
 * Sent per event: page · event · src (?src or utm_source) · utm_* · referrer HOST (not URL) · mode · tiny props.
 * data-mode="kids": same anonymous events, never calls Clarity.
 *
 * API (all optional, declarative first):
 *   auto     page_view (once) · print (once, browser print) · seen {s} for each [data-kv-seen="name"] when it enters the viewport (once)
 *   click    <a|button data-kv="pdf_download" data-kv-p="kids">   → event pdf_download {v:"kids", to:<host or path>}
 *   change   <input type=checkbox data-kv="tick" data-kv-p="01">   → event tick {v:"01", on:true|false}
 *   code     window.kvEv('audio_50', {}, {once:true})
 */
(function () {
  'use strict';
  if (window.kvEv) return;
  var U = 'https://iiekmeylpppczicrsxho.supabase.co/rest/v1/kv_events';
  var K = 'sb_publishable_iJC59f30YJm7hU4OwZsLDQ_9FN-ygzF'; // publishable: public by design, INSERT only
  var me = document.currentScript;
  var MODE = me && me.getAttribute('data-mode') === 'kids' ? 'kids' : 'full';
  var PAGE = ((me && me.getAttribute('data-page')) || location.pathname).slice(0, 60);
  function cut(v, n) { return v ? String(v).slice(0, n) : null; }
  var q = null;
  try { q = new URLSearchParams(location.search); } catch (e) {}
  function g(k) { return q ? q.get(k) : null; }
  var ref = null;
  try { if (document.referrer) { var h = new URL(document.referrer).host; if (h && h !== location.host) ref = h; } } catch (e) {}
  var base = {
    page: PAGE, mode: MODE, ref_host: cut(ref, 80),
    src: cut(g('src') || g('utm_source') || 'direct', 40),
    utm_source: cut(g('utm_source'), 40), utm_medium: cut(g('utm_medium'), 40), utm_campaign: cut(g('utm_campaign'), 60)
  };
  var done = {}, n = 0;
  function send(event, props, opts) {
    if (!event || n >= 80) return;
    var key = event + '|' + JSON.stringify(props || {});
    if (opts && opts.once) { if (done[key]) return; done[key] = 1; }
    n++;
    var row = { event: cut(event, 40), props: props || null };
    for (var k in base) row[k] = base[k];
    try {
      fetch(U, { method: 'POST', keepalive: true, body: JSON.stringify(row),
        headers: { 'Content-Type': 'application/json', apikey: K, Authorization: 'Bearer ' + K, Prefer: 'return=minimal' } })
        .catch(function () {});
    } catch (e) {}
    try {
      if (window.bt) { var p = { page: PAGE, src: base.src }; for (var j in props || {}) p[j] = props[j]; window.bt(event, p); }
    } catch (e) {}
    try { if (MODE !== 'kids' && typeof window.clarity === 'function') window.clarity('event', event); } catch (e) {}
  }
  window.kvEv = send;
  send('page_view', null, { once: true });

  addEventListener('beforeprint', function () { send('print', null, { once: true }); });

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest && e.target.closest('[data-kv]');
    if (!el || el.tagName === 'INPUT') return;
    var p = {}, v = el.getAttribute('data-kv-p');
    if (v) p.v = v.slice(0, 40);
    var href = el.getAttribute('href');
    if (href) { try { var u = new URL(href, location.href); p.to = (u.host === location.host ? u.pathname : u.host).slice(0, 80); } catch (x) {} }
    send(el.getAttribute('data-kv'), p);
  }, { capture: true, passive: true });

  document.addEventListener('change', function (e) {
    var el = e.target;
    if (!el || el.tagName !== 'INPUT' || !el.hasAttribute('data-kv')) return;
    send(el.getAttribute('data-kv'), { v: (el.getAttribute('data-kv-p') || '').slice(0, 40), on: !!el.checked });
  }, { capture: true, passive: true });

  function watch() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (!x.isIntersecting) return;
        send('seen', { s: (x.target.getAttribute('data-kv-seen') || '').slice(0, 40) }, { once: true });
        io.unobserve(x.target);
      });
    }, { threshold: 0.01 });
    var els = document.querySelectorAll('[data-kv-seen]');
    for (var i = 0; i < els.length; i++) io.observe(els[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
})();
