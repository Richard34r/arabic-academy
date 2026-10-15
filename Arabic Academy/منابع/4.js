const data = [
 {w:"مُعَلِّمٌ", c:"مفرد مذکر"},
 {w:"مُعَلِّمَةٌ", c:"مفرد مؤنث"},
 {w:"طَالِبَانِ", c:"مثنای مذکر"},
 {w:"طَالِبَتَانِ", c:"مثنای مؤنث"},
 {w:"مُهَنْدِسُونَ", c:"جمع مذکر سالم"},
 {w:"مُعَلِّمَاتٌ", c:"جمع مؤنث سالم"},
 {w:"كُتُبٌ", c:"جمع مکسر"},
 {w:"أَطْفَالٌ", c:"جمع مکسر"},
 {w:"طَبِيبَانِ", c:"مثنای مذکر"},
 {w:"طَالِبَةٌ", c:"مفرد مؤنث"},
 {w:"مُدَرِّسُونَ", c:"جمع مذکر سالم"},
 {w:"سَيَّارَاتٌ", c:"جمع مؤنث سالم"}
];

const cats=["مفرد مذکر","مفرد مؤنث","مثنای مذکر","مثنای مؤنث","جمع مذکر سالم","جمع مؤنث سالم","جمع مکسر"];
const words=document.getElementById("words"), categories=document.getElementById("categories");
const score=document.getElementById("score"), starCount=document.getElementById("starCount"), bar=document.getElementById("bar");
let points=0, dragged=null;

function fa(n){return n.toString().replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d])}

function render(){
 words.innerHTML=""; categories.innerHTML="";
 data.forEach((x,i)=>{
   const el=document.createElement("div"); el.className="word"; el.textContent=x.w; el.draggable=true; el.dataset.i=i;
   el.addEventListener("dragstart",()=>dragged=i);
   words.appendChild(el);
 });
 cats.forEach(c=>{
   const box=document.createElement("div"); box.className="category"; box.dataset.c=c;
   box.innerHTML=`<div class="cat-title">${c}</div><div class="slot"></div>`;
   box.addEventListener("dragover",e=>{e.preventDefault();box.classList.add("over")});
   box.addEventListener("dragleave",()=>box.classList.remove("over"));
   box.addEventListener("drop",()=>{
     box.classList.remove("over");
     const item=data[dragged];
     const placed=document.createElement("div"); placed.className="placed"; placed.textContent=item.w; placed.dataset.i=dragged;
     box.querySelector(".slot").appendChild(placed);
     document.querySelector(`.word[data-i="${dragged}"]`).classList.add("done");
   });
   categories.appendChild(box);
 });
 bar.style.width="0%"; document.getElementById("message").textContent="";
}
function check(){
 let correct=0,total=data.length;
 document.querySelectorAll(".placed").forEach(p=>{
   const i=+p.dataset.i, parent=p.closest(".category");
   if(data[i].c===parent.dataset.c){correct++}
 });
 points=correct*10;
 score.textContent=fa(points);
 starCount.textContent=fa(Math.floor(correct/2));
 bar.style.width=(correct/total*100)+"%";
 if(correct===total){
   document.getElementById("finalScore").textContent=fa(points);
   document.getElementById("overlay").style.display="flex";
   const rain=document.getElementById("rain"); rain.innerHTML="";
   for(let i=0;i<45;i++){
     const s=document.createElement("div"); s.className="star"; s.textContent=["⭐","🌟","✨"][i%3];
     s.style.left=Math.random()*100+"%"; s.style.animationDelay=Math.random()*1.2+"s";
     rain.appendChild(s);
   }
 }else{
   document.getElementById("message").textContent=`آفرین! ${fa(correct)} مورد درست است. دوباره تلاش کن 🌱`;
 }
}
document.getElementById("check").onclick=check;
document.getElementById("reset").onclick=()=>{points=0;score.textContent="۰";starCount.textContent="۰";render()};
document.getElementById("next").onclick=()=>{document.getElementById("overlay").style.display="none";alert("مرحله ۲ در نسخه کامل با مجموعه واژه‌های جدید باز می‌شود.");};
render();

document.body.classList.add("academy-game-4");

(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const board = document.querySelector(".board");

  function preparePieces() {
    board.querySelectorAll(".word, .category").forEach((piece, index) => {
      piece.style.setProperty("--deal-index", index % 12);
      piece.classList.add("academy-dealt");
      if (piece.dataset.depthReady) return;
      piece.dataset.depthReady = "true";
      piece.addEventListener("pointermove", (event) => {
        if (!finePointer.matches || reducedMotion.matches || piece.classList.contains("done")) return;
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
