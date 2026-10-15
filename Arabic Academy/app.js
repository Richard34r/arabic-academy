const games = {
  "world-1": {
    file: "منابع/1.html",
    title: "عالم — نسخهٔ ۱",
    category: "ایستگاه پرسش‌وپاسخ",
    description: "بازی دانستنی‌ها با ۶۰ سؤال.",
  },
  "world-2": {
    file: "منابع/2.html",
    title: "عالم — نسخهٔ ۲",
    category: "ایستگاه پرسش‌وپاسخ",
    description: "نسخهٔ دوم بازی دانستنی‌ها با ۶۰ سؤال.",
  },
  past: {
    file: "منابع/3.html",
    title: "آزمون فعل ماضی",
    category: "ایستگاه دستور عربی · پایهٔ هفتم",
    description: "تمرین ۱۴ صیغه در آزمون ۲۰ سؤالی.",
  },
  "noun-drag": {
    file: "منابع/4.html",
    title: "دسته‌بندی اسم‌ها — نسخهٔ کشیدنی",
    category: "ایستگاه واژه‌ها",
    description: "واژه‌ها را بکش و در گروه مناسب قرار بده.",
  },
  "noun-tap": {
    file: "منابع/5.html",
    title: "دسته‌بندی اسم‌ها — نسخهٔ انتخابی",
    category: "ایستگاه واژه‌ها",
    description: "برای جابه‌جایی، واژه و سپس دستهٔ مناسب را انتخاب کن.",
  },
  "noun-continue": {
    file: "منابع/6.html",
    title: "دسته‌بندی اسم‌ها — نسخهٔ مرحله‌ای",
    category: "ایستگاه واژه‌ها",
    description: "واژه‌ها را دسته‌بندی کن و به مرحلهٔ بعد برو.",
  },
  vocab: {
    file: "منابع/7.html",
    title: "آموزش تعاملی واژگان عربی",
    category: "ایستگاه دستور و واژه · پایه‌های هفتم تا نهم",
    description: "واژه‌ها را به هفت عنوان اصلی قواعد وصل کن؛ چهار مرحله.",
  },
};

const home = document.getElementById("page-home");
const gameStage = document.getElementById("game-stage");
const gameFrame = document.getElementById("game-frame");
const gameTitle = document.getElementById("game-title");
const gameCategory = document.getElementById("game-category");
const gameDescription = document.getElementById("game-description");
const gameLoading = document.getElementById("game-loading");
const gameLoadingMessage = document.getElementById("game-loading-message");
const gameRetryButton = document.getElementById("game-retry");
const gameFallbackLink = document.getElementById("game-fallback-link");
const gameDirectLink = document.getElementById("game-direct-link");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const academyLoader = document.getElementById("academy-loader");
const loaderSkip = document.getElementById("loader-skip");
let activeGameId = "";
let gameLoadTimeout;

if (academyLoader) {
  home.inert = true;
  const dismissLoader = () => {
    if (academyLoader.hidden || academyLoader.classList.contains("is-dismissed")) return;
    academyLoader.classList.add("is-dismissed");
    home.inert = false;
    window.setTimeout(() => {
      academyLoader.hidden = true;
    }, reduceMotion.matches ? 0 : 580);
  };

  loaderSkip.addEventListener("click", dismissLoader);
  window.setTimeout(dismissLoader, reduceMotion.matches ? 220 : 3100);
}

