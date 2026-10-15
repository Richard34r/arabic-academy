// 7 Categories Definition matching Iranian Middle School Arabic Textbooks
        const CATEGORIES = [
            { id: 'singular_masculine', name: 'مفرد مذکر', example: 'طالِب، مُعَلِّم', color: 'border-blue-500/40 bg-blue-950/20 text-blue-300', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
            { id: 'singular_feminine', name: 'مفرد مؤنث', example: 'طالِبَة، مَدْرَسَة', color: 'border-pink-500/40 bg-pink-950/20 text-pink-300', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
            { id: 'dual_masculine', name: 'مثنای مذکر', example: 'طالِبانِ، مُعَلِّمَیْنِ', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
            { id: 'dual_feminine', name: 'مثنای مؤنث', example: 'طالِبَتانِ، وَرْدَتَیْنِ', color: 'border-teal-500/40 bg-teal-950/20 text-teal-300', badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40' },
            { id: 'plural_masculine_sound', name: 'جمع مذکر سالم', example: 'مُسْلِمونَ، مُهَنْدِسینَ', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
            { id: 'plural_feminine_sound', name: 'جمع مؤنث سالم', example: 'مُسْلِمات، طالِبات', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
            { id: 'broken_plural', name: 'جمع مکسر', example: 'کُتُب، مَدارِس، أَطْفال', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' }
        ];

        // Level datasets curated for Grades 7, 8, and 9
        const LEVELS_DATA = [
            {
                level: 1,
                title: 'مرحله ۱: پایه هفتم',
                words: [
                    { id: 'w101', text: 'طالِب', category: 'singular_masculine', mean: 'دانش‌آموز پسر' },
                    { id: 'w102', text: 'مُعَلِّمَة', category: 'singular_feminine', mean: 'معلم زن' },
                    { id: 'w103', text: 'طالِبانِ', category: 'dual_masculine', mean: 'دو دانش‌آموز پسر' },
                    { id: 'w104', text: 'وَرْدَتانِ', category: 'dual_feminine', mean: 'دو گل' },
                    { id: 'w105', text: 'مُسْلِمونَ', category: 'plural_masculine_sound', mean: 'مسلمانان مرد' },
                    { id: 'w106', text: 'طالِبات', category: 'plural_feminine_sound', mean: 'دانش‌آموزان دختر' },
                    { id: 'w107', text: 'کُتُب', category: 'broken_plural', mean: 'کتاب‌ها' }
                ]
            },
            {
                level: 2,
                title: 'مرحله ۲: پایه هشتم',
                words: [
                    { id: 'w201', text: 'صادِق', category: 'singular_masculine', mean: 'مرد راستگو' },
                    { id: 'w202', text: 'شَجَرَة', category: 'singular_feminine', mean: 'درخت' },
                    { id: 'w203', text: 'مُعَلِّمَیْنِ', category: 'dual_masculine', mean: 'دو معلم' },
                    { id: 'w204', text: 'شَجَرَتاني', category: 'dual_feminine', mean: 'دو درخت' },
                    { id: 'w205', text: 'مُهَنْدِسونَ', category: 'plural_masculine_sound', mean: 'مهندسان' },
                    { id: 'w206', text: 'مُؤْمِنات', category: 'plural_feminine_sound', mean: 'زنان مؤمن' },
                    { id: 'w207', text: 'مَدارِس', category: 'broken_plural', mean: 'مدرسه‌ها' },
                    { id: 'w208', text: 'أَشْجار', category: 'broken_plural', mean: 'درختان' }
                ]
            },
            {
                level: 3,
                title: 'مرحله ۳: پایه نهم',
                words: [
                    { id: 'w301', text: 'طَبیب', category: 'singular_masculine', mean: 'پزشک مرد' },
                    { id: 'w302', text: 'طَبیبَة', category: 'singular_feminine', mean: 'پزشک زن' },
                    { id: 'w303', text: 'وَلَدانِ', category: 'dual_masculine', mean: 'دو پسر' },
                    { id: 'w304', text: 'بِنْتانِ', category: 'dual_feminine', mean: 'دو دختر' },
                    { id: 'w305', text: 'فَلاّحینَ', category: 'plural_masculine_sound', mean: 'کشاورزان' },
                    { id: 'w306', text: 'مُمَرِّضات', category: 'plural_feminine_sound', mean: 'پرستاران زن' },
                    { id: 'w307', text: 'أَطْفال', category: 'broken_plural', mean: 'کودکان' },
                    { id: 'w308', text: 'عُلَماء', category: 'broken_plural', mean: 'دانشمندان' },
                    { id: 'w309', text: 'نافِذَتانِ', category: 'dual_feminine', mean: 'دو پنجره' },
                    { id: 'w310', text: 'صَابِرینَ', category: 'plural_masculine_sound', mean: 'شکیبایان' }
                ]
            },
            {
                level: 4,
                title: 'مرحله ۴: چالش استاد جدایی',
                words: [
                    { id: 'w401', text: 'کَواکِب', category: 'broken_plural', mean: 'سیارگان' },
                    { id: 'w402', text: 'جُنْدِيّ', category: 'singular_masculine', mean: 'سرباز' },
                    { id: 'w403', text: 'حَدیقَة', category: 'singular_feminine', mean: 'باغ' },
                    { id: 'w404', text: 'قَلَمانِ', category: 'dual_masculine', mean: 'دو قلم' },
                    { id: 'w405', text: 'مُسافِرَتانِ', category: 'dual_feminine', mean: 'دو زن مسافر' },
                    { id: 'w406', text: 'فائِزونَ', category: 'plural_masculine_sound', mean: 'برندگان' },
                    { id: 'w407', text: 'صادِقات', category: 'plural_feminine_sound', mean: 'زنان راستگو' },
                    { id: 'w408', text: 'مَساجِد', category: 'broken_plural', mean: 'مسجدها' },
                    { id: 'w409', text: 'رِجال', category: 'broken_plural', mean: 'مردان' },
                    { id: 'w410', text: 'شاعِرانِ', category: 'dual_masculine', mean: 'دو شاعر' },
                    { id: 'w411', text: 'شاعِرَة', category: 'singular_feminine', mean: 'شاعر زن' },
                    { id: 'w412', text: 'مُسافِرینَ', category: 'plural_masculine_sound', mean: 'مسافران' }
                ]
            }
        ];

        let currentLevelIndex = 0;
        let selectedWordId = null;
        let levelErrors = 0;
        let totalScore = 0;
        let placedWordsState = {}; // { wordId: categoryId }

        function initApp() {
            renderLevelTabs();
            loadLevel(0);
            initStarCanvas();
        }

        function renderLevelTabs() {
            const container = document.getElementById('levelTabs');
            container.innerHTML = '';

            LEVELS_DATA.forEach((lvl, idx) => {
                const btn = document.createElement('button');
                const isActive = idx === currentLevelIndex;
                btn.className = `academy-level-tab${isActive ? ' is-active' : ''}`;
                btn.setAttribute('aria-current', isActive ? 'step' : 'false');
                btn.innerText = lvl.title;
                btn.onclick = () => loadLevel(idx);
                container.appendChild(btn);
            });
        }

        function loadLevel(levelIndex) {
            currentLevelIndex = levelIndex;
            levelErrors = 0;
            selectedWordId = null;
            placedWordsState = {};

            renderLevelTabs();

            const levelData = LEVELS_DATA[currentLevelIndex];
            document.getElementById('levelBadge').innerText = `${levelData.level} از ${LEVELS_DATA.length}`;

            renderCategories();
            renderWordPool();
            updateProgress();
        }

        function renderCategories() {
            const grid = document.getElementById('categoriesGrid');
            grid.innerHTML = '';

            CATEGORIES.forEach(cat => {
                const zone = document.createElement('div');
                zone.id = `zone_${cat.id}`;
                zone.className = `glass-panel rounded-2xl p-3 border ${cat.color} transition-all duration-200 flex flex-col justify-between min-h-[135px] relative cursor-pointer`;
                
                // Drag & Drop event bindings
                zone.ondragover = handleDragOver;
                zone.ondragleave = handleDragLeave;
                zone.ondrop = (e) => handleDrop(e, cat.id);
                // Touch/Click selection event binding
                zone.onclick = () => handleCategoryClick(cat.id);

                zone.innerHTML = `
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="font-black text-xs md:text-sm text-slate-100">${cat.name}</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full border ${cat.badge} font-bold">مثال: ${cat.example}</span>
                        </div>
                    </div>
                    <div id="items_${cat.id}" class="mt-2 flex flex-wrap gap-1.5 min-h-[45px] p-2 bg-slate-950/40 rounded-xl border border-white/5 items-center">
                        <!-- Placed words rendered here -->
                    </div>
                `;

                grid.appendChild(zone);
            });

            // Re-render placed words
            Object.keys(placedWordsState).forEach(wordId => {
                const catId = placedWordsState[wordId];
                const word = currentLevelWords().find(w => w.id === wordId);
                if (word) {
                    appendWordToCategory(word, catId);
                }
            });
        }

        function currentLevelWords() {
            return LEVELS_DATA[currentLevelIndex].words;
        }

        function renderWordPool() {
            const pool = document.getElementById('wordPool');
            pool.innerHTML = '';

            const words = currentLevelWords();
            const unplaced = words.filter(w => !placedWordsState[w.id]);

            document.getElementById('remainingWordsCount').innerText = `${unplaced.length} لغت باقی‌مانده`;

            if (unplaced.length === 0) {
                pool.innerHTML = `
                    <div class="w-full text-center py-8 text-emerald-400 font-bold text-xs leading-relaxed">
                        ✨ تمامی کلمات این مرحله در جای صحیح قرار گرفتند!<br>
                        با سپاس از <strong class="text-amber-300">استاد غلامحسین جدایی</strong>
                    </div>
                `;
                return;
            }

            // Shuffle for variety
            const shuffled = [...unplaced].sort(() => Math.random() - 0.5);

            shuffled.forEach(word => {
                const card = createWordCard(word);
                pool.appendChild(card);
            });
        }

        function createWordCard(word) {
            const card = document.createElement('div');
            card.id = `card_${word.id}`;
            card.draggable = true;
            card.className = `glass-card rounded-xl px-3.5 py-2 text-slate-900 font-extrabold cursor-grab active:cursor-grabbing transition-all transform hover:-translate-y-1 shadow-md flex items-center gap-2 border border-amber-400/30 ${
                selectedWordId === word.id ? 'selected-word' : ''
            }`;

            card.ondragstart = (e) => handleDragStart(e, word.id);
            card.onclick = (e) => {
                e.stopPropagation();
                selectWord(word.id);
            };

            card.innerHTML = `
                <span class="arabic-text text-base font-black text-slate-950">${word.text}</span>
                <span class="text-[10px] text-slate-600 font-bold border-r border-slate-300 pr-1.5 mr-0.5">${word.mean}</span>
            `;

            return card;
        }

        function selectWord(wordId) {
            
            selectedWordId = (selectedWordId === wordId) ? null : wordId;
            renderWordPool();
        }

        function handleDragStart(e, wordId) {
            
            selectedWordId = wordId;
            e.dataTransfer.setData('text/plain', wordId);
            e.dataTransfer.effectAllowed = 'move';
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            e.currentTarget.classList.add('drop-zone-active');
        }

        function handleDragLeave(e) {
            e.currentTarget.classList.remove('drop-zone-active');
        }

        function handleDrop(e, categoryId) {
            e.preventDefault();
            e.currentTarget.classList.remove('drop-zone-active');
            const wordId = e.dataTransfer.getData('text/plain') || selectedWordId;
            if (wordId) {
                attemptPlaceWord(wordId, categoryId);
            }
        }

        function handleCategoryClick(categoryId) {
            if (selectedWordId) {
                attemptPlaceWord(selectedWordId, categoryId);
            }
        }

        function attemptPlaceWord(wordId, categoryId) {
            const word = currentLevelWords().find(w => w.id === wordId);
            if (!word) return;

            if (word.category === categoryId) {
                // Correct placement
                
                placedWordsState[wordId] = categoryId;
                selectedWordId = null;

                triggerConfettiAtZone(categoryId);

                renderCategories();
                renderWordPool();
                updateProgress();

                showToast(`آفرین! «${word.text}» به درستی در دسته ${getCategoryName(categoryId)} قرار گرفت.`, '✅');

                // Check level completion
                if (Object.keys(placedWordsState).length === currentLevelWords().length) {
                    setTimeout(() => {
                        triggerVictory();
                    }, 500);
                }
            } else {
                // Incorrect placement
                
                levelErrors++;

                const zone = document.getElementById(`zone_${categoryId}`);
                if (zone) {
                    zone.classList.add('animate-shake');
                    setTimeout(() => zone.classList.remove('animate-shake'), 450);
                }

                showToast(`دقت کن! «${word.text}» مربوط به دسته ${getCategoryName(categoryId)} نیست.`, '❌');
            }
        }

        function appendWordToCategory(word, categoryId) {
            const container = document.getElementById(`items_${categoryId}`);
            if (!container) return;

            const badge = document.createElement('div');
            badge.className = 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-lg px-2.5 py-1 text-xs font-black flex items-center gap-1.5';
            badge.innerHTML = `
                <span class="arabic-text text-sm font-black text-white">${word.text}</span>
                <span class="text-emerald-400 text-[10px]">✓</span>
            `;
            container.appendChild(badge);
        }

        function getCategoryName(catId) {
            const cat = CATEGORIES.find(c => c.id === catId);
            return cat ? cat.name : '';
        }

        function updateProgress() {
            const total = currentLevelWords().length;
            const placed = Object.keys(placedWordsState).length;
            const percent = Math.round((placed / total) * 100);

            document.getElementById('progressBar').style.transform = `scaleX(${percent / 100})`;
            document.getElementById('progressPercent').innerText = `${percent}%`;
        }

        function showHint() {
            
            const unplaced = currentLevelWords().filter(w => !placedWordsState[w.id]);
            if (unplaced.length === 0) return;

            const randomWord = unplaced[Math.floor(Math.random() * unplaced.length)];
            const catName = getCategoryName(randomWord.category);

            showToast(`راهنمایی: لغت «${randomWord.text}» (${randomWord.mean}) باید در دسته «${catName}» باشد.`, '💡');
        }

        function resetCurrentLevel() {
            
            loadLevel(currentLevelIndex);
            showToast('مرحله بازنشانی شد.', '🔄');
        }

        function triggerVictory() {
            

            let starsEarned = 3;
            if (levelErrors > 2) starsEarned = 2;
            if (levelErrors > 5) starsEarned = 1;

            const levelScore = Math.max(50, 150 - (levelErrors * 15));
            totalScore += levelScore;
            document.getElementById('totalStars').innerText = totalScore;

            document.getElementById('modalErrors').innerText = levelErrors;
            document.getElementById('modalScore').innerText = `+${levelScore}`;

            const nextBtn = document.getElementById('nextLevelBtn');
            if (currentLevelIndex >= LEVELS_DATA.length - 1) {
                nextBtn.innerText = 'پایان تمام مراحل 🎉';
                nextBtn.onclick = () => {
                    closeModal();
                    showToast('تبریک! تمامی مراحل را با موفقیت و افتخار به پایان رساندید!', '👑');
                };
            } else {
                nextBtn.innerText = 'مرحله بعدی 🚀';
                nextBtn.onclick = goToNextLevel;
            }

            const modal = document.getElementById('victoryModal');
            const modalContent = document.getElementById('victoryModalContent');
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-90');
                modalContent.classList.add('scale-100');
            }, 50);

            const s1 = document.getElementById('star1');
            const s2 = document.getElementById('star2');
            const s3 = document.getElementById('star3');

            s1.className = 'transform scale-0 transition-all duration-300';
            s2.className = 'transform scale-0 transition-all duration-300 delay-150';
            s3.className = 'transform scale-0 transition-all duration-300 delay-300';

            setTimeout(() => { if (starsEarned >= 1) s1.classList.replace('scale-0', 'scale-125'); }, 250);
            setTimeout(() => { if (starsEarned >= 2) s2.classList.replace('scale-0', 'scale-125'); }, 450);
            setTimeout(() => { if (starsEarned >= 3) s3.classList.replace('scale-0', 'scale-125'); }, 650);

            startStarRain();
        }

        function closeModal() {
            const modal = document.getElementById('victoryModal');
            const modalContent = document.getElementById('victoryModalContent');
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-90');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
            stopStarRain();
        }

        function restartModalLevel() {
            closeModal();
            loadLevel(currentLevelIndex);
        }

        function goToNextLevel() {
            closeModal();
            if (currentLevelIndex < LEVELS_DATA.length - 1) {
                loadLevel(currentLevelIndex + 1);
            }
        }

        function showToast(message, icon = '💡') {
            const toast = document.getElementById('toast');
            document.getElementById('toastIcon').innerText = icon;
            document.getElementById('toastText').innerText = message;

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            if (window.toastTimeout) clearTimeout(window.toastTimeout);
            window.toastTimeout = setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3200);
        }

        let canvas, ctx;
        let particles = [];
        let animationFrameId = null;

        function initStarCanvas() {
            canvas = document.getElementById('starCanvas');
            ctx = canvas.getContext('2d');
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
        }

        function resizeCanvas() {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }

        class StarParticle {
            constructor(x, y, isBurst = false) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || (isBurst ? y : -20);
                this.size = Math.random() * 11 + 6;
                this.speedY = isBurst ? (Math.random() - 0.5) * 10 : Math.random() * 4 + 2;
                this.speedX = isBurst ? (Math.random() - 0.5) * 10 : (Math.random() - 0.5) * 2;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.12;
                this.color = `hsl(${Math.random() * 50 + 35}, 100%, 65%)`;
                this.opacity = 1;
                this.decay = isBurst ? Math.random() * 0.02 + 0.015 : Math.random() * 0.005 + 0.002;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotSpeed;
                this.opacity -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = Math.max(0, this.opacity);
                ctx.fillStyle = this.color;

                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size,
                               -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
                    ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size / 2),
                               -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size / 2));
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        function triggerConfettiAtZone(categoryId) {
            const zone = document.getElementById(`zone_${categoryId}`);
            if (!zone || !canvas) return;
            const rect = zone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 22; i++) {
                particles.push(new StarParticle(centerX, centerY, true));
            }

            if (!animationFrameId) {
                animateParticles();
            }
        }

        function startStarRain() {
            particles = [];
            for (let i = 0; i < 70; i++) {
                particles.push(new StarParticle());
            }
            if (!animationFrameId) {
                animateParticles();
            }
        }

        function stopStarRain() {
            particles = [];
        }

        function animateParticles() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const modalVisible = !document.getElementById('victoryModal').classList.contains('hidden');
            if (modalVisible && particles.length < 110 && Math.random() < 0.3) {
                particles.push(new StarParticle());
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.opacity <= 0 || p.y > canvas.height + 40) {
                    particles.splice(i, 1);
                }
            }

            if (particles.length > 0) {
                animationFrameId = requestAnimationFrame(animateParticles);
            } else {
                animationFrameId = null;
            }
        }

        window.onload = function() {
            initApp();
        };

        document.body.classList.add('academy-game-7');

        (() => {
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
            const categories = document.getElementById('categoriesGrid');
            const words = document.getElementById('wordPool');

            function prepareDepth(container) {
                [...container.children].forEach((card, index) => {
                    card.style.setProperty('--deal-index', index);
                    card.classList.add('academy-dealt');
                    if (card.dataset.depthReady) return;
                    card.dataset.depthReady = 'true';
                    card.addEventListener('pointermove', (event) => {
                        if (!finePointer.matches || reducedMotion.matches) return;
                        const bounds = card.getBoundingClientRect();
                        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                        card.style.setProperty('--card-tilt-x', `${(-y * 3).toFixed(2)}deg`);
                        card.style.setProperty('--card-tilt-y', `${(x * 3).toFixed(2)}deg`);
                    }, { passive: true });
                    card.addEventListener('pointerleave', () => {
                        card.style.setProperty('--card-tilt-x', '0deg');
                        card.style.setProperty('--card-tilt-y', '0deg');
                    }, { passive: true });
                });
            }

            const observe = (container) => {
                new MutationObserver(() => prepareDepth(container)).observe(container, { childList: true });
                prepareDepth(container);
            };
            observe(categories);
            observe(words);
        })();
