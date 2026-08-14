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

  renderCurrentFlyer();

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

  function renderCurrentFlyer() {
    if (!currentFlyerEl) return;

    if (currentFlyer) {
      currentFlyerEl.innerHTML = `
        <div class="current-flyer current-flyer--featured">
          <div class="current-flyer__header">
            <p class="section__eyebrow">${currentFlyer.label}</p>
            <h2 class="current-flyer__title">${currentFlyer.title}</h2>
            ${currentFlyer.description ? `<p class="current-flyer__desc">${currentFlyer.description}</p>` : ""}
          </div>
          <div class="current-flyer__image-wrap current-flyer__image-wrap--large">
            <img class="current-flyer__img" src="${currentFlyer.image}" alt="${currentFlyer.title}" />
            <div class="current-flyer__placeholder">
              <span>${currentFlyer.label}</span>
              <small>Upload: ${currentFlyer.image}</small>
            </div>
            <span class="current-flyer__zoom-hint">Click to view full size</span>
          </div>
          <div class="current-flyer__actions">
            <button class="btn btn--primary btn--lg current-flyer__view">View Full Flyer</button>
          </div>
        </div>`;

      bindFlyerImage(currentFlyerEl.querySelector(".current-flyer__image-wrap"));
      const img = currentFlyerEl.querySelector(".current-flyer__img");
      const open = () => tryOpenFlyer(currentFlyer.image, currentFlyer.title, img);

      currentFlyerEl.querySelector(".current-flyer__view")?.addEventListener("click", open);
      img?.addEventListener("click", open);
    } else {
      currentFlyerEl.innerHTML = `
        <div class="current-flyer current-flyer--featured current-flyer--empty">
          <div class="current-flyer__empty">
            <div class="current-flyer__empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h2>${monthLabel} Flyer</h2>
            <p>Coming soon! Save your flyer as <code>images/flyers/${currentYear}-${String(currentMonth).padStart(2, "0")}-${MONTH_NAMES[currentMonth - 1].toLowerCase()}.jpg</code> and add it to <code>config.js</code>.</p>
          </div>
        </div>`;
    }

    PHLS.refreshReveal?.();
  }

  function bindFlyerImage(wrap) {
    if (!wrap) return;
    const img = wrap.querySelector("img");
    const placeholder = wrap.querySelector("[class*='placeholder']");
    if (!img || !placeholder) return;

    img.addEventListener("error", () => {
      img.style.display = "none";
      placeholder.style.display = "flex";
    });
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event("error"));
    else if (img.complete && img.naturalWidth > 0) placeholder.style.display = "none";
    else img.addEventListener("load", () => { placeholder.style.display = "none"; });
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
