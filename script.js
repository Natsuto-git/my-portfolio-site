// グローバル変数
let siteAnimationsStarted = false;

// サイトのメインアニメーションを開始（グローバル関数）
function startSiteAnimations() {
    if (siteAnimationsStarted) return; // 重複実行防止
    siteAnimationsStarted = true;
    
    console.log('Starting site animations'); // デバッグ用
    
    // ヒーローテキストのアニメーション
    animateHeroText();
    
    // ナビゲーションの設定
    setupNavigation();
    
    // スクロールアニメーションの設定
    setupScrollAnimations();
    
    // その他の機能を設定
    setupOtherFeatures();
}

// ローディングスキップ機能（グローバル関数）
function skipLoading() {
    console.log('Skip loading clicked');
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    startSiteAnimations();
}

// シンプルで確実に動作するバージョン
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // デバッグ用
    
    // ローディングスクリーンの制御
    const loadingScreen = document.getElementById('loadingScreen');
    console.log('Loading screen found:', loadingScreen); // デバッグ用
    
    if (loadingScreen) {
        // 2秒後にローディングスクリーンを非表示
        setTimeout(function() {
            console.log('Hiding loading screen'); // デバッグ用
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
            
            // さらに1秒後に完全に非表示
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                startSiteAnimations();
            }, 1000);
        }, 2000);
    } else {
        // ローディングスクリーンがない場合は即座に開始
        startSiteAnimations();
    }
    
    // ヒーローテキストのアニメーション
    function animateHeroText() {
        const chars = document.querySelectorAll('.hero-title .char');
        if (chars.length > 0) {
            chars.forEach(function(char, index) {
                setTimeout(function() {
                    char.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    // ナビゲーションの設定
    function setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        // スクロール時のナビゲーション効果
        window.addEventListener('scroll', function() {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
        
        // ハンバーガーメニューの制御
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // スムーススクロール
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // ハンバーガーメニューを閉じる
                    if (hamburger && navMenu) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    // スムーススクロール
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // スクロールアニメーションの設定
    function setupScrollAnimations() {
        // Intersection Observer for section animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // スキルセクションの場合、スキルバーをアニメート
                    if (entry.target.classList.contains('skills')) {
                        animateSkillBars();
                    }
                    
                    // アバウトセクションの場合、カウンターをアニメート
                    if (entry.target.classList.contains('about')) {
                        animateCounters();
                    }
                    
                    if (entry.target.classList.contains('vision')) {
                        // Visionセクションの特別なアニメーションは既にCSSで処理済み
                    }
                }
            });
        }, observerOptions);
        
        // 全セクションを監視
        const sections = document.querySelectorAll('.section');
        sections.forEach(function(section) {
            observer.observe(section);
        });
    }
    
    // スキルバーのアニメーション
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(function(bar, index) {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                setTimeout(function() {
                    bar.style.width = progress + '%';
                }, index * 200);
            }
        });
    }
    
    // カウンターアニメーション
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(function(counter) {
            const text = counter.textContent;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            if (target > 0) {
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, stepTime);
            }
        });
    }
    
    // その他の機能
    function setupOtherFeatures() {
        // フォームの処理
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.btn-primary');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.textContent = '送信中...';
                    submitBtn.disabled = true;
                    
                    setTimeout(function() {
                        submitBtn.textContent = '送信完了！';
                        submitBtn.style.background = '#22c55e';
                        
                        setTimeout(function() {
                            contactForm.reset();
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 1500);
                }
            });
        }
        
        // テーマ切り替えボタン
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌓';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(45deg, #2563eb, #3b82f6);
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // 簡単なパララックス効果
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const bgElements = document.querySelectorAll('.bg-element');
            
            bgElements.forEach(function(element, index) {
                const speed = 0.3 + (index * 0.1);
                if (element) {
                    element.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
                }
            });
        });
    }
    
    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    console.log('Script initialization complete'); // デバッグ用
});