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