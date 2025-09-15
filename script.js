// ========================================
//   ENHANCED DONGTUBE STREAMING SCRIPTS
// ========================================

// Enhanced Anime Data with more details
const animeData = [
  {
    id: 1, 
    title: "Overlord Movie 3", 
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9fDI0GaD5RkNRVZDDE86wEfL68tMB2u_zFwAPiRnWxv7yxoxObWNFsTd-&s=10", 
    status: "Ongoing", 
    year: 2024,
    genre: "Action, Fantasy",
    rating: 8.5,
    description: "The epic conclusion of the Overlord movie trilogy featuring Ainz Ooal Gown's ultimate conquest.",
    episodes: [
      {num: 1, src: "https://short.icu/4lZNVHkOJ", title: "The Final Battle Begins"},
      {num: 2, src: "https://www.w3schools.com/html/movie.mp4", title: "Supreme Overlord's Power"}
    ]
  },
  {
    id: 2, 
    title: "Throne of Seal Movie: Electrolux Sub Indo", 
    thumb: "https://static.wikia.nocookie.net/7374f95d-7da1-414e-8dd0-da3fbd832506/scale-to-width/755", 
    status: "Complete", 
    year: 2023,
    genre: "Adventure, Magic",
    rating: 7.8,
    description: "Follow the legendary journey of knights and their divine seals in this epic adventure.",
    episodes: [
      {num: 1, src: "https://ok.ru/videoembed/9975931079346", title: "The Electrolux Awakening"}
    ]
  },
  {
    id: 3, 
    title: "Soul Land Movie: Sword Dao Chen Xin Sub Indo", 
    thumb: "https://static.wikia.nocookie.net/soulland/images/e/e8/Sword_Dao_Chen_Xin_-_Poster.png/revision/latest?cb=20250719054917", 
    status: "Ongoing", 
    year: 2024,
    genre: "Action, Martial Arts",
    rating: 8.2,
    description: "The way of the sword reaches new heights in this Soul Land masterpiece.",
    episodes: [
      {num: 1, src: "https://ok.ru/videoembed/1018966855134", title: "Sword Master's Path"}
    ]
  },
  {
    id: 4, 
    title: "Given Movie 2: Hiiragi Mix Sub Indo",
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTijX0z-blBVBh_kikCsQWp1xXRFozuIsfjtkwYhbaNmg&s=10", 
    status: "Complete", 
    year: 2024,
    genre: "Romance, Music",
    rating: 8.9,
    description: "A heartwarming continuation of the Given series focusing on music and relationships.",
    episodes: [
      {num: 1, src: "https://short.icu/7frPHvDiW", title: "Hiiragi's Melody"}
    ]
  },
  {
    id: 5, 
    title: "Shingeki no Kyojin Movie: Kanketsu-hen – The Last Attack Sub Indo",
    thumb: "https://titipjepang.com/wp-content/uploads/2024/11/BLOG-Attack-on-Titan-The-Last-Attack-scaled.jpg", 
    status: "Complete", 
    year: 2024,
    genre: "Action, Drama",
    rating: 9.2,
    description: "The final chapter of humanity's fight against the titans in this epic conclusion.",
    episodes: [
      {num: 1, src: "https://short.icu/dh6SQbM-9", title: "The Last Attack"}
    ]
  }
];

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  toggle() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.showToast(`Switched to ${newTheme} theme`, 'success');
  }

  bindEvents() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => this.toggle());
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toast-container') || this.createToastContainer();
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }
}

// Animation Utils
class AnimationUtils {
  static observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });

    document.querySelectorAll('.card, .episode').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  static countUp(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  static typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
  }
}

// Enhanced Index Page Controller
class IndexController {
  constructor() {
    this.animeList = document.getElementById('animeList');
    this.searchInput = document.getElementById('searchInput');
    this.filterSelect = document.getElementById('filterSelect');
    this.sortSelect = document.getElementById('sortSelect');
    this.resetBtn = document.getElementById('resetBtn');
    this.skeletonWrapper = document.getElementById('skeletonWrapper');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    this.resultCount = document.getElementById('resultCount');
    this.noResults = document.getElementById('noResults');
    
    this.currentData = [...animeData];
    this.isGridView = true;
    this.isLoading = false;

    if (this.animeList) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.showLoading();
    this.updateStats();
    
    // Simulate loading delay
    setTimeout(() => {
      this.hideLoading();
      this.renderAnimeList(this.currentData);
      AnimationUtils.observeElements();
    }, 1200);
  }

  bindEvents() {
    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener('input', this.debounce(() => {
        this.filterAndSearch();
      }, 300));
    }

