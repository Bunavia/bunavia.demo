/* BUNAVIA visitor log. Our own, no outside tracker.
   Saves: pages, sections, clicks on buttons and links, searches, opened windows, booking steps,
   completed bookings, page errors, time on page and scroll depth.
   Never saves: IP address, names, emails, phone numbers, passport data, or anything typed in a form
   (except the flight search: airports, dates, passengers, class).
   A visit is a random code per browser tab (sessionStorage), no cookie. Turn off with BV_CONFIG.track=false. */
(function () {
  'use strict';
  var C = window.BV_CONFIG || {};
  if (C.track === false || window.__bvTrack) return;
  if (/^(localhost|127\.|\[::1\])/.test(location.hostname) && !/[?&]track=1/.test(location.search)) return;
  if (navigator.globalPrivacyControl === true) return; // browser asks not to be tracked
  var URL = 'https://sxhmsjnyddzdbexmrkok.supabase.co/rest/v1/rpc/track_events';
  var KEY = 'sb_publishable_Bq1gCMyeOtKvWzfjRb6hHw_dvPe2_ZQ';

  function rid() { var s = ''; try { var a = new Uint8Array(16); crypto.getRandomValues(a); for (var i = 0; i < a.length; i++) s += (a[i] % 36).toString(36); } catch (e) { s = Math.random().toString(36).slice(2, 14); } return (s + 'x0000000').slice(0, 16); }
  var sid = null;
  try { sid = sessionStorage.getItem('bv_v'); if (!/^[a-z0-9]{16}$/.test(sid || '')) { sid = rid(); sessionStorage.setItem('bv_v', sid); } } catch (e) { sid = rid(); }
  var dev = (function () { var w = Math.min(screen.width || innerWidth, innerWidth || 9999); return w < 700 ? 'm' : w < 1100 ? 't' : 'd'; })();
  function lang() { return String(document.documentElement.lang || 'en').slice(0, 5); }
  function page() { return location.pathname.replace(/\/index\.html$/, '/') || '/'; }

  var q = [], timer = null, sent = 0, MAX = 1200;
  function push(k, d) {
    if (sent >= MAX) return;
    sent++;
    q.push({ k: k, p: page(), d: d || undefined, v: dev, l: lang(), t: Date.now() });
    if (q.length >= 20) flush(); else if (!timer) timer = setTimeout(flush, 4000);
  }
  function flush(leaving) {
    clearTimeout(timer); timer = null;
    if (!q.length) return;
    var now = Date.now(), batch = q.splice(0, 40).map(function (e) { var o = { k: e.k, p: e.p, v: e.v, l: e.l, a: Math.max(0, now - e.t) }; if (e.d) o.d = e.d; return o; });
    try {
      fetch(URL, { method: 'POST', keepalive: true, mode: 'cors', credentials: 'omit',
        headers: { apikey: KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_session: sid, p_events: batch }) }).catch(function () {});
    } catch (e) {}
    if (q.length && !leaving) timer = setTimeout(flush, 1000);
  }

  // ---- helpers that keep personal data out ----
  function clean(s, n) {
    s = String(s || '').replace(/\s+/g, ' ').trim();
    if (/@|\d{6,}|\+\d{3}/.test(s)) return '';           // looks like an email, phone, ticket or card number
    return s.slice(0, n || 50);
  }
  function priv(el) { return !!(el && el.closest && el.closest('#acct,#chk,[data-private],.ckp,input[type=text],input[type=email],input[type=tel],textarea')); }
  function airport(v) { v = String(v || ''); var m = v.match(/\(([A-Z]{3})\)/) || v.match(/\b([A-Z]{3})\b/); return m ? m[1] : clean(v, 30); }
  function linkInfo(a) {
    try { var u = new window.URL(a.getAttribute('href'), location.href);
      if (u.protocol === 'tel:' || u.protocol === 'mailto:') return u.protocol.replace(':', '');
      if (/wa\.me|whatsapp/.test(u.hostname)) return 'whatsapp';
      return (u.host === location.host ? '' : u.host) + u.pathname + (u.hash && !/=/.test(u.hash) ? u.hash : '');
    } catch (e) { return ''; }
  }

  // ---- page view ----
  (function () {
    var d = {}, r = '';
    try { if (document.referrer) { var ru = new window.URL(document.referrer); if (ru.host !== location.host) r = ru.host.replace(/^www\./, ''); } } catch (e) {}
    if (r) d.r = r;
    var sp = new URLSearchParams(location.search), us = [];
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { var v = sp.get(k); if (v) us.push(v.slice(0, 40)); });
    if (sp.get('gclid')) us.push('google-ads'); if (sp.get('fbclid')) us.push('facebook');
    if (us.length) d.us = us.join(' / ');
    if (location.hash && !/=/.test(location.hash)) d.h = location.hash.slice(0, 40);
    d.w = innerWidth;
    push('view', d);
  })();

  addEventListener('hashchange', function () { if (!/=/.test(location.hash)) push('section', { h: location.hash.slice(0, 40) }); });
  var t0 = Date.now();
  document.addEventListener('langchange', function () { if (Date.now() - t0 > 2500) push('lang', { to: lang() }); });

  // ---- clicks ----
  document.addEventListener('click', function (ev) {
    var el = ev.target && ev.target.closest && ev.target.closest('a,button,summary,[role=button],[role=tab],[role=option],input[type=radio],input[type=checkbox],.aci,.ch,[data-day]');
    if (!el) return;
    if (el.tagName === 'INPUT' && el.closest('.ckp,[data-private]')) return; // passenger details: nothing
    var d = {}, p = priv(el);
    if (el.id) d.id = el.id.slice(0, 40);
    var box = el.closest('[id]'); if (box && box !== el) d.in = box.id.slice(0, 30);
    if (el.tagName === 'INPUT') { d.n = (el.name || el.id || '').slice(0, 30); d.val = el.type === 'checkbox' ? !!el.checked : clean(el.value, 30); }
    else if (!p) { var t = clean(el.getAttribute('aria-label') || el.textContent, 50); if (t) d.t = t; }
    if (el.tagName === 'A' && el.getAttribute('href')) { var h = linkInfo(el); if (h) d.h = h.slice(0, 80); }
    if (el.dataset && el.dataset.day) d.day = String(el.dataset.day).slice(0, 10);
    push('click', d);
  }, true);

  // ---- forms: the flight search in detail, other forms only by name ----
  document.addEventListener('submit', function (ev) {
    var f = ev.target; if (!f || f.tagName !== 'FORM') return;
    if (f.id === 'q') {
      var g = function (i) { var x = document.getElementById(i); return x ? x.value : ''; };
      var trip = (f.querySelector('[name=trip]:checked') || {}).value || '';
      push('search', { from: airport(g('from')), to: airport(g('to')), dep: g('dep').slice(0, 10), ret: trip === 'Return' ? g('ret').slice(0, 10) : undefined,
        trip: trip.slice(0, 12), pax: clean(g('pax'), 40), cabin: clean(g('cabin'), 20),
        direct: !!(document.getElementById('direct') || {}).checked, flex: !!(document.getElementById('flex') || {}).checked });
    } else push('submit', { id: (f.id || f.getAttribute('aria-label') || 'form').slice(0, 40) });
  });

  // ---- windows (booking, seats, calendar, account...) ----
  if (window.HTMLDialogElement) {
    ['showModal', 'show'].forEach(function (m) {
      var orig = HTMLDialogElement.prototype[m]; if (!orig) return;
      HTMLDialogElement.prototype[m] = function () { try { push('dialog', { id: (this.id || '').slice(0, 30) }); } catch (e) {} return orig.apply(this, arguments); };
    });
  }

  // ---- errors on the page (to find bugs) ----
  var errs = 0;
  addEventListener('error', function (e) {
    if (errs++ > 4 || !e || !e.message) return;
    push('error', { m: String(e.message).slice(0, 120), f: String(e.filename || '').split('/').pop().slice(0, 40) + ':' + (e.lineno || 0) });
  });

  // ---- time on page and scroll depth, sent when the visitor leaves ----
  var start = Date.now(), maxS = 0, left = false;
  addEventListener('scroll', function () { var h = document.documentElement.scrollHeight - innerHeight; if (h > 0) maxS = Math.max(maxS, Math.round(scrollY / h * 100)); }, { passive: true });
  function leave() { if (left) return; left = true; push('leave', { s: Math.min(maxS, 100), sec: Math.round((Date.now() - start) / 1000) }); flush(true); }
  addEventListener('pagehide', leave);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') { flush(true); } else { left = false; } });

  // For the site code: bvTrack('booking', {...}), bvTrack('step', {...})
  window.bvTrack = function (k, d) { try { push(k, d); if (k === 'booking') flush(); } catch (e) {} };
  window.__bvTrack = true;
})();
