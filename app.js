(() => {
  const Config = {
    SUPABASE_URL: "https://jdwlazogftqwjhdvahyl.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkd2xhem9nZnRxd2poZHZhaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTU4NjMsImV4cCI6MjA4NDAzMTg2M30.lFLaTzz5DKrjtHRMXBUQC9xCiB5X65tSsdUp9r0hBng",
    STORAGE_KEY: "valentine_coupon_state_v1",
    SCRATCH_THRESHOLD: 0.5,
    COUPONS: [
      { emoji: "🤗", text: "Vale por un abrazo largo" },
      { emoji: "😘", text: "Vale por un beso en la frente" },
      { emoji: "🫶", text: "Vale por una tarde de mimos" },
      { emoji: "🍿", text: "Vale por una noche de películas juntos" },
      { emoji: "🗓️", text: "Vale por elegir el plan del día" },
      { emoji: "🍷", text: "Vale por una cena especial" },
      { emoji: "🥐", text: "Vale por un desayuno en la cama" },
      { emoji: "🍰", text: "Vale por un postre de tu elección" },
      { emoji: "🧺", text: "Vale por un picnic" },
      { emoji: "🌅", text: "Vale por ver el atardecer juntos" },
      { emoji: "🎶", text: "Vale por una playlist hecha para ti" },
      { emoji: "💌", text: "Vale por una carta escrita a mano" },
      { emoji: "✨", text: "Vale por una salida espontánea" },
      { emoji: "👂", text: "Vale por escuchar todo lo que quieras contar" },
      { emoji: "💬", text: "Vale por un mensaje bonito inesperado" },
      { emoji: "🤝", text: "Vale por tomarte la mano cuando quieras" },
      { emoji: "❤️", text: "Vale por un San Valentín conmigo" },
      { emoji: "👑", text: "Vale para cargarte como princesa" },
      { emoji: "💋", text: "Vale por un beso" },
      { emoji: "🙏", text: "Vale por un favor" },
      { emoji: "⏱️", text: "Vale por un abrazo de 30 segundos" },
      { emoji: "🌟", text: "Vale por un cumplido inmediato" },
      { emoji: "😴", text: "Vale por una siesta juntos" },
      { emoji: "🌞", text: "Vale por un “buenos días” especial" },
      { emoji: "🌙", text: "Vale por un “buenas noches” especial" },
      { emoji: "📸", text: "Vale por una foto juntos" },
      { emoji: "🚶", text: "Vale por una caminata sin prisa" },
      { emoji: "☕", text: "Vale por un café o chocolate caliente juntos" },
      { emoji: "🌿", text: "Vale por una tarde sin estrés" },
      { emoji: "🎵", text: "Vale por un rato de música y charla" },
      { emoji: "🎁", text: "Vale por una cita sorpresa planeada por mí" },
      { emoji: "🕯️", text: "Vale por una noche de velas (aunque sea en casa)" },
      { emoji: "💖", text: "Vale por recrear nuestra cita ideal" },
      { emoji: "🎀", text: "Vale por un día de detalles pequeños" },
      { emoji: "✍️", text: "Vale por escribir 10 cosas que me encantan de ti" },
      { emoji: "📦", text: "Vale por una “caja de motivos” (mensajes cortitos)" },
      { emoji: "🤍", text: "Vale por una promesa: escucharte con calma cuando lo necesites" },
      { emoji: "🎯", text: "Vale por un reto: tú eliges, yo lo hago" },
      { emoji: "💃", text: "Vale por un baile en la sala" },
      { emoji: "🎲", text: "Vale por una tarde de juegos (mesa o videojuegos)" },
      { emoji: "🎤", text: "Vale por una canción dedicada (aunque me dé pena)" },
      { emoji: "🏷️", text: "Vale por un apodo nuevo por 24 horas" },
      { emoji: "🪄", text: "Vale por una cita donde tú eres jef@ y yo obedezco (modo cute)" },
      { emoji: "✅", text: "Vale por un “sí” a tu antojo del día" },
      { emoji: "🗺️", text: "Vale por un plan de “tres momentos”: comida + paseo + postre" },
      { emoji: "🎭", text: "Vale por una noche temática (Italia, cine, picnic indoor, etc.)" },
      { emoji: "🧶", text: "Vale por un regalo simbólico hecho a mano" },
      { emoji: "🧖", text: "Vale por una tarde de spa casero" },
      { emoji: "📅", text: "Vale por una tradición nueva juntos (una vez al mes)" },
      { emoji: "📜", text: "Vale por una carta “para abrir cuando…” (triste, feliz, estresad@, etc.)" },
      { emoji: "💞", text: "Vale por un beso lento" },
      { emoji: "🫂", text: "Vale por un abrazo por la espalda" },
      { emoji: "💥", text: "Vale por un beso sorpresa en el momento menos esperado" },
      { emoji: "❤️", text: "Vale por cualquier cosa que quieras sin restricciones" }
    ]
  };

  const dom = {
    grid: document.getElementById("couponGrid"),
    modal: document.getElementById("couponModal"),
    modalBody: document.getElementById("modalBody"),
    modalText: document.getElementById("modalText"),
    modalEmoji: document.getElementById("modalEmoji"),
    modalClose: document.getElementById("modalClose"),
    orbitingHearts: document.getElementById("orbitingHearts"),
    floatingHearts: document.getElementById("floatingHearts")
  };

  const LocalStore = {
    load() {
      try {
        const raw = localStorage.getItem(Config.STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (error) {
        console.warn("No se pudo leer localStorage", error);
        return {};
      }
    },
    save(state) {
      try {
        localStorage.setItem(Config.STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn("No se pudo guardar en localStorage", error);
      }
    }
  };

  const SupabaseStore = {
    enabled: Boolean(Config.SUPABASE_URL && Config.SUPABASE_ANON_KEY && window.supabase),
    client: null,
    init() {
      if (this.enabled) {
        this.client = window.supabase.createClient(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY);
      }
    },
    async load() {
      if (!this.client) {
        return null;
      }
      const { data, error } = await this.client
        .from("coupon_state")
        .select("id, revealed");

      if (error) {
        throw error;
      }

      const freshState = {};
      (data || []).forEach((row) => {
        if (row && row.id) {
          freshState[row.id] = Boolean(row.revealed);
        }
      });

      return freshState;
    },
    async markRevealed(id) {
      if (!this.client) {
        return;
      }
      const { error } = await this.client
        .from("coupon_state")
        .upsert(
          {
            id,
            revealed: true,
            updated_at: new Date().toISOString()
          },
          { onConflict: "id" }
        );
      if (error) {
        throw error;
      }
    }
  };

  const AppState = {
    revealed: {}
  };

  const Persistence = {
    async loadInitialState() {
      const localState = LocalStore.load();
      AppState.revealed = { ...localState };

      if (!SupabaseStore.enabled) {
        return;
      }

      try {
        const remoteState = await SupabaseStore.load();
        if (remoteState) {
          AppState.revealed = { ...localState, ...remoteState };
          LocalStore.save(AppState.revealed);
        }
      } catch (error) {
        console.warn("Supabase no disponible, usando localStorage", error);
      }
    },
    async markRevealed(id) {
      if (AppState.revealed[id]) {
        return;
      }

      AppState.revealed[id] = true;
      LocalStore.save(AppState.revealed);

      if (SupabaseStore.enabled) {
        try {
          await SupabaseStore.markRevealed(id);
        } catch (error) {
          console.warn("Supabase no pudo actualizar el cupón", error);
        }
      }
    }
  };

  const buildCouponId = (index) => `coupon-${String(index + 1).padStart(2, "0")}`;
  const isMobile = () => window.innerWidth <= 640;

  class ScratchSurface {
    constructor(canvas, onReveal, threshold) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.onReveal = onReveal;
      this.threshold = threshold;
      this.isDrawing = false;
      this.lastPoint = null;
      this.lastCheck = 0;
      this.revealed = false;

      this.handlePointerDown = this.handlePointerDown.bind(this);
      this.handlePointerMove = this.handlePointerMove.bind(this);
      this.handlePointerUp = this.handlePointerUp.bind(this);
    }

    init() {
      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = isMobile() ? 34 : 38;
      this.resize();
      this.attachEvents();
    }

    attachEvents() {
      this.canvas.addEventListener("pointerdown", this.handlePointerDown);
      this.canvas.addEventListener("pointermove", this.handlePointerMove);
      this.canvas.addEventListener("pointerup", this.handlePointerUp);
      this.canvas.addEventListener("pointercancel", this.handlePointerUp);
      this.canvas.addEventListener("pointerleave", this.handlePointerUp);
    }

    detachEvents() {
      this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
      this.canvas.removeEventListener("pointermove", this.handlePointerMove);
      this.canvas.removeEventListener("pointerup", this.handlePointerUp);
      this.canvas.removeEventListener("pointercancel", this.handlePointerUp);
      this.canvas.removeEventListener("pointerleave", this.handlePointerUp);
    }

    resize() {
      const ratio = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      this.canvas.width = rect.width * ratio;
      this.canvas.height = rect.height * ratio;
      this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      this.drawMask();
    }

    drawMask() {
      const { width, height } = this.canvas;
      this.ctx.save();
      this.ctx.globalCompositeOperation = "source-over";

      const gradient = this.ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#e2e2e2");
      gradient.addColorStop(0.5, "#c6c6c6");
      gradient.addColorStop(1, "#f1f1f1");

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, width, height);

      this.ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      for (let y = 6; y < height; y += 12) {
        this.ctx.fillRect(0, y, width, 2);
      }

      this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      for (let i = 0; i < 180; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 2 + 0.5;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    scratchAt(event) {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.ctx.globalCompositeOperation = "destination-out";

      this.ctx.beginPath();
      this.ctx.arc(x, y, 20, 0, Math.PI * 2);
      this.ctx.fill();

      if (this.lastPoint) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }

      this.lastPoint = { x, y };

      const now = Date.now();
      if (now - this.lastCheck > 250) {
        this.lastCheck = now;
        this.checkReveal();
      }
    }

    handlePointerDown(event) {
      if (this.revealed) {
        return;
      }
      this.isDrawing = true;
      this.canvas.setPointerCapture(event.pointerId);
      this.scratchAt(event);
    }

    handlePointerMove(event) {
      if (!this.isDrawing || this.revealed) {
        return;
      }
      this.scratchAt(event);
    }

    handlePointerUp() {
      if (!this.isDrawing) {
        return;
      }
      this.isDrawing = false;
      this.lastPoint = null;
      this.checkReveal();
    }

    checkReveal() {
      if (this.revealed) {
        return;
      }
      const revealedRatio = this.estimateRevealed();
      if (revealedRatio >= this.threshold) {
        this.reveal();
      }
    }

    estimateRevealed() {
      const { width, height } = this.canvas;
      const imageData = this.ctx.getImageData(0, 0, width, height).data;
      let cleared = 0;
      let total = 0;
      const step = 8;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4 + 3;
          total += 1;
          if (imageData[index] === 0) {
            cleared += 1;
          }
        }
      }

      return cleared / total;
    }

    reveal() {
      if (this.revealed) {
        return;
      }
      this.revealed = true;
      this.canvas.classList.add("fade-out");
      this.detachEvents();
      if (typeof this.onReveal === "function") {
        this.onReveal();
      }
      setTimeout(() => {
        if (this.canvas.isConnected) {
          this.canvas.remove();
        }
      }, 600);
    }

    destroy() {
      this.detachEvents();
      if (this.canvas.isConnected) {
        this.canvas.remove();
      }
    }
  }

  class ModalController {
    constructor(modal, modalBody, modalText, modalEmoji, closeButton) {
      this.modal = modal;
      this.modalBody = modalBody;
      this.modalText = modalText;
      this.modalEmoji = modalEmoji;
      this.closeButton = closeButton;
      this.scratch = null;
      this.onReveal = null;

      this.handleBackdropClick = this.handleBackdropClick.bind(this);
      this.handleEscape = this.handleEscape.bind(this);

      this.resizeObserver = null;
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => this.resizeScratch());
      }

      this.bindEvents();
    }

    bindEvents() {
      this.closeButton.addEventListener("click", () => this.close());
      this.modal.addEventListener("click", this.handleBackdropClick);
      window.addEventListener("keydown", this.handleEscape);
    }

    handleBackdropClick(event) {
      if (event.target === this.modal) {
        this.close();
      }
    }

    handleEscape(event) {
      if (event.key === "Escape" && this.modal.classList.contains("show")) {
        this.close();
      }
    }

    open({ id, text, emoji, revealed, onReveal }) {
      this.modalText.textContent = text;
      if (this.modalEmoji) {
        this.modalEmoji.textContent = emoji || "";
      }
      this.onReveal = onReveal;
      this.modal.classList.add("show");
      this.modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");

      this.clearScratch();

      if (!revealed) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.createScratchCanvas(id);
          });
        });
      }
    }

    createScratchCanvas(id) {
      const canvas = document.createElement("canvas");
      canvas.className = "scratch-layer";
      this.modalBody.appendChild(canvas);

      this.scratch = new ScratchSurface(canvas, () => {
        if (typeof this.onReveal === "function") {
          this.onReveal(id);
        }
      }, Config.SCRATCH_THRESHOLD);

      this.scratch.init();

      if (this.resizeObserver) {
        this.resizeObserver.observe(this.modalBody);
      }
    }

    resizeScratch() {
      if (this.scratch) {
        this.scratch.resize();
      }
    }

    clearScratch() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      if (this.scratch) {
        this.scratch.destroy();
        this.scratch = null;
      }
    }

    close() {
      this.modal.classList.remove("show");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      this.onReveal = null;
      this.clearScratch();
    }
  }

  const modalController = new ModalController(
    dom.modal,
    dom.modalBody,
    dom.modalText,
    dom.modalEmoji,
    dom.modalClose
  );

  const updateCardAppearance = (id) => {
    const card = document.querySelector(`.coupon-card[data-coupon-id="${id}"]`);
    if (!card) {
      return;
    }
    card.classList.remove("locked");
    card.classList.add("revealed");
    const text = card.querySelector(".coupon-text");
    if (text) {
      text.classList.remove("masked");
    }
  };

  const markRevealed = async (id) => {
    await Persistence.markRevealed(id);
    updateCardAppearance(id);
  };

  const renderCoupons = () => {
    dom.grid.innerHTML = "";

    Config.COUPONS.forEach((coupon, index) => {
      const id = buildCouponId(index);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "coupon-card";
      card.dataset.couponId = id;
      card.setAttribute("aria-label", `Abrir ${coupon.text}`);

      const content = document.createElement("div");
      content.className = "coupon-content";

      const emoji = document.createElement("span");
      emoji.className = "coupon-emoji";
      emoji.textContent = coupon.emoji;

      const text = document.createElement("span");
      text.className = "coupon-text";
      text.textContent = coupon.text;

      const scratchOverlay = document.createElement("div");
      scratchOverlay.className = "card-scratch";

      if (AppState.revealed[id]) {
        card.classList.add("revealed");
      } else {
        card.classList.add("locked");
      }

      content.append(emoji, text);
      card.append(content, scratchOverlay);
      card.addEventListener("click", () => {
        modalController.open({
          id,
          text: coupon.text,
          emoji: coupon.emoji,
          revealed: Boolean(AppState.revealed[id]),
          onReveal: markRevealed
        });
      });

      dom.grid.appendChild(card);
    });
  };

  const createOrbitingHearts = () => {
    if (!dom.orbitingHearts) {
      return;
    }

    dom.orbitingHearts.innerHTML = "";
    const mobile = isMobile();

    const colors = [
      "rgba(196, 106, 123, 0.26)",
      "rgba(176, 92, 114, 0.22)",
      "rgba(214, 150, 165, 0.2)"
    ];

    const centers = [
      { x: 20, y: 25 },
      { x: 80, y: 22 },
      { x: 50, y: 70 },
      { x: 14, y: 70 },
      { x: 72, y: 60 },
      { x: 40, y: 15 },
      { x: 88, y: 78 },
      { x: 60, y: 40 }
    ];

    const count = mobile ? 18 : 26;
    for (let i = 0; i < count; i += 1) {
      const heart = document.createElement("span");
      heart.className = "orbit-heart";

      const center = centers[Math.floor(Math.random() * centers.length)];
      const radius = (mobile ? 80 : 100) + Math.random() * (mobile ? 140 : 190);
      const size = (mobile ? 16 : 18) + Math.random() * (mobile ? 14 : 18);
      const duration = (mobile ? 32 : 36) + Math.random() * 42;
      const delay = -Math.random() * duration;
      const angle = Math.random() * 360;
      const color = colors[Math.floor(Math.random() * colors.length)];

      heart.style.setProperty("--center-x", `${center.x}%`);
      heart.style.setProperty("--center-y", `${center.y}%`);
      heart.style.setProperty("--radius", `${radius}px`);
      heart.style.setProperty("--size", `${size}px`);
      heart.style.setProperty("--duration", `${duration}s`);
      heart.style.setProperty("--delay", `${delay}s`);
      heart.style.setProperty("--angle", `${angle}deg`);
      heart.style.setProperty("--color", color);

      dom.orbitingHearts.appendChild(heart);
    }
  };

  const createFloatingHearts = () => {
    if (!dom.floatingHearts) {
      return;
    }

    dom.floatingHearts.innerHTML = "";
    const mobile = isMobile();

    const colors = ["#0d0d0d", "#d73b3e", "#f28c28"];
    const count = mobile ? 45 : 70;

    for (let i = 0; i < count; i += 1) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.innerHTML = "❤";

      const size = (mobile ? 20 : 26) + Math.random() * (mobile ? 22 : 28);
      const duration = (mobile ? 5 : 5.5) + Math.random() * 3.8;
      const delay = Math.random() * 1.4;
      const drift = (Math.random() * 2 - 1) * (mobile ? 60 : 90);
      const left = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];

      heart.style.left = `${left}%`;
      heart.style.setProperty("--size", `${size}px`);
      heart.style.setProperty("--duration", `${duration}s`);
      heart.style.setProperty("--delay", `${delay}s`);
      heart.style.setProperty("--drift", `${drift}px`);
      heart.style.setProperty("--color", color);

      dom.floatingHearts.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });
    }
  };

  const init = async () => {
    SupabaseStore.init();
    await Persistence.loadInitialState();
    renderCoupons();
    createOrbitingHearts();
    createFloatingHearts();

    window.addEventListener("resize", () => {
      modalController.resizeScratch();
    });
  };

  init();
})();
