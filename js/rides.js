// =============================================
//  rides.js — Ride Rendering, Filtering,
//             Posting & Deleting
//  MUJ CabShare
// =============================================

let activeFilter = 'all';

// ── Render stats bar ──
function renderStats() {
  document.getElementById('stats-bar').innerHTML = `
    <div class="stat">
      <div class="stat-num">${rides.length}</div>
      <div class="stat-label">Total Rides</div>
    </div>
    <div class="stat">
      <div class="stat-num">${rides.filter(r => r.to.includes('Station')).length}</div>
      <div class="stat-label">→ Station</div>
    </div>
    <div class="stat">
      <div class="stat-num">${rides.filter(r => r.to.includes('Airport')).length}</div>
      <div class="stat-label">→ Airport</div>
    </div>
    <div class="stat">
      <div class="stat-num">${rides.filter(r => r.to.includes('Bus')).length}</div>
      <div class="stat-label">→ Bus Stand</div>
    </div>
  `;
}

// ── Render ride cards ──
function renderRides() {
  const list = document.getElementById('rides-list');

  const filtered = activeFilter === 'all'
    ? rides
    : rides.filter(r => r.to.includes(activeFilter) || r.from.includes(activeFilter));

  if (!filtered.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🚕</div>
        <p>No rides found. Be the first to post one!</p>
      </div>`;
    return;
  }

  list.innerHTML = filtered.map(r => {
    const isMe = currentUser && r.email === currentUser.email;

    return `
    <div class="ride-card ${isMe ? 'mine' : ''}">

      <div class="ride-left">
        <div class="ride-route">
          <span class="route-label">${destIcon(r.from)} ${r.from}</span>
          <span class="route-arrow">→</span>
          <span class="route-label">${destIcon(r.to)} ${r.to}</span>
          <span class="dest-tag ${destClass(r.to)}">${r.to.split(' ')[0]}</span>
          ${isMe ? '<span class="mine-badge">Your ride</span>' : ''}
        </div>
        <div class="ride-meta">
          <span class="meta-chip">📅 ${formatDate(r.date)}</span>
          <span class="meta-chip">🕐 ${r.time}</span>
          ${r.fare ? `<span class="meta-chip">💰 ~₹${r.fare}/person</span>` : ''}
          <span class="poster-name">👤 ${r.name}</span>
          ${r.note ? `<span class="meta-chip">📝 ${r.note}</span>` : ''}
        </div>
      </div>

      <div class="ride-right">
        <span class="seats-badge ${r.seats > 0 ? 'seats-available' : 'seats-full'}">
          ${r.seats > 0 ? `${r.seats} seat${r.seats > 1 ? 's' : ''} open` : 'Full'}
        </span>
        ${!isMe
          ? `<a class="btn-wa" href="${waLink(r.contact, r)}" target="_blank" rel="noopener">
               ${waIconSVG()} WhatsApp
             </a>`
          : `<button class="btn-delete" onclick="deleteRide(${r.id})">🗑 Delete</button>`
        }
      </div>

    </div>`;
  }).join('');
}

// ── Filter by destination ──
function filterRides(dest, btn) {
  activeFilter = dest;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRides();
}

// ── Delete own ride ──
function deleteRide(id) {
  rides = rides.filter(r => r.id !== id);
  renderStats();
  renderRides();
  showToast('🗑 Your ride was removed.');
}

// ── Post a new ride ──
function postRide() {
  const name    = document.getElementById('inp-name').value.trim();
  const contact = document.getElementById('inp-contact').value.trim();
  const from    = document.getElementById('inp-from').value;
  const to      = document.getElementById('inp-to').value;
  const date    = document.getElementById('inp-date').value;
  const time    = document.getElementById('inp-time').value;
  const seats   = parseInt(document.getElementById('inp-seats').value);
  const fare    = document.getElementById('inp-fare').value;
  const note    = document.getElementById('inp-note').value.trim();

  // Validation
  if (!name)                      { showToast('⚠️ Please enter your name.', '#f87171', '#fff'); return; }
  if (!/^\d{10}$/.test(contact))  { showToast('⚠️ Enter a valid 10-digit WhatsApp number.', '#f87171', '#fff'); return; }
  if (!date)                      { showToast('⚠️ Please select a date.', '#f87171', '#fff'); return; }
  if (!time)                      { showToast('⚠️ Please select a time.', '#f87171', '#fff'); return; }
  if (from === to)                { showToast("⚠️ From and To can't be the same!", '#f87171', '#fff'); return; }

  // Add to top of list
  rides.unshift({
    id:      Date.now(),
    name,
    contact,
    email:   currentUser.email,
    from,
    to,
    date,
    time,
    seats,
    fare:    fare ? parseInt(fare) : null,
    note
  });

  // Reset form fields
  ['inp-name', 'inp-contact', 'inp-date', 'inp-time', 'inp-fare', 'inp-note']
    .forEach(id => { document.getElementById(id).value = ''; });

  showView('browse');
  renderStats();
  renderRides();
  showToast('✅ Ride posted! Others can WhatsApp you directly.');
}
