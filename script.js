function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// LeetCode Heatmap Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Fetch LeetCode stats
  fetchLeetCodeStats('vikashrma');
});

async function fetchLeetCodeStats(username) {
  try {
    // Using a proxy service since LeetCode doesn't have an official API
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const data = await response.json();
    
    // Update stats
    document.getElementById('total-solved').textContent = data.totalSolved;
    document.getElementById('easy-solved').textContent = data.easySolved;
    document.getElementById('medium-solved').textContent = data.mediumSolved;
    document.getElementById('hard-solved').textContent = data.hardSolved;
    
    // Initialize heatmap (we'll use mock data since submission calendar isn't in the API)
    initHeatmap();
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    // Fallback to static heatmap if API fails
    initHeatmap();
  }
}

// Loading Screen and Animations
document.addEventListener('DOMContentLoaded', function() {
  // Hide loading screen after animation completes
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 800);
  }, 2500);

  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-progress-bar').style.width = `${scrollProgress}%`;
  });

  // Intersection Observer for section animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });

  // Existing menu toggle function
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  // LeetCode Heatmap Implementation
  async function fetchLeetCodeStats(username) {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();
      
      // Animate stats counting up
      animateValue('total-solved', 0, data.totalSolved, 1000);
      animateValue('easy-solved', 0, data.easySolved, 1000);
      animateValue('medium-solved', 0, data.mediumSolved, 1000);
      animateValue('hard-solved', 0, data.hardSolved, 1000);
      
      initHeatmap();
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
      initHeatmap();
    }
  }

  // Animate number counting up
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function initHeatmap() {
    const cal = new CalHeatmap();
    cal.paint({
      itemSelector: "#leetcode-heatmap",
      domain: {
        type: "year",
        gutter: 10,
        label: { text: "MMM", textAlign: "start", position: "top" },
      },
      subDomain: { type: "day", radius: 2 },
      data: {
        source: generateMockData(),
        type: "json",
        x: "date",
        y: "count",
        groupY: "max",
      },
      date: { start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) },
      scale: {
        color: {
          type: "linear",
          range: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
          domain: [0, 1, 3, 5, 10],
        },
      },
      range: 12,
    });
  }

  function generateMockData() {
    const data = [];
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    
    for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
      if (count > 0) {
        data.push({
          date: d.toISOString().split('T')[0],
          count: count
        });
      }
    }
    return data;
  }

  // Initialize LeetCode stats
  fetchLeetCodeStats('vikashrma');

  // Expose toggleMenu to global scope
  window.toggleMenu = toggleMenu;
});

function initHeatmap() {
  const cal = new CalHeatmap();
  
  cal.paint({
    itemSelector: "#leetcode-heatmap",
    domain: {
      type: "year",
      gutter: 10,
      label: { text: "MMM", textAlign: "start", position: "top" },
    },
    subDomain: { type: "day", radius: 2 },
    data: {
      // This is mock data - in a real implementation you'd need to scrape this
      source: generateMockData(),
      type: "json",
      x: "date",
      y: "count",
      groupY: "max",
    },
    date: { start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) },
    scale: {
      color: {
        type: "linear",
        range: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
        domain: [0, 1, 3, 5, 10],
      },
    },
    range: 12,
  });
}

// Generate mock data for the heatmap
function generateMockData() {
  const data = [];
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  
  for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
    // Random data - replace with actual submission data if available
    const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
    if (count > 0) {
      data.push({
        date: d.toISOString().split('T')[0],
        count: count
      });
    }
  }
  
  return data;
}