(() => {
  "use strict";

  const storageKey = "academy-jodaei-progress-v1";
  const gameIds = ["world-1", "world-2", "past", "noun-drag", "noun-tap", "noun-continue", "vocab"];
  const gameNames = {
    "world-1": "عالم — نسخهٔ ۱",
    "world-2": "عالم — نسخهٔ ۲",
    past: "آزمون فعل ماضی",
    "noun-drag": "دسته‌بندی اسم‌ها — کشیدنی",
    "noun-tap": "دسته‌بندی اسم‌ها — انتخابی",
    "noun-continue": "دسته‌بندی اسم‌ها — مرحله‌ای",
    vocab: "آموزش تعاملی واژگان عربی",
  };
  const refillDuration = 60 * 60 * 1000;
  const subscribers = new Set();
  const gameId = document.body.dataset.academyGameId || "";
  const gameIndex = gameIds.indexOf(gameId);
  let storageAvailable = true;
  let lastRenderedHearts = 5;
  let timer;

  function freshGame() {
    return {
      completed: false,
      resolved: {},
      awarded: {},
      missed: [],
      quizPhase: "first",
      quizPosition: 0,
      stageIndex: 0,
      completedStages: [],
    };
  }

  function freshState() {
    const games = {};
    gameIds.forEach((id) => { games[id] = freshGame(); });
    return { version: 1, hearts: 5, refillAt: 0, score: 0, unlockedGame: 0, games };
  }

  function normalizeState(value) {
    const state = freshState();
    if (!value || value.version !== 1) return state;
    state.hearts = Number.isInteger(value.hearts) ? Math.max(0, Math.min(5, value.hearts)) : 5;
    state.refillAt = Number.isFinite(value.refillAt) ? Math.max(0, value.refillAt) : 0;
    state.score = Number.isFinite(value.score) ? Math.max(0, value.score) : 0;
    state.unlockedGame = Number.isInteger(value.unlockedGame)
      ? Math.max(0, Math.min(gameIds.length - 1, value.unlockedGame))
      : 0;

    gameIds.forEach((id) => {
      const saved = value.games?.[id];
      if (!saved || typeof saved !== "object") return;
      const game = state.games[id];
      game.completed = saved.completed === true;
      game.resolved = saved.resolved && typeof saved.resolved === "object" ? saved.resolved : {};
      game.awarded = saved.awarded && typeof saved.awarded === "object" ? saved.awarded : {};
      game.missed = Array.isArray(saved.missed) ? [...new Set(saved.missed.filter((item) => typeof item === "string"))] : [];
      game.quizPhase = saved.quizPhase === "review" || saved.quizPhase === "complete" ? saved.quizPhase : "first";
      game.quizPosition = Number.isInteger(saved.quizPosition) ? Math.max(0, saved.quizPosition) : 0;
      game.stageIndex = Number.isInteger(saved.stageIndex) ? Math.max(0, saved.stageIndex) : 0;
      game.completedStages = Array.isArray(saved.completedStages)
        ? [...new Set(saved.completedStages.filter(Number.isInteger))]
        : [];
    });
    return state;
  }

  let state;
  try {
    state = normalizeState(JSON.parse(localStorage.getItem(storageKey) || "null"));
  } catch {
    storageAvailable = false;
    state = freshState();
  }

  function fa(value) {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  }

  function refreshHearts() {
    if (state.hearts === 0 && state.refillAt > 0 && Date.now() >= state.refillAt) {
      state.hearts = 5;
      state.refillAt = 0;
      persist();
      return true;
    }
    return false;
  }

  function notify() {
    refreshHearts();
    subscribers.forEach((subscriber) => subscriber(getSummary()));
    renderGameUi();
    updateHomeUi();
    if (window.parent !== window) {
      window.parent.postMessage({ type: "academy-progress-updated" }, location.origin === "null" ? "*" : location.origin);
    }
  }

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      storageAvailable = false;
    }
    notify();
  }

  function getSummary() {
    refreshHearts();
    return {
      hearts: state.hearts,
      refillAt: state.refillAt,
      score: state.score,
      unlockedGame: state.unlockedGame,
      unlockedCount: state.unlockedGame + 1,
      totalGames: gameIds.length,
      nextGame: gameNames[gameIds[state.unlockedGame + 1]] || "",
      storageAvailable,
    };
  }

  function isGameUnlocked(id) {
    const index = gameIds.indexOf(id);
    return index >= 0 && index <= state.unlockedGame;
  }

  function canPlay(id = gameId) {
    refreshHearts();
    return isGameUnlocked(id) && state.hearts > 0;
  }

  function getGame(id = gameId) {
    return state.games[id] || null;
  }

  function loseHeart() {
    if (state.hearts <= 0) return;
    state.hearts -= 1;
    if (state.hearts === 0) state.refillAt = Date.now() + refillDuration;
  }

  function recordAnswer(id, stageId, correct, points = 0) {
    refreshHearts();
    const game = getGame(id);
    if (!game || !canPlay(id) || typeof stageId !== "string") return { accepted: false, hearts: state.hearts };

    if (correct) {
      game.resolved[stageId] = true;
      game.missed = game.missed.filter((item) => item !== stageId);
      if (!game.awarded[stageId]) {
        const earned = Number.isFinite(points) ? Math.max(0, points) : 0;
        state.score += earned;
        game.awarded[stageId] = true;
      }
    } else {
      game.resolved[stageId] = false;
      if (!game.missed.includes(stageId)) game.missed.push(stageId);
      loseHeart();
    }

    persist();
    return { accepted: true, hearts: state.hearts, score: state.score };
  }

  function recordBatch(id, answers) {
    refreshHearts();
    if (!canPlay(id) || !Array.isArray(answers)) return { accepted: false, hearts: state.hearts };
    const game = getGame(id);
    if (!game) return { accepted: false, hearts: state.hearts };

    answers.forEach((answer) => {
      if (!answer || typeof answer.id !== "string") return;
      if (answer.correct) {
        game.resolved[answer.id] = true;
        game.missed = game.missed.filter((item) => item !== answer.id);
        if (!game.awarded[answer.id]) {
          const earned = Number.isFinite(answer.points) ? Math.max(0, answer.points) : 0;
          state.score += earned;
          game.awarded[answer.id] = true;
        }
      } else {
        game.resolved[answer.id] = false;
        if (!game.missed.includes(answer.id)) game.missed.push(answer.id);
        loseHeart();
      }
    });

    persist();
    return { accepted: true, hearts: state.hearts, score: state.score };
  }

  function completeGame(id, requiredIds) {
    const index = gameIds.indexOf(id);
    const game = getGame(id);
    if (index < 0 || !game || state.hearts <= 0) return false;
    if (game.missed.length || requiredIds.some((stageId) => game.resolved[stageId] !== true)) return false;

    game.completed = true;
    state.unlockedGame = Math.max(state.unlockedGame, Math.min(index + 1, gameIds.length - 1));
    persist();
    return true;
  }

  function getQuizStage(id = gameId) {
    const game = getGame(id);
    return game ? { phase: game.quizPhase, index: game.quizPosition } : { phase: "complete", index: 0 };
  }

  function nextQuizStage(id, total) {
    refreshHearts();
    const game = getGame(id);
    if (!game || !canPlay(id)) return { phase: game?.quizPhase || "complete", index: game?.quizPosition || 0, blocked: true };

    const currentId = `q-${game.quizPosition}`;
    if (game.resolved[currentId] === undefined) {
      return { phase: game.quizPhase, index: game.quizPosition, blocked: true };
    }

    if (game.quizPhase === "first") {
      if (game.quizPosition + 1 < total) {
        game.quizPosition += 1;
      } else if (game.missed.length) {
        game.quizPhase = "review";
        game.quizPosition = Math.min(...game.missed.map((item) => Number(item.slice(2))).filter(Number.isFinite));
      } else {
        const allIds = Array.from({ length: total }, (_, index) => `q-${index}`);
        completeGame(id, allIds);
        game.quizPhase = "complete";
      }
    } else if (game.quizPhase === "review") {
      if (!game.missed.length) {
        const allIds = Array.from({ length: total }, (_, index) => `q-${index}`);
        completeGame(id, allIds);
        game.quizPhase = "complete";
      } else {
        const missedPositions = game.missed.map((item) => Number(item.slice(2))).filter(Number.isFinite).sort((a, b) => a - b);
        const next = missedPositions.find((position) => position > game.quizPosition);
        game.quizPosition = next === undefined ? missedPositions[0] : next;
      }
    }

    persist();
    return { phase: game.quizPhase, index: game.quizPosition, complete: game.quizPhase === "complete" };
  }

  function getStageIndex(id = gameId) {
    return getGame(id)?.stageIndex ?? 0;
  }

  function completeStage(id, stageIndex, requiredIds) {
    const game = getGame(id);
    if (!game || !canPlay(id) || game.missed.some((item) => requiredIds.includes(item))) return false;
    if (!requiredIds.every((stageId) => game.resolved[stageId] === true)) return false;

    if (!game.completedStages.includes(stageIndex)) game.completedStages.push(stageIndex);
    game.completedStages.sort((a, b) => a - b);
    game.stageIndex = Math.max(game.stageIndex, stageIndex + 1);
    if (game.stageIndex >= 4) completeGame(id, requiredIds);
    else persist();
    return true;
  }

  function getStageCompleted(id, stageIndex) {
    return getGame(id)?.completedStages.includes(stageIndex) || false;
  }

  function requestHome() {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "academy-return-home" }, location.origin === "null" ? "*" : location.origin);
    } else if (history.length > 1) {
      history.back();
    }
  }

  function formatCountdown() {
    const seconds = Math.max(0, Math.ceil((state.refillAt - Date.now()) / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${fa(String(hours).padStart(2, "0"))}:${fa(String(minutes).padStart(2, "0"))}:${fa(String(seconds % 60).padStart(2, "0"))}`;
  }

  function updateHomeUi() {
    const summary = getSummary();
    const score = document.getElementById("academy-progress-score");
    const heartCount = document.getElementById("academy-heart-count");
    const hearts = document.getElementById("academy-heart-list");
    const journey = document.getElementById("academy-game-progress");
    const message = document.getElementById("academy-progress-message");
    if (!score || !heartCount || !hearts || !journey || !message) return;

    score.textContent = fa(summary.score);
    heartCount.textContent = `${fa(summary.hearts)} از ۵`;
    hearts.replaceChildren(...Array.from({ length: 5 }, (_, index) => {
      const heart = document.createElement("span");
      heart.className = "academy-home-heart";
      heart.textContent = "♥";
      heart.setAttribute("aria-hidden", "true");
      heart.classList.toggle("is-empty", index >= summary.hearts);
      return heart;
    }));
    journey.replaceChildren(...gameIds.map((id, index) => {
      const step = document.createElement("span");
      step.className = "academy-journey-step";
      step.textContent = fa(index + 1);
      step.title = gameNames[id];
      step.setAttribute("aria-label", `${gameNames[id]}، ${index <= summary.unlockedGame ? "باز" : "قفل"}`);
      step.classList.toggle("is-open", index <= summary.unlockedGame);
      step.classList.toggle("is-complete", state.games[id].completed);
      return step;
    }));

    if (!summary.hearts) {
      message.textContent = `قلب‌ها تمام شده‌اند؛ تا شارژ کامل: ${formatCountdown()}.`;
    } else if (summary.nextGame) {
      message.textContent = `${summary.nextGame} پس از پاسخ درست به همهٔ خطاهای این بازی باز می‌شود.`;
    } else {
      message.textContent = "همهٔ بازی‌ها باز شده‌اند؛ برای گرفتن امتیاز بیشتر می‌توانی تمرین‌ها را ادامه بدهی.";
    }
    if (!summary.storageAvailable) {
      message.textContent += " ذخیره‌سازی مرورگر در دسترس نیست؛ پیشرفت فقط تا زمان بسته‌شدن صفحه نگه داشته می‌شود.";
    }

    document.querySelectorAll("[data-launch-game]").forEach((control) => {
      const unlocked = isGameUnlocked(control.dataset.launchGame);
      const enabled = unlocked && summary.hearts > 0;
      control.classList.toggle("is-locked", !unlocked);
      control.classList.toggle("is-out-of-hearts", unlocked && !summary.hearts);
      control.setAttribute("aria-disabled", String(!enabled));
      if (control instanceof HTMLButtonElement) control.disabled = !enabled;
      if (control instanceof HTMLAnchorElement) {
        control.tabIndex = enabled ? 0 : -1;
        control.title = enabled ? "" : unlocked ? "قلب‌ها پس از یک ساعت دوباره شارژ می‌شوند." : "این بازی پس از تکمیل بازی قبلی باز می‌شود.";
      }
    });

    if (timer) clearTimeout(timer);
    timer = window.setTimeout(updateHomeUi, summary.hearts ? 30000 : 1000);
  }

  let gameUi;
  function renderGameUi() {
    if (!gameUi || gameIndex < 0) return;
    const summary = getSummary();
    const unlocked = isGameUnlocked(gameId);
    const blocked = !unlocked || summary.hearts === 0;
    const hearts = gameUi.querySelector(".academy-game-hearts");
    const count = gameUi.querySelector(".academy-game-heart-count");
    const score = gameUi.querySelector(".academy-game-score");
    const gate = gameUi.querySelector(".academy-progress-gate");
    const gateTitle = gameUi.querySelector(".academy-gate-title");
    const gateCopy = gameUi.querySelector(".academy-gate-copy");
    const gateTime = gameUi.querySelector(".academy-gate-time");

    score.textContent = fa(summary.score);
    count.textContent = `${fa(summary.hearts)} از ۵`;
    hearts.replaceChildren(...Array.from({ length: 5 }, (_, index) => {
      const heart = document.createElement("span");
      heart.className = "academy-game-heart";
      heart.textContent = "♥";
      heart.setAttribute("aria-hidden", "true");
      if (index >= summary.hearts) heart.classList.add("is-empty");
      if (index >= summary.hearts && index < lastRenderedHearts) heart.classList.add("is-breaking");
      return heart;
    }));
    lastRenderedHearts = summary.hearts;

    gate.hidden = !blocked;
    if (!unlocked) {
      gateTitle.textContent = "این بازی هنوز قفل است";
      gateCopy.textContent = "برای بازشدن این بازی، همهٔ پاسخ‌های نادرست بازی قبلی را درست کن.";
      gateTime.textContent = "";
    } else if (!summary.hearts) {
      gateTitle.textContent = "قلب‌ها تمام شدند";
      gateCopy.textContent = "پس از یک ساعت، هر پنج قلب به‌طور خودکار شارژ می‌شوند.";
      gateTime.textContent = formatCountdown();
    }

    [...document.body.children].forEach((child) => {
      if (child === gameUi || ["SCRIPT", "STYLE", "LINK", "CANVAS"].includes(child.tagName)) return;
      child.inert = blocked;
    });
    if (!summary.storageAvailable) {
      gameUi.querySelector(".academy-storage-warning").hidden = false;
    }
  }

  function installGameUi() {
    gameUi = document.createElement("div");
    gameUi.className = "academy-game-progress";
    gameUi.innerHTML = `
      <div class="academy-game-progress-bar" aria-label="وضعیت پیشرفت">
        <div class="academy-game-lives"><span class="academy-game-hearts" aria-hidden="true"></span><span class="academy-game-heart-count"></span></div>
        <span class="academy-game-score-label">امتیاز آکادمی <b class="academy-game-score">۰</b></span>
      </div>
      <p class="academy-storage-warning" role="status" hidden>ذخیره‌سازی مرورگر در دسترس نیست؛ پیشرفت فقط تا زمان بسته‌شدن صفحه نگه داشته می‌شود.</p>
      <section class="academy-progress-gate" role="dialog" aria-modal="true" aria-labelledby="academy-gate-title" hidden>
        <div class="academy-gate-panel">
          <p class="academy-gate-eyebrow">مسیر پیشرفت آکادمی</p>
          <h2 class="academy-gate-title" id="academy-gate-title"></h2>
          <p class="academy-gate-copy"></p>
          <p class="academy-gate-time" aria-live="polite"></p>
          <button type="button" class="academy-gate-home">بازگشت به نقشهٔ آکادمی</button>
        </div>
      </section>`;
    document.body.prepend(gameUi);
    gameUi.querySelector(".academy-gate-home").addEventListener("click", requestHome);
    renderGameUi();
  }

  window.AcademyProgress = Object.freeze({
    gameIds: [...gameIds],
    gameNames: { ...gameNames },
    canPlay,
    isGameUnlocked,
    getSummary,
    refresh() {
      refreshHearts();
      updateHomeUi();
      renderGameUi();
    },
    getGame,
    getQuizStage,
    getStageIndex,
    getStageCompleted,
    recordAnswer,
    recordBatch,
    nextQuizStage,
    completeStage,
    completeGame,
    requestHome,
    subscribe(subscriber) {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey || !event.newValue) return;
    state = normalizeState(JSON.parse(event.newValue));
    notify();
  });

  if (gameIndex >= 0) installGameUi();
  updateHomeUi();
})();
