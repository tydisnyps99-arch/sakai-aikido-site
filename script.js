document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. ハンバーガーメニュー
    ========================================= */
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');
    const overlay = document.getElementById('js-overlay');

    if (hamburger && nav && overlay) {
        const toggleMenu = () => {
            const isOpen = hamburger.classList.contains('is-active');
            hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            overlay.classList.toggle('is-active');
            hamburger.setAttribute('aria-expanded', !isOpen);
        };

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // メニュー内リンククリックで自動的に閉じる
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-active')) {
                    toggleMenu();
                }
            });
        });
    }

    /* =========================================
       2. トップスライダー (7.5秒間隔 & ズームリセット)
    ========================================= */
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('js-prev');
    const nextBtn = document.getElementById('js-next');

    if (slides.length > 0) {
        let currentIndex = 0;
        let slideInterval = null;
        const INTERVAL_TIME = 7500; // 約7.5秒ごとにゆっくり切替

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });

            currentIndex = index;
        };

        const nextSlide = () => {
            const newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        };

        const prevSlide = () => {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        };

        const startTimer = () => {
            stopTimer();
            slideInterval = setInterval(nextSlide, INTERVAL_TIME);
        };

        const stopTimer = () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };

        // コントロールボタンイベント
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startTimer();
            });
        }

        // インジケータークリックイベント
        indicators.forEach((indicator) => {
            indicator.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
                if (!isNaN(targetIndex)) {
                    showSlide(targetIndex);
                    startTimer();
                }
            });
        });

        // 初期タイマー起動
        startTimer();
    }

    /* =========================================
       3. FAQ アコーディオン機能
    ========================================= */
    const faqToggles = document.querySelectorAll('.js-faq-toggle');

    faqToggles.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-a');
            const isOpen = faqItem.classList.contains('is-open');

            if (isOpen) {
                // 閉じる
                faqItem.classList.remove('is-open');
                button.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                // 開く
                faqItem.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* =========================================
       4. スクロールフェードイン
    ========================================= */
    const fadeElements = document.querySelectorAll('.fade-in-up');

    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // IntersectionObserver非対応ブラウザへのフォールバック
        fadeElements.forEach(el => el.classList.add('is-visible'));
    }
});