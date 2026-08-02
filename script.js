document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       ハンバーガーメニューの開閉
    ========================================= */
    const hamburger = document.getElementById('js-hamburger');
    const navMenu = document.getElementById('js-nav');
    const overlay = document.getElementById('js-overlay');
    const navLinks = navMenu.querySelectorAll('a');

    function toggleMenu() {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
    }

    // ボタンとオーバーレイクリックで開閉
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // メニュー内リンククリックで閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    /* =========================================
       トップスライダー
    ========================================= */
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('js-prev');
    const nextBtn = document.getElementById('js-next');
    
    if (slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 5000; // 5秒

        function showSlide(index) {
            // クラスの付け替え
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function resetSlider() {
            clearInterval(slideInterval);
            startSlider();
        }

        // 手動コントロール
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlider();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlider();
        });

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.getAttribute('data-index'));
                showSlide(currentIndex);
                resetSlider();
            });
        });

        // スライダー開始
        startSlider();
    }

    /* =========================================
       スクロールアニメーション (Intersection Observer)
    ========================================= */
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // クラスを付与してアニメーション実行
                entry.target.classList.add('is-visible');
                // 一度発火したら監視を解除
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

});