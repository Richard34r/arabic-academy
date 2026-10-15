const data=[["مُعَلِّمٌ","مفرد مذکر"],["مُعَلِّمَةٌ","مفرد مؤنث"],["طَالِبَانِ","مثنای مذکر"],["طَالِبَتَانِ","مثنای مؤنث"],["مُهَنْدِسُونَ","جمع مذکر سالم"],["مُعَلِّمَاتٌ","جمع مؤنث سالم"],["كُتُبٌ","جمع مکسر"],["أَطْفَالٌ","جمع مکسر"],["طَبِيبَانِ","مثنای مذکر"],["طَالِبَةٌ","مفرد مؤنث"]];
const cats=["مفرد مذکر","مفرد مؤنث","مثنای مذکر","مثنای مؤنث","جمع مذکر سالم","جمع مؤنث سالم","جمع مکسر"];let selected=-1,ans={};
const fa=n=>String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
function start(){selected=-1;ans={};document.getElementById("words").innerHTML="";document.getElementById("cats").innerHTML="";document.getElementById("msg").textContent="";document.getElementById("bar").style.width="0%";data.forEach((x,i)=>{let e=document.createElement("div");e.className="word";e.textContent=x[0];e.onclick=()=>{if(ans[i])return;document.querySelectorAll(".word").forEach(a=>a.classList.remove("selected"));selected=i;e.classList.add("selected");document.getElementById("msg").textContent="حالا دستهٔ مناسب را انتخاب کنید 👆"};document.getElementById("words").appendChild(e)});cats.forEach(c=>{let e=document.createElement("div");e.className="cat";e.innerHTML="<b>"+c+"</b><div class='slot'></div>";e.onclick=()=>put(c,e);document.getElementById("cats").appendChild(e)})}
function put(c,e){if(selected<0){document.getElementById("msg").textContent="ابتدا یک واژه انتخاب کنید.";return}if(ans[selected])return;ans[selected]=c;let p=document.createElement("span");p.className="placed";p.textContent=data[selected][0];e.querySelector(".slot").appendChild(p);document.querySelectorAll(".word")[selected].classList.add("used");document.querySelectorAll(".word")[selected].classList.remove("selected");selected=-1;document.getElementById("bar").style.width=(Object.keys(ans).length/data.length*100)+"%";document.getElementById("msg").textContent="عالی! واژهٔ بعدی را انتخاب کنید 🌱"}
function check(){let n=0;Object.keys(ans).forEach(i=>{if(ans[i]===data[i][1])n++});if(n===data.length){document.getElementById("final").textContent=fa(n*10);document.getElementById("overlay").style.display="flex"}else document.getElementById("msg").textContent="از "+fa(data.length)+" واژه، "+fa(n)+" مورد درست است. دوباره تلاش کنید 💪"}
function closeWin(){document.getElementById("overlay").style.display="none";document.getElementById("msg").textContent="مرحله اول با موفقیت تمام شد! 🚀"}start();

document.body.classList.add("academy-game-6");

(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const board = document.querySelector(".grid");

  function preparePieces() {
    board.querySelectorAll(".word, .cat").forEach((piece, index) => {
      piece.style.setProperty("--deal-index", index % 12);
      piece.classList.add("academy-dealt");
      if (piece.dataset.depthReady) return;
      piece.dataset.depthReady = "true";
      piece.addEventListener("pointermove", (event) => {
        if (!finePointer.matches || reducedMotion.matches || piece.classList.contains("used")) return;
        const bounds = piece.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        piece.style.setProperty("--card-tilt-x", `${(-y * 3).toFixed(2)}deg`);
        piece.style.setProperty("--card-tilt-y", `${(x * 3).toFixed(2)}deg`);
      }, { passive: true });
      piece.addEventListener("pointerleave", () => {
        piece.style.setProperty("--card-tilt-x", "0deg");
        piece.style.setProperty("--card-tilt-y", "0deg");
      }, { passive: true });
    });
  }

  new MutationObserver(preparePieces).observe(board, { childList: true, subtree: true });
  preparePieces();
})();
