// script.js — basic weather + Unsplash integration

// NOTE: Keys are present in README for quick testing, but it's safer to move them
// to an ignored `config.js`. See README/update after testing.
const OPENWEATHER_KEY = '41ffba8d9094b8cd66a9718cdd0c4765';
const UNSPLASH_KEY = 'PUcUD6_vuJZZFzyAJsxHQhewNpCSalILmg3bVpHVi1Y';

const form = document.getElementById('search');
const input = document.getElementById('search-tf');
const statusEl = document.getElementById('status');
const cityNameEl = document.getElementById('cityName');
const tempEl = document.getElementById('temp');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const iconEl = document.getElementById('icon');
const photoEl = document.getElementById('photo');
const thumbsEl = document.getElementById('thumbs');
const imageListEl = document.getElementById('image-list');
const creditUserEl = document.getElementById('credit-user');
const creditPlatformEl = document.getElementById('credit-platform');
const btnRandom = document.getElementById('btn-random');
const btnClear = document.getElementById('btn-clear');

let lastImages = [];

function showStatus(msg) {
  if (!statusEl) return;
  statusEl.textContent = msg;
}

function clearWeather() {
  cityNameEl.textContent = '';
  tempEl.textContent = '';
  descEl.textContent = '';
  humidityEl.textContent = '';
  windEl.textContent = '';
  iconEl.src = '';
  iconEl.alt = '';
}

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API error: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

async function fetchImages(query, perPage = 8) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}&per_page=${perPage}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unsplash API error: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

function renderWeather(data) {
  const w = data.weather && data.weather[0];
  cityNameEl.textContent = `${data.name}${data.sys && data.sys.country ? ', ' + data.sys.country : ''}`;
  tempEl.textContent = data.main ? `${Math.round(data.main.temp)}°C` : '';
  descEl.textContent = w ? w.description : '';
  humidityEl.textContent = data.main ? `Humidity: ${data.main.humidity}%` : '';
  windEl.textContent = data.wind ? `Wind: ${data.wind.speed} m/s` : '';
  if (w && w.icon) {
    iconEl.src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
    iconEl.alt = w.description || 'weather icon';
  } else {
    iconEl.src = '';
    iconEl.alt = '';
  }
}

function renderImages(results) {
  lastImages = results || [];
  // clear thumbs and list
  thumbsEl.innerHTML = '';
  imageListEl.innerHTML = '';

  results.forEach((img, idx) => {
    // thumbnail
    const t = document.createElement('button');
    t.className = 'thumb-btn';
    t.style.backgroundImage = `url(${img.urls.thumb})`;
    t.type = 'button';
    t.dataset.index = idx;
    t.title = img.alt_description || img.description || 'photo';
    t.addEventListener('click', () => setMainImage(idx));
    thumbsEl.appendChild(t);

    // list item for credits (or hidden)
    const li = document.createElement('li');
    li.textContent = img.user && img.user.name ? img.user.name : 'Unknown';
    imageListEl.appendChild(li);
  });

  if (results.length) setMainImage(0);
}

function setMainImage(index) {
  const img = lastImages[index];
  if (!img) return;
  // set figure background
  photoEl.style.backgroundImage = `url(${img.urls.regular})`;
  // credits
  if (creditUserEl) {
    creditUserEl.textContent = img.user.name || '';
    creditUserEl.href = img.user.links.html || '#';
  }
  if (creditPlatformEl) {
    creditPlatformEl.textContent = 'Unsplash';
    creditPlatformEl.href = 'https://unsplash.com';
  }
  // mark active thumb
  Array.from(thumbsEl.children).forEach((el, i) => {
    if (i === Number(index)) el.classList.add('active'); else el.classList.remove('active');
  });
}

btnRandom && btnRandom.addEventListener('click', () => {
  if (!lastImages.length) return;
  const idx = Math.floor(Math.random() * lastImages.length);
  setMainImage(idx);
});

btnClear && btnClear.addEventListener('click', () => {
  photoEl.style.backgroundImage = '';
  imageListEl.innerHTML = '';
  thumbsEl.innerHTML = '';
  lastImages = [];
  if (creditUserEl) creditUserEl.textContent = '';
});

form && form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  showStatus('Loading weather...');
  clearWeather();

  try {
    const wData = await fetchWeather(city);
    renderWeather(wData);
    showStatus('Searching images...');

    // choose a query: prefer weather description, fallback to city
    const query = (wData.weather && wData.weather[0] && wData.weather[0].description) ? wData.weather[0].description : city;
    const imgs = await fetchImages(query, 8);
    if (imgs.results && imgs.results.length) {
      renderImages(imgs.results);
      showStatus('');
    } else {
      showStatus('No images found for that description.');
    }
  } catch (err) {
    console.error(err);
    showStatus(err.message || 'An error occurred');
  }
});

// Optional: run default search (e.g., London) on load
window.addEventListener('load', () => {
  const defaultCity = 'London';
  input.value = defaultCity;
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
});
