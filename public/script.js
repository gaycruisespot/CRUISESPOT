// Initialize the map
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

// Toggle menu visibility
document.getElementById('menu-toggle').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
});

// Handle login/signup
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert('Signed up and logged in!');
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert('Logged in!');
    } else {
      alert(err.message);
    }
  }
});
