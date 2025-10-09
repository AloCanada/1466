/**
 * Page Load Text Scramble Effect
 * Creates a hacker-style text scrambling animation on page load
 */

// Configuration constants
const CONFIG = {
  MOBILE_BREAKPOINT: 720,
  ANIMATION_SPEED: 50, // milliseconds (increased from 15)
  ITERATION_INCREMENT: 1 / 3, // decreased from 1/3 to make it slower
  ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

/**
 * Handle the text scrambling animation
 * @param {HTMLElement} target - The target element to animate
 */
function scrambleText(target) {
  const originalText = target.dataset.value || target.textContent;
  
  if (!originalText) {
    console.warn('Element missing text content:', target);
    return;
  }
  
  let iteration = 0;
  
  const animationInterval = setInterval(() => {
    // Generate scrambled text
    const scrambledText = originalText
      .split("")
      .map((letter, index) => {
        // Show correct letters up to current iteration
        if (index < iteration) {
          return originalText[index];
        }
        // Show random letter for remaining positions
        return CONFIG.ALPHABET[Math.floor(Math.random() * CONFIG.ALPHABET.length)];
      })
      .join("");
    
    target.textContent = scrambledText;
    
    // Complete animation when all letters are revealed
    if (iteration >= originalText.length) {
      clearInterval(animationInterval);
    }
    
    iteration += CONFIG.ITERATION_INCREMENT;
  }, CONFIG.ANIMATION_SPEED);
}

/**
 * Initialize one-time page load animations
 */
function initPageLoadAnimations() {
  const elementsToAnimate = [
    { selector: '#main-title', delay: 0 },
    { selector: '#main-projects-title', delay: 300 },
    { selector: '.footer-link span', delay: 600, sequential: true }
  ];

  elementsToAnimate.forEach(({ selector, delay, sequential }) => {
    setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      
      if (sequential) {
        // For footer links: animate from left to right with stagger
        elements.forEach((element, index) => {
          const elementDelay = index * 300; // 200ms between each footer link
          setTimeout(() => {
            scrambleText(element);
          }, elementDelay);
        });
      } else {
        // For single elements: animate immediately
        elements.forEach((element) => {
          scrambleText(element);
        });
      }
    }, delay);
  });
}

/**
 * Apply mobile-specific adjustments
 */
function handleMobileAdjustments() {
  if (window.innerWidth < CONFIG.MOBILE_BREAKPOINT) {
    document.body.classList.add('mobile-layout');
  } else {
    document.body.classList.remove('mobile-layout');
  }
}

/**
 * Initialize all functionality when DOM is loaded
 */
function init() {
  try {
    handleMobileAdjustments();
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleMobileAdjustments);
    
  } catch (error) {
    console.error('Error initializing page:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Initialize animations when page is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    initPageLoadAnimations();
  }, 500); // Wait 500ms after page load to ensure everything is rendered
});
