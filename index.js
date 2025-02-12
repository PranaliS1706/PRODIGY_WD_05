let apiKey = "297378783d6d2785b53a590e9db6fb92";//Enter your API key here
let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weather_icon = document.querySelector(".weather-icon");

let cel;

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    const tempCelcius = Math.round(data.main.temp);
    document.querySelector(".temp").innerHTML = tempCelcius + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML = data.main.pressure;

    if (data.weather[0].main === "Clouds") {
      weather_icon.src = "images/clouds.jpg";
    } else if (data.weather[0].main === "Clear") {
      weather_icon.src = "images/clear.jpg";
    } else if (data.weather[0].main === "Rain") {
      weather_icon.src = "images/rain.jpg";
    } else if (data.weather[0].main === "Drizzle") {
      weather_icon.src = "images/drizzle.jpg";
    } else if (data.weather[0].main === "Mist") {
      weather_icon.src = "images/mist.jpg";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".err").style.display = "none";

    cel = tempCelcius;
  } catch (error) {
    document.querySelector(".err").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error(error);
  }
}


searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

document.getElementById("farenheit").addEventListener("click", () => {
  if (cel !== undefined) {
    let fer = Math.floor(cel * 1.8 + 32);
    document.querySelector(".temp").innerHTML = fer + "°F";
  }
});

document.getElementById("celcius").addEventListener("click", () => {
  if (cel !== undefined) {
    document.querySelector(".temp").innerHTML = cel + "°C";
  }
});