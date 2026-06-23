let map;
let marker;

function getAddress() {
  if (!SITE_CONFIG.address) return "";
  if (typeof SITE_CONFIG.address === "string") return SITE_CONFIG.address;
  return SITE_CONFIG.address[currentLang] ?? SITE_CONFIG.address.en ?? "";
}

function getMapQuery() {
  if (SITE_CONFIG.lat != null && SITE_CONFIG.lng != null) {
    return `${SITE_CONFIG.lat},${SITE_CONFIG.lng}`;
  }
  return getAddress() || SITE_CONFIG.name;
}

function renderAddress() {
  const addressEl = document.getElementById("site-address");
  if (!addressEl) return;

  const address = getAddress();
  if (address) {
    addressEl.textContent = address;
    addressEl.classList.remove("is-placeholder");
  } else {
    addressEl.textContent = t("findUs.addressSoon");
    addressEl.classList.add("is-placeholder");
  }
}

function renderDirections() {
  const el = document.getElementById("getting-here-text");
  if (!el || !SITE_CONFIG.directions) return;
  el.textContent = SITE_CONFIG.directions[currentLang] ?? SITE_CONFIG.directions.en;
}

function renderHours() {
  const listEl = document.getElementById("hours-list");
  const noteEl = document.getElementById("hours-note");
  if (!listEl) return;

  listEl.innerHTML = "";
  SITE_CONFIG.hours
    .filter((row) => row.enabled !== false)
    .forEach((row) => {
      const li = document.createElement("li");
      const day = document.createElement("span");
      const time = document.createElement("span");
      day.className = "hours-day";
      time.className = "hours-time";
      day.textContent = row.day[currentLang] ?? row.day.en;
      time.textContent = row.time[currentLang] ?? row.time.en;
      li.append(day, time);
      listEl.appendChild(li);
    });

  if (noteEl && SITE_CONFIG.hoursNote) {
    noteEl.textContent = SITE_CONFIG.hoursNote[currentLang] ?? SITE_CONFIG.hoursNote.en;
  }
}

function renderContact() {
  const comingSoon = t("contact.comingSoon");

  const phoneValue = document.getElementById("contact-phone-value");
  const phoneLink = document.getElementById("contact-phone-link");
  if (SITE_CONFIG.phone) {
    phoneValue.textContent = SITE_CONFIG.phone;
    phoneLink.href = `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`;
    phoneLink.classList.remove("is-disabled");
    phoneLink.removeAttribute("aria-disabled");
  } else {
    phoneValue.textContent = comingSoon;
    phoneLink.removeAttribute("href");
    phoneLink.classList.add("is-disabled");
    phoneLink.setAttribute("aria-disabled", "true");
  }

  const waValue = document.getElementById("contact-whatsapp-value");
  const waLink = document.getElementById("contact-whatsapp-link");
  if (SITE_CONFIG.whatsapp) {
    waValue.textContent = `+${SITE_CONFIG.whatsapp}`;
    waLink.href = `https://wa.me/${SITE_CONFIG.whatsapp}`;
    waLink.target = "_blank";
    waLink.rel = "noopener noreferrer";
    waLink.classList.remove("is-disabled");
    waLink.removeAttribute("aria-disabled");
  } else {
    waValue.textContent = comingSoon;
    waLink.removeAttribute("href");
    waLink.removeAttribute("target");
    waLink.removeAttribute("rel");
    waLink.classList.add("is-disabled");
    waLink.setAttribute("aria-disabled", "true");
  }

  const emailValue = document.getElementById("contact-email-value");
  const emailLink = document.getElementById("contact-email-link");
  if (SITE_CONFIG.email) {
    emailValue.textContent = SITE_CONFIG.email;
    emailLink.href = `mailto:${SITE_CONFIG.email}`;
    emailLink.classList.remove("is-disabled");
    emailLink.removeAttribute("aria-disabled");
  } else {
    emailValue.textContent = comingSoon;
    emailLink.removeAttribute("href");
    emailLink.classList.add("is-disabled");
    emailLink.setAttribute("aria-disabled", "true");
  }
}

