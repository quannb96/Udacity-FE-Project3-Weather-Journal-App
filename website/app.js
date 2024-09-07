/* Global Variables */
const sample =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code},&appid={API key}";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "c8f0118b0c7f1e67c31dc95fa8a741df&units=imperial" // Personal API Key for OpenWeatherMap API

const userInfo = document.getElementById("userInfo");

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", generateAction);

/* Function called by event listener */
function generateAction(e) {
  e.preventDefault();

  const zipCode = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;

  if (zipCode !== "") {
    getOpenWeatherMapAPI(baseUrl, zipCode, apiKey)
      .then((data) => {
        postData("/add", {
          temp: data.main.temp,
          date: new Date(),
          feel: feel,
        });
      })
      .then(() => {
        retrieveData();
      })
      .catch((error) => {
        console.log(error);
        alert("The ZIP code is invalid. Try again");
      });
    userInfo.reset();
  } else {
    alert("Please enter a ZIP code");
  }
}

/* Function to GET Web API Data*/
const getOpenWeatherMapAPI = async (baseUrl, zipCode, apiKey) => {
  const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
  try {
    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      feel: data.feel,
    }),
  });

  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
