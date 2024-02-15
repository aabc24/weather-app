const weatherDisplayItem = document.querySelector(".weather-display-item");
const searchInput = document.querySelector(".weather-search-input > input");
const searchButton = document.querySelector(".weather-search-input > button");
const humidityValue = document.querySelector(".humidity-value");
const windSpeedValue = document.querySelector(".wind-speed-value");

function showError(message) {
  searchInput.classList.add("error");
  searchInput.value = message;
  searchInput.disabled = true;

  setTimeout(() => {
    searchInput.classList.remove("error");
    searchInput.value = "";
    searchInput.disabled = false;
  }, 3000);
}

function displayWeather(data) {
  const {
    weather: [array],
    name,
    sys: { country },
    main: { temp, humidity },
    wind: { speed },
  } = data;

  const imgElement = weatherDisplayItem.querySelector("img");
  const h2Element = weatherDisplayItem.querySelector("h2");
  const smallElement = weatherDisplayItem.querySelector("small");

  imgElement.className = "slideUp";
  h2Element.className = "fadeOut";
  smallElement.className = "fadeOut";
  humidityValue.className = "fadeOut";
  windSpeedValue.className = "fadeOut";

  imgElement.src = `https://openweathermap.org/img/wn/${array.icon}@2x.png`;
  imgElement.alt = `${array.description}`;

  imgElement.onload = function () {
    imgElement.focus();
    imgElement.classList.add("slideDownWithTransition");

    h2Element.innerHTML = `${temp} <sup>°C</sup>`;
    h2Element.focus();
    h2Element.classList.add("fadeIn");

    smallElement.textContent = `${name}, ${country}`;
    smallElement.focus();
    smallElement.classList.add("fadeIn");

    humidityValue.textContent = `${humidity} %`;
    humidityValue.focus();
    humidityValue.classList.add("fadeIn");

    windSpeedValue.textContent = `${speed} m/s`;
    windSpeedValue.focus();
    windSpeedValue.classList.add("fadeIn");
  };
}

async function request(cityName) {
  try {
    const APIKey = "df8f86d456772d814d5448cb596d7dc9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      showError("Ciudad no encontrada");
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.log(error);
    showError("Error de conexión");
  }
}

function search() {
  if (searchInput.value.length === 0) {
    showError("Campo vacío no permitido");
    return;
  }
  let cityName = searchInput.value;
  request(cityName);
}

searchButton.addEventListener("click", search);
