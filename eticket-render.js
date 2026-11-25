/* BUNAVIA e-ticket design. One file is used by the e-ticket page (eticket.html)
   and, copied in, by the email function (supabase/functions/send-eticket).
   Email-safe: tables and inline styles only. */
var BunaviaETicket = (function () {
  var L = {
    en: {
      title: 'E-ticket', receipt: 'Itinerary receipt', test: 'TEST – this is not a valid ticket',
      confirmed: 'Booking confirmed – your ticket is issued', ref: 'BUNAVIA reference', pnr: 'Airline booking code', issued: 'Issued on',
      hello: 'Hello', intro: 'Thank you for booking with BUNAVIA. Your ticket is issued. Please keep this e-ticket with you when you travel.',
      out: 'Outbound', ret: 'Return', flight: 'Flight', leg: 'Flight', dur: 'Duration', direct: 'Direct', change: 'Change in', layover: 'waiting time',
      cabin: 'Cabin', bag: 'Baggage', bagCabin: 'As included in the fare', bagChecked: '1 checked bag (23 kg) per passenger',
      pax: 'Passengers', name: 'Name', type: 'Type', tkt: 'Ticket number', seat: 'Seats', adult: 'Adult', child: 'Child', infant: 'Infant',
      byAirline: 'Issued by the airline', noSeat: 'At check-in',
      pay: 'Payment', fare: 'Flight fare', seats: 'Seats', bags: 'Checked bags', total: 'Total paid', paidWith: 'Paid with', card: 'Card', apple_pay: 'Apple Pay', google_pay: 'Google Pay',
      info: 'Before you fly',
      i1: 'Check in online on the airline website 24 to 48 hours before departure. Use the airline booking code above.',
      i2: 'Be at the airport at least 2 hours before departure, or 3 hours for long-haul flights.',
      i3: 'Bring a valid passport or ID card. The name must match the name on this ticket.',
      i4: 'Baggage rules, check-in times and terminals are set by the airline. Check them before you travel.',
      help: 'Need help?', helpTxt: 'Our team is here for you on WhatsApp and by email.',
      view: 'View and download your e-ticket', print: 'Print or save as PDF',
      opBy: 'Airline', classes: { 'Economy': 'Economy', 'Premium economy': 'Premium economy', 'Business': 'Business', 'First class': 'First class' },
      legal: 'This e-ticket was issued by BUNAVIA L.L.C., Hysni Gashi 73, Floor 3, No. 19, 10000 Prishtina, Kosovo. Unique ID 812466648. The airline’s conditions of carriage apply.',
      subject: 'Your e-ticket', days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    },
    de: {
      title: 'E-Ticket', receipt: 'Reisebestätigung', test: 'TEST – dies ist kein gültiges Ticket',
      confirmed: 'Buchung bestätigt – Ihr Ticket ist ausgestellt', ref: 'BUNAVIA-Buchungsnummer', pnr: 'Buchungscode der Airline', issued: 'Ausgestellt am',
      hello: 'Hallo', intro: 'Vielen Dank für Ihre Buchung bei BUNAVIA. Ihr Ticket ist ausgestellt. Bitte führen Sie dieses E-Ticket auf Ihrer Reise mit.',
      out: 'Hinflug', ret: 'Rückflug', flight: 'Flug', leg: 'Flug', dur: 'Dauer', direct: 'Direkt', change: 'Umsteigen in', layover: 'Wartezeit',
      cabin: 'Klasse', bag: 'Gepäck', bagCabin: 'Wie im Tarif enthalten', bagChecked: '1 Aufgabegepäck (23 kg) pro Passagier',
      pax: 'Passagiere', name: 'Name', type: 'Art', tkt: 'Ticketnummer', seat: 'Sitzplätze', adult: 'Erwachsener', child: 'Kind', infant: 'Kleinkind',
      byAirline: 'Von der Airline ausgestellt', noSeat: 'Beim Check-in',
      pay: 'Zahlung', fare: 'Flugpreis', seats: 'Sitzplätze', bags: 'Aufgabegepäck', total: 'Bezahlt gesamt', paidWith: 'Bezahlt mit', card: 'Karte', apple_pay: 'Apple Pay', google_pay: 'Google Pay',
      info: 'Vor dem Abflug',
      i1: 'Checken Sie 24 bis 48 Stunden vor Abflug online auf der Website der Airline ein. Verwenden Sie den Buchungscode der Airline oben.',
      i2: 'Seien Sie mindestens 2 Stunden vor Abflug am Flughafen, bei Langstreckenflügen 3 Stunden.',
      i3: 'Nehmen Sie einen gültigen Reisepass oder Ausweis mit. Der Name muss mit dem Namen auf diesem Ticket übereinstimmen.',
      i4: 'Gepäckregeln, Check-in-Zeiten und Terminals legt die Airline fest. Prüfen Sie diese vor der Reise.',
      help: 'Brauchen Sie Hilfe?', helpTxt: 'Unser Team ist per WhatsApp und E-Mail für Sie da.',
      view: 'E-Ticket ansehen und herunterladen', print: 'Drucken oder als PDF speichern',
      opBy: 'Airline', classes: { 'Economy': 'Economy', 'Premium economy': 'Premium Economy', 'Business': 'Business', 'First class': 'First Class' },
      legal: 'Dieses E-Ticket wurde von BUNAVIA L.L.C., Hysni Gashi 73, 3. Stock, Nr. 19, 10000 Prishtina, Kosovo, ausgestellt. Unique ID 812466648. Es gelten die Beförderungsbedingungen der Airline.',
      subject: 'Ihr E-Ticket', days: ['So','Mo','Di','Mi','Do','Fr','Sa'], months: ['Jan.','Feb.','März','Apr.','Mai','Juni','Juli','Aug.','Sep.','Okt.','Nov.','Dez.']
    },
    fr: {
      title: 'Billet électronique', receipt: 'Reçu d’itinéraire', test: 'TEST – ce billet n’est pas valable',
      confirmed: 'Réservation confirmée – votre billet est émis', ref: 'Référence BUNAVIA', pnr: 'Code de réservation de la compagnie', issued: 'Émis le',
      hello: 'Bonjour', intro: 'Merci d’avoir réservé avec BUNAVIA. Votre billet est émis. Gardez ce billet électronique avec vous pendant votre voyage.',
      out: 'Aller', ret: 'Retour', flight: 'Vol', leg: 'Vol', dur: 'Durée', direct: 'Direct', change: 'Correspondance à', layover: 'attente',
      cabin: 'Classe', bag: 'Bagages', bagCabin: 'Inclus dans le tarif', bagChecked: '1 bagage en soute (23 kg) par passager',
      pax: 'Passagers', name: 'Nom', type: 'Type', tkt: 'Numéro de billet', seat: 'Sièges', adult: 'Adulte', child: 'Enfant', infant: 'Bébé',
      byAirline: 'Émis par la compagnie', noSeat: 'À l’enregistrement',
      pay: 'Paiement', fare: 'Tarif du vol', seats: 'Sièges', bags: 'Bagages en soute', total: 'Total payé', paidWith: 'Payé par', card: 'Carte', apple_pay: 'Apple Pay', google_pay: 'Google Pay',
      info: 'Avant votre vol',
      i1: 'Enregistrez-vous en ligne sur le site de la compagnie 24 à 48 heures avant le départ, avec le code de réservation de la compagnie ci-dessus.',
      i2: 'Soyez à l’aéroport au moins 2 heures avant le départ, ou 3 heures pour les vols long-courriers.',
      i3: 'Munissez-vous d’un passeport ou d’une carte d’identité valide. Le nom doit correspondre à celui du billet.',
      i4: 'Les règles de bagages, les heures d’enregistrement et les terminaux sont fixés par la compagnie. Vérifiez-les avant le voyage.',
      help: 'Besoin d’aide ?', helpTxt: 'Notre équipe vous répond sur WhatsApp et par e-mail.',
      view: 'Voir et télécharger votre billet', print: 'Imprimer ou enregistrer en PDF',
      opBy: 'Compagnie', classes: { 'Economy': 'Économique', 'Premium economy': 'Premium économique', 'Business': 'Affaires', 'First class': 'Première' },
      legal: 'Ce billet électronique a été émis par BUNAVIA L.L.C., Hysni Gashi 73, 3e étage, n° 19, 10000 Prishtina, Kosovo. Unique ID 812466648. Les conditions de transport de la compagnie s’appliquent.',
      subject: 'Votre billet électronique', days: ['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'], months: ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.']
    },
    sq: {
      title: 'Biletë elektronike', receipt: 'Konfirmimi i udhëtimit', test: 'TEST – kjo nuk është biletë e vlefshme',
      confirmed: 'Rezervimi u konfirmua – bileta juaj është lëshuar', ref: 'Referenca BUNAVIA', pnr: 'Kodi i rezervimit i kompanisë ajrore', issued: 'Lëshuar më',
      hello: 'Përshëndetje', intro: 'Faleminderit që rezervuat me BUNAVIA. Bileta juaj është lëshuar. Mbajeni këtë biletë elektronike me vete gjatë udhëtimit.',
      out: 'Vajtja', ret: 'Kthimi', flight: 'Fluturimi', leg: 'Fluturimi', dur: 'Kohëzgjatja', direct: 'Direkt', change: 'Ndërrim në', layover: 'pritje',
      cabin: 'Klasa', bag: 'Bagazhi', bagCabin: 'Siç përfshihet në tarifë', bagChecked: '1 bagazh i regjistruar (23 kg) për pasagjer',
      pax: 'Pasagjerët', name: 'Emri', type: 'Lloji', tkt: 'Numri i biletës', seat: 'Ulëset', adult: 'I rritur', child: 'Fëmijë', infant: 'Foshnjë',
      byAirline: 'Lëshohet nga kompania ajrore', noSeat: 'Në check-in',
      pay: 'Pagesa', fare: 'Çmimi i fluturimit', seats: 'Ulëset', bags: 'Bagazhet e regjistruara', total: 'Totali i paguar', paidWith: 'Paguar me', card: 'Kartelë', apple_pay: 'Apple Pay', google_pay: 'Google Pay',
      info: 'Para fluturimit',
      i1: 'Bëni check-in online në faqen e kompanisë ajrore 24 deri në 48 orë para nisjes. Përdorni kodin e rezervimit të kompanisë ajrore më lart.',
      i2: 'Jini në aeroport të paktën 2 orë para nisjes, ose 3 orë për fluturimet e gjata.',
      i3: 'Merrni me vete pasaportë ose letërnjoftim të vlefshëm. Emri duhet të jetë i njëjtë me emrin në këtë biletë.',
      i4: 'Rregullat e bagazhit, oraret e check-in dhe terminalet i cakton kompania ajrore. Kontrollojini para udhëtimit.',
      help: 'Keni nevojë për ndihmë?', helpTxt: 'Ekipi ynë është këtu për ju në WhatsApp dhe me email.',
      view: 'Shikoni dhe shkarkoni biletën', print: 'Printo ose ruaj si PDF',
      opBy: 'Kompania', classes: { 'Economy': 'Ekonomike', 'Premium economy': 'Ekonomike premium', 'Business': 'Biznes', 'First class': 'Klasi i parë' },
      legal: 'Kjo biletë elektronike u lëshua nga BUNAVIA L.L.C., Hysni Gashi 73, Kati 3, Nr. 19, 10000 Prishtinë, Kosovë. Numri unik 812466648. Zbatohen kushtet e transportit të kompanisë ajrore.',
      subject: 'Bileta juaj elektronike', days: ['Die','Hën','Mar','Mër','Enj','Pre','Sht'], months: ['jan','shk','mar','pri','maj','qer','korr','gush','sht','tet','nën','dhj']
    }
  };
  var NAVY = '#0B1730', BLUE = '#1D6FD8', INK = '#0F1C2E', MUTED = '#5A6B80', LINE = '#E3E9F1', FONT = 'Roboto,Arial,Helvetica,sans-serif';

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lng(b, o) { var l = (o && o.lang) || (b && b.language) || 'en'; l = String(l).slice(0, 2); return L[l] ? l : 'en'; }
  function day(iso, t) {
    if (!iso) return '';
    var p = String(iso).slice(0, 10).split('-'); if (p.length < 3) return esc(iso);
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return t.days[d.getUTCDay()] + ', ' + (+p[2]) + ' ' + t.months[+p[1] - 1] + ' ' + p[0];
  }
  function money(v) { var n = Math.round(Number(v || 0) * 100) / 100; return '€' + n.toFixed(n % 1 ? 2 : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function mins(a, b) { var x = new Date(a.replace(' ', 'T') + ':00Z'), y = new Date(b.replace(' ', 'T') + ':00Z'); return Math.round((y - x) / 60000); }
  function hm(m) { return Math.floor(m / 60) + 'h ' + ('0' + (m % 60)).slice(-2) + 'm'; }
  function tickets(s) { return String(s || '').split(/[\n,;]+/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function nameOf(p) { return (String(p.last || '').toUpperCase() + ' / ' + String(p.first || '').toUpperCase()).trim(); }

  // Older bookings did not save each flight. Build a simple list from what they have.
  function segments(trip) {
    if (trip.segments && trip.segments.length) return trip.segments;
    var f = String(trip.flights || '').split(/\s*\+\s*/).filter(Boolean);
    return [{ fn: f.join(' + '), a: trip.from, b: trip.to, ac: trip.from, bc: trip.to, dep: (trip.dep || '') + ' ' + (trip.time || ''), arr: '', dur: trip.duration || '', dir: 'out', al: trip.airline || '' }];
  }

  function cell(label, value, align) {
    return '<td class="et-st" valign="top" style="padding:12px 16px;text-align:' + (align || 'left') + '"><div style="font:400 12px ' + FONT + ';color:' + MUTED + ';text-transform:uppercase;letter-spacing:.06em">' + esc(label) + '</div>' +
      '<div style="font:700 20px ' + FONT + ';color:' + INK + ';margin-top:4px;letter-spacing:.04em">' + value + '</div></td>';
  }

  function flightCard(s, t, trip) {
    var dTime = String(s.dep || '').slice(11, 16), aTime = String(s.arr || '').slice(11, 16), plus = '';
    if (s.arr && s.dep && s.arr.slice(0, 10) !== s.dep.slice(0, 10)) {
      var dd = Math.round((Date.parse(s.arr.slice(0, 10)) - Date.parse(s.dep.slice(0, 10))) / 864e5); if (dd > 0) plus = '<sup style="color:#B42318;font-size:11px"> +' + dd + '</sup>';
    }
    var code = String(s.fn || '').split(' ')[0];
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ' + LINE + ';border-radius:12px;border-collapse:separate;background:#ffffff">' +
      '<tr><td colspan="3" style="padding:12px 16px 0;font:400 13px ' + FONT + ';color:' + MUTED + '">' +
        '<span style="display:inline-block;background:#EAF2FB;color:' + BLUE + ';font:700 12px ' + FONT + ';padding:3px 7px;border-radius:6px;margin-right:8px">' + esc(code) + '</span>' +
        '<b style="color:' + INK + '">' + esc(s.al || '') + '</b> · ' + esc(t.flight) + ' ' + esc(s.fn) + ' · ' + esc(day(s.dep, t)) + '</td></tr>' +
      '<tr>' +
        '<td width="38%" valign="top" style="padding:12px 16px 14px"><div class="et-time" style="font:700 26px ' + FONT + ';color:' + INK + '">' + esc(dTime) + '</div>' +
          '<div style="font:700 15px ' + FONT + ';color:' + INK + '">' + esc(s.ac || s.a) + ' <span style="color:' + MUTED + ';font-weight:400">' + esc(s.a) + '</span></div>' +
          '<div style="font:400 12px ' + FONT + ';color:' + MUTED + '">' + esc(s.an || '') + '</div></td>' +
        '<td width="24%" valign="middle" align="center" style="padding:12px 4px;font:400 12px ' + FONT + ';color:' + MUTED + '">' + esc(s.dur || '') +
          '<div style="border-top:2px solid ' + BLUE + ';margin:6px 0;position:relative;height:0"></div>✈</td>' +
        '<td width="38%" valign="top" align="right" style="padding:12px 16px 14px"><div class="et-time" style="font:700 26px ' + FONT + ';color:' + INK + '">' + esc(aTime) + plus + '</div>' +
          '<div style="font:700 15px ' + FONT + ';color:' + INK + '">' + esc(s.bc || s.b) + ' <span style="color:' + MUTED + ';font-weight:400">' + esc(s.b) + '</span></div>' +
          '<div style="font:400 12px ' + FONT + ';color:' + MUTED + '">' + esc(s.bn || '') + '</div></td>' +
      '</tr>' +
      '<tr><td colspan="3" style="padding:10px 16px;border-top:1px solid ' + LINE + ';font:400 13px ' + FONT + ';color:' + MUTED + '">' +
        esc(t.cabin) + ': <b style="color:' + INK + '">' + esc((t.classes[trip.cabin] || trip.cabin || t.classes.Economy)) + '</b> &nbsp;·&nbsp; ' +
        esc(t.bag) + ': <b style="color:' + INK + '">' + esc(((trip.extras || {}).baggage === 'checked') ? t.bagChecked : t.bagCabin) + '</b></td></tr>' +
      '</table>';
  }

  function render(b, o) {
    o = o || {}; var l = lng(b, o), t = L[l], trip = b.trip || {}, segs = segments(trip), pax = b.passengers || [], tk = tickets(b.ticket_numbers);
    var ex = trip.extras || {}, seats = ex.seats || [], logo = o.logo || 'https://bunavia.com/eticket-logo.png';
    var h = '<style>@media (max-width:560px){.et-st{display:block!important;width:auto!important;text-align:left!important;padding:6px 16px!important}' +
      '.et-hd td{display:block!important;text-align:left!important}.et-hd .et-r{padding-top:10px!important}.et-p td{padding:10px 8px!important}.et-tk{font-size:12px!important}.et-time{font-size:22px!important}.et-wrap{padding:0!important}}</style>';
    h += '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2F7"><tr><td class="et-wrap" align="center" style="padding:24px 10px">';
    h += '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;border-collapse:separate;font-family:' + FONT + '">';
    if (o.test) h += '<tr><td style="background:#B42318;color:#ffffff;text-align:center;font:700 13px ' + FONT + ';letter-spacing:.08em;padding:8px">' + esc(t.test) + '</td></tr>';
    // header
    h += '<tr><td style="background:' + NAVY + ';padding:20px 24px"><table class="et-hd" role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' +
      '<td valign="middle"><img src="' + esc(logo) + '" width="52" height="49" alt="" style="display:inline-block;vertical-align:middle;border:0">' +
      '<span style="display:inline-block;vertical-align:middle;margin-left:12px;font:700 22px ' + FONT + ';letter-spacing:.14em;color:#ffffff">BUNAVIA</span></td>' +
      '<td class="et-r" valign="middle" align="right"><div style="font:700 18px ' + FONT + ';color:#ffffff">' + esc(t.title) + '</div><div style="font:400 13px ' + FONT + ';color:#A9B7CB">' + esc(t.receipt) + '</div></td>' +
      '</tr></table></td></tr>';
    // status
    h += '<tr><td style="background:#E7F6EE;color:#14663D;font:700 15px ' + FONT + ';padding:12px 24px">✓ ' + esc(t.confirmed) + '</td></tr>';
    // key facts
    h += '<tr><td style="padding:8px 8px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' +
      cell(t.ref, esc(b.reference)) + cell(t.pnr, esc(b.airline_pnr || '—')) + cell(t.issued, '<span style="font-size:15px;letter-spacing:0">' + esc(day(String(b.ticketed_at || '').slice(0, 10), t)) + '</span>', 'right') +
      '</tr></table></td></tr>';
    // greeting
    var lead = pax[0] ? (pax[0].first || '') : '';
    h += '<tr><td style="padding:8px 24px 4px;font:400 15px/1.55 ' + FONT + ';color:' + INK + '">' + esc(t.hello) + (lead ? ' ' + esc(lead) : '') + ',<br>' + esc(t.intro) + '</td></tr>';
    if (o.link) h += '<tr><td style="padding:12px 24px 4px"><a href="' + esc(o.link) + '" style="display:inline-block;background:' + BLUE + ';color:#ffffff;text-decoration:none;font:700 15px ' + FONT + ';padding:12px 20px;border-radius:10px">' + esc(t.view) + '</a></td></tr>';
    // flights by direction
    ['out', 'ret'].forEach(function (dir) {
      var list = segs.filter(function (s) { return (s.dir || 'out') === dir; }); if (!list.length) return;
      h += '<tr><td style="padding:20px 24px 8px"><div style="font:700 18px ' + FONT + ';color:' + INK + '">' + esc(dir === 'ret' ? t.ret : t.out) +
        ' <span style="font-weight:400;color:' + MUTED + ';font-size:14px">· ' + esc(list[0].ac || list[0].a) + ' → ' + esc(list[list.length - 1].bc || list[list.length - 1].b) + ' · ' + esc(day(list[0].dep, t)) + '</span></div></td></tr>';
      list.forEach(function (s, i) {
        h += '<tr><td style="padding:0 24px">' + flightCard(s, t, trip) + '</td></tr>';
        var n = list[i + 1];
        if (n && s.arr && n.dep) h += '<tr><td style="padding:8px 24px;font:400 13px ' + FONT + ';color:#8A5A00">⏱ ' + esc(t.change) + ' ' + esc(s.bc || s.b) + ' · ' + esc(hm(mins(s.arr, n.dep))) + ' ' + esc(t.layover) + '</td></tr>';
      });
    });
    // passengers
    h += '<tr><td style="padding:22px 24px 8px;font:700 18px ' + FONT + ';color:' + INK + '">' + esc(t.pax) + '</td></tr>';
    h += '<tr><td style="padding:0 24px"><table class="et-p" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ' + LINE + ';border-radius:12px;border-collapse:separate">' +
      '<tr style="background:#F4F7FB">' + [t.name, t.tkt, t.seat].map(function (x, i) { return '<td style="padding:10px 14px;font:700 12px ' + FONT + ';color:' + MUTED + ';text-transform:uppercase;letter-spacing:.05em' + (i ? '' : '') + '">' + esc(x) + '</td>'; }).join('') + '</tr>';
    pax.forEach(function (p, i) {
      var mine = seats.filter(function (s) { return s.pi === i || (s.pi == null && s.passenger && (s.passenger.toLowerCase() === ((p.first || '') + ' ' + (p.last || '')).trim().toLowerCase())); });
      var st = p.type === 'infant' ? '—' : (mine.length ? mine.map(function (s) { return esc(s.flight) + ': <b>' + esc(s.seat) + '</b>'; }).join('<br>') : esc(t.noSeat));
      h += '<tr><td valign="top" style="padding:12px 14px;border-top:1px solid ' + LINE + ';font:700 14px ' + FONT + ';color:' + INK + '">' + esc(nameOf(p)) +
        '<div style="font:400 12px ' + FONT + ';color:' + MUTED + '">' + esc(t[p.type] || p.type || '') + '</div></td>' +
        '<td valign="top" style="padding:12px 14px;border-top:1px solid ' + LINE + ';font:400 14px ' + FONT + ';color:' + INK + '">' + (tk[i] ? '<b class="et-tk" style="letter-spacing:.03em;white-space:nowrap">' + esc(tk[i]) + '</b>' : '<span style="color:' + MUTED + '">' + esc(t.byAirline) + '</span>') + '</td>' +
        '<td valign="top" style="padding:12px 14px;border-top:1px solid ' + LINE + ';font:400 13px ' + FONT + ';color:' + INK + '">' + st + '</td></tr>';
    });
    h += '</table></td></tr>';
    // payment
    var bagTot = Number(ex.bag_total_eur || 0), seatTot = Number(ex.seat_total_eur || 0), nSeat = pax.filter(function (p) { return p.type !== 'infant'; }).length || 1;
    var fareTot = Number(b.total_eur || 0) - seatTot - bagTot;
    h += '<tr><td style="padding:22px 24px 8px;font:700 18px ' + FONT + ';color:' + INK + '">' + esc(t.pay) + '</td></tr>';
    h += '<tr><td style="padding:0 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ' + LINE + ';border-radius:12px;border-collapse:separate">' +
      '<tr><td style="padding:10px 14px;font:400 14px ' + FONT + ';color:' + INK + '">' + esc(t.fare) + (trip.fare_eur ? ' <span style="color:' + MUTED + '">(' + nSeat + ' × ' + esc(money(trip.fare_eur)) + ')</span>' : '') + '</td><td align="right" style="padding:10px 14px;font:400 14px ' + FONT + ';color:' + INK + '">' + esc(money(fareTot)) + '</td></tr>' +
      (bagTot ? '<tr><td style="padding:10px 14px;border-top:1px solid ' + LINE + ';font:400 14px ' + FONT + ';color:' + INK + '">' + esc(t.bags) + '</td><td align="right" style="padding:10px 14px;border-top:1px solid ' + LINE + ';font:400 14px ' + FONT + ';color:' + INK + '">' + esc(money(bagTot)) + '</td></tr>' : '') +
      (seatTot ? '<tr><td style="padding:10px 14px;border-top:1px solid ' + LINE + ';font:400 14px ' + FONT + ';color:' + INK + '">' + esc(t.seats) + '</td><td align="right" style="padding:10px 14px;border-top:1px solid ' + LINE + ';font:400 14px ' + FONT + ';color:' + INK + '">' + esc(money(seatTot)) + '</td></tr>' : '') +
      '<tr style="background:#F4F7FB"><td style="padding:12px 14px;border-top:1px solid ' + LINE + ';font:700 16px ' + FONT + ';color:' + INK + '">' + esc(t.total) + '<div style="font:400 12px ' + FONT + ';color:' + MUTED + '">' + esc(t.paidWith) + ' ' + esc(t[b.payment_method] || b.payment_method || '') + '</div></td>' +
      '<td align="right" style="padding:12px 14px;border-top:1px solid ' + LINE + ';font:700 20px ' + FONT + ';color:' + INK + '">' + esc(money(b.total_eur)) + '</td></tr></table></td></tr>';
    // info
    h += '<tr><td style="padding:22px 24px 4px;font:700 18px ' + FONT + ';color:' + INK + '">' + esc(t.info) + '</td></tr>';
    h += '<tr><td style="padding:0 24px;font:400 14px/1.55 ' + FONT + ';color:' + INK + '"><ul style="margin:6px 0 0;padding-left:20px">' + ['i1', 'i2', 'i3', 'i4'].map(function (k) { return '<li style="margin-bottom:6px">' + esc(t[k]) + '</li>'; }).join('') + '</ul></td></tr>';
    // help
    h += '<tr><td style="padding:16px 24px 22px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F8FD;border:1px solid #DCE8F6;border-radius:12px;border-collapse:separate"><tr><td style="padding:14px 16px;font:400 14px/1.5 ' + FONT + ';color:' + INK + '">' +
      '<b>' + esc(t.help) + '</b> ' + esc(t.helpTxt) + '<br>' +
      '<a href="https://wa.me/38349244038" style="color:' + BLUE + ';font-weight:700;text-decoration:none">WhatsApp +383 49 244 038</a> &nbsp;·&nbsp; ' +
      '<a href="mailto:info@bunavia.com" style="color:' + BLUE + ';font-weight:700;text-decoration:none">info@bunavia.com</a></td></tr></table></td></tr>';
    // footer
    h += '<tr><td style="background:' + NAVY + ';padding:16px 24px;font:400 12px/1.5 ' + FONT + ';color:#A9B7CB">' + esc(t.legal) + '<br><a href="https://bunavia.com" style="color:#ffffff;text-decoration:none;font-weight:700">bunavia.com</a></td></tr>';
    h += '</table></td></tr></table>';
    return h;
  }

  function subject(b, o) { var t = L[lng(b, o)], trip = b.trip || {}; return (o && o.test ? '[TEST] ' : '') + t.subject + ' · ' + b.reference + ' · ' + (trip.from || '') + ' → ' + (trip.to || ''); }

  function text(b, o) {
    var t = L[lng(b, o)], trip = b.trip || {}, tk = tickets(b.ticket_numbers), out = [];
    out.push('BUNAVIA – ' + t.title, t.confirmed, '', t.ref + ': ' + b.reference, t.pnr + ': ' + (b.airline_pnr || '-'), '');
    segments(trip).forEach(function (s) { out.push((s.dir === 'ret' ? t.ret : t.out) + ': ' + s.fn + ' ' + (s.ac || s.a) + ' (' + s.a + ') ' + s.dep + ' → ' + (s.bc || s.b) + ' (' + s.b + ') ' + (s.arr || '')); });
    out.push('', t.pax + ':');
    (b.passengers || []).forEach(function (p, i) { out.push('- ' + nameOf(p) + (tk[i] ? ' · ' + t.tkt + ' ' + tk[i] : '')); });
    out.push('', t.total + ': ' + money(b.total_eur));
    if (o && o.link) out.push('', t.view + ': ' + o.link);
    out.push('', t.help + ' WhatsApp +383 49 244 038 · info@bunavia.com');
    return out.join('\n');
  }

  // Sample booking for tests (clearly marked TEST when shown)
  function demo() {
    return {
      reference: 'BNVTEST26', airline_pnr: '6XK2PL', ticket_numbers: '724-2401234567, 724-2401234568, 724-2401234569',
      ticketed_at: '2026-11-25T09:30:00Z', total_eur: 693, payment_method: 'card', language: 'sq',
      passengers: [{ type: 'adult', first: 'Arta', last: 'Krasniqi' }, { type: 'adult', first: 'Blerim', last: 'Krasniqi' }, { type: 'child', first: 'Era', last: 'Krasniqi' }],
      trip: {
        from: 'PRN', to: 'ZRH', trip: 'Return', dep: '2026-12-08', ret: '2026-12-15', cabin: 'Economy', fare_eur: 216,
        segments: [
          { fn: 'LX 1871', a: 'PRN', b: 'ZRH', ac: 'Prishtina', an: 'Prishtina International Adem Jashari', bc: 'Zurich', bn: 'Zurich Airport', al: 'Swiss', dep: '2026-12-08 06:20', arr: '2026-12-08 08:25', dur: '2h 05m', dir: 'out' },
          { fn: 'LH 1285', a: 'ZRH', b: 'MUC', ac: 'Zurich', an: 'Zurich Airport', bc: 'Munich', bn: 'Munich Airport', al: 'Lufthansa', dep: '2026-12-15 17:10', arr: '2026-12-15 18:05', dur: '0h 55m', dir: 'ret' },
          { fn: 'LH 1484', a: 'MUC', b: 'PRN', ac: 'Munich', an: 'Munich Airport', bc: 'Prishtina', bn: 'Prishtina International Adem Jashari', al: 'Lufthansa', dep: '2026-12-15 19:15', arr: '2026-12-15 21:05', dur: '1h 50m', dir: 'ret' }
        ],
        extras: { baggage: 'checked', seat_total_eur: 45, seats: [
          { flight: 'LX 1871', pi: 0, seat: '3A', eur: 15 }, { flight: 'LX 1871', pi: 1, seat: '3B', eur: 15 }, { flight: 'LX 1871', pi: 2, seat: '3C', eur: 15 }
        ] }
      }
    };
  }

  return { render: render, subject: subject, text: text, demo: demo, langs: Object.keys(L) };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = BunaviaETicket;
