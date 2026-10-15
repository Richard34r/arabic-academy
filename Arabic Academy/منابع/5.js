const data=[
["مُعَلِّمٌ","مفرد مذکر"],["مُعَلِّمَةٌ","مفرد مؤنث"],
["طَالِبَانِ","مثنای مذکر"],["طَالِبَتَانِ","مثنای مؤنث"],
["مُهَنْدِسُونَ","جمع مذکر سالم"],["مُعَلِّمَاتٌ","جمع مؤنث سالم"],
["كُتُبٌ","جمع مکسر"],["أَطْفَالٌ","جمع مکسر"],
["طَبِيبَانِ","مثنای مذکر"],["طَالِبَةٌ","مفرد مؤنث"],
["مُدَرِّسُونَ","جمع مذکر سالم"],["سَيَّارَاتٌ","جمع مؤنث سالم"]];
const cats=["مفرد مذکر","مفرد مؤنث","مثنای مذکر","مثنای مؤنث","جمع مذکر سالم","جمع مؤنث سالم","جمع مکسر"];
let selected=null, placed={}, score=0;
const fa=n=>String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
function render(){
 selected=null;placed={};score=0;document.querySelector("#score").textContent="۰";document.querySelector("#stars").textContent="۰";document.querySelector("#msg").textContent="";
 words.innerHTML="";catsEl.innerHTML="";
 data.forEach((x,i)=>{let d=document.createElement("div");d.className="word";d.textContent=x[0];d.dataset.i=i;d.onclick=()=>selectWord(i,d);words.appendChild(d)});
 cats.forEach(c=>{let d=document.createElement("div");d.className="cat";d.dataset.c=c;d.innerHTML='<div class="title">'+c+'</div><div class="slot"></div>';d.onclick=()=>putSelected(c,d);catsEl.appendChild(d)});
}
function selectWord(i,el){
 if(placed[i])return;
 document.querySelectorAll(".word").forEach(x=>x.classList.remove("selected"));
 selected=i;el.classList.add("selected");
 document.querySelector("#msg").textContent="حالا روی دستهٔ مناسب بزنید 👆";
}
function putSelected(c,box){
 if(selected===null){document.querySelector("#msg").textContent="ابتدا یک واژه انتخاب کنید.";return}
 if(placed[selected])return;
 placed[selected]=c;
 let p=document.createElement("span");p.className="placed";p.textContent=data[selected][0];
 p.dataset.i=selected;box.querySelector(".slot").appendChild(p);
 document.querySelector('.word[data-i="'+selected+'"]').classList.add("used");
 document.querySelector('.word[data-i="'+selected+'"]').classList.remove("selected");
 selected=null;
 document.querySelector("#msg").textContent="خوب است! واژهٔ بعدی را انتخاب کنید 🌱";
}
function check(){
 let correct=0;
 Object.keys(placed).forEach(i=>{if(placed[i]===data[i][1])correct++});
 score=correct*10;document.querySelector("#score").textContent=fa(score);document.querySelector("#stars").textContent=fa(Math.floor(correct/2));
 if(correct===data.length){document.querySelector("#final").textContent=fa(score);document.querySelector("#overlay").style.display="flex";rain();}
 else document.querySelector("#msg").textContent="از "+fa(data.length)+" واژه، "+fa(correct)+" مورد درست است. دوباره بررسی کن 💪";
}
function rain(){rainEl.innerHTML="";for(let i=0;i<55;i++){let s=document.createElement("span");s.className="s";s.textContent=["⭐","🌟","✨"][i%3];s.style.left=Math.random()*100+"%";s.style.animationDelay=Math.random()*1.4+"s";rainEl.appendChild(s)}}
document.querySelector("#check").onclick=check;document.querySelector("#reset").onclick=render;
document.querySelector("#next").onclick=()=>{document.querySelector("#overlay").style.display="none";document.querySelector("#msg").textContent="مرحلهٔ ۲ در نسخهٔ توسعه‌یافته با واژه‌های جدید باز خواهد شد.";};
const words=document.querySelector("#words"),catsEl=document.querySelector("#cats"),rainEl=document.querySelector("#rain");render();

document.body.classList.add("academy-game-5");

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
