/* ==========================================================================
   APP LOGIC — rendering, tabs, and Edit Mode (localStorage-backed)
   ========================================================================== */

const STORAGE_KEY = "japanKoreaTrip2026_v1";
const SLOT_ORDER = ["morning", "lunch", "afternoon", "dinner", "night"];
const SLOT_LABELS = { morning: "Morning", lunch: "Lunch", afternoon: "Afternoon", dinner: "Dinner", night: "Night" };
const TAG_LABELS = { easy: "Easy pace", active: "Active", foodie: "Foodie", travel: "Travel", own: "On your own" };

let trip = loadTrip();
let editMode = false;
let highlightEasy = false;
let activePersonId = null;

function loadTrip() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through */ }
  }
  return JSON.parse(JSON.stringify(DEFAULT_TRIP));
}

function saveTrip() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
}

function mapLink(place, city) {
  const q = [place, city].filter(Boolean).join(", ");
  if (!q) return null;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}

function esc(str) {
  return String(str == null ? "" : str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------------------------------------------------------------- */
/* INIT                                                                    */
/* ---------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("trip-title").textContent = trip.meta.title;
  document.getElementById("trip-subtitle").textContent = trip.meta.subtitle;
  document.getElementById("trip-dates").textContent = formatDateRange(trip.meta.start, trip.meta.end);

  document.querySelectorAll("nav.tabs button").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  document.getElementById("edit-toggle").addEventListener("click", toggleEditMode);
  document.getElementById("export-btn").addEventListener("click", exportData);
  document.getElementById("import-input").addEventListener("change", importData);
  document.getElementById("reset-btn").addEventListener("click", resetToPublished);
  document.getElementById("highlight-toggle").addEventListener("click", () => {
    highlightEasy = !highlightEasy;
    document.getElementById("highlight-toggle").classList.toggle("active-toggle", highlightEasy);
    renderItinerary();
  });

  renderAll();
  switchTab("itinerary");
});

function formatDateRange(start, end) {
  const opts = { month: "short", day: "numeric", year: "numeric" };
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T00:00:00");
  return s.toLocaleDateString(undefined, opts) + " – " + e.toLocaleDateString(undefined, opts);
}

function switchTab(tab) {
  document.querySelectorAll("nav.tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + tab));
}

function renderAll() {
  renderItinerary();
  renderPlaces();
  renderTravelers();
  renderFlights();
  renderHotelBookings();
  renderFlightBookings();
  renderBookings();
  renderTodos();
  renderActionItems();
  renderTimeline();
}

function toggleEditMode() {
  editMode = !editMode;
  document.body.classList.toggle("edit-mode", editMode);
  document.getElementById("edit-toggle").classList.toggle("active-toggle", editMode);
  document.getElementById("edit-toggle").textContent = editMode ? "Done editing" : "Edit mode";
  renderAll();
}

function exportData() {
  const blob = new Blob([JSON.stringify(trip, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `trip-data-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      trip = parsed;
      saveTrip();
      renderAll();
      alert("Imported! Your trip data has been updated.");
    } catch (err) {
      alert("Couldn't read that file — make sure it's a trip-data JSON export.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

function resetToPublished() {
  if (!confirm("Reset to the original published trip content? This clears any edits saved in this browser.")) return;
  localStorage.removeItem(STORAGE_KEY);
  trip = JSON.parse(JSON.stringify(DEFAULT_TRIP));
  renderAll();
}

/* ---------------------------------------------------------------------- */
/* MODAL HELPER                                                           */
/* ----------------------------------------------------------------------- */

function openModal(title, fields, onSave, onDelete) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<h3>${esc(title)}</h3>`;

  const inputs = {};
  fields.forEach(f => {
    const label = document.createElement("label");
    label.textContent = f.label;
    modal.appendChild(label);

    if (f.type === "checkboxes") {
      const wrap = document.createElement("div");
      wrap.style.display = "flex";
      wrap.style.flexWrap = "wrap";
      wrap.style.gap = "6px";
      wrap.style.margin = "4px 0 10px";
      const selected = new Set(String(f.value || "").split(",").map(s => s.trim()).filter(Boolean));
      const checks = [];
      (f.options || []).forEach(opt => {
        const optLabel = document.createElement("label");
        optLabel.style.display = "inline-flex";
        optLabel.style.alignItems = "center";
        optLabel.style.gap = "4px";
        optLabel.style.fontSize = "0.83rem";
        optLabel.style.border = "1px solid var(--line)";
        optLabel.style.borderRadius = "20px";
        optLabel.style.padding = "4px 10px";
        optLabel.style.textTransform = "none";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = opt.value;
        cb.checked = selected.has(opt.value);
        optLabel.appendChild(cb);
        optLabel.appendChild(document.createTextNode(opt.label));
        wrap.appendChild(optLabel);
        checks.push(cb);
      });
      modal.appendChild(wrap);
      inputs[f.key] = { get value() { return checks.filter(c => c.checked).map(c => c.value).join(", "); } };
      return;
    }

    let input;
    if (f.type === "select") {
      input = document.createElement("select");
      f.options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        if (opt.value === f.value) o.selected = true;
        input.appendChild(o);
      });
    } else if (f.type === "textarea") {
      input = document.createElement("textarea");
      input.value = f.value || "";
    } else {
      input = document.createElement("input");
      input.type = f.type || "text";
      input.value = f.value || "";
    }
    input.dataset.key = f.key;
    modal.appendChild(input);
    inputs[f.key] = input;
  });

  const actions = document.createElement("div");
  actions.className = "modal-actions";
  if (onDelete) {
    const delBtn = document.createElement("button");
    delBtn.className = "btn-danger";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => { onDelete(); document.body.removeChild(overlay); };
    actions.appendChild(delBtn);
  }
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn-cancel";
  cancelBtn.textContent = "Cancel";
  cancelBtn.onclick = () => document.body.removeChild(overlay);
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn-save";
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    const values = {};
    Object.keys(inputs).forEach(k => values[k] = inputs[k].value);
    onSave(values);
    document.body.removeChild(overlay);
  };
  actions.appendChild(cancelBtn);
  actions.appendChild(saveBtn);
  modal.appendChild(actions);

  overlay.appendChild(modal);
  overlay.addEventListener("click", e => { if (e.target === overlay) document.body.removeChild(overlay); });
  document.body.appendChild(overlay);
}

const TAG_OPTIONS = Object.keys(TAG_LABELS).map(k => ({ value: k, label: TAG_LABELS[k] }));

/* ----------------------------------------------------------------------- */
/* ITINERARY                                                              */
/* ---------------------------------------------------------------------- */

function renderItinerary() {
  const root = document.getElementById("itinerary-list");
  root.innerHTML = "";
  trip.itinerary.forEach((day, dayIdx) => {
    const card = document.createElement("div");
    card.className = "day-card";
    if (dayIdx === 0) card.classList.add("open");

    const head = document.createElement("div");
    head.className = "day-head";
    head.innerHTML = `
      <div>
        <div class="day-title">${esc(day.label)} · ${esc(day.city)}</div>
        <div class="day-sub">${esc(day.summary || "")}</div>
      </div>
      <div class="day-meta">
        ${day.hotel ? `Staying: ${esc(day.hotel)}<br/>` : ""}${esc(day.date)}
        <span class="chevron">▶</span>
      </div>
    `;
    head.addEventListener("click", (e) => {
      card.classList.toggle("open");
    });
    card.appendChild(head);

    const body = document.createElement("div");
    body.className = "day-body";
    if (highlightEasy) body.classList.add("highlight-easy");

    SLOT_ORDER.forEach(slotKey => {
      const options = (day.slots[slotKey] || []);
      const slotDiv = document.createElement("div");
      slotDiv.className = "slot";
      const h4 = document.createElement("h4");
      h4.textContent = SLOT_LABELS[slotKey];
      slotDiv.appendChild(h4);

      const grid = document.createElement("div");
      grid.className = "option-grid";
      options.forEach((opt, optIdx) => {
        grid.appendChild(renderOption(opt, dayIdx, slotKey, optIdx));
      });
      slotDiv.appendChild(grid);

      const addBtn = document.createElement("button");
      addBtn.className = "add-option-btn edit-only";
      addBtn.textContent = "+ Add option";
      addBtn.style.marginTop = "8px";
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openOptionModal(dayIdx, slotKey, null);
      });
      slotDiv.appendChild(addBtn);

      body.appendChild(slotDiv);
    });

    card.appendChild(body);
    root.appendChild(card);
  });
}

function renderOption(opt, dayIdx, slotKey, optIdx) {
  const div = document.createElement("div");
  div.className = "option opt-" + (opt.tag || "own");
  const link = opt.place ? mapLink(opt.place, opt.city) : null;
  div.innerHTML = `
    <div class="option-main">
      <div class="option-title-row">
        <span class="option-title">${esc(opt.title)}</span>
        <span class="tag tag-${esc(opt.tag || "own")}">${esc(TAG_LABELS[opt.tag] || opt.tag)}</span>
      </div>
      ${opt.desc ? `<div class="option-desc">${esc(opt.desc)}</div>` : ""}
      ${link ? `<a class="option-link" href="${link}" target="_blank" rel="noopener">View on map ↗</a>` : ""}
    </div>
    <div class="opt-actions edit-only">
      <button title="Edit">Edit</button>
    </div>
  `;
  const editBtn = div.querySelector(".opt-actions button");
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openOptionModal(dayIdx, slotKey, optIdx);
  });
  div.addEventListener("click", (e) => e.stopPropagation());
  return div;
}

function openOptionModal(dayIdx, slotKey, optIdx) {
  const isNew = optIdx === null;
  const opt = isNew ? { title: "", desc: "", place: "", city: trip.itinerary[dayIdx].city, tag: "easy" } : trip.itinerary[dayIdx].slots[slotKey][optIdx];
  openModal(isNew ? "Add activity option" : "Edit activity option", [
    { key: "title", label: "Title", value: opt.title },
    { key: "desc", label: "Description", type: "textarea", value: opt.desc },
    { key: "place", label: "Place (for map link)", value: opt.place || "" },
    { key: "city", label: "City", value: opt.city || "" },
    { key: "tag", label: "Type", type: "select", value: opt.tag, options: TAG_OPTIONS }
  ], (values) => {
    const newOpt = { title: values.title, desc: values.desc, place: values.place, city: values.city, tag: values.tag };
    if (isNew) {
      trip.itinerary[dayIdx].slots[slotKey].push(newOpt);
    } else {
      trip.itinerary[dayIdx].slots[slotKey][optIdx] = newOpt;
    }
    saveTrip();
    renderItinerary();
    renderPlaces();
  }, isNew ? null : () => {
    trip.itinerary[dayIdx].slots[slotKey].splice(optIdx, 1);
    saveTrip();
    renderItinerary();
    renderPlaces();
  });
}

/* ----------------------------------------------------------------------- */
/* PLACES (auto-derived from itinerary, deduped)                         */
/* ----------------------------------------------------------------------- */

function renderPlaces() {
  const seen = new Map();
  trip.itinerary.forEach(day => {
    SLOT_ORDER.forEach(slotKey => {
      (day.slots[slotKey] || []).forEach(opt => {
        if (!opt.place || opt.tag === "own") return;
        const key = opt.place + "|" + (opt.city || day.city);
        if (!seen.has(key)) {
          seen.set(key, { place: opt.place, city: opt.city || day.city, tag: opt.tag, uses: [] });
        }
        seen.get(key).uses.push(`${day.label} ${SLOT_LABELS[slotKey]}`);
      });
    });
  });

  const root = document.getElementById("places-list");
  root.innerHTML = "";
  const grouped = {};
  Array.from(seen.values()).forEach(p => {
    grouped[p.city] = grouped[p.city] || [];
    grouped[p.city].push(p);
  });

  Object.keys(grouped).forEach(city => {
    const h3 = document.createElement("h3");
    h3.textContent = city;
    h3.style.marginBottom = "6px";
    root.appendChild(h3);
    const ul = document.createElement("ul");
    ul.className = "checklist";
    grouped[city].forEach(p => {
      const li = document.createElement("li");
      const link = mapLink(p.place, p.city);
      li.innerHTML = `<div class="item-text"><strong>${esc(p.place)}</strong> <span class="tag tag-${esc(p.tag)}">${esc(TAG_LABELS[p.tag])}</span><br/><span class="item-owner">${esc(p.uses.join(", "))}</span></div>${link ? `<a class="option-link" href="${link}" target="_blank" rel="noopener">Map ↗</a>` : ""}`;
      ul.appendChild(li);
    });
    root.appendChild(ul);
  });
}

/* ------------------------------------------------------------------------ */
/* TRAVELERS                                                               */
/* ----------------------------------------------------------------------- */

function renderTravelers() {
  const root = document.getElementById("travelers-grid");
  root.innerHTML = "";
  trip.travelers.forEach((person, idx) => {
    const card = document.createElement("div");
    card.className = "person-card";
    card.innerHTML = `
      <h3>${esc(person.name)}</h3>
      <div class="person-role">${esc(person.role || "")}</div>
      <div class="field"><label>Email</label>${editMode ? `<input data-f="email" value="${esc(person.email)}"/>` : (person.email ? `<a href="mailto:${esc(person.email)}">${esc(person.email)}</a>` : "<em>—</em>")}</div>
      <div class="field"><label>Phone / SMS</label>${editMode ? `<input data-f="phone" value="${esc(person.phone)}"/>` : (person.phone || "<em>—</em>")}</div>
      <div class="field"><label>WhatsApp</label>${editMode ? `<input data-f="whatsapp" value="${esc(person.whatsapp)}"/>` : (person.whatsapp || "<em>—</em>")}</div>
      <div class="field"><label>Notes</label>${editMode ? `<input data-f="notes" value="${esc(person.notes)}"/>` : (person.notes || "<em>—</em>")}</div>
      ${person.easyPace ? `<div class="badge-easy-pace">Easy-pace day plans</div>` : ""}
    `;
    if (editMode) {
      card.querySelectorAll("input[data-f]").forEach(inp => {
        inp.addEventListener("change", () => {
          trip.travelers[idx][inp.dataset.f] = inp.value;
          saveTrip();
        });
      });
    }
    root.appendChild(card);
  });
}

/* ----------------------------------------------------------------------- */
/* FLIGHTS                                                                 */
/* ----------------------------------------------------------------------- */

function renderFlights() {
  const tbody = document.getElementById("flights-body");
  tbody.innerHTML = "";
  trip.flights.forEach((f, idx) => {
    const tr = document.createElement("tr");
    const cols = ["date", "route", "travelers", "airline", "flightNo", "depart", "arrive", "confirmation", "notes"];
    const labels = { date: "Date", route: "Route", travelers: "Travelers", airline: "Airline", flightNo: "Flight #", depart: "Depart", arrive: "Arrive", confirmation: "Confirmation #", notes: "Notes" };
    tr.innerHTML = cols.map(c => `<td data-label="${labels[c]}">${editMode ? `<input data-f="${c}" value="${esc(f[c])}"/>` : esc(f[c]) || "—"}</td>`).join("") +
      (editMode ? `<td><button class="item-del">✕</button></td>` : "");
    if (editMode) {
      tr.querySelectorAll("input[data-f]").forEach(inp => {
        inp.addEventListener("change", () => { trip.flights[idx][inp.dataset.f] = inp.value; saveTrip(); });
      });
      tr.querySelector(".item-del").addEventListener("click", () => {
        trip.flights.splice(idx, 1); saveTrip(); renderFlights();
      });
    }
    tbody.appendChild(tr);
  });

  const addWrap = document.getElementById("flights-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    const btn = document.createElement("button");
    btn.className = "add-option-btn";
    btn.textContent = "+ Add flight";
    btn.addEventListener("click", () => {
      trip.flights.push({ id: "f" + Date.now(), date: "", route: "", travelers: "", airline: "", flightNo: "", depart: "", arrive: "", confirmation: "", notes: "" });
      saveTrip();
      renderFlights();
    });
    addWrap.appendChild(btn);
  }
}

/* ---------------------------------------------------------------------- */
/* TO-DOS BY PERSON                                                 */
/* ----------------------------------------------------------------------- */

function renderTodos() {
  const tabsRoot = document.getElementById("person-tabs");
  tabsRoot.innerHTML = "";
  if (!activePersonId) activePersonId = trip.travelers[0].id;

  trip.travelers.forEach(person => {
    const btn = document.createElement("button");
    btn.textContent = person.name;
    btn.className = person.id === activePersonId ? "active" : "";
    btn.addEventListener("click", () => { activePersonId = person.id; renderTodos(); });
    tabsRoot.appendChild(btn);
  });

  const listRoot = document.getElementById("todo-list");
  const items = trip.todosByPerson[activePersonId] || [];
  renderChecklist(listRoot, items, {
    onToggle: (i) => { items[i].done = !items[i].done; saveTrip(); renderTodos(); },
    onDelete: (i) => { items.splice(i, 1); saveTrip(); renderTodos(); }
  });

  const addWrap = document.getElementById("todo-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    addWrap.appendChild(buildAddRow("Add a to-do for this person…", (text) => {
      if (!trip.todosByPerson[activePersonId]) trip.todosByPerson[activePersonId] = [];
      trip.todosByPerson[activePersonId].push({ text, done: false });
      saveTrip();
      renderTodos();
    }));
  }
}

/* ----------------------------------------------------------------------- */
/* ACTION ITEMS                                                            */
/* ----------------------------------------------------------------------- */

function renderActionItems() {
  const root = document.getElementById("action-list");
  renderChecklist(root, trip.actionItems, {
    onToggle: (i) => { trip.actionItems[i].done = !trip.actionItems[i].done; saveTrip(); renderActionItems(); },
    onDelete: (i) => { trip.actionItems.splice(i, 1); saveTrip(); renderActionItems(); },
    showOwner: true
  });
  const addWrap = document.getElementById("action-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    addWrap.appendChild(buildAddRow("Add an action item…", (text) => {
      trip.actionItems.push({ text, owner: "", due: "", done: false });
      saveTrip();
      renderActionItems();
    }));
  }
}

/* ----------------------------------------------------------------------- -*/
/* TIMELINE                                                                */
/* ----------------------------------------------------------------------- */

function renderTimeline() {
  const root = document.getElementById("timeline-list");
  root.innerHTML = "";
  trip.timeline.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = item.done ? "done" : "";
    li.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""}/>
      <div class="item-text"><strong>${esc(item.when)}</strong> — ${esc(item.text)}</div>
      ${editMode ? `<button class="item-del">✕</button>` : ""}
    `;
    li.querySelector("input").addEventListener("change", () => {
      trip.timeline[i].done = !trip.timeline[i].done;
      saveTrip();
      renderTimeline();
    });
    if (editMode) {
      li.querySelector(".item-del").addEventListener("click", () => {
        trip.timeline.splice(i, 1); saveTrip(); renderTimeline();
      });
    }
    root.appendChild(li);
  });
  const addWrap = document.getElementById("timeline-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    addWrap.appendChild(buildAddRow("Add a timeline step (e.g. '2 weeks before')…", (text) => {
      trip.timeline.push({ when: "", text, done: false });
      saveTrip();
      renderTimeline();
    }, true));
  }
}

