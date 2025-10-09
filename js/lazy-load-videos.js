/**
 * Lazy Load Video Embeds
 * Significantly improves page load performance by deferring video loading
 */

class VideoLazyLoader {
  constructor() {
    this.videos = document.querySelectorAll('.video-embed[data-src]');
    this.loadedVideos = new Set();
    this.config = {
      rootMargin: '100px 0px',
      threshold: 0.01
    };
    
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersect.bind(this),
        this.config
      );
      
      this.videos.forEach(video => this.observer.observe(video));
    } else {
      this.loadAllVideos();
    }
    
    // Add click event for manual loading
    this.videos.forEach(video => {
      const placeholder = video.querySelector('.video-placeholder');
      if (placeholder) {
        placeholder.addEventListener('click', () => {
          if (!this.loadedVideos.has(video)) {
            this.loadVideo(video);
            if (this.observer) {
              this.observer.unobserve(video);
            }
          }
        });
      }
    });
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.loadedVideos.has(entry.target)) {
        this.loadVideo(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadVideo(container) {
    // Prevent double-loading
    if (this.loadedVideos.has(container)) {
      return;
    }
    
    // Mark as loaded immediately
    this.loadedVideos.add(container);
    container.classList.add('loading');
    
    const src = container.dataset.src;
    const type = container.dataset.type;
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.loading = 'lazy';
    iframe.style.opacity = '0'; // Start invisible
    
    if (type === 'youtube') {
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.title = 'YouTube video player';
    } else if (type === 'vimeo') {
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write';
      iframe.allowFullscreen = true;
      iframe.title = 'Vimeo video player';
    } else if (type === 'soundcloud') {
      iframe.scrolling = 'no';
      iframe.allow = 'autoplay';
      iframe.title = 'SoundCloud player';
    }
    
    // Wait for iframe to load
    iframe.onload = () => {
      // Fade out placeholder and fade in iframe
      setTimeout(() => {
        iframe.style.opacity = '1';
        container.classList.remove('loading');
        container.classList.add('loaded');
      }, 100);
    };
    
    // Add iframe to container (it goes behind placeholder)
    container.appendChild(iframe);
    
    // Remove data attributes to prevent re-loading
    delete container.dataset.src;
  }

  loadAllVideos() {
    this.videos.forEach(video => {
      if (!this.loadedVideos.has(video)) {
        this.loadVideo(video);
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new VideoLazyLoader());
} else {
  new VideoLazyLoader();
}