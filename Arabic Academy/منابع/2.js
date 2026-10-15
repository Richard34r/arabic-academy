const A=["عالم","عالمة","عالمانِ","عالمينِ","عالمتانِ","عالمتينِ","عالمونَ","عالمينَ","عالمات","علماء"],I=[
["کدام واژه یعنی «دانشمند مرد»؟","عالم"],["کدام واژه یعنی «دانشمند زن»؟","عالمة"],["عالم + ة را بساز.","عالمة"],["مثنای مذکر را انتخاب کن.","عالمانِ"],["مثنای مذکر با ينِ کدام است؟","عالمينِ"],["عالمتانِ یعنی چه؟","دو دانشمند زن"],["کدام پایان نشانه مثنی است؟","ـانِ"],["مثنای مؤنث با انِ کدام است؟","عالمتانِ"],["جمع مذکر سالم کدام است؟",["عالمونَ","عالمينَ"]],["جمع مذکر سالم با ينَ کدام است؟","عالمينَ"],["جمع مؤنث سالم کدام است؟","عالمات"],["جمع مکسر عالم کدام است؟","علماء"],["اسم اشاره نزدیک مفرد مذکر؟","هذا"],["اسم اشاره نزدیک مفرد مؤنث؟","هذه"],["اسم اشاره دو عالم مرد؟","هذان"],["اسم اشاره دو دانشمند زن؟","هاتان"],["اسم اشاره جمع نزدیک؟","هؤلاء"],["اسم اشاره دور مفرد مذکر؟","ذلک"],["اسم اشاره دور مفرد مؤنث؟","تلک"],["اسم اشاره دور جمع؟","أولئک"],["کدام جمله درست است؟","هذان عالمانِ"],["کدام جمله برای یک دانشمند زن درست است؟","هذه عالمة"],["کدام جمله برای جمع دانشمندان زن درست است؟","هؤلاء عالمات"],["کدام جمله برای جمع مکسر درست است؟","أولئک علماء"],["«هذا عالم» یعنی چه؟","این دانشمند مرد است"],["«هذه عالمة» یعنی چه؟","این دانشمند زن است"],["«هذان عالمانِ» یعنی چه؟","این دو دانشمند مرد هستند"],["«هاتان عالمتانِ» یعنی چه؟","این دو دانشمند زن هستند"],["«هؤلاء علماء» یعنی چه؟","این‌ها دانشمند هستند"],["کدام گزینه نون مثنی با کسره دارد؟","عالمانِ"],["کدام گزینه نون جمع مذکر با فتحه دارد؟","عالمونَ"],["مثنای مذکر با ينِ؟","عالمينِ"],["جمع مذکر سالم با ينَ؟","عالمينَ"],["قطعه اول: «___ عالمانِ»","هذان"],["قطعه اول: «___ عالمة»","هذه"],["قطعه اول: «___ علماء»","أولئک"],["کدام زنجیره درست است؟","عالم → عالمانِ → هذان"],["کدام زنجیره مؤنث درست است؟","عالمة → عالمتانِ → هاتان"],["کدام زنجیره جمع مکسر درست است؟","عالم → علماء → أولئک"],["کدام گزینه کاملاً درست است؟","هذان عالمانِ"],
["مفرد «عالمانِ» کدام است؟","عالم"],
["مفرد «عالمتينِ» کدام است؟","عالمة"],
["جمع مذکر سالم «عالم» با واو چیست؟","عالمونَ"],
["جمع مذکر سالم «عالم» با ياء چیست؟","عالمينَ"],
["جمع مؤنث سالم «عالمة» چیست؟","عالمات"],
["جمع مکسر «عالم» چیست؟","علماء"],
["کدام دو گزینه هر دو جمع مذکر سالم‌اند؟","عالمونَ و عالمينَ"],
["کدام گزینه نون مثنی با کسره دارد؟","عالمانِ"],
["کدام گزینه نون جمع مذکر با فتحه دارد؟","عالمونَ"],
["کدام اسم اشاره برای «عالمتانِ» مناسب است؟","هاتان"],
["کدام اسم اشاره برای «عالمينَ» مناسب است؟","هؤلاء"],
["کدام اسم اشاره دور برای «عالمة» مناسب است؟","تلک"],
["کدام اسم اشاره دور برای «عالم» مناسب است؟","ذلک"],
["کدام اسم اشاره دور برای «علماء» مناسب است؟","أولئک"],
["از «عالم» به مثنی مذکر برس.","عالم → عالمانِ"],
["از «عالمة» به مثنی مؤنث برس.","عالمة → عالمتانِ"],
["از «عالم» به جمع مذکر سالم با واو برس.","عالم → عالمونَ"],
["از «عالم» به جمع مذکر سالم با ياء برس.","عالم → عالمينَ"],
["از «عالمة» به جمع مؤنث سالم برس.","عالمة → عالمات"],
["از «عالم» به جمع مکسر برس.","عالم → علماء"]]
;
const academyProgress=window.AcademyProgress,gameId="world-2",totalQuestions=I.length;
let n=academyProgress.getQuizStage(gameId).index,score=academyProgress.getSummary().score,coins=0,locked=false;
function opts(ans){const good=Array.isArray(ans)?ans:[ans];let pool=["عالم","عالمة","عالمانِ","عالمينِ","عالمونَ","عالمينَ","عالمات","علماء","هذا","هذه","هذان","هاتان","هؤلاء","ذلک","تلک","أولئک","این دانشمند مرد است","این دانشمند زن است","این دو دانشمند مرد هستند","این دو دانشمند زن هستند","این‌ها دانشمند هستند","ـانِ","عالم → عالمانِ → هذان","عالمة → عالمتانِ → هاتان","عالم → علماء → أولئک","هذان عالمانِ","هذه عالمة","هؤلاء عالمات","أولئک علماء"];pool=pool.filter(x=>!good.includes(x)).sort(()=>Math.random()-.5);return [...good,...pool.slice(0,Math.max(0,4-good.length))].sort(()=>Math.random()-.5)}
const praise=["آفرین قهرمان!","عالی بود!","احسنت!","فوق‌العاده بود!","درست و دقیق!","آفرین، ادامه بده!","چه خوب پیدا کردی!"];

