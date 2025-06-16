// Simple interactivity
function showAnalytics() {
    alert('Analytics panel would open here with detailed traffic data, charts, and reports.');
}

// Add click handlers for navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Add click handlers for video expand buttons
document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const videoCard = this.closest('.video-card'); // Get the parent video card
        const video = videoCard.querySelector('.traffic-video'); // Find the video element inside

        if (video) { // Check if video element exists
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            } else {
                 // Fallback for browsers that don't support Fullscreen API for videos
                 alert(`Expanding ${videoCard.querySelector('.camera-name').textContent} to full screen view (browser does not support direct video fullscreen via API).`);
            }
        } else {
            const cameraName = this.closest('.video-card').querySelector('.camera-name').textContent;
            alert(`Expanding ${cameraName} to full screen view (no video element found).`);
        }
    });
});

// Add click handlers for video cards
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
        const cameraName = this.querySelector('.camera-name').textContent;
        console.log(`Selected ${cameraName}`);
        // You could add functionality here to open a single view of the selected camera
    });
});

// Simulate real-time updates
function updateStats() {
    const vehicleCountElement = document.querySelector('.stat-item:nth-child(1) .stat-value'); // Target specific stat-value
    const averageSpeedElement = document.querySelector('.stat-item:nth-child(2) .stat-value');
    const trafficDensityElement = document.querySelector('.stat-item:nth-child(3) .stat-value');

    // Update Vehicle Count
    let currentCount = parseInt(vehicleCountElement.textContent);
    let newCount = currentCount + Math.floor(Math.random() * 3) - 1; // Change by -1, 0, or 1
    newCount = Math.max(0, newCount); // Ensure not negative
    vehicleCountElement.textContent = newCount;
    // Add simple trend indicator update (optional)
    const vehicleTrend = document.querySelector('.stat-item:nth-child(1) .stat-trend');
    if (newCount > currentCount) { vehicleTrend.textContent = '↑' + (newCount - currentCount); vehicleTrend.className = 'stat-trend trend-up'; }
    else if (newCount < currentCount) { vehicleTrend.textContent = '↓' + (currentCount - newCount); vehicleTrend.className = 'stat-trend trend-down'; }
    else { vehicleTrend.textContent = ''; vehicleTrend.className = 'stat-trend'; }


    // Update Average Speed (randomly change up/down)
    let currentSpeed = parseInt(averageSpeedElement.textContent);
    let speedChange = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3)); // +/- 0, 1, or 2
    let newSpeed = currentSpeed + speedChange;
    newSpeed = Math.max(20, Math.min(80, newSpeed)); // Keep speed within a reasonable range
    averageSpeedElement.textContent = newSpeed + ' km/h';
    const speedTrend = document.querySelector('.stat-item:nth-child(2) .stat-trend');
     if (speedChange > 0) { speedTrend.textContent = '↑' + speedChange; speedTrend.className = 'stat-trend trend-up'; }
    else if (speedChange < 0) { speedTrend.textContent = '↓' + Math.abs(speedChange); speedTrend.className = 'stat-trend trend-down'; }
    else { speedTrend.textContent = ''; speedTrend.className = 'stat-trend'; }


    // Update Traffic Density (cycle through Low, Medium, High)
    const densities = ['Low', 'Medium', 'High'];
    let currentDensity = trafficDensityElement.textContent;
    let currentIndex = densities.indexOf(currentDensity);
    let nextIndex = (currentIndex + 1) % densities.length;
    trafficDensityElement.textContent = densities[nextIndex];
    const densityTrend = document.querySelector('.stat-item:nth-child(3) .stat-trend');
    // Simplified trend for density
    if (nextIndex > currentIndex) { densityTrend.textContent = '↑'; densityTrend.className = 'stat-trend trend-up'; }
    else if (nextIndex < currentIndex) { densityTrend.textContent = '↓'; densityTrend.className = 'stat-trend trend-down'; }
    else { densityTrend.textContent = ''; densityTrend.className = 'stat-trend'; }
}

// Update stats every 5 seconds
setInterval(updateStats, 5000);

// Add hover effects for interactive elements
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});