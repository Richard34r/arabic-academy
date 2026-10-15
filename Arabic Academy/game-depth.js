(() => {
  const frameWindow = window;
  const gameSurface = document.querySelector(".app, .wrap, .container, #app, body > main");
  const finePointer = frameWindow.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = frameWindow.matchMedia("(prefers-reduced-motion: reduce)");

  if (!document.querySelector(".academy-game-stationery")) {
    const stationery = document.createElement("div");
    stationery.className = "academy-game-stationery";
    stationery.setAttribute("aria-hidden", "true");
    stationery.innerHTML = [
      '<span class="academy-game-book academy-game-book-one" data-label="عربي"></span>',
      '<span class="academy-game-book academy-game-book-two" data-label="قواعد"></span>',
      '<span class="academy-game-pencil academy-game-pencil-one"></span>',
      '<span class="academy-game-pencil academy-game-pencil-two"></span>',
    ].join("");
    document.body.prepend(stationery);
  }

  if (!gameSurface || !finePointer.matches || frameWindow.innerWidth <= 640 || reducedMotion.matches) return;

  let animationFrame = 0;

  gameSurface.addEventListener("pointermove", (event) => {
    const bounds = gameSurface.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    frameWindow.cancelAnimationFrame(animationFrame);
    animationFrame = frameWindow.requestAnimationFrame(() => {
      gameSurface.style.setProperty("--academy-tilt-x", `${(horizontal * 2).toFixed(2)}deg`);
      gameSurface.style.setProperty("--academy-tilt-y", `${(-vertical * 2).toFixed(2)}deg`);
    });
  }, { passive: true });

  gameSurface.addEventListener("pointerleave", () => {
    frameWindow.cancelAnimationFrame(animationFrame);
    gameSurface.style.setProperty("--academy-tilt-x", "0deg");
    gameSurface.style.setProperty("--academy-tilt-y", "0deg");
  }, { passive: true });
})();
