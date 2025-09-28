/**
 * Navigation Text Scramble Effect
 * Creates a hacker-style text scrambling animation on navigation links
 */

// Configuration constants
const CONFIG = {
  MOBILE_BREAKPOINT: 720,
  ANIMATION_SPEED: 15, // milliseconds
  ITERATION_INCREMENT: 1 / 3,
  ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

/**
 * Initialize the navigation text scramble effect
 */
function initializeNavigation() {
  const navigationLinks = document.querySelectorAll('.meta-link span');
  
  navigationLinks.forEach(link => {
    setupTextScrambleEffect(link);
  });
}

/**
 * Setup text scramble effect for a navigation link
 * @param {HTMLElement} linkElement - The navigation link element
 */
function setupTextScrambleEffect(linkElement) {
  let animationInterval = null;
  
  linkElement.addEventListener('mouseenter', (event) => {
    handleTextScramble(event.target, animationInterval);
  });
  
  linkElement.addEventListener('mouseleave', () => {
    clearInterval(animationInterval);
  });
}

/**
 * Handle the text scrambling animation
 * @param {HTMLElement} target - The target element to animate
 * @param {number} currentInterval - Current animation interval ID
 */
function handleTextScramble(target, currentInterval) {
  const originalText = target.dataset.value;
  
  if (!originalText) {
    console.warn('Navigation link missing data-value attribute:', target);
    return;
  }
  
  let iteration = 0;
  
  // Clear any existing animation
  clearInterval(currentInterval);
  
  currentInterval = setInterval(() => {
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
      clearInterval(currentInterval);
    }
    
    iteration += CONFIG.ITERATION_INCREMENT;
  }, CONFIG.ANIMATION_SPEED);
}

/**
 * Apply mobile-specific adjustments
 */
function handleMobileAdjustments() {
  if (window.innerWidth < CONFIG.MOBILE_BREAKPOINT) {
    // Mobile-specific adjustments can be added here
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
    initializeNavigation();
    handleMobileAdjustments();
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleMobileAdjustments);
    
  } catch (error) {
    console.error('Error initializing navigation:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
