(function () {
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const currentFlyerEl = document.getElementById("current-flyer");
  const lightbox = document.getElementById("flyer-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const monthLabel = `${MONTH_NAMES[currentMonth - 1]} ${currentYear}`;

  const allFlyers = parseFlyers(STORE.monthlyFlyers || []);
  const currentKey = `${currentYear}-${currentMonth}`;
  const currentFlyer =
    allFlyers.find((f) => f.key === currentKey) || allFlyers[0] || null;

  if (STORE.flyerComingSoon || !currentFlyer) {
    renderComingSoon();
  } else {
    renderCurrentFlyer();
  }

  function parseFlyers(raw) {
    return raw
      .map((entry) => {
        const image = typeof entry === "string" ? entry : entry.image;
        const parsed = parseFilename(image);
        if (!parsed) return null;
        const title =
          typeof entry === "object" && entry.title
            ? entry.title
            : `${parsed.monthName} ${parsed.year} Specials`;
        const description =
          typeof entry === "object" && entry.description ? entry.description : "";
        return {
          image,
          title,
          description,
          year: parsed.year,
          month: parsed.month,
          monthName: parsed.monthName,
          key: `${parsed.year}-${parsed.month}`,
          label: `${parsed.monthName} ${parsed.year}`,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.year - a.year || b.month - a.month);
  }

  function parseFilename(path) {
    const match = path.match(/(\d{4})-(\d{2})/);
    if (!match) return null;
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    if (month < 1 || month > 12) return null;
    return { year, month, monthName: MONTH_NAMES[month - 1] };
  }

  function renderComingSoon() {
    if (!currentFlyerEl) return;

    currentFlyerEl.innerHTML = `
      <div class="current-flyer current-flyer--featured current-flyer--coming-soon">
        <div class="flyer-coming-soon">
          <p class="section__eyebrow">${monthLabel}</p>
          <div class="flyer-coming-soon__icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <h2 class="flyer-coming-soon__title">Coming Soon</h2>
          <p class="flyer-coming-soon__text">This month's deals flyer is on its way. Check back soon, visit us in store, or call for today's specials.</p>
          <div class="flyer-coming-soon__actions">
            <a href="contact.html" class="btn btn--primary btn--lg">Contact Us</a>
            <a href="tel:${STORE.phone.replace(/\D/g, "")}" class="btn btn--outline btn--lg">${STORE.phone}</a>
          </div>
        </div>
      </div>`;

    PHLS.refreshReveal?.();
  }

  function renderCurrentFlyer() {
    if (!currentFlyerEl || !currentFlyer) return;

    currentFlyerEl.innerHTML = `
      <div class="current-flyer current-flyer--featured">
        <div class="current-flyer__image-wrap current-flyer__image-wrap--large">
          <img class="current-flyer__img" src="${currentFlyer.image}" alt="${currentFlyer.title}" />
          <span class="current-flyer__zoom-hint">Click to view full size</span>
        </div>
        <div class="current-flyer__header">
          <p class="section__eyebrow">${currentFlyer.label}</p>
          <h2 class="current-flyer__title">${currentFlyer.title}</h2>
          ${currentFlyer.description ? `<p class="current-flyer__desc">${currentFlyer.description}</p>` : ""}
        </div>
        <div class="current-flyer__actions">
          <button class="btn btn--primary btn--lg current-flyer__view">View Full Flyer</button>
        </div>
      </div>`;

    const wrap = currentFlyerEl.querySelector(".current-flyer__image-wrap");
    const img = currentFlyerEl.querySelector(".current-flyer__img");
    const open = () => tryOpenFlyer(currentFlyer.image, currentFlyer.title, img);

    img?.addEventListener("error", renderComingSoon);
    if (img?.complete && img.naturalWidth === 0) renderComingSoon();
    else {
      currentFlyerEl.querySelector(".current-flyer__view")?.addEventListener("click", open);
      img?.addEventListener("click", open);
    }

    PHLS.refreshReveal?.();
  }

  function tryOpenFlyer(src, title, img) {
    if (img && img.complete && img.naturalWidth > 0) openLightbox(src, title);
  }

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
  });
})();
