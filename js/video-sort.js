/**
 * Video Sorting and Management System
 * Handles video post sorting by date and title
 */

// Configuration
const CONFIG = {
  ANIMATION_DURATION: 300,
  DATE_FORMAT: 'et-EE'
};

/**
 * Initialize video sorting functionality
 */
function initializeVideoSorting() {
  const sortByDateBtn = document.getElementById('sortByDate');
  const sortByTitleBtn = document.getElementById('sortByTitle');
  
  if (sortByDateBtn) {
    sortByDateBtn.addEventListener('click', () => sortVideos('date'));
  }
  
  if (sortByTitleBtn) {
    sortByTitleBtn.addEventListener('click', () => sortVideos('title'));
  }
  
  // Default sort by date (newest first)
  sortVideos('date');
}

/**
 * Sort videos by specified criteria
 * @param {string} sortBy - Either 'date' or 'title'
 */
function sortVideos(sortBy) {
  const container = document.getElementById('videoContainer');
  if (!container) return;
  
  const videoCards = Array.from(container.querySelectorAll('.video-card'));
  
  // Sort the cards
  videoCards.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
      return dateB - dateA; // Newest first
    } else if (sortBy === 'title') {
      const titleA = a.dataset.title.toLowerCase();
      const titleB = b.dataset.title.toLowerCase();
      return titleA.localeCompare(titleB, 'et');
    }
    return 0;
  });
  
  // Add fade out animation
  container.style.opacity = '0.5';
  container.style.transition = `opacity ${CONFIG.ANIMATION_DURATION}ms ease`;
  
  // Re-append sorted cards after animation
  setTimeout(() => {
    videoCards.forEach(card => {
      container.appendChild(card);
    });
    
    // Fade back in
    container.style.opacity = '1';
    
    // Update active button state
    updateButtonStates(sortBy);
  }, CONFIG.ANIMATION_DURATION);
}

/**
 * Update button visual states
 * @param {string} activeSortType - Current active sort type
 */
function updateButtonStates(activeSortType) {
  const dateBtn = document.getElementById('sortByDate');
  const titleBtn = document.getElementById('sortByTitle');
  
  // Remove active class from both
  [dateBtn, titleBtn].forEach(btn => {
    if (btn) {
      btn.classList.remove('active-sort');
    }
  });
  
  // Add active class to current sort button
  const activeBtn = activeSortType === 'date' ? dateBtn : titleBtn;
  if (activeBtn) {
    activeBtn.classList.add('active-sort');
  }
}

/**
 * Format date for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString(CONFIG.DATE_FORMAT, options);
}

/**
 * Add a new video to the collection
 * @param {Object} videoData - Video data object
 */
function addNewVideo(videoData) {
  const container = document.getElementById('videoContainer');
  if (!container) return;
  
  const videoCard = createVideoCard(videoData);
  container.appendChild(videoCard);
  
  // Re-sort after adding
  const currentSort = document.querySelector('.active-sort')?.id === 'sortByTitle' ? 'title' : 'date';
  sortVideos(currentSort);
}

/**
 * Create a video card element
 * @param {Object} data - Video data
 * @returns {HTMLElement} Video card element
 */
function createVideoCard(data) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.dataset.date = data.date;
  card.dataset.title = data.title;
  
  card.innerHTML = `
    <div class="video-meta">
      <span class="video-date">${formatDate(data.date)}</span>
      <span class="video-platform">${data.platform}</span>
    </div>
    <div class="video-embed">
      ${data.embedCode}
    </div>
    <h3 class="video-subtitle">${data.title}</h3>
    <p class="video-description">${data.description}</p>
  `;
  
  return card;
}

/**
 * Initialize when DOM is ready
 */
function init() {
  try {
    initializeVideoSorting();
  } catch (error) {
    console.error('Error initializing video sorting:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}