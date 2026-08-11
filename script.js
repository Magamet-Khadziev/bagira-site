// ====================================
// BAGIRA.EXE — СИСТЕМА РАССЛЕДОВАНИЯ
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🟢 BAGIRA.EXE загружен!');
    
    // ====================================
    // ЭЛЕМЕНТЫ
    // ====================================
    const startButton = document.getElementById('startButton');
    const bioButton = document.getElementById('bioButton');
    const heroSection = document.querySelector('.hero');
    
    // ====================================
    // ЗВУКОВЫЕ ЭФФЕКТЫ
    // ====================================
    function playClickSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            
            gainNode.gain.value = 0.1;
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch(e) {
            // Тихая ошибка
        }
    }
    
    // ====================================
    // ОБРАБОТЧИК КНОПКИ "НАЧАТЬ РАССЛЕДОВАНИЕ"
    // ====================================
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            console.log('🟢 Кнопка "Начать расследование" нажата!');
            
            playClickSound();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            this.textContent = 'ЗАГРУЗКА...';
            this.disabled = true;
            
            let dots = 0;
            const loadingInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                this.textContent = 'ЗАГРУЗКА' + '.'.repeat(dots);
            }, 300);
            
            setTimeout(() => {
                clearInterval(loadingInterval);
                createHackEffect();
                setTimeout(() => {
                    showInvestigation();
                }, 800);
            }, 1500);
        });
    } else {
        console.error('❌ Кнопка "startButton" не найдена!');
    }
    
    // ====================================
    // ОБРАБОТЧИК КНОПКИ "БИОГРАФИЯ"
    // ====================================
    if (bioButton) {
        console.log('✅ Кнопка биографии найдена!');
        bioButton.addEventListener('click', function() {
            console.log('📋 Открываем биографию...');
            playClickSound();
            showBiography();
        });
    } else {
        console.error('❌ Кнопка "bioButton" не найдена!');
    }
    
    // ====================================
    // ЭФФЕКТ ВЗЛОМА
    // ====================================
    function createHackEffect() {
        const chars = '01АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ!@#$%^&*()';
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            pointer-events: none;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        
        for (let i = 0; i < 30; i++) {
            const char = document.createElement('div');
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.cssText = `
                position: absolute;
                color: #00ff41;
                font-family: 'Courier New', monospace;
                font-size: ${12 + Math.random() * 20}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100 - 100}%;
                opacity: ${0.3 + Math.random() * 0.7};
                animation: fallDown ${2 + Math.random() * 3}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            container.appendChild(char);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fallDown {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            container.remove();
            style.remove();
        }, 2500);
    }
    
    // ====================================
    // ПОКАЗ ПЕРВОГО РАССЛЕДОВАНИЯ
    // ====================================
    function showInvestigation() {
        heroSection.innerHTML = '';
        heroSection.style.background = 'radial-gradient(ellipse at center, #0d1f0d 0%, #0a0a0a 70%)';
        
        const investigationHTML = `
            <div class="content investigation">
                <div class="status">
                    ● РАССЛЕДОВАНИЕ НАЧАТО
                </div>
                
                <div class="case-number">
                    ДЕЛО №001
                </div>
                
                <h2 class="case-title">
                    УЛИКА №003
                </h2>
                
                <div class="evidence">
                    <p class="evidence-text">
                        «Ест шашлык так аппетитно,<br>
                       будто это мясно НЕГРА.»
                    </p>
                </div>
                
                <div class="witness">
                    <span class="witness-label">СВИДЕТЕЛЬ:</span>
                    <span class="witness-text">«Багира сказала, что будет спокойно»</span>
                </div>
                
                <div class="timer">
                    ⏱ ЧЕРЕЗ 20 МИНУТ БЫЛО УЖЕ НЕ СПОКОЙНО
                </div>
                
                <button class="nextButton">
                    ДАЛЕЕ →
                </button>
            </div>
        `;
        
        heroSection.innerHTML = investigationHTML;
        addInvestigationStyles();
        
        const content = document.querySelector('.investigation');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
                content.style.transition = 'all 0.6s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        }
        
        const nextButton = document.querySelector('.nextButton');
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                showNextStep();
            });
        }
    }
    
    // ====================================
    // СТИЛИ ДЛЯ РАССЛЕДОВАНИЯ
    // ====================================
    function addInvestigationStyles() {
        if (document.getElementById('investigationStyles')) return;
        
        const styles = `
            .investigation {
                max-width: 700px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .case-number {
                font-size: 14px;
                color: #006b1e;
                letter-spacing: 4px;
                margin: 20px 0 10px 0;
                font-weight: 300;
            }
            
            .case-title {
                font-size: clamp(32px, 6vw, 48px);
                color: #00ff41;
                text-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
                margin-bottom: 30px;
                letter-spacing: 3px;
            }
            
            .evidence {
                background: rgba(0, 255, 65, 0.03);
                border-left: 3px solid #00ff41;
                padding: 20px 25px;
                margin: 20px 0;
                border-radius: 3px;
            }
            
            .evidence-text {
                font-size: clamp(16px, 2vw, 22px);
                color: #00ff41;
                line-height: 1.6;
                font-style: italic;
            }
            
            .witness {
                background: rgba(0, 255, 65, 0.05);
                padding: 15px 20px;
                margin: 15px 0;
                border-radius: 5px;
                border: 1px solid rgba(0, 255, 65, 0.1);
            }
            
            .witness-label {
                color: #006b1e;
                font-size: 12px;
                letter-spacing: 2px;
                display: block;
                margin-bottom: 5px;
            }
            
            .witness-text {
                color: #00ff41;
                font-size: clamp(14px, 1.5vw, 18px);
            }
            
            .timer {
                font-size: clamp(12px, 1.2vw, 16px);
                color: #ff6b00;
                background: rgba(255, 107, 0, 0.05);
                border: 1px solid rgba(255, 107, 0, 0.2);
                padding: 12px 20px;
                margin: 20px 0 30px 0;
                border-radius: 5px;
                letter-spacing: 2px;
                text-align: center;
            }
            
            .nextButton {
                font-family: 'Courier New', monospace;
                font-size: clamp(14px, 1.5vw, 18px);
                font-weight: 700;
                letter-spacing: 3px;
                padding: 15px 40px;
                background: transparent;
                color: #00ff41;
                border: 2px solid #00ff41;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                margin-top: 10px;
            }
            
            .nextButton:hover {
                background: rgba(0, 255, 65, 0.1);
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
                transform: scale(1.02);
            }
            
            .nextButton:active {
                transform: scale(0.98);
            }
            
            @media (max-width: 600px) {
                .evidence { padding: 15px; }
                .nextButton { padding: 12px 30px; width: 100%; }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'investigationStyles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    // ====================================
    // СЛЕДУЮЩИЙ ШАГ (ЮМОР)
    // ====================================
    function showNextStep() {
        const humorHTML = `
            <div class="content investigation">
                <div class="status">
                    ● АНАЛИЗ ЮМОРА
                </div>
                
                <div class="case-number">
                    СИСТЕМНЫЙ ЛОГ #42
                </div>
                
                <h2 class="case-title">
                    ВНУТРЕННИЕ ШУТКИ
                </h2>
                
                <div class="humor-container">
                    <div class="humor-box">
                        <div class="humor-icon">🍺</div>
                        <div class="humor-text">
                            <span class="percent">87%</span> шуток связаны с пивом
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 87%"></div>
                        </div>
                    </div>
                    
                    <div class="humor-box">
                        <div class="humor-icon">🤖</div>
                        <div class="humor-text">
                            <span class="percent">53%</span> юмора — НЕСМЕШНО
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 53%"></div>
                        </div>
                    </div>
                    
                    <div class="humor-box warning-box">
                        <div class="humor-icon">⚠️</div>
                        <div class="humor-text">
                            <span class="percent">99%</span> вероятность, наличия рассизма
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill error" style="width: 99%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="system-message">
                    <span class="blink">⎯⎯</span> СИСТЕМА ПЫТАЕТСЯ ПОНЯТЬ ЮМОР <span class="blink">⎯⎯</span>
                </div>
                
                <div class="quote-box">
                    <p class="quote-text">
                        «ОТВЕЧАЮ ПОДКИНУЛИ»
                    </p>
                    <p class="quote-author">
                        — Багира, 2026
                    </p>
                </div>
                
                <button class="nextButton" id="finalButton">
                    ПРОДОЛЖИТЬ →
                </button>
            </div>
        `;
        
        heroSection.innerHTML = humorHTML;
        addHumorStyles();
        
        const content = document.querySelector('.investigation');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
                content.style.transition = 'all 0.6s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        }
        
        document.getElementById('finalButton').addEventListener('click', function() {
            showFinalScreen();
        });
    }
    
    // ====================================
    // СТИЛИ ДЛЯ ЮМОРА
    // ====================================
    function addHumorStyles() {
        if (document.getElementById('humorStyles')) return;
        
        const styles = `
            .humor-container { margin: 25px 0; }
            
            .humor-box {
                background: rgba(0, 255, 65, 0.03);
                border: 1px solid rgba(0, 255, 65, 0.1);
                padding: 15px 20px;
                margin: 12px 0;
                border-radius: 5px;
            }
            
            .humor-box.warning-box {
                border-color: rgba(255, 107, 0, 0.3);
                background: rgba(255, 107, 0, 0.05);
            }
            
            .humor-icon { font-size: 28px; margin-right: 15px; display: inline-block; }
            .humor-text { color: #00ff41; font-size: clamp(14px, 1.5vw, 18px); display: inline-block; }
            .percent { font-weight: 700; font-size: clamp(18px, 2vw, 24px); }
            .warning-box .percent { color: #ff6b00; }
            
            .progress-bar {
                width: 100%;
                height: 4px;
                background: rgba(0, 255, 65, 0.1);
                border-radius: 2px;
                margin-top: 6px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: #00ff41;
                border-radius: 2px;
                transition: width 1s ease;
            }
            
            .progress-fill.error {
                background: #ff6b00;
                animation: pulseError 1s ease-in-out infinite;
            }
            
            @keyframes pulseError {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .system-message {
                text-align: center;
                color: #006b1e;
                font-size: 12px;
                letter-spacing: 2px;
                margin: 25px 0 20px 0;
                padding: 10px;
                border-top: 1px solid rgba(0, 255, 65, 0.05);
                border-bottom: 1px solid rgba(0, 255, 65, 0.05);
            }
            
            .blink { animation: blinkText 1.5s step-end infinite; }
            
            @keyframes blinkText {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .quote-box {
                background: rgba(0, 255, 65, 0.02);
                border-left: 3px solid #00ff41;
                padding: 20px 25px;
                margin: 20px 0 30px 0;
                border-radius: 3px;
            }
            
            .quote-text {
                color: #00ff41;
                font-size: clamp(16px, 2vw, 22px);
                font-style: italic;
                line-height: 1.6;
            }
            
            .quote-author {
                color: #006b1e;
                font-size: 13px;
                margin-top: 8px;
                letter-spacing: 1px;
                text-align: right;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'humorStyles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    // ====================================
    // ФИНАЛЬНЫЙ ЭКРАН
    // ====================================
   function showFinalScreen() {
    const finalHTML = `
        <div class="content final">
            <div class="status warning-status">
                ⚠ ВНИМАНИЕ
            </div>
            
            <div class="final-message">
                <p class="final-text">
                    Вы дошли до конца.
                </p>
                <p class="final-text">
                    Теперь вы знаете слишком много.
                </p>
                   </p>
               <p class="final-text">
                    Водка-пиво, водка-пиво. Вот такой карпаративо.
                </p>
                <p class="final-text danger">
                    Вернуться назад уже нельзя.
                </p>
             
            </div>
            
            <!-- БЛОК С ФОТО И НАДПИСЬЮ "ТИГРЫ" -->
            <div class="final-tiger">
                <img src="negr_photo.jpg" alt="Багира" class="final-tiger-photo">
                <span class="final-tiger-text">ПОМОГИТЕ</span>
            </div>
            
            <button class="dangerButton" id="dangerButton">
                Нажми если ты пиво или негр
            </button>

            <button class="homeButton" id="homeButton">
     НА ГЛАВНУЮ
</button>
        </div>
    `;
    
    heroSection.innerHTML = finalHTML;
    addFinalStyles();
    
    const content = document.querySelector('.final');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'scale(0.95)';
        setTimeout(() => {
            content.style.transition = 'all 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 100);
    }
    
    document.getElementById('dangerButton').addEventListener('click', function() {
        document.querySelector('.hero').style.animation = 'shake 0.5s ease';
        createConfetti();
        
        
        this.textContent = 'ВТФААА, ПЕПЕ ';
        this.style.background = 'rgba(0, 255, 65, 0.2)';
        this.style.borderColor = '#00ff41';
        this.style.color = '#00ff41';
        
        const footer = document.createElement('p');
        footer.style.cssText = `
            color: #006b1e;
            font-size: 11px;
            margin-top: 20px;
            letter-spacing: 1px;
            text-align: center;
        `;
        footer.textContent = 'Сайт создан исключительно в научных целях.';
        document.querySelector('.final').appendChild(footer);
        
        setTimeout(() => {
            document.querySelector('.hero').style.animation = '';
        }, 2000);
    });

    document.getElementById('homeButton').addEventListener('click', function() {
    location.reload();  // Просто перезагружает страницу на главный экран

    
});
    
}
    // ====================================
    // КОНФЕТТИ
    // ====================================
    function createConfetti() {
        const colors = ['#00ff41', '#ff6b00', '#ff00ff', '#00ffff', '#ffff00'];
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        
        for (let i = 0; i < 80; i++) {
            const piece = document.createElement('div');
            const size = 6 + Math.random() * 8;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            piece.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size * 1.6}px;
                background: ${color};
                left: ${Math.random() * 100}%;
                top: -10px;
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
                border-radius: 2px;
            `;
            container.appendChild(piece);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10% { transform: translateX(-10px) rotate(-1deg); }
                20% { transform: translateX(10px) rotate(1deg); }
                30% { transform: translateX(-10px); }
                40% { transform: translateX(10px); }
                50% { transform: translateX(-5px); }
                60% { transform: translateX(5px); }
                70% { transform: translateX(-5px); }
                80% { transform: translateX(5px); }
                90% { transform: translateX(-2px); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            container.remove();
            style.remove();
        }, 5000);
    }
    
    // ====================================
    // СТИЛИ ДЛЯ ФИНАЛА
    // ====================================
    function addFinalStyles() {
        if (document.getElementById('finalStyles')) return;
        
        const styles = `
            .final {
                max-width: 700px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            
            .warning-status {
                color: #ff6b00 !important;
                border-color: rgba(255, 107, 0, 0.3) !important;
                background: rgba(255, 107, 0, 0.05) !important;
            }
            
            .warning-status::before {
                background: #ff6b00 !important;
            }
            
            .final-message { margin: 40px 0; }
            
            .final-text {
                font-size: clamp(18px, 2.5vw, 28px);
                color: #00ff41;
                margin: 15px 0;
                line-height: 1.6;
            }
            
            .final-text.danger {
                color: #ff6b00;
                text-shadow: 0 0 30px rgba(255, 107, 0, 0.2);
            }
            
            .dangerButton {
                font-family: 'Courier New', monospace;
                font-size: clamp(18px, 2vw, 24px);
                font-weight: 700;
                letter-spacing: 3px;
                padding: 20px 60px;
                background: rgba(255, 0, 0, 0.1);
                color: #ff0000;
                border: 2px solid #ff0000;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                margin-top: 20px;
            }
            
            .dangerButton:hover {
                background: rgba(255, 0, 0, 0.2);
                box-shadow: 0 0 40px rgba(255, 0, 0, 0.3);
                transform: scale(1.05);
            }
            
            .dangerButton:active { transform: scale(0.95); }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'finalStyles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    // ====================================
    // БИОГРАФИЯ
    // ====================================
    function showBiography() {
        const bioHTML = `
            <div class="content biography">
                <div class="status">
                    ● ЛИЧНОЕ ДЕЛО
                </div>
                
                <div class="bio-header">
    <div class="bio-avatar-container">
        <img src="bagira-photo.jpg" alt="Багира" class="bio-avatar">
    </div>
    
    <div class="bio-name">
        <h2 class="bio-title">БАГИРА</h2>
        <p class="bio-alias">она же ЕВА</p>
    </div>
</div>
                
                <div class="bio-content">
                    <div class="bio-section">
                        <h3 class="bio-section-title">📌 ОСНОВНАЯ ИНФОРМАЦИЯ</h3>
                        <ul class="bio-list">
                            <li><span class="bio-label">Статус:</span> <span class="bio-value">Активна</span></li>
                            <li><span class="bio-label">Роль:</span> <span class="bio-value">Мужененавистница</span></li>
                            <li><span class="bio-label">Любимый напиток:</span> <span class="bio-value">Пиво 🍺</span></li>
                            <li><span class="bio-label">Ненависть к неграм:</span> <span class="bio-value">Паводки еврейки</span></li>
                        </ul>
                    </div>
                    
                    <div class="bio-section">
                        <h3 class="bio-section-title">📝 ОПИСАНИЕ</h3>
                        <p class="bio-description">
                            Багира — загадочная личность, известная своим абсурдным чувством юмора 
                            и любовью к пиву. Утверждает, что "НЕГРЫ ЗЛО", но спустя 20 минут 
                            лежит пьяной где то на скамейке. Обладает способностью есть шашлык, будто его хочет только она.
                        </p>
                        <p class="bio-description">
                            Внутренние шутки и расистские приколы — её конёк. Однако, как утверждают 
                            свидетели, это "настолько тупо, что уже смешно".
                        </p>
                    </div>
                    
                    <div class="bio-section">
                        <h3 class="bio-section-title">🎯 ХАРАКТЕРИСТИКИ</h3>
                        <div class="bio-stats">
                            <div class="bio-stat">
                                <span class="stat-label">Рассизм</span>
                                <div class="stat-bar"><div class="stat-fill" style="width: 95%"></div></div>
                                <span class="stat-value">95%</span>
                            </div>
                            <div class="bio-stat">
                                <span class="stat-label">Странность</span>
                                <div class="stat-bar"><div class="stat-fill" style="width: 50%"></div></div>
                                <span class="stat-value">50%</span>
                            </div>
                            <div class="bio-stat">
                                <span class="stat-label">Опасность</span>
                                <div class="stat-bar"><div class="stat-fill danger-stat" style="width: 5%"></div></div>
                                <span class="stat-value">5%</span>
                            </div>
                            <div class="bio-stat">
                                <span class="stat-label">Опасность по пьяне</span>
                                <div class="stat-bar"><div class="stat-fill danger-stat" style="width: 97%"></div></div>
                                <span class="stat-value">97%</span>
                            </div>
                            <div class="bio-stat">
                                <span class="stat-label">Любовь к пиву</span>
                                <div class="stat-bar"><div class="stat-fill" style="width: 100%"></div></div>
                                <span class="stat-value">∞</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bio-section">
                        <h3 class="bio-section-title">🔍 ИЗВЕСТНЫЕ ЦИТАТЫ</h3>
                        <div class="bio-quotes">
                            <div class="bio-quote">
                                <span class="quote-mark">"</span>
                                ХАХАХАХАХАХАХААХАХХ.
                                <span class="quote-mark">"</span>
                                <span class="quote-context">— после стремной шутки</span>
                            </div>
                            <div class="bio-quote">
                                <span class="quote-mark">"</span>
                                Это настолько тупо, что уже смешно.
                                <span class="quote-mark">"</span>
                                <span class="quote-context">— описание собственного юмора</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="backButton" id="backButton">
                    ← ВЕРНУТЬСЯ
                </button>
            </div>
        `;
        
        heroSection.innerHTML = bioHTML;
        addBiographyStyles();
        
        const content = document.querySelector('.biography');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
                content.style.transition = 'all 0.6s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        }
        
        document.getElementById('backButton').addEventListener('click', function() {
            location.reload();
        });
    }
    
    // ====================================
    // СТИЛИ ДЛЯ БИОГРАФИИ
    // ====================================
    function addBiographyStyles() {
        if (document.getElementById('bioStyles')) return;
        
        const styles = `
            .biography {
                max-width: 700px;
                margin: 0 auto;
                padding: 20px;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .biography::-webkit-scrollbar { width: 4px; }
            .biography::-webkit-scrollbar-track { background: rgba(0, 255, 65, 0.05); }
            .biography::-webkit-scrollbar-thumb { background: #00ff41; border-radius: 2px; }
            
            .bio-header {
                display: flex;
                align-items: center;
                gap: 25px;
                margin: 20px 0 30px 0;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(0, 255, 65, 0.1);
            }
            
            .bio-avatar-container { flex-shrink: 0; }
            
            .bio-avatar-placeholder {
                width: 120px;
                height: 120px;
                border: 2px solid #00ff41;
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(0, 255, 65, 0.03);
                transition: all 0.3s ease;
            }
            
            .bio-avatar-placeholder:hover {
                border-color: #ff6b00;
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.1);
            }
            
            .avatar-icon { font-size: 48px; }
            .avatar-hint { color: #006b1e; font-size: 9px; margin-top: 5px; letter-spacing: 1px; }
            .bio-name { flex: 1; }
            
            .bio-title {
                font-size: clamp(32px, 5vw, 48px);
                color: #00ff41;
                text-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
                letter-spacing: 4px;
                margin: 0;
            }
            
            .bio-alias { color: #006b1e; font-size: 14px; letter-spacing: 3px; margin-top: 5px; }
            
            .bio-section {
                margin: 25px 0;
                background: rgba(0, 255, 65, 0.02);
                border: 1px solid rgba(0, 255, 65, 0.05);
                border-radius: 8px;
                padding: 20px;
            }
            
            .bio-section-title {
                color: #00ff41;
                font-size: 14px;
                letter-spacing: 2px;
                margin-bottom: 15px;
                font-weight: 300;
            }
            
            .bio-list { list-style: none; padding: 0; margin: 0; }
            
            .bio-list li {
                padding: 8px 0;
                border-bottom: 1px solid rgba(0, 255, 65, 0.05);
                font-size: clamp(14px, 1.2vw, 16px);
            }
            
            .bio-list li:last-child { border-bottom: none; }
            .bio-label { color: #006b1e; margin-right: 10px; }
            .bio-value { color: #00ff41; }
            
            .bio-description {
                color: #00cc33;
                line-height: 1.8;
                margin: 10px 0;
                font-size: clamp(14px, 1.2vw, 16px);
            }
            
            .bio-stats { display: flex; flex-direction: column; gap: 12px; }
            
            .bio-stat {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .stat-label {
                color: #006b1e;
                font-size: 13px;
                min-width: 120px;
                letter-spacing: 1px;
            }
            
            .stat-bar {
                flex: 1;
                height: 4px;
                background: rgba(0, 255, 65, 0.1);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .stat-fill {
                height: 100%;
                background: #00ff41;
                border-radius: 2px;
                transition: width 1s ease;
            }
            
            .stat-fill.danger-stat { background: #ff6b00; }
            .stat-value { color: #00ff41; font-size: 13px; min-width: 30px; text-align: right; }
            
            .bio-quotes { display: flex; flex-direction: column; gap: 15px; }
            
            .bio-quote {
                color: #00ff41;
                font-size: clamp(16px, 1.5vw, 20px);
                font-style: italic;
                padding: 10px 15px;
                background: rgba(0, 255, 65, 0.03);
                border-radius: 5px;
                line-height: 1.6;
            }
            
            .quote-mark { color: #006b1e; font-size: 24px; margin: 0 3px; }
            
            .quote-context {
                display: block;
                color: #006b1e;
                font-size: 12px;
                font-style: normal;
                margin-top: 5px;
                letter-spacing: 1px;
            }
            
            .backButton {
                font-family: 'Courier New', monospace;
                font-size: clamp(14px, 1.5vw, 18px);
                font-weight: 700;
                letter-spacing: 2px;
                padding: 12px 35px;
                background: transparent;
                color: #006b1e;
                border: 1px solid #006b1e;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                margin-top: 20px;
                width: 100%;
            }
            
            .backButton:hover {
                background: rgba(0, 107, 30, 0.1);
                color: #00ff41;
                border-color: #00ff41;
            }
            
            @media (max-width: 600px) {
                .bio-header {
                    flex-direction: column;
                    text-align: center;
                }
                
                .bio-avatar-placeholder {
                    width: 100px;
                    height: 100px;
                }
                
                .avatar-icon { font-size: 36px; }
                .stat-label { min-width: 80px; font-size: 11px; }
                .bio-section { padding: 15px; }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'bioStyles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    console.log('✅ BAGIRA.EXE готов к работе!');
});