/* ----------------------------------------------------------------------- */
/* SHARED HELPERS                                                         */
/* ---------------------------------------------------------------------- */

function renderChecklist(root, items, { onToggle, onDelete, showOwner }) {
  root.innerHTML = "";
  const ul = document.createElement("ul");
  ul.className = "checklist";
  items.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = item.done ? "done" : "";
    li.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""}/>
      <div class="item-text">${esc(item.text)}${showOwner && item.owner ? ` <span class="item-owner">— ${esc(item.owner)}</span>` : ""}</div>
      ${editMode ? `<button class="item-del">✕</button>` : ""}
    `;
    li.querySelector("input").addEventListener("change", () => onToggle(i));
    if (editMode) li.querySelector(".item-del").addEventListener("click", () => onDelete(i));
    ul.appendChild(li);
  });
  root.appendChild(ul);
}

function buildAddRow(placeholder, onAdd, includeWhen) {
  const wrap = document.createElement("div");
  wrap.className = "add-row";
  if (includeWhen) {
    const whenInput = document.createElement("input");
    whenInput.placeholder = "When (e.g. '2 weeks before')";
    whenInput.style.maxWidth = "180px";
    wrap.appendChild(whenInput);
    const textInput = document.createElement("input");
    textInput.placeholder = placeholder;
    wrap.appendChild(textInput);
    const btn = document.createElement("button");
    btn.textContent = "Add";
    btn.addEventListener("click", () => {
      if (!textInput.value.trim()) return;
      trip.timeline[trip.timeline.length] = { when: whenInput.value, text: textInput.value, done: false };
      saveTrip();
      renderTimeline();
    });
    wrap.appendChild(btn);
    return wrap;
  }
  const input = document.createElement("input");
  input.placeholder = placeholder;
  wrap.appendChild(input);
  const btn = document.createElement("button");
  btn.textContent = "Add";
  btn.addEventListener("click", () => {
    if (!input.value.trim()) return;
    onAdd(input.value.trim());
    input.value = "";
  });
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
  wrap.appendChild(btn);
  return wrap;
}

/* --------------------------------------------------------------------------- */
/* HOTEL BOOKINGS                                                              */
/* --------------------------------------------------------------------------- */

function renderHotelBookings() {
  const root = document.getElementById("hotel-bookings-grid");
  root.innerHTML = "";
  trip.hotelBookings.forEach((h, idx) => {
    const card = document.createElement("div");
    card.className = "person-card";
    card.innerHTML = `
      <h3>${esc(h.name) || "Untitled hotel"}</h3>
      <div class="person-role">${esc(h.cityAddress || "")}</div>
      <div class="field"><label>Contact</label>${h.contact ? esc(h.contact) : "<em>—</em>"}</div>
      <div class="field"><label>Check-in</label>${h.checkIn ? esc(h.checkIn) : "<em>—</em>"}</div>
      <div class="field"><label>Check-out</label>${h.checkOut ? esc(h.checkOut) : "<em>—</em>"}</div>
      <div class="field"><label># of Nights</label>${h.nights ? esc(h.nights) : "<em>—</em>"}</div>
      <div class="field"><label>Confirmation #</label>${h.confirmation ? esc(h.confirmation) : "<em>—</em>"}</div>
      <div class="field"><label>Website</label>${h.website ? `<a href="${esc(h.website)}" target="_blank" rel="noopener">${esc(h.website)}</a>` : "<em>—</em>"}</div>
      <div class="opt-actions edit-only" style="margin-top:8px;">
        <button title="Edit">Edit</button>
      </div>
    `;
    card.querySelector(".opt-actions button").addEventListener("click", () => openHotelBookingModal(idx));
    root.appendChild(card);
  });

  const addWrap = document.getElementById("hotel-bookings-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    const btn = document.createElement("button");
    btn.className = "add-option-btn";
    btn.textContent = "+ Add hotel booking";
    btn.addEventListener("click", () => openHotelBookingModal(null));
    addWrap.appendChild(btn);
  }
}

function openHotelBookingModal(idx) {
  const isNew = idx === null;
  const h = isNew ? { name: "", cityAddress: "", contact: "", checkIn: "", checkOut: "", nights: "", confirmation: "", website: "" } : trip.hotelBookings[idx];
  openModal(isNew ? "Add hotel booking" : "Edit hotel booking", [
    { key: "name", label: "Hotel name", value: h.name },
    { key: "cityAddress", label: "Hotel city / address & contact info", value: h.cityAddress },
    { key: "contact", label: "Contact info", value: h.contact },
    { key: "checkIn", label: "Check-in date", type: "date", value: h.checkIn },
    { key: "checkOut", label: "Check-out date", type: "date", value: h.checkOut },
    { key: "nights", label: "# of nights", value: h.nights },
    { key: "confirmation", label: "Confirmation #", value: h.confirmation },
    { key: "website", label: "Link to website", value: h.website }
  ], (values) => {
    const newH = { name: values.name, cityAddress: values.cityAddress, contact: values.contact, checkIn: values.checkIn, checkOut: values.checkOut, nights: values.nights, confirmation: values.confirmation, website: values.website };
    if (isNew) trip.hotelBookings.push(newH);
    else trip.hotelBookings[idx] = newH;
    saveTrip();
    renderHotelBookings();
  }, isNew ? null : () => {
    trip.hotelBookings.splice(idx, 1);
    saveTrip();
    renderHotelBookings();
  });
}

/* --------------------------------------------------------------------------- */
/* FLIGHT BOOKINGS                                                             */
/* --------------------------------------------------------------------------- */

function renderFlightBookings() {
  const root = document.getElementById("flight-bookings-grid");
  root.innerHTML = "";
  trip.flightBookings.forEach((f, idx) => {
    const card = document.createElement("div");
    card.className = "person-card";
    card.innerHTML = `
      <h3>${esc(f.depCity) || "?"} → ${esc(f.arrCity) || "?"}</h3>
      <div class="person-role">${esc(f.date || "")}</div>
      <div class="field"><label>Departs</label>${f.depCity ? esc(f.depCity) : "<em>—</em>"}${f.depTime ? " at " + esc(f.depTime) : ""}</div>
      <div class="field"><label>Arrives</label>${f.arrCity ? esc(f.arrCity) : "<em>—</em>"}${f.arrTime ? " at " + esc(f.arrTime) : ""}</div>
      <div class="field"><label>Confirmation #</label>${f.confirmation ? esc(f.confirmation) : "<em>—</em>"}</div>
      <div class="field"><label>Travelers</label>${f.travelers ? esc(f.travelers) : "<em>—</em>"}</div>
      <div class="opt-actions edit-only" style="margin-top:8px;">
        <button title="Edit">Edit</button>
      </div>
    `;
    card.querySelector(".opt-actions button").addEventListener("click", () => openFlightBookingModal(idx));
    root.appendChild(card);
  });

  const addWrap = document.getElementById("flight-bookings-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    const btn = document.createElement("button");
    btn.className = "add-option-btn";
    btn.textContent = "+ Add flight booking";
    btn.addEventListener("click", () => openFlightBookingModal(null));
    addWrap.appendChild(btn);
  }
}

function openFlightBookingModal(idx) {
  const isNew = idx === null;
  const f = isNew ? { date: "", depCity: "", depTime: "", arrCity: "", arrTime: "", confirmation: "", travelers: "" } : trip.flightBookings[idx];
  const travelerOptions = trip.travelers.map(t => ({ value: t.name, label: t.name }));
  openModal(isNew ? "Add flight booking" : "Edit flight booking", [
    { key: "date", label: "Date of flight", type: "date", value: f.date },
    { key: "depCity", label: "City of departure", value: f.depCity },
    { key: "depTime", label: "Time of departure", type: "time", value: f.depTime },
    { key: "arrCity", label: "City of arrival", value: f.arrCity },
    { key: "arrTime", label: "Time of arrival", type: "time", value: f.arrTime },
    { key: "confirmation", label: "Confirmation #", value: f.confirmation },
    { key: "travelers", label: "Travelers", type: "checkboxes", options: travelerOptions, value: f.travelers }
  ], (values) => {
    const newF = { date: values.date, depCity: values.depCity, depTime: values.depTime, arrCity: values.arrCity, arrTime: values.arrTime, confirmation: values.confirmation, travelers: values.travelers };
    if (isNew) trip.flightBookings.push(newF);
    else trip.flightBookings[idx] = newF;
    saveTrip();
    renderFlightBookings();
  }, isNew ? null : () => {
    trip.flightBookings.splice(idx, 1);
    saveTrip();
    renderFlightBookings();
  });
}

/* --------------------------------------------------------------------------- */
/* BOOKINGS (general cost log)                                                 */
/* --------------------------------------------------------------------------- */

const BOOKING_TYPES = ["Flight", "Hotel", "Transportation", "Other"];

function renderBookings() {
  const tbody = document.getElementById("bookings-body");
  tbody.innerHTML = "";
  trip.bookings.forEach((b, idx) => {
    const tr = document.createElement("tr");

    const cityTd = document.createElement("td");
    cityTd.dataset.label = "City";
    cityTd.innerHTML = editMode ? `<input data-f="city" value="${esc(b.city)}"/>` : (esc(b.city) || "—");
    tr.appendChild(cityTd);

    const typeTd = document.createElement("td");
    typeTd.dataset.label = "Type";
    if (editMode) {
      const sel = document.createElement("select");
      BOOKING_TYPES.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        if (opt === b.type) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener("change", () => { trip.bookings[idx].type = sel.value; saveTrip(); });
      typeTd.appendChild(sel);
    } else {
      typeTd.textContent = b.type || "—";
    }
    tr.appendChild(typeTd);

    const nameTd = document.createElement("td");
    nameTd.dataset.label = "Name";
    nameTd.innerHTML = editMode ? `<input data-f="name" value="${esc(b.name)}"/>` : (esc(b.name) || "—");
    tr.appendChild(nameTd);

    const priceTd = document.createElement("td");
    priceTd.dataset.label = "Price";
    priceTd.innerHTML = editMode ? `<input data-f="price" value="${esc(b.price)}"/>` : (esc(b.price) || "—");
    tr.appendChild(priceTd);

    if (editMode) {
      const delTd = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.className = "item-del";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => { trip.bookings.splice(idx, 1); saveTrip(); renderBookings(); });
      delTd.appendChild(delBtn);
      tr.appendChild(delTd);

      tr.querySelectorAll('input[data-f]').forEach(inp => {
        inp.addEventListener("change", () => { trip.bookings[idx][inp.dataset.f] = inp.value; saveTrip(); });
      });
    }

    tbody.appendChild(tr);
  });

  const addWrap = document.getElementById("bookings-add-wrap");
  addWrap.innerHTML = "";
  if (editMode) {
    const btn = document.createElement("button");
    btn.className = "add-option-btn";
    btn.textContent = "+ Add booking";
    btn.addEventListener("click", () => {
      trip.bookings.push({ city: "", type: "Flight", name: "", price: "" });
      saveTrip();
      renderBookings();
    });
    addWrap.appendChild(btn);
  }
}
