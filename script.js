document.addEventListener('DOMContentLoaded', () => {
    
    // --- ハンバーガーメニュー ---
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');
    const overlay = document.getElementById('js-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function toggleMenu() {
        hamburger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    }

    if(hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // -------------------------
    // 2. スライダー機能（横スライド＋スワイプ対応）
    // -------------------------
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('js-prev');
    const nextBtn = document.getElementById('js-next');
    
    if (slider && slides.length > 0) {
        // 横スライド用のラッパー（トラック）を自動生成
        let track = document.createElement('div');
        track.classList.add('slider-track');
        slides.forEach(slide => track.appendChild(slide));
        slider.appendChild(track);

        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 5000; // 5秒ごとにスライド

        function updateSlider() {
            // 横に移動させる
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            indicators.forEach(ind => ind.classList.remove('active'));
            if(indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function resetSlider() {
            clearInterval(slideInterval);
            startSlider();
        }

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); resetSlider(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetSlider(); });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetSlider();
            });
        });

        // ▼ スマホでのスワイプ（タッチ）操作対応
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(slideInterval); // 触っている間は自動再生ストップ
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            let endX = e.changedTouches[0].clientX;
            let diff = startX - endX;

            // 50px以上指を動かしたらスライドを切り替え
            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            } else {
                updateSlider();
            }
            resetSlider();
        });

        updateSlider();
        startSlider();
    }

    // --- スクロールアニメーション (フェードイン) ---
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });
});

// --- FAQアコーディオン ---
const faqToggles = document.querySelectorAll('.js-faq-toggle');
faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const item = toggle.closest('.faq-item');
        const answer = item.querySelector('.faq-a');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', !isExpanded);
        item.classList.toggle('is-open');

        if (item.classList.contains('is-open')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});