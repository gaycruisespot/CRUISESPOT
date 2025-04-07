// Toggle menu visibility
document.getElementById('menu-toggle').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show'); // Toggles the visibility
});

// Initialize map (with Leaflet or another map library)
const map = L.map('map').setView([51.505, -0.09], 13); // Default location (change if needed)

// Add tile layer (OpenStreetMap tiles in this example)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Get user location from browser and center the map there (if allowed)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    map.setView([lat, lon], 15);
    L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();
  }, () => {
    console.warn('Location access denied.');
  });
}

// Handle refresh location button click
document.getElementById('refreshLocationBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      map.setView([lat, lon], 15); // Recenter the map
      L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();
    });
  }
});
