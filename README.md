# 🚕 MUJ CabShare

A lightweight cab fare-sharing web app for students of **Manipal University Jaipur (MUJ)**.  
Instead of posting on WhatsApp groups, students can browse and post cab rides in one place — and contact each other directly via WhatsApp.

---

## ✨ Features

- 🔐 **College Email Login** — Only `@muj.manipal.edu` emails allowed (OTP verified)
- 🚕 **Post a Ride** — Add route, date, time, seats, fare estimate and a note
- 🔍 **Browse Rides** — Filter by destination (Station / Airport / Bus Stand)
- 💬 **WhatsApp Deep Link** — One tap opens WhatsApp with a pre-filled message to the poster
- 🗑 **Delete Your Ride** — Only you can remove rides you posted
- 📊 **Stats Bar** — See total rides and counts per destination at a glance

---

## 📁 Project Structure

```
muj-cabshare/
│
├── index.html              # Main HTML — structure & layout
│
├── css/
│   ├── base.css            # CSS variables, reset, shared styles
│   ├── login.css           # Login & OTP screen styles
│   ├── app.css             # Header, nav, ride cards, stats
│   └── components.css      # Form, buttons, WhatsApp btn
│
├── js/
│   ├── data.js             # Seed ride data (in-memory)
│   ├── auth.js             # Login, OTP, logout logic
│   ├── rides.js            # Render, post, filter, delete rides
│   └── utils.js            # Shared helpers (icons, formatting, toast)
│
└── README.md
```

---

## 🚀 How to Run

No build tools or installs needed. Just open in a browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 🔑 Demo Login

| Field | Value |
|-------|-------|
| Email | anything@muj.manipal.edu |
| OTP   | `123456` |

---

## 🛣️ Roadmap (Future Improvements)

- [ ] **Real backend** — Firebase / Supabase for persistent data across users
- [ ] **Real OTP email** — SendGrid / Nodemailer to actually email OTPs
- [ ] **Auto-expire rides** — Remove rides past their travel date automatically
- [ ] **PWA support** — Add to home screen on mobile
- [ ] **Seat request system** — Mark a seat as taken when someone joins

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Structure  | HTML5      |
| Styling    | CSS3 (custom, no framework) |
| Logic      | Vanilla JavaScript (ES6+) |
| Fonts      | Google Fonts — Syne + DM Sans |

---

## 👤 Author

Made by a MUJ student, for MUJ students.  
