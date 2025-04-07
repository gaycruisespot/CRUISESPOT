// Initialize the map (add the map setup here, if needed)
const map = L.map('map').setView([51.505, -0.09], 13); // Default view

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

// Toggle menu visibility
document.getElementById('menu-toggle').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show'); // Toggles the visibility
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

// Handle refresh location
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