function updateOsmPopup() {
  if (!marker) return;
  const address = getAddress() || t("map.popupNoAddress");
  marker.setPopupContent(`<strong>${SITE_CONFIG.name}</strong><br>${address.replace(/\n/g, "<br>")}`);
}

function renderOsmMap() {
  const container = document.getElementById("map");
  const openLink = document.getElementById("map-open-link");
  if (!container) return;

  if (!map) {
    container.innerHTML = "";
    map = L.map("map", { scrollWheelZoom: false }).setView(
      [SITE_CONFIG.lat, SITE_CONFIG.lng],
      SITE_CONFIG.zoom
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    marker = L.marker([SITE_CONFIG.lat, SITE_CONFIG.lng]).addTo(map);
    updateOsmPopup();
    marker.openPopup();

    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());
  } else {
    map.setView([SITE_CONFIG.lat, SITE_CONFIG.lng], SITE_CONFIG.zoom);
    updateOsmPopup();
  }

  if (openLink) {
    const { lat, lng, zoom } = SITE_CONFIG;
    openLink.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
  }
}

/*
 * Google Maps (optional) — uncomment renderGoogleMap + buildGoogleMapsEmbedSrc below,
 * set mapProvider to "google" in config.js, and add googleMapsApiKey or googleMapsEmbedUrl.

function getGoogleMapsOpenUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getMapQuery())}`;
}

function buildGoogleMapsEmbedSrc() {
  if (SITE_CONFIG.googleMapsEmbedUrl) {
    return SITE_CONFIG.googleMapsEmbedUrl;
  }

  const query = encodeURIComponent(getMapQuery());
  const lang = currentLang === "zh" ? "zh-TW" : "en";
  const zoom = SITE_CONFIG.zoom || 17;

  if (SITE_CONFIG.googleMapsApiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${SITE_CONFIG.googleMapsApiKey}&q=${query}&zoom=${zoom}&language=${lang}`;
  }

  return `https://maps.google.com/maps?q=${query}&z=${zoom}&hl=${lang}&output=embed`;
}

function renderGoogleMap() {
  const container = document.getElementById("map");
  if (!container) return;

  map = null;
  marker = null;

  let iframe = container.querySelector("iframe");
  if (!iframe) {
    container.innerHTML = "";
    iframe = document.createElement("iframe");
    iframe.className = "map-iframe";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.setAttribute("allowfullscreen", "");
    container.appendChild(iframe);
  }

  iframe.title = t("findUs.mapAria");
  iframe.src = buildGoogleMapsEmbedSrc();

  const openLink = document.getElementById("map-open-link");
  if (openLink) {
    openLink.href = getGoogleMapsOpenUrl();
  }
}
*/

function renderMap() {
  if (SITE_CONFIG.mapProvider === "google") {
    console.warn("Google Maps is selected but renderGoogleMap is commented out. Using OpenStreetMap instead.");
  }
  renderOsmMap();
}

function initNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? t("aria.closeMenu") : t("aria.openMenu"));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", t("aria.openMenu"));
    });
  });
}

window.onLanguageChange = () => {
  renderAddress();
  renderDirections();
  renderHours();
  renderContact();
  renderMap();

  const mapEl = document.getElementById("map");
  if (mapEl && SITE_CONFIG.mapProvider !== "google") {
    mapEl.setAttribute("aria-label", t("findUs.mapAria"));
  }

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle?.getAttribute("aria-expanded") !== "true") {
    navToggle.setAttribute("aria-label", t("aria.openMenu"));
  }
};

document.getElementById("year").textContent = new Date().getFullYear();

initLanguage();
renderAddress();
renderDirections();
renderHours();
renderContact();
renderMap();
initNav();
