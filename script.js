const apiKey = "090f6fa5e66cebf54991719e7d2837e5";

// Function to fetch and display weather
const fetch_weather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Update temperature
    document.querySelector(".weather-info h1").textContent = `${data.main.temp}°C`;

    // Update description
    document.querySelector(".description").textContent = data.weather[0].description;

    // Update details
    document.querySelector(".details .box:nth-child(1) strong").textContent = data.main.feels_like;
    document.querySelector(".details .box:nth-child(2) strong").textContent = `${data.main.humidity}%`;
    document.querySelector(".details .box:nth-child(3) strong").textContent = `${data.wind.speed} m/s`;

    // Update icon dynamically
    const iconCode = data.weather[0].icon;
    document.querySelector(".weather-info img").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  } catch (error) {
    document.querySelector(".weather-info h1").textContent = "N/A";
    document.querySelector(".description").textContent = "City not found";
    document.querySelector(".details .box:nth-child(1) strong").textContent = "-";
    document.querySelector(".details .box:nth-child(2) strong").textContent = "-";
    document.querySelector(".details .box:nth-child(3) strong").textContent = "-";
    document.querySelector(".weather-info img").src = "https://img.icons8.com/ios-filled/50/cloud.png";
  }
};

// Load default city on page load
fetch_weather("Lucknow");

// Search button click
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city !== "") {
    fetch_weather(city);
  }
});

// Allow pressing Enter key for search
document.getElementById("cityInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = document.getElementById("cityInput").value.trim();
    if (city !== "") {
      fetch_weather(city);
    }
  }
});
