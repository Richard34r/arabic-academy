const questionBank = [
            // ضمیر به فعل
            { q: "صیغه هو (او مذکر غایب) برای فعل «ذَهَبَ» چیست؟", options: ["ذَهَبَ", "ذَهَبَا", "ذَهَبُوا", "ذَهَبَتْ"], correct: 0 },
            { q: "صیغه هما (آن دو مذکر غایب) برای فعل «ذَهَبَ» چیست؟", options: ["ذَهَبَ", "ذَهَبَا", "ذَهَبُوا", "ذَهَبَتْ"], correct: 1 },
            { q: "صیغه هم (آنان مذکر غایب) برای فعل «ذَهَبَ» چیست؟", options: ["ذَهَبَا", "ذَهَبُوا", "ذَهَبَتْ", "ذَهَبْنَ"], correct: 1 },
            { q: "صیغه هی (او مؤنث غایب) برای فعل «سَمِعَ» چیست؟", options: ["سَمِعَ", "سَمِعَا", "سَمِعَتْ", "سَمِعْنَ"], correct: 2 },
            { q: "صیغه أنتَ (تو مذکر مخاطب) برای فعل «جَلَسَ» چیست؟", options: ["جَلَسْتَ", "جَلَسْتُما", "جَلَسْتُم", "جَلَسْتِ"], correct: 0 },
            { q: "صیغه أنتِ (تو مؤنث مخاطب) برای فعل «جَلَسَ» چیست؟", options: ["جَلَسْتَ", "جَلَسْتِ", "جَلَسْتُمَا", "جَلَسْتُنّ"], correct: 1 },
            { q: "صیغه أنتم (شما مذکر مخاطب) برای فعل «کَتَبَ» چیست؟", options: ["کَتَبْتُما", "کَتَبْتُم", "کَتَبْتُنّ", "کَتَبْتِ"], correct: 1 },
            { q: "صیغه أنا (من) برای فعل «ذَهَبَ» چیست؟", options: ["ذَهَبْتُ", "ذَهَبْنَا", "ذَهَبْتَ", "ذَهَبْتِ"], correct: 0 },
            { q: "صیغه نحن (ما) برای فعل «سَمِعَ» چیست؟", options: ["سَمِعْتُ", "سَمِعْنَا", "سَمِعْتُم", "سَمِعْنَ"], correct: 1 },

            // ترجمه فعل
            { q: "معنی دقیق فعل ماضی «ذَهَبَ» چیست؟", options: ["رفت", "می‌رود", "خواهد رفت", "می‌رفت"], correct: 0 },
            { q: "معنی دقیق فعل ماضی «سَمِعتُ» چیست؟", options: ["شنیدی", "شنیدم", "شنیدیم", "شنیدند"], correct: 1 },
            { q: "معنی دقیق فعل ماضی «کَتَبنَ» چیست؟", options: ["نوشتند (مؤنث)", "نوشتید", "نوشتیم", "نوشتند (مذکر)"], correct: 0 },
            { q: "معنی دقیق فعل ماضی «جَلَسْتُما» چیست؟", options: ["تو نشستی", "شما دو نفر نشستید", "آن دو نشستند", "شما نشستید"], correct: 1 },
            { q: "معنی دقیق فعل ماضی «خَرَجَتْ» چیست؟", options: ["خارج شد (مذکر)", "خارج شد (مؤنث)", "خارج شدید", "خارج شدم"], correct: 1 },

            // شناخت ضمیر از روی فعل
            { q: "فعل «رَجَعَ» با کدام ضمیر تناسب دارد؟", options: ["هو", "هی", "أنتَ", "أنا"], correct: 0 },
            { q: "فعل «قَرَأَتْ» با کدام ضمیر تناسب دارد؟", options: ["هو", "هی", "أنتِ", "أنا"], correct: 1 },
            { q: "فعل «ذَهَبْتُم» با کدام ضمیر تناسب دارد؟", options: ["أنتُم", "أنتُنّ", "نحن", "هم"], correct: 0 },
            { q: "فعل «فَهِمْنَا» با کدام ضمیر تناسب دارد؟", options: ["أنا", "نحن", "أنتم", "هنّ"], correct: 1 },

            // جای خالی در جمله
            { q: "کدام گزینه در جای خالی قرار می‌گیرد؟\nالتّلامیذُ ... إلی المدرسهِ. (دانش‌آموزان به مدرسه رفتند.)", options: ["ذَهَبَ", "ذَهَبَا", "ذَهَبُوا", "ذَهَبَتْ"], correct: 2 },
            { q: "کدام گزینه در جای خالی قرار می‌گیرد؟\nالبنتُ ... الدرسَ. (دختر درس را فهمید.)", options: ["فَهِمَ", "فَهِمَتْ", "فَهِمَا", "فَهِمُوا"], correct: 1 }
        ];

        let currentQuestion = 0;
        let score = 0;
        let answered = false;

        function loadQuestion() {
            answered = false;
            document.getElementById('feedback').innerText = '';
            document.getElementById('next-btn').style.display = 'none';
            
            if (currentQuestion >= questionBank.length) {
                document.getElementById('app').innerHTML = `
                    <h1>🎉 تبریک می‌گویم!</h1>
                    <div class="teacher-badge">طراح: استاد غلامحسین جدایی</div>
                    <p style="font-size: 20px; color: #2c3e50; margin: 20px 0;">شما آزمون را با موفقیت به پایان رساندید!</p>
                    <p style="font-size: 22px; font-weight: bold; color: #10b981;">امتیاز نهایی شما: ${score} از ${questionBank.length}</p>
                    <button class="next-btn" style="display: inline-block;" onclick="restartQuiz()">شروع مجدد آزمون 🔄</button>
                `;
                return;
            }

            const q = questionBank[currentQuestion];
            document.getElementById('question-num').innerText = currentQuestion + 1;
            document.getElementById('total-q').innerText = questionBank.length;
            document.getElementById('score').innerText = score;
            document.getElementById('question-text').innerText = q.q;

            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';

            q.options.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => selectOption(index, btn);
                optionsContainer.appendChild(btn);
            });
        }

        function selectOption(selectedIndex, btn) {
            if (answered) return;
            answered = true;

            const q = questionBank[currentQuestion];
            const buttons = document.querySelectorAll('.option-btn');

            if (selectedIndex === q.correct) {
                btn.classList.add('correct');
                document.getElementById('feedback').innerText = '✅ آفرین! پاسخ درست است.';
                document.getElementById('feedback').style.color = '#10b981';
                score += 1;
                document.getElementById('score').innerText = score;
                showStars();
            } else {
                btn.classList.add('wrong');
                buttons[q.correct].classList.add('correct');
                document.getElementById('feedback').innerText = '❌ پاسخ اشتباه بود. گزینه درست سبز شد.';
                document.getElementById('feedback').style.color = '#ef4444';
            }

            document.getElementById('next-btn').style.display = 'inline-block';
        }

        function nextQuestion() {
            currentQuestion++;
            loadQuestion();
        }

        function restartQuiz() {
            location.reload();
        }

        function showStars() {
            for (let i = 0; i < 6; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.innerHTML = '⭐';
                star.style.left = Math.random() * 80 + 10 + '%';
                star.style.animationDuration = (Math.random() * 1 + 1) + 's';
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 1500);
            }
        }

        window.onload = loadQuestion;

        document.body.classList.add("academy-game-3");

        (() => {
            const options = document.getElementById("options-container");
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
            const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

            function prepareOptions() {
                [...options.children].forEach((option, index) => {
                    option.style.setProperty("--deal-index", index);
                    option.classList.add("academy-dealt");
                    if (option.dataset.depthReady) return;
                    option.dataset.depthReady = "true";
                    option.addEventListener("pointermove", (event) => {
                        if (!finePointer.matches || reducedMotion.matches) return;
                        const bounds = option.getBoundingClientRect();
                        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                        option.style.setProperty("--card-tilt-x", `${(-y * 4).toFixed(2)}deg`);
                        option.style.setProperty("--card-tilt-y", `${(x * 4).toFixed(2)}deg`);
                    }, { passive: true });
                    option.addEventListener("pointerleave", () => {
                        option.style.setProperty("--card-tilt-x", "0deg");
                        option.style.setProperty("--card-tilt-y", "0deg");
                    }, { passive: true });
                });
            }

            new MutationObserver(prepareOptions).observe(options, { childList: true });
            prepareOptions();
        })();