function stars(){for(let j=0;j<22;j++){let s=document.createElement("span");s.className="star";s.textContent=["⭐","✨","🌟"][j%3];s.style.left=Math.random()*100+"%";s.style.animationDelay=Math.random()*.45+"s";document.body.appendChild(s);setTimeout(()=>s.remove(),2300)}}
function finishQuiz(){document.getElementById("game").style.display="none";document.getElementById("final").style.display="block";document.getElementById("fs").textContent=academyProgress.getSummary().score;document.getElementById("fc").textContent=coins;}
function render(){const stage=academyProgress.getQuizStage(gameId);n=stage.index;if(stage.phase==="complete"){finishQuiz();return}locked=false;score=academyProgress.getSummary().score;document.getElementById("score").textContent=score;document.getElementById("num").textContent=n+1;document.getElementById("bar").style.width=((n+1)/totalQuestions*100)+"%";document.getElementById("q").textContent=`${stage.phase==="review"?"مرور پاسخ‌های نادرست · ":""}${I[n][0]}`;document.getElementById("fb").textContent="";document.getElementById("fb").className="feedback";document.getElementById("next").disabled=true;document.getElementById("check").disabled=false;document.getElementById("pic").textContent=n<12?"👨‍🔬":n<20?"👉":n<29?"🧩":n<34?"🔤":"🧠";let c=document.getElementById("cards");c.innerHTML="";opts(I[n][1]).forEach(x=>{let d=document.createElement("div");d.className="card";d.textContent=x;d.onclick=()=>{if(!locked&&academyProgress.canPlay(gameId)){document.querySelectorAll(".card").forEach(a=>a.classList.remove("sel"));d.classList.add("sel");d.dataset.x=x}};c.appendChild(d)})}
document.getElementById("check").onclick=()=>{if(locked||!academyProgress.canPlay(gameId))return;let d=document.querySelector(".card.sel");if(!d){document.getElementById("fb").textContent="ابتدا یک گزینه را انتخاب کن.";return}const correct=Array.isArray(I[n][1])?I[n][1].includes(d.dataset.x):d.dataset.x===I[n][1];const result=academyProgress.recordAnswer(gameId,`q-${n}`,correct,10);if(!result.accepted)return;locked=true;document.querySelectorAll(".card").forEach(card=>{if((Array.isArray(I[n][1])?I[n][1].includes(card.dataset.x):card.dataset.x===I[n][1]))card.classList.add("correct-answer")});if(!correct)d.classList.add("wrong-answer");score=result.score;if(correct){coins+=5;document.getElementById("fb").textContent="آفرین! پاسخ درست است؛ ۱۰ امتیاز گرفتی.";document.getElementById("fb").className="feedback good";stars()}else{document.getElementById("fb").textContent="پاسخ نادرست بود؛ پاسخ درست سبز شد و این پرسش برای مرور نگه داشته شد.";document.getElementById("fb").className="feedback bad"}document.getElementById("score").textContent=score;document.getElementById("coins").textContent=coins;document.getElementById("check").disabled=true;document.getElementById("next").disabled=!academyProgress.canPlay(gameId);};
document.getElementById("next").onclick=()=>{const stage=academyProgress.nextQuizStage(gameId,totalQuestions);if(stage.blocked)return;if(stage.complete){finishQuiz();stars()}else{n=stage.index;render()}};
academyProgress.subscribe(()=>{if(locked)document.getElementById("next").disabled=!academyProgress.canPlay(gameId)});
render();

document.body.classList.add("academy-game-2");

(() => {
  const cards = document.getElementById("cards");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function prepareAnswers() {
    [...cards.children].forEach((card, index) => {
      card.style.setProperty("--deal-index", index);
      card.classList.add("academy-dealt");
      if (card.dataset.depthReady) return;
      card.dataset.depthReady = "true";
      card.addEventListener("pointermove", (event) => {
        if (!finePointer.matches || reducedMotion.matches) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--card-tilt-x", `${(-y * 4).toFixed(2)}deg`);
        card.style.setProperty("--card-tilt-y", `${(x * 4).toFixed(2)}deg`);
      }, { passive: true });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--card-tilt-x", "0deg");
        card.style.setProperty("--card-tilt-y", "0deg");
      }, { passive: true });
    });
  }

  new MutationObserver(prepareAnswers).observe(cards, { childList: true });
  prepareAnswers();
})();
