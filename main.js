let cityName = document.querySelector(".city-name .date-and-name-deg .name");
let tempDeg = document.querySelector(".city-name .date-and-name-deg .deg");
let mainInput = document.querySelector(".city-weather-information input");
let sendBtn = document.querySelector(".send");
let country = document.querySelector(".info .country .country-name");
let clouds = document.querySelector(".info .clouds img");
let humidity = document.querySelector(".info .humidity .h-level");
let wind = document.querySelector(".info .wind .w-speed");
let wrongName = document.querySelector(".wrong-name");
let detailsDiv = document.querySelector(
  ".container .city-weather-information .details"
);
let statusDiv = document.querySelector(".status .status");
let statusImage = document.querySelector(".status img");
let months = [
  "Jun",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayDate = new Date().getDate();
let monthDate = months[new Date().getMonth()];
let yearDate = new Date().getFullYear();
let dayName = days[new Date().getDay()];
let finalDate = `${dayName}, ${dayDate} ${monthDate} ${yearDate}`;
let mainDate = document.querySelector(".city-name .date-and-name-deg .date");
let wrongRes = document.querySelector(".wrong-name");
let unitSymb = "°C";

const url = `https://api.openweathermap.org/data/2.5/weather?q=casablanca&units=metric&appid=8a744cf02b36eb36f15d2ab883e2d953`;
getApi(url);

sendBtn.onclick = () => {
  let checkedRadio = document.querySelector(
    ".check input[name='unit']:checked"
  );
  let unit = "";
  if (checkedRadio.value === "c") {
    unit = "metric";
    unitSymb = "°C";
  } else if (checkedRadio.value === "f") {
    unit = "imperial";
    unitSymb = "°F";
  } else {
    unit = "kelvin";
    unitSymb = "°K";
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${mainInput.value}&units=${unit}&appid=8a744cf02b36eb36f15d2ab883e2d953`;
  mainInput.value = "";
  country.innerHTML = "";
  clouds.innerHTML = "";
  humidity.innerHTML = "";
  wind.innerHTML = "";
  checkedRadio.checked = false;
  tempDeg.innerHTML = "";
  cityName.innerHTML = "";
  statusDiv.innerHTML = "";
  mainDate.innerHTML = "";
  wrongRes.innerHTML = "";
  getApi(url);
};

function getApi(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      tempDeg.append(`${Math.floor(data.main.temp)}${unitSymb}`);
      cityName.append(data.name);
      detailsDiv.style.backgroundImage = `url(imgs/${data.weather[0].icon}.jpg)`;
      country.append(data.sys.country);
      clouds.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      humidity.append(`${data.main.humidity}%`);
      wind.append(`${data.wind.speed}Km/h`);
      statusDiv.append(data.weather[0].description);
      statusImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      mainDate.append(finalDate);
    })
    .catch(() => {
      statusImage.style.display = "none";
      clouds.style.display = "none";
      wrongRes.innerHTML = "Write a Valid Country/City Name!";
      wrongRes.style.color = "red";
    });
}
