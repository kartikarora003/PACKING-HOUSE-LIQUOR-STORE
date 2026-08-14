(function () {
  const AGE_KEY = "phls_age_verified";
  const CASHBACK_KEY = "phls_cashback_seen";
  const currentPage = document.body.dataset.page || "home";

  // ===================== Age Gate =====================
  const ageGate = document.getElementById("age-gate");
  const ageDenied = document.getElementById("age-denied");
  const site = document.getElementById("site");

  function showSite() {
    if (ageGate) ageGate.classList.add("hidden");
    if (site) site.classList.remove("hidden");
    initScrollReveal();
    showCashbackPromptBar();
  }

  function showCashbackPromptBar() {
    const bar = document.getElementById("cashback-prompt-bar");
    if (!bar || sessionStorage.getItem(CASHBACK_KEY) === "true") return;
    bar.classList.remove("hidden");
  }

  function dismissCashbackPrompt() {
    const bar = document.getElementById("cashback-prompt-bar");
    if (bar) bar.classList.add("hidden");
    sessionStorage.setItem(CASHBACK_KEY, "true");
  }

  if (sessionStorage.getItem(AGE_KEY) === "true") {
    showSite();
  } else if (ageGate) {
    document.getElementById("age-yes")?.addEventListener("click", () => {
      sessionStorage.setItem(AGE_KEY, "true");
      showSite();
    });
    document.getElementById("age-no")?.addEventListener("click", () => {
      ageGate.classList.add("hidden");
      ageDenied?.classList.remove("hidden");
    });
  }

  // ===================== Nav & Footer =====================
  const phoneDigits = STORE.phone.replace(/\D/g, "");
  const fullAddress = `${STORE.address.street}, ${STORE.address.city}, ${STORE.address.state} ${STORE.address.zip}`;

  const IMAGE_FALLBACK =
    "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1200&q=80";

  function setBackgroundImage(el, url) {
    if (!el || !url) return;
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url('${url}')`;
    };
    img.onerror = () => {
      el.style.backgroundImage = `url('${IMAGE_FALLBACK}')`;
    };
    img.src = url;
  }

  const navItems = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "flyers", label: "Flyers", href: "flyers.html" },
    { id: "delivery", label: "Delivery", href: "delivery.html" },
    { id: "contact", label: "Contact", href: "contact.html" },
  ];

  function renderNav() {
    const navEl = document.getElementById("site-nav");
    if (!navEl) return;

    const links = navItems
      .map(
        (item) =>
          `<li><a href="${item.href}" class="${currentPage === item.id ? "active" : ""}">${item.label}</a></li>`
      )
      .join("");

    navEl.innerHTML = `
      <header class="header" id="header">
        <nav class="nav container">
          <a href="index.html" class="nav__logo">
            <span class="nav__logo-main">${STORE.brandMain || STORE.name}</span>
            <span class="nav__logo-sub">${STORE.brandSub || ""}</span>
          </a>
          <button class="nav__toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav__links" id="nav-links">
            ${links}
            <li class="nav__phone-wrap">
              <a class="nav__phone" href="tel:${phoneDigits}">${STORE.phone}</a>
            </li>
          </ul>
        </nav>
      </header>`;

    initMobileNav();
    initHeaderScroll();
  }

  function renderLoyaltyBanner() {
    const lp = STORE.loyaltyProgram;
    if (!lp) return "";

    return `<div class="loyalty-banner">
      <div class="loyalty-banner__glow" aria-hidden="true"></div>
      <div class="loyalty-banner__inner">
        <span class="loyalty-banner__badge">${lp.badge || "Rewards"}</span>
        <div class="loyalty-banner__main">
          <span class="loyalty-banner__rate">${lp.rate}</span>
          <div class="loyalty-banner__text">
            <h2 class="loyalty-banner__title">${lp.headline}</h2>
            <p class="loyalty-banner__desc">${lp.description}</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderPaymentBadges(compact) {
    const methods = STORE.paymentMethods || [];
    if (!methods.length) return "";

    const badges = methods
      .map(
        (m) =>
          `<span class="payment-badge payment-badge--${m.id}" title="${m.label}">${m.label}</span>`
      )
      .join("");

    if (compact) {
      return `<div class="payment-methods payment-methods--compact">
        <span class="payment-methods__label">We Accept</span>
        <div class="payment-methods__badges">${badges}</div>
      </div>`;
    }

    return `<div class="payment-methods">
      <p class="payment-methods__heading">Payment Methods</p>
      <p class="payment-methods__note">${STORE.paymentsNote || "All major cards accepted."}</p>
      <div class="payment-methods__badges">${badges}</div>
    </div>`;
  }

  function renderFooter() {
    const footerEl = document.getElementById("site-footer");
    if (!footerEl) return;

    const socialLinks = [];
    if (STORE.social.instagram) {
      socialLinks.push(`
        <a href="${STORE.social.instagram}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          ${STORE.social.instagramHandle}
        </a>`);
    }
    if (STORE.social.facebook) {
      socialLinks.push(`
        <a href="${STORE.social.facebook}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          ${STORE.social.facebookHandle || "Facebook"}
        </a>`);
    }

    footerEl.innerHTML = `
      <footer class="footer">
        <div class="container footer__grid">
          <div class="footer__col">
            <p class="footer__name">${STORE.name}</p>
            <p class="footer__address">${fullAddress}</p>
            <a class="footer__phone" href="tel:${phoneDigits}">${STORE.phone}</a>
          </div>
          <div class="footer__col">
            <p class="footer__heading">Quick Links</p>
            <ul class="footer__links">
              ${navItems.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join("")}
              <li><a href="${STORE.googleReviewsUrl}" target="_blank" rel="noopener">Google Reviews</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <p class="footer__heading">Order Delivery</p>
            <ul class="footer__links">
              <li><a href="${STORE.delivery.doordash.url}" target="_blank" rel="noopener">DoorDash</a></li>
              <li><a href="${STORE.delivery.ubereats.url}" target="_blank" rel="noopener">Uber Eats</a></li>
              <li><a href="tel:${phoneDigits}">Private Delivery (${STORE.delivery.private.hours})</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <p class="footer__heading">Connect</p>
            <div class="footer__social">${socialLinks.join("")}</div>
            <a class="footer__email" href="mailto:${STORE.email}">${STORE.email}</a>
          </div>
        </div>
        <div class="footer__payments">
          ${renderPaymentBadges(true)}
        </div>
        <div class="footer__bottom">
          <p class="footer__legal">Please drink responsibly. Must be 19+ to purchase alcohol in British Columbia.</p>
          <p class="footer__copy">&copy; ${new Date().getFullYear()} ${STORE.name}. All rights reserved.</p>
          <p class="footer__credit">
            Website made by
            <a href="${STORE.credits?.instagram || "https://www.instagram.com/kartikarora003/"}" target="_blank" rel="noopener noreferrer">${STORE.credits?.name || "Kartik"}</a>
            · Instagram
            <a href="${STORE.credits?.instagram || "https://www.instagram.com/kartikarora003/"}" target="_blank" rel="noopener noreferrer">${STORE.credits?.handle || "@kartikarora003"}</a>
          </p>
        </div>
      </footer>`;
  }

  // ===================== Helpers =====================
  window.PHLS = {
    phoneDigits,
    fullAddress,
    renderPaymentBadges,
    renderCashbackPrompt,
    renderPaymentMethods(containerId, compact) {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = renderPaymentBadges(compact);
    },
    renderLoyalty(containerId) {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = renderLoyaltyBanner();
    },
    getTodayHours() {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = dayNames[new Date().getDay()];
      const match = STORE.hours.find((h) => h.day === today || h.day.startsWith(today.slice(0, 3)));
      return match?.time || "9:00 AM – 11:00 PM";
    },
    renderHoursList(containerId) {
      const el = document.getElementById(containerId);
      if (!el) return;
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = dayNames[new Date().getDay()];
      STORE.hours.forEach(({ day, time }) => {
        const li = document.createElement("li");
        const isToday = day === today;
        li.className = isToday ? "hours-list__today" : "";
        li.innerHTML = `<span>${day}${isToday ? ' <em>(Today)</em>' : ""}</span><span>${time}</span>`;
        el.appendChild(li);
      });
    },
    renderHoursGrid(containerId) {
      const el = document.getElementById(containerId);
      if (!el) return;
      const abbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = dayNames[new Date().getDay()];
      el.innerHTML = STORE.hours
        .map(({ day, time }, i) => {
          const isToday = day === today;
          const short = abbr[i] || day.slice(0, 3);
          return `<div class="hours-day reveal${i > 0 ? ` reveal--delay-${Math.min(i % 4, 3)}` : ""}${isToday ? " hours-day--today" : ""}">
            <span class="hours-day__abbr">${short}</span>
            <span class="hours-day__name">${day}${isToday ? '<span class="hours-day__badge">Today</span>' : ""}</span>
            <span class="hours-day__time">${time}</span>
          </div>`;
        })
        .join("");
      initScrollReveal();
    },
    renderOffers(containerId) {
      const el = document.getElementById(containerId);
      if (!el || !STORE.offers) return;
      el.innerHTML = STORE.offers
        .map(
          (offer, i) => `
        <article class="offer-card reveal${i > 0 ? ` reveal--delay-${Math.min(i, 3)}` : ""}">
          ${offer.badge ? `<span class="offer-card__badge">${offer.badge}</span>` : ""}
          <span class="offer-card__icon" aria-hidden="true">${offer.icon}</span>
          ${offer.price ? `<div class="offer-card__price"><span class="offer-card__amount">${offer.price}</span>${offer.priceDetail ? `<span class="offer-card__detail">${offer.priceDetail}</span>` : ""}</div>` : ""}
          <h3>${offer.title}</h3>
          <p>${offer.description}</p>
        </article>`
        )
        .join("");
      initScrollReveal();
    },
    renderGallery(containerId) {
      const el = document.getElementById(containerId);
      if (!el || !STORE.gallery) return;
      STORE.gallery.forEach((photo, i) => {
        const item = document.createElement("div");
        item.className = `gallery__item reveal${i > 0 ? ` reveal--delay-${Math.min(i, 3)}` : ""}`;
        item.innerHTML = `
          <img src="${photo.src}" alt="${photo.alt}" loading="lazy" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}'" />
          <div class="gallery__overlay"><span>${photo.alt}</span></div>`;
        el.appendChild(item);
      });
      initScrollReveal();
    },
    renderPhotoStrip(containerId) {
      const el = document.getElementById(containerId);
      const photos = STORE.photoStrip || STORE.gallery?.map((p) => p.src);
      if (!el || !photos?.length) return;

      const items = photos
        .map((src) => `<div class="photo-strip__item" style="background-image:url('${src}')"></div>`)
        .join("");
      el.innerHTML = items + items;
    },
    renderShowcase(containerId) {
      const el = document.getElementById(containerId);
      if (!el || !STORE.showcase) return;

      el.innerHTML = STORE.showcase
        .map(
          (item, i) => `
        <article class="showcase-card reveal${i > 0 ? ` reveal--delay-${Math.min(i, 3)}` : ""}">
          <div class="showcase-card__image" data-bg="${item.image}" role="img" aria-label="${item.title}"></div>
          <div class="showcase-card__body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>`
        )
        .join("");
      el.querySelectorAll("[data-bg]").forEach((node) => setBackgroundImage(node, node.dataset.bg));
      initScrollReveal();
    },
    applyHeroImages() {
      if (!STORE.heroImages) return;
      const storefront = STORE.storefront || STORE.heroImages.main;
      const bg = document.querySelector(".hero__bg");
      const side1 = document.querySelector(".hero__photo--1");
      const side2 = document.querySelector(".hero__photo--2");
      const side3 = document.querySelector(".hero__photo--3");
      const about = document.querySelector(".about__image");
      const float1 = document.querySelector(".about__float--1");
      const float2 = document.querySelector(".about__float--2");
      const contactHero = document.querySelector(".page-hero--contact");
      const flyersHero = document.querySelector(".page-hero--flyers");
      const deliveryHero = document.querySelector(".page-hero--delivery");
      const ageBackdrop = document.querySelector(".age-gate__backdrop");

      if (bg) setBackgroundImage(bg, STORE.heroImages.main);
      if (side1) setBackgroundImage(side1, STORE.heroImages.side1);
      if (side2) setBackgroundImage(side2, STORE.heroImages.side2 || storefront);
      if (side3) setBackgroundImage(side3, STORE.heroImages.side3);
      if (about) setBackgroundImage(about, storefront);
      if (float1) setBackgroundImage(float1, STORE.heroImages.side3 || storefront);
      if (float2) setBackgroundImage(float2, STORE.heroImages.side1 || storefront);
      if (contactHero) setBackgroundImage(contactHero, storefront);
      if (flyersHero) setBackgroundImage(flyersHero, STORE.gallery?.[5]?.src || storefront);
      if (deliveryHero) setBackgroundImage(deliveryHero, STORE.gallery?.[4]?.src || storefront);
      if (ageBackdrop) setBackgroundImage(ageBackdrop, storefront);

      const socialTiles = [
        document.getElementById("social-tile-1"),
        document.getElementById("social-tile-2"),
        document.getElementById("social-tile-3"),
        document.getElementById("social-tile-4"),
      ];
      const tilePhotos = STORE.gallery?.slice(1, 5) || [];
      socialTiles.forEach((tile, i) => {
        if (tile && tilePhotos[i]) setBackgroundImage(tile, tilePhotos[i].src);
      });
    },
    initContactForm(formId, successId) {
      const form = document.getElementById(formId);
      const success = document.getElementById(successId);
      if (!form) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameVal = form.name.value.trim();
        const emailVal = form.email.value.trim();
        const messageVal = form.message.value.trim();
        if (!nameVal || !emailVal || !messageVal) return;

        const subject = encodeURIComponent(`Message from ${nameVal}`);
        const body = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\n${messageVal}`);
        window.location.href = `mailto:${STORE.email}?subject=${subject}&body=${body}`;

        form.reset();
        success?.classList.remove("hidden");
        setTimeout(() => success?.classList.add("hidden"), 5000);
      });
    },
    renderReviews(summaryId, gridId) {
      const summaryEl = document.getElementById(summaryId);
      const gridEl = document.getElementById(gridId);
      if (!gridEl || !STORE.reviews) return;

      const { rating, totalReviews, source } = STORE.reviewsSummary || { rating: 5, totalReviews: "", source: "Google" };
      const stars = "★".repeat(Math.round(rating)) + (rating % 1 >= 0.5 ? "" : "");

      if (summaryEl) {
        summaryEl.innerHTML = `
          <div class="reviews-summary__score">
            <span class="reviews-summary__number">${rating}</span>
            <div class="reviews-summary__meta">
              <span class="reviews-summary__stars" aria-label="${rating} out of 5 stars">${stars || "★★★★★"}</span>
              <span class="reviews-summary__count">${totalReviews} reviews on ${source}</span>
            </div>
          </div>
          <div class="reviews-summary__badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Rated on Google
          </div>`;
      }

      gridEl.innerHTML = STORE.reviews
        .map((review, i) => {
          const initials = review.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const reviewStars = "★".repeat(review.rating || 5);
          return `
          <article class="review-card reveal${i > 0 ? ` reveal--delay-${Math.min(i % 4, 3)}` : ""}">
            <div class="review-card__quote" aria-hidden="true">"</div>
            <div class="review-card__stars" aria-label="${review.rating} stars">${reviewStars}</div>
            <p class="review-card__text">${review.text}</p>
            <div class="review-card__footer">
              <div class="review-card__avatar" aria-hidden="true">${initials}</div>
              <div class="review-card__author">
                <span class="review-card__name">${review.name}</span>
                <span class="review-card__source">${review.date || "Customer"}</span>
              </div>
            </div>
          </article>`;
        })
        .join("");

      initScrollReveal();
    },
  };

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    });
  }

  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal:not(.visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  function renderDeliveryAddon() {
    const site = document.getElementById("site");
    if (!site || document.getElementById("delivery-addon")) return;

    const msg = STORE.deliveryMessage || "We Deliver!";
    site.insertAdjacentHTML(
      "beforeend",
      `<aside id="delivery-addon" class="delivery-addon" aria-label="Delivery options">
        <div class="delivery-addon__inner">
          <div class="delivery-addon__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div class="delivery-addon__text">
            <strong>We Deliver!</strong>
            <span>DoorDash · Uber Eats · Private (4 PM – 11 PM)</span>
          </div>
          <div class="delivery-addon__actions">
            <a href="${STORE.delivery.doordash.url}" class="delivery-addon__btn delivery-addon__btn--dd" target="_blank" rel="noopener">DoorDash</a>
            <a href="${STORE.delivery.ubereats.url}" class="delivery-addon__btn delivery-addon__btn--ue" target="_blank" rel="noopener">Uber</a>
            <a href="tel:${phoneDigits}" class="delivery-addon__btn delivery-addon__btn--call">Call Us</a>
            <a href="delivery.html" class="delivery-addon__btn delivery-addon__btn--more">Details</a>
          </div>
          <button class="delivery-addon__close" id="delivery-addon-close" aria-label="Dismiss">&times;</button>
        </div>
      </aside>`
    );

    const addon = document.getElementById("delivery-addon");
    const closeBtn = document.getElementById("delivery-addon-close");
    if (sessionStorage.getItem("phls_delivery_dismissed") === "true") {
      addon.classList.add("delivery-addon--dismissed");
    }
    closeBtn?.addEventListener("click", () => {
      addon.classList.add("delivery-addon--dismissed");
      sessionStorage.setItem("phls_delivery_dismissed", "true");
    });
  }

  function renderCashbackPrompt(containerId) {
    const lp = STORE.loyaltyProgram;
    const el = document.getElementById(containerId);
    if (!lp || !el) return;

    el.innerHTML = `<div class="cashback-prompt">
      <span class="cashback-prompt__rate">${lp.rate}</span>
      <div class="cashback-prompt__body">
        <p class="cashback-prompt__title">${lp.headline}</p>
        <p class="cashback-prompt__text">${lp.description} Ask in store to sign up.</p>
      </div>
    </div>`;
  }

  function renderCashbackPromptBar() {
    const lp = STORE.loyaltyProgram;
    const navEl = document.getElementById("site-nav");
    if (!lp || !navEl || document.getElementById("cashback-prompt-bar")) return;

    navEl.insertAdjacentHTML(
      "afterend",
      `<div id="cashback-prompt-bar" class="cashback-prompt-bar${sessionStorage.getItem(CASHBACK_KEY) === "true" ? " hidden" : ""}" role="note">
        <span class="cashback-prompt-bar__rate">${lp.rate}</span>
        <p class="cashback-prompt-bar__text"><strong>${lp.headline}</strong> — ${lp.description}</p>
        <button type="button" class="cashback-prompt-bar__close" id="cashback-prompt-close" aria-label="Dismiss">&times;</button>
      </div>`
    );

    document.getElementById("cashback-prompt-close")?.addEventListener("click", dismissCashbackPrompt);
  }

  function applyPageBranding() {
    const brand = STORE.brandMain || STORE.name;
    document.querySelectorAll(".age-gate__brand").forEach((el) => {
      el.textContent = brand;
    });
  }

  // ===================== Init =====================
  renderNav();
  renderFooter();
  renderDeliveryAddon();
  renderCashbackPromptBar();
  applyPageBranding();

  if (document.getElementById("payment-methods")) {
    PHLS.renderPaymentMethods("payment-methods", false);
  }
  if (document.getElementById("contact-payments")) {
    PHLS.renderPaymentMethods("contact-payments", false);
  }
  if (document.getElementById("loyalty-banner")) {
    PHLS.renderLoyalty("loyalty-banner");
  }
  if (document.getElementById("contact-loyalty")) {
    PHLS.renderLoyalty("contact-loyalty");
  }
  if (document.getElementById("photo-strip-track")) {
    PHLS.renderPhotoStrip("photo-strip-track");
  }
  if (document.getElementById("showcase-grid")) {
    PHLS.renderShowcase("showcase-grid");
  }
  if (document.getElementById("flyer-cashback-prompt")) {
    PHLS.renderCashbackPrompt("flyer-cashback-prompt");
  }

  window.PHLS.refreshReveal = initScrollReveal;

  PHLS.applyHeroImages();

  if (sessionStorage.getItem(AGE_KEY) === "true") {
    initScrollReveal();
  }
})();