function showGame(id, updateHistory = true) {
  const game = games[id];
  if (!game) return;
  if (!window.AcademyProgress.canPlay(id)) {
    const summary = window.AcademyProgress.getSummary();
    document.getElementById("academy-progress-message").textContent = summary.hearts
      ? "این بازی قفل است؛ بازی‌های آکادمی را به‌ترتیب کامل کن تا این ایستگاه باز شود."
      : "قلب‌ها تمام شده‌اند؛ پس از یک ساعت هر پنج قلب به‌طور خودکار شارژ می‌شوند.";
    document.getElementById("academy-progress-overview")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  home.hidden = true;
  gameStage.hidden = false;
  gameTitle.textContent = game.title;
  gameCategory.textContent = game.category;
  gameDescription.textContent = game.description;
  gameDirectLink.href = game.file;
  gameFallbackLink.href = game.file;
  gameRetryButton.hidden = true;
  gameFallbackLink.hidden = true;
  gameLoading.classList.remove("is-error");
  gameLoadingMessage.textContent = "در حال آماده‌کردن بازی…";
  gameLoading.hidden = false;
  activeGameId = id;
  window.clearTimeout(gameLoadTimeout);

  const expectedUrl = new URL(game.file, location.href).href;
  const isLocalFile = location.protocol === "file:";
  const frameDocument = isLocalFile ? null : gameFrame.contentDocument;
  const frameIsReady = gameFrame.dataset.file === game.file
    && (isLocalFile || frameDocument?.title)
    && gameFrame.src === expectedUrl;

  if (frameIsReady) {
    gameLoading.hidden = true;
  } else if (gameFrame.dataset.file !== game.file) {
    gameFrame.dataset.file = game.file;
    gameFrame.src = game.file;
  }

  if (!frameIsReady) gameLoadTimeout = window.setTimeout(() => showFrameError(id), 20000);
  if (updateHistory) {
    history.pushState({ academyGame: id }, "", `#play-${id}`);
  }
  gameStage.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
  document.title = `${game.title} | آکادمی جدایی`;
}

function showFrameError(id) {
  if (activeGameId !== id || gameLoading.hidden) return;
  gameLoading.classList.add("is-error");
  gameLoadingMessage.textContent = "بازی داخل قاب باز نشد. می‌توانی دوباره تلاش کنی یا آن را جداگانه باز کنی.";
  gameRetryButton.hidden = false;
  gameFallbackLink.hidden = false;
}

gameRetryButton.addEventListener("click", () => {
  if (!activeGameId) return;
  const game = games[activeGameId];
  showGame(activeGameId, false);
  gameFrame.src = game.file;
});

function enhanceGameFrame(frame) {
  const frameDocument = frame.contentDocument;
  if (!frameDocument?.head || !frameDocument.body) return;
  if (frameDocument.querySelector('link[data-academy-depth]')) return;

  const stylesheet = frameDocument.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("game-depth.css", location.href).href;
  stylesheet.dataset.academyDepth = "true";
  const gameStylesheet = frameDocument.querySelector("link[data-academy-game-style]");
  frameDocument.head.insertBefore(stylesheet, gameStylesheet);

  const enhancements = frameDocument.createElement("script");
  enhancements.src = new URL("game-depth.js", location.href).href;
  enhancements.defer = true;
  enhancements.dataset.academyDepth = "true";
  frameDocument.head.append(enhancements);
}

function showHome() {
  activeGameId = "";
  window.clearTimeout(gameLoadTimeout);
  gameStage.hidden = true;
  home.hidden = false;
  gameFrame.removeAttribute("src");
  delete gameFrame.dataset.file;
  document.title = "آکادمی جدایی | اطلس بازی‌های آموزشی";
}

document.querySelectorAll("[data-launch-game]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    showGame(control.dataset.launchGame);
  });
});

function syncProgressUi() {
  window.AcademyProgress?.refresh?.();
}

window.addEventListener("storage", syncProgressUi);
window.addEventListener("message", (event) => {
  if (event.source !== gameFrame.contentWindow || event.origin !== location.origin && event.origin !== "null") return;
  if (event.data?.type === "academy-progress-updated") syncProgressUi();
  if (event.data?.type === "academy-return-home") {
    showHome();
    history.replaceState({}, "", `${location.pathname}${location.search}#atlas`);
  }
});

document.getElementById("back-home").addEventListener("click", () => {
  if (history.state?.academyGame) {
    history.back();
  } else {
    showHome();
    history.replaceState({}, "", `${location.pathname}${location.search}#atlas`);
  }
});

window.addEventListener("popstate", () => {
  const currentGame = history.state?.academyGame;
  if (currentGame) showGame(currentGame, false);
  else showHome();
});

gameFrame.addEventListener("load", () => {
  if (!activeGameId) return;
  if (location.protocol === "file:") {
    window.clearTimeout(gameLoadTimeout);
    gameLoading.hidden = true;
    return;
  }

  try {
    const expectedUrl = new URL(games[activeGameId].file, location.href).href;
    const currentUrl = gameFrame.contentWindow.location.href;
    if (currentUrl !== expectedUrl || !gameFrame.contentDocument?.title) return;
    enhanceGameFrame(gameFrame);
    window.clearTimeout(gameLoadTimeout);
    gameLoading.hidden = true;
  } catch {
    showFrameError(activeGameId);
  }
});

const search = document.getElementById("game-search");
const routeEntries = [...document.querySelectorAll(".route-entry")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const emptyState = document.getElementById("empty-state");
let activeFilter = "all";

function updateGameList() {
  const query = search.value.trim().toLocaleLowerCase("fa");
  let visibleEntries = 0;

  routeEntries.forEach((entry) => {
    const matchesFilter = activeFilter === "all" || entry.dataset.category.split(" ").includes(activeFilter);
    const matchesSearch = !query || `${entry.dataset.search} ${entry.textContent}`.toLocaleLowerCase("fa").includes(query);
    const visible = matchesFilter && matchesSearch;
    entry.hidden = !visible;
    if (visible) visibleEntries += 1;
  });

  emptyState.hidden = visibleEntries !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    updateGameList();
  });
});

