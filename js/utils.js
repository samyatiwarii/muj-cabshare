// =============================================
//  utils.js — Shared Helper Functions
//  MUJ CabShare
// =============================================

// ── Switch between Browse / Post views ──
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach((tab, i) => {
    tab.classList.toggle('active',
      (name === 'browse' && i === 0) ||
      (name === 'post'   && i === 1)
    );
  });
}

// ── Toast notification ──
function showToast(msg, bg, fg) {
  const t = document.getElementById('toast');
  t.textContent       = msg;
  t.style.background  = bg || 'var(--green)';
  t.style.color       = fg || '#000';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ── Destination CSS class ──
function destClass(d) {
  if (d.includes('Station')) return 'dest-station';
  if (d.includes('Airport'))  return 'dest-airport';
  if (d.includes('Bus'))      return 'dest-busstand';
  return 'dest-other';
}

// ── Destination emoji icon ──
function destIcon(d) {
  if (d.includes('Station')) return '🚂';
  if (d.includes('Airport'))  return '✈️';
  if (d.includes('Bus'))      return '🚌';
  if (d.includes('MUJ'))      return '🏫';
  return '📍';
}

// ── Format date for display ──
function formatDate(d) {
  if (!d) return '';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

// ── Build WhatsApp deep link with pre-filled message ──
function waLink(phone, r) {
  const num = '91' + phone.replace(/\D/g, '');
  const msg = encodeURIComponent(
    `Hi ${r.name}! I saw your ride on MUJ CabShare 🚕\n` +
    `*Route:* ${r.from} → ${r.to}\n` +
    `*Date & Time:* ${formatDate(r.date)} at ${r.time}\n` +
    `Is the seat still available? I'd like to share the cab!`
  );
  return `https://wa.me/${num}?text=${msg}`;
}

// ── WhatsApp SVG icon (inline, no external dependency) ──
function waIconSVG() {
  return `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="white" style="flex-shrink:0"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
               -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463
               -2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
               .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371
               -.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
               -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016
               -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487
               .709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758
               -.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.532 5.842L.057 23.868
               a.5.5 0 0 0 .603.635l6.246-1.635A11.945 11.945 0 0 0 12 24c6.627 0
               12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 0 1-5.007-1.374
               l-.36-.213-3.707.97.992-3.608-.234-.371A9.818 9.818 0 0 1 2.182 12
               C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12
               17.43 21.818 12 21.818z"/>
    </svg>`;
}