    // Filter and sort
    if (this.filterSelect) {
      this.filterSelect.addEventListener('change', () => this.filterAndSearch());
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => this.filterAndSearch());
    }

    // Reset button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // View toggle
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    
    if (gridViewBtn && listViewBtn) {
      gridViewBtn.addEventListener('click', () => this.toggleView('grid'));
      listViewBtn.addEventListener('click', () => this.toggleView('list'));
    }

    // Scroll to top
    this.initScrollToTop();
  }

  showLoading() {
    this.isLoading = true;
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = 'flex';
    }
    if (this.skeletonWrapper) {
      this.renderSkeleton(6);
    }
  }

  hideLoading() {
    this.isLoading = false;
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = 'none';
    }
    if (this.skeletonWrapper) {
      this.skeletonWrapper.innerHTML = '';
    }
  }

  renderSkeleton(count = 6) {
    if (!this.skeletonWrapper) return;
    
    this.skeletonWrapper.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton';
      this.skeletonWrapper.appendChild(skeleton);
    }
  }

  renderAnimeList(data) {
    if (!this.animeList) return;

    this.animeList.innerHTML = '';
    this.updateResultCount(data.length);

    if (data.length === 0) {
      this.showNoResults();
      return;
    }

    this.hideNoResults();

    data.forEach((anime, index) => {
      const card = this.createAnimeCard(anime);
      card.style.animationDelay = `${index * 0.1}s`;
      this.animeList.appendChild(card);
    });

    // Apply view class
    this.animeList.className = this.isGridView ? 'anime-grid' : 'anime-grid list-view';
  }

  createAnimeCard(anime) {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `watch.html?id=${anime.id}`;
    
    const statusClass = anime.status.toLowerCase() === 'ongoing' ? 'status-ongoing' : 'status-complete';
    
    card.innerHTML = `
      <img src="${anime.thumb}" alt="${anime.title}" loading="lazy">
      <div class="info">
        <div class="title">${anime.title}</div>
        <div class="status">
          <span class="status-badge ${statusClass}">${anime.status}</span>
          ${anime.year ? `<span class="year">${anime.year}</span>` : ''}
        </div>
        ${anime.rating ? `<div class="rating">⭐ ${anime.rating}</div>` : ''}
      </div>
    `;

    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    return card;
  }

  filterAndSearch() {
    this.showLoading();
    
    setTimeout(() => {
      const query = this.searchInput?.value.toLowerCase() || '';
      const status = this.filterSelect?.value || 'all';
      const sort = this.sortSelect?.value || 'title';

      let filtered = animeData.filter(anime => {
        const matchesSearch = anime.title.toLowerCase().includes(query) ||
                            anime.genre?.toLowerCase().includes(query);
        const matchesStatus = status === 'all' || anime.status === status;
        return matchesSearch && matchesStatus;
      });

      // Sort data
      filtered = this.sortData(filtered, sort);

      this.currentData = filtered;
      this.hideLoading();
      this.renderAnimeList(filtered);
    }, 500);
  }

  sortData(data, sortBy) {
    switch (sortBy) {
      case 'title':
        return data.sort((a, b) => a.title.localeCompare(b.title));
      case 'status':
        return data.sort((a, b) => a.status.localeCompare(b.status));
      case 'recent':
        return data.sort((a, b) => (b.year || 0) - (a.year || 0));
      default:
        return data;
    }
  }

  resetFilters() {
    if (this.searchInput) this.searchInput.value = '';
    if (this.filterSelect) this.filterSelect.value = 'all';
    if (this.sortSelect) this.sortSelect.value = 'title';
    
    this.currentData = [...animeData];
    this.renderAnimeList(this.currentData);
    
    themeManager.showToast('Filters reset', 'success');
  }

  toggleView(viewType) {
    this.isGridView = viewType === 'grid';
    
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    
    if (gridBtn && listBtn) {
      gridBtn.classList.toggle('active', this.isGridView);
      listBtn.classList.toggle('active', !this.isGridView);
    }
    
    this.renderAnimeList(this.currentData);
  }

  updateResultCount(count) {
    if (this.resultCount) {
      this.resultCount.textContent = count;
    }
  }

  showNoResults() {
    if (this.noResults) {
      this.noResults.style.display = 'block';
    }
  }

  hideNoResults() {
    if (this.noResults) {
      this.noResults.style.display = 'none';
    }
  }

  updateStats() {
    const animeCountEl = document.getElementById('animeCount');
    if (animeCountEl) {
      AnimationUtils.countUp(animeCountEl, animeData.length, 1500);
    }
  }

  initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Enhanced Watch Page Controller