search.addEventListener("input", updateGameList);

const atlas = document.getElementById("atlas-illustration");
const hero = document.querySelector(".hero");
if (atlas && hero && "IntersectionObserver" in window) {
  const atlasMotionObserver = new IntersectionObserver(([entry]) => {
    atlas.classList.toggle("is-offscreen", !entry.isIntersecting || document.hidden);
  });
  atlasMotionObserver.observe(hero);
  document.addEventListener("visibilitychange", () => {
    atlas.classList.toggle("is-offscreen", document.hidden || !hero.getBoundingClientRect().bottom || hero.getBoundingClientRect().bottom <= 0);
  });
}

if (atlas && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion.matches) {
  let frameRequest = 0;

  atlas.addEventListener("pointermove", (event) => {
    const bounds = atlas.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    window.cancelAnimationFrame(frameRequest);
    frameRequest = window.requestAnimationFrame(() => {
      atlas.style.setProperty("--tilt-x", `${(x * 3).toFixed(2)}deg`);
      atlas.style.setProperty("--tilt-y", `${(-y * 3).toFixed(2)}deg`);
    });
  });

  atlas.addEventListener("pointerleave", () => {
    window.cancelAnimationFrame(frameRequest);
    atlas.style.setProperty("--tilt-x", "0deg");
    atlas.style.setProperty("--tilt-y", "0deg");
  });
}

const initialGame = location.hash.startsWith("#play-") ? location.hash.slice("#play-".length) : "";
if (games[initialGame]) showGame(initialGame, false);

const backgroundMusic = document.getElementById("academy-music");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
const musicStatus = document.getElementById("music-status");
let musicRequest;

function updateMusicControl() {
  const playing = !backgroundMusic.paused && !backgroundMusic.ended;
  musicToggle.classList.toggle("is-playing", playing);
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicToggle.setAttribute("aria-label", `${playing ? "توقف" : "پخش"} موسیقی زمینه`);
  musicLabel.textContent = `${playing ? "توقف" : "پخش"} موسیقی`;
}

function playBackgroundMusic() {
  if (!backgroundMusic.paused) return Promise.resolve(true);
  if (musicRequest) return musicRequest;

  backgroundMusic.volume = 0.32;
  musicRequest = backgroundMusic.play()
    .then(() => {
      const playing = !backgroundMusic.paused;
      if (playing) musicStatus.textContent = "موسیقی زمینه در حال پخش است.";
      return playing;
    })
    .catch((error) => {
      if (error.name === "AbortError") return false;
      musicStatus.textContent = error.name === "NotAllowedError"
        ? "برای پخش آهنگ، دکمهٔ پخش موسیقی را بزن."
        : "پخش آهنگ ممکن نشد؛ برای تلاش دوباره دکمهٔ پخش را بزن.";
      return false;
    })
    .finally(() => {
      musicRequest = undefined;
      updateMusicControl();
    });

  return musicRequest;
}

function stopMusicGestureDetection() {
  document.removeEventListener("pointerdown", startMusicAfterGesture, true);
  document.removeEventListener("keydown", startMusicAfterKeyboard, true);
}

musicToggle.addEventListener("click", () => {
  stopMusicGestureDetection();
  if (backgroundMusic.paused && !musicRequest) {
    void playBackgroundMusic();
  } else {
    backgroundMusic.pause();
    musicStatus.textContent = "موسیقی متوقف شد.";
  }
});

backgroundMusic.addEventListener("play", updateMusicControl);
backgroundMusic.addEventListener("pause", updateMusicControl);
backgroundMusic.addEventListener("error", () => {
  musicStatus.textContent = "فایل موسیقی بارگذاری نشد؛ صفحه را تازه‌سازی و دوباره تلاش کن.";
  updateMusicControl();
});

function startMusicAfterGesture(event) {
  if (event.target instanceof Element && event.target.closest("#music-toggle")) return;
  stopMusicGestureDetection();
  void playBackgroundMusic();
}

function startMusicAfterKeyboard(event) {
  if (event.key === "Enter" || event.key === " ") startMusicAfterGesture(event);
}

document.addEventListener("pointerdown", startMusicAfterGesture, true);
document.addEventListener("keydown", startMusicAfterKeyboard, true);

void playBackgroundMusic();
updateMusicControl();
