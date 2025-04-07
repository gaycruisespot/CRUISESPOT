const map = L.map('map').setView([51.505, -0.09], 13); // Default view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Check if there's a saved location in localStorage
const savedLocation = JSON.parse(localStorage.getItem('userLocation'));
if (savedLocation) {
  map.setView([savedLocation.lat, savedLocation.lon], 15);
  L.marker([savedLocation.lat, savedLocation.lon]).addTo(map).bindPopup("You are here").openPopup();
} else {
  // If no saved location, get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      map.setView([lat, lon], 15);
      L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();

      // Save the location in localStorage
      localStorage.setItem('userLocation', JSON.stringify({ lat, lon }));
    }, () => {
      console.warn('Location access denied.');
    });
  }
}

// Add event listener for refresh location button
document.getElementById('refreshLocationBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Recenter the map to the new location
      map.setView([lat, lon], 15);
      L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();

      // Optionally update the saved location in localStorage
      localStorage.setItem('userLocation', JSON.stringify({ lat, lon }));
    }, () => {
      console.warn('Location access denied.');
    });
  }
});
