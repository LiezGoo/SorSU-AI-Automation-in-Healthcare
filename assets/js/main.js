(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    
    // Force hide/show chatbot and scroll buttons when menu toggles
    setTimeout(() => {
      const isMenuActive = document.querySelector('body').classList.contains('mobile-nav-active');
      const chatbotButton = document.querySelector('#widgetIcon');
      const scrollButton = document.querySelector('.scroll-top');
      
      if (isMenuActive) {
        // Hide buttons when menu is open
        if (chatbotButton) {
          chatbotButton.style.setProperty('display', 'none', 'important');
          chatbotButton.style.setProperty('visibility', 'hidden', 'important');
          chatbotButton.style.setProperty('opacity', '0', 'important');
          chatbotButton.style.setProperty('pointer-events', 'none', 'important');
        }
        if (scrollButton) {
          scrollButton.style.setProperty('display', 'none', 'important');
          scrollButton.style.setProperty('visibility', 'hidden', 'important');
          scrollButton.style.setProperty('opacity', '0', 'important');
          scrollButton.style.setProperty('pointer-events', 'none', 'important');
        }
      } else {
        // Show buttons when menu is closed
        if (chatbotButton) {
          chatbotButton.style.removeProperty('display');
          chatbotButton.style.removeProperty('visibility');
          chatbotButton.style.removeProperty('opacity');
          chatbotButton.style.removeProperty('pointer-events');
        }
        if (scrollButton) {
          scrollButton.style.removeProperty('display');
          scrollButton.style.removeProperty('visibility');
          scrollButton.style.removeProperty('opacity');
          scrollButton.style.removeProperty('pointer-events');
        }
      }
    }, 50);
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Enhanced Timeline Interactions
   */
  function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add click handlers for better mobile interaction
    timelineItems.forEach((item, index) => {
      const content = item.querySelector('.timeline-content');
      
      // Make timeline items keyboard accessible
      content.setAttribute('tabindex', '0');
      content.setAttribute('role', 'button');
      content.setAttribute('aria-label', `Timeline event ${index + 1}`);
      
      // Add touch-friendly interactions
      let touchStartY = 0;
      let touchEndY = 0;
      
      content.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });
      
      content.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        const touchDistance = Math.abs(touchStartY - touchEndY);
        
        // If it's a tap (not a scroll), add interaction feedback
        if (touchDistance < 10) {
          content.style.transform = 'scale(0.98)';
          setTimeout(() => {
            content.style.transform = '';
          }, 150);
        }
      }, { passive: true });
      
      // Keyboard navigation
      content.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          content.focus();
        }
      });
    });
    
    // Responsive timeline line adjustment
    function adjustTimelineLine() {
      const timelineLine = document.querySelector('.timeline-line');
      const timelineWrapper = document.querySelector('.timeline-wrapper');
      
      if (timelineLine && timelineWrapper) {
        if (window.innerWidth < 768) {
          timelineLine.style.left = '20px';
          timelineLine.style.transform = 'none';
        } else {
          timelineLine.style.left = '50%';
          timelineLine.style.transform = 'translateX(-50%)';
        }
      }
    }
    
    // Adjust on load and resize
    adjustTimelineLine();
    window.addEventListener('resize', adjustTimelineLine);
    
    // Smooth scroll to timeline sections
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Timeline is visible, enhance animations
            entry.target.classList.add('timeline-visible');
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(timelineSection);
    }
  }
  
  // Initialize timeline interactions when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineInteractions);
  } else {
    initTimelineInteractions();
  }

})();