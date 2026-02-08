document.querySelectorAll("[data-carousel]").forEach((root) => {
  const track = root.querySelector("[data-track]");
  const dots = Array.from(root.querySelectorAll("[data-dots] .p-carousel__dot"));
  if (!track || dots.length < 2) return;

  let index = 0;
  let timer = null;
  let isPaused = false;

  const slideTo = (idx) => {
    index = idx;
    track.scrollTo({
      left: idx * track.clientWidth,
      behavior: "smooth",
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  };

  const next = () => {
    slideTo((index + 1) % dots.length);
  };

  const start = () => {
    if (!timer) timer = setInterval(next, 3000);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  /* --- interactions --- */
  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      stop();
      slideTo(i);
      start();
    })
  );

  root.addEventListener("mouseenter", () => (isPaused = true, stop()));
  root.addEventListener("mouseleave", () => (isPaused = false, start()));

  let raf = 0;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      if (idx !== index) {
        index = idx;
        dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
      }
    });
  });

  track.addEventListener("pointerdown", stop);
  track.addEventListener("pointerup", start);
  track.addEventListener("touchstart", stop, { passive: true });
  track.addEventListener("touchend", start);

  /* --- init --- */
  slideTo(0);
  start();
});

(() => {
  const modal = document.getElementById("cc-modal");
  if (!modal) return;

  const msgMissing = modal.dataset.msgMissing;
  const msgSuccess = modal.dataset.msgSuccess;
  const msgCoins = modal.dataset.msgCoins;

  const productEl = document.getElementById("cc-product");
  const coinsEl = document.getElementById("cc-coins");
  const inputEl = document.getElementById("cc-player-id");
  const formEl = document.getElementById("cc-form");
  const hintEl = document.getElementById("cc-hint");

  let lastFocus = null;
  let currentProduct = null;
  let currentCoins = null;

  const openModal = ({ product, coins }) => {
    lastFocus = document.activeElement;
    currentProduct = product;
    currentCoins = coins;

    productEl.textContent = product || "Product";
    coinsEl.textContent = coins || "0";
    hintEl.textContent = msgMissing;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus input
    setTimeout(() => inputEl?.focus(), 0);
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  // Open from any coin button
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".coin-btn[data-product][data-coins]");
    if (!btn) return;

    openModal({
      product: btn.getAttribute("data-product"),
      coins: btn.getAttribute("data-coins"),
    });
  });

  // Close handlers
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-cc-close]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Submit handler (replace with your real logic)
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const playerId = inputEl.value.trim();
  if (!playerId) {
    hintEl.textContent = "ID :";
    inputEl.focus();
    return;
  }

hintEl.textContent =
  `✅ ${msgSuccess} "${currentProduct}" ` +
  `(${currentCoins} ${msgCoins}) — ID: ${playerId}`;


  // ⏳ close modal after 2 seconds
  setTimeout(() => {
    closeModal();
    formEl.reset();
  }, 2000);
});

})();
