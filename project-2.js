const apiKey = 'f50c6b0828915e68f3b14d6432cecb48';
// it is the api key which said the sever the api call is legit

const loadingSpinner = document.getElementById('loading-spinner');
const locationUI = document.getElementById('location-ui');
const weatherUI = document.getElementById('weather-ui');
const searchUI = document.getElementById('search-ui');
const locationBtn = document.getElementById('location-btn');
const backBtn = document.getElementById('back-btn');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const searchCityBtn = document.getElementById('search-city-btn');
const backSearchBtn = document.getElementById('back-search-btn');
// import default element from html syntax

async function fetchWeather(city) {
  // declear a async function 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  // it is a api request for connecting the server
  try {
    const response = await fetch(url);
    // it is used for fetch the the api 
    // await is used for stop the exacuation before the api fetching not Completed
    const data = await response.json();
    // it is used for covert the http request to json format
    // await is used for stop the program exacuation before the http request converted into the json format
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // if the any error is face then print error fetching weather data
    return null;
    // if everything is fine then return nothing
  }
}

function hideAllUI() {
  // create a new function for hiding the unnecessary ui
  [loadingSpinner, locationUI, weatherUI, searchUI].forEach(ui => {
    // these are the ui for each loop is used for checking the data once in a time
    ui.classList.remove('show');
    // it is a css element removed by this command and change the opacity of extra element into zero
    setTimeout(() => ui.style.display = 'none', 500);
    // it is time period of half milisecond in which the extra function is hide
  });
}

function showUI(element) {
  hideAllUI();
  // create a function for show the ui those we hide at the that time
  setTimeout(() => {
    element.style.display = 'block';
    // it is used for display the perticular portion of the ui and used the css property block display word used for showing 
    setTimeout(() => element.classList.add('show'), 50);
    // and take again time 50 milisecond to show the perticular ui and used the css propery show and add for display
  }, 600);
  // to the extar ui time is 600 ms
}

// Initial loading
window.addEventListener('load', () => {
  // add the load event listner in the in the open window it is used for the loading icon
  hideAllUI();
  // for hiding the all ui when the loading icon is loaded 
  loadingSpinner.style.display = 'flex';
  // it is used for display the loading icon and flex is used for visibilty of the icon is clear and good looking
  setTimeout(() => {
    showUI(locationUI);
    // after the 2 sec now the user interface page
  }, 2000);
  // 2sec
});

// Allow location button clicked
locationBtn.addEventListener('click', () => {
  // add a click event listner on the locationBtn
  showUI(loadingSpinner);
  // now show the loading icon
  setTimeout(() => {
    // it required a time interval for checking some faculty
    if (navigator.geolocation) {
      // if the web browser supports the location action then exacute extra
      navigator.geolocation.getCurrentPosition(async (position) => {
        // it asked the user to allow the loaction  access
        // it is a async function
        const lat = position.coords.latitude;
        // find the user latitude position
        const lon = position.coords.longitude;
        // find the user longitude position
        const weatherData = await fetchWeatherByCoordinates(lat, lon);
        // fetch the weather data by its coordinate i.e latitude & longitude
        // await funtion is used for stop the exacution until the fetching is not completed
        if (weatherData) {
          // if the data is successfully fitched
          document.getElementById('city-name').textContent = weatherData.name;
          document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
          document.getElementById('condition').textContent = weatherData.weather[0].description;
          // import the data from the html syntax
          showUI(weatherUI);
          // now show the data and the webpage is ready
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      // if the browser not supported the geolocation then print this error is coming 
    }
  }, 2000);
  // for the check it takes only 2 sec
});


// Fetch weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
  // create a function and pass 2 parameter latitude & longitude in it 
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  // create a api url by using the latitude & longitude value and the default api key
  try {
    const response = await fetch(url);
    // now fetch the api call
    // await is used for stop the exacuation until the fetching of the api
    const data = await response.json();
  //  now converted the into the json format
  // await is used for stop the exacuation until it not converted into json format
    return data;
    // return the data
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    // if any error is coming then print this 
    return null;
    // if everything is fine then print nothing
  }
}

// Search city weather
searchBtn.addEventListener('click', async () => {
  // add a click event listner into the searchBtn
  const city = searchBar.value.trim();
  // takes the input from the user in the searchBar 
  // and trim is used for remove the unnecessary space from start and end position
  if (city) {
    // if the city input is not empty then start another exacuation
    showUI(loadingSpinner);
    // now show the loading icon 
    setTimeout(async () => {
      // add a break of small time and allowing the loading icon to show
      const weatherData = await fetchWeather(city);
      // and fetch the city name and await is used for stop the exacuation until the city name is not fitched
      if (weatherData) {
        // if the weather data is fitched successfully
        document.getElementById('city-name').textContent = weatherData.name;
        document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
        document.getElementById('condition').textContent = weatherData.weather[0].description;
        // import this default function from the html syntax
        showUI(weatherUI);
        // now show the ui and remove the loading icon
      } else {
        alert('City not found');
        // if any error is found then print it
      }
    }, 2000);
  }
});

// Search city weather (from search UI)
searchCityBtn.addEventListener('click', async () => {
  // add a click event listner on the searchBar btn
  const city = document.getElementById('city-input').value.trim();
  // get the data or what the user entered
  // and trim is used for remove the unnecessary space from the start and end of the user enterd data 
  if (city) {
    // if is the city name is correct or not empty then start other exacuation
    showUI(loadingSpinner);
    // show the loading spinner until the ui is not complete for showing
    setTimeout(async () => {
      // takes a time for check the other faculty for exacuation
      const weatherData = await fetchWeather(city);
      // fitch the data from the server as per the city name
      // await is used for stop the exacuation until the data is not come the server
      if (weatherData) {
        // if the weatherData is fitched successfully
        document.getElementById('city-name').textContent = weatherData.name;
        document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
        document.getElementById('condition').textContent = weatherData.weather[0].description;
        // import the function from the html syntax
        showUI(weatherUI);
        // now finally show the weatherUI to the user and stop the loading icon
      } else {
        alert('City not found');
        // if any error is found then print this
        return null;
      }
    }, 2000);
  }
});

// Back buttons functionality
backBtn.addEventListener('click', () => {
  // add click event listner on the back btn
  showUI(locationUI);
  // and now show the location access ui
});

backSearchBtn.addEventListener('click', () => {
  // add click event listner on backBtn
  showUI(weatherUI);
  // and now show the current weather ui
});