class WatchController {
  constructor() {
    this.videoPlayer = document.getElementById('videoPlayer');
    this.episodesEl = document.getElementById('episodes');
    this.prevBtn = document.getElementById('prevEp');
    this.nextBtn = document.getElementById('nextEp');
    this.animeTitleEl = document.getElementById('animeTitle');
    this.nowPlayingEl = document.getElementById('nowPlaying');
    this.animeDetailsEl = document.getElementById('animeDetails');
    this.episodeCounterEl = document.getElementById('episodeCounter');
    
    this.currentAnime = null;
    this.currentEpisodeIndex = 0;
    this.isEpisodeGridView = true;

    if (this.videoPlayer && this.episodesEl) {
      this.init();
    }
  }

  init() {
    this.loadAnimeData();
    this.bindEvents();
    this.initializePlayer();
  }

  loadAnimeData() {
    const params = new URLSearchParams(window.location.search);
    const animeId = parseInt(params.get('id')) || 1;
    const episodeNum = parseInt(params.get('ep')) || 1;
    
    this.currentAnime = animeData.find(a => a.id === animeId);
    this.currentEpisodeIndex = Math.max(0, episodeNum - 1);

    if (!this.currentAnime) {
      this.showError('Anime not found');
      return;
    }

    this.renderAnimeDetails();
    this.renderEpisodeList();
    this.loadEpisode(this.currentEpisodeIndex);
  }

  renderAnimeDetails() {
    if (!this.currentAnime || !this.animeDetailsEl) return;

    // Update page title
    if (this.animeTitleEl) {
      this.animeTitleEl.textContent = this.currentAnime.title;
      AnimationUtils.typeWriter(this.animeTitleEl, this.currentAnime.title, 100);
    }

    // Update episode counter
    if (this.episodeCounterEl) {
      this.episodeCounterEl.textContent = `(${this.currentAnime.episodes.length} episodes)`;
    }

    // Render details
    const statusClass = this.currentAnime.status.toLowerCase() === 'ongoing' ? 'status-ongoing' : 'status-complete';
    
    this.animeDetailsEl.innerHTML = `
      <img src="${this.currentAnime.thumb}" alt="${this.currentAnime.title}" loading="lazy">
      <div class="title">${this.currentAnime.title}</div>
      <div class="status">
        <span class="status-badge ${statusClass}">${this.currentAnime.status}</span>
      </div>
      ${this.currentAnime.genre ? `<div class="genre">📂 ${this.currentAnime.genre}</div>` : ''}
      ${this.currentAnime.year ? `<div class="year">📅 ${this.currentAnime.year}</div>` : ''}
      ${this.currentAnime.rating ? `<div class="rating">⭐ ${this.currentAnime.rating}/10</div>` : ''}
      ${this.currentAnime.description ? `<div class="description">${this.currentAnime.description}</div>` : ''}
    `;
  }

  renderEpisodeList() {
    if (!this.currentAnime || !this.episodesEl) return;

    this.episodesEl.innerHTML = '';
    
    this.currentAnime.episodes.forEach((episode, index) => {
      const episodeEl = document.createElement('div');
      episodeEl.className = 'episode';
      episodeEl.innerHTML = `
        <div class="ep-number">EP ${episode.num}</div>
        ${episode.title ? `<div class="ep-title">${episode.title}</div>` : ''}
      `;
      
      episodeEl.onclick = () => this.loadEpisode(index);
      this.episodesEl.appendChild(episodeEl);
    });

    // Apply grid/list view
    this.episodesEl.className = this.isEpisodeGridView ? 'episode-grid' : 'episode-list';
  }

  loadEpisode(index) {
    if (!this.currentAnime || index < 0 || index >= this.currentAnime.episodes.length) return;

    this.currentEpisodeIndex = index;
    const episode = this.currentAnime.episodes[index];
    
    // Show loading
    this.showPlayerLoading();
    
    // Update video source
    setTimeout(() => {
      if (this.videoPlayer) {
        this.videoPlayer.src = episode.src;
      }
      
      // Update now playing
      if (this.nowPlayingEl) {
        const title = episode.title || `Episode ${episode.num}`;
        this.nowPlayingEl.textContent = title;
      }
      
      // Update active episode
      this.updateActiveEpisode();
      
      // Update navigation buttons
      this.updateNavigationButtons();
      
      // Update URL
      this.updateURL();
      
      // Hide loading
      this.hidePlayerLoading();
      
      // Scroll to player
      this.videoPlayer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
    }, 1000);
  }

  updateActiveEpisode() {
    document.querySelectorAll('.episode').forEach((el, index) => {
      el.classList.toggle('active', index === this.currentEpisodeIndex);
    });
  }

  updateNavigationButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentEpisodeIndex <= 0;
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentEpisodeIndex >= this.currentAnime.episodes.length - 1;
    }
  }

  updateURL() {
    const newURL = `watch.html?id=${this.currentAnime.id}&ep=${this.currentEpisodeIndex + 1}`;
    window.history.pushState({}, '', newURL);
  }

  showPlayerLoading() {
    const loading = document.getElementById('playerLoading');
    if (loading) {
      loading.style.display = 'flex';
    }
  }

  hidePlayerLoading() {
    const loading = document.getElementById('playerLoading');
    if (loading) {
      loading.style.display = 'none';
    }
  }

  bindEvents() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        if (this.currentEpisodeIndex > 0) {
          this.loadEpisode(this.currentEpisodeIndex - 1);
        }
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        if (this.currentEpisodeIndex < this.currentAnime.episodes.length - 1) {
          this.loadEpisode(this.currentEpisodeIndex + 1);
        }
      });
    }

    // Episode view toggle
    const gridViewBtn = document.getElementById('episodeGridView');
    const listViewBtn = document.getElementById('episodeListView');
    
    if (gridViewBtn && listViewBtn) {
      gridViewBtn.addEventListener('click', () => this.toggleEpisodeView('grid'));
      listViewBtn.addEventListener('click', () => this.toggleEpisodeView('list'));
    }

    // Episode search
    const episodeSearch = document.getElementById('episodeSearch');
    if (episodeSearch) {
      episodeSearch.addEventListener('input', (e) => this.searchEpisodes(e.target.value));
    }

    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Picture-in-Picture
    const pipBtn = document.getElementById('pictureInPicture');
    if (pipBtn) {
      pipBtn.addEventListener('click', () => this.togglePiP());
    }

    // Quick actions
    this.bindQuickActions();

    // Keyboard shortcuts
    this.bindKeyboardShortcuts();
  }

  toggleEpisodeView(viewType) {
    this.isEpisodeGridView = viewType === 'grid';
    
    const gridBtn = document.getElementById('episodeGridView');
    const listBtn = document.getElementById('episodeListView');
    
    if (gridBtn && listBtn) {
      gridBtn.classList.toggle('active', this.isEpisodeGridView);
      listBtn.classList.toggle('active', !this.isEpisodeGridView);
    }
    
    this.renderEpisodeList();
  }

  searchEpisodes(query) {
    const episodes = document.querySelectorAll('.episode');
    episodes.forEach(episode => {
      const text = episode.textContent.toLowerCase();
      const matches = text.includes(query.toLowerCase());
      episode.style.display = matches ? 'block' : 'none';
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.videoPlayer.parentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  togglePiP() {
    if (this.videoPlayer.requestPictureInPicture) {
      this.videoPlayer.requestPictureInPicture();
    }
  }

  bindQuickActions() {
    const favoriteBtn = document.querySelector('.favorite-btn');
    const watchlistBtn = document.querySelector('.watchlist-btn');
    const shareBtn = document.querySelector('.share-btn');

    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        favoriteBtn.classList.toggle('active');
        const isActive = favoriteBtn.classList.contains('active');
        themeManager.showToast(isActive ? 'Added to favorites' : 'Removed from favorites', 'success');
      });
    }

    if (watchlistBtn) {
      watchlistBtn.addEventListener('click', () => {
        watchlistBtn.classList.toggle('active');
        const isActive = watchlistBtn.classList.contains('active');
        themeManager.showToast(isActive ? 'Added to watchlist' : 'Removed from watchlist', 'success');
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: this.currentAnime.title,
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          themeManager.showToast('Link copied to clipboard', 'success');
        }
      });
    }
  }

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Prevent shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (this.currentEpisodeIndex > 0) {
            this.loadEpisode(this.currentEpisodeIndex - 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (this.currentEpisodeIndex < this.currentAnime.episodes.length - 1) {
            this.loadEpisode(this.currentEpisodeIndex + 1);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          this.togglePiP();
          break;
      }
    });
  }

  initializePlayer() {
    // Player overlay functionality
    const overlay = document.getElementById('playerOverlay');
    const customPlayBtn = document.getElementById('customPlayBtn');
    
    if (overlay && customPlayBtn) {
      overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
    }
  }

  showError(message) {
    themeManager.showToast(message, 'error');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  }
}

// Initialize Application
let themeManager;
let indexController;
let watchController;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  themeManager = new ThemeManager();
  
  // Initialize appropriate controller based on page
  if (document.getElementById('animeList')) {
    indexController = new IndexController();
  } else if (document.getElementById('videoPlayer')) {
    watchController = new WatchController();
  }
  
  // Initialize scroll to top for all pages
  initScrollToTop();
});

// Global scroll to top functionality
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}