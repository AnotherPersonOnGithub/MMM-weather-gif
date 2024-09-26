const GIF_URLS = {
  "day-sunny": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzJhYXM4bG1kcWtpdWliczcyNG9uYXFnZ2I0ZnF1YWhrNXc3ZnFvNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RikbM7U71VRuEwLOKO/giphy.gif",
  "day-cloudy": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2h5YTdyMm84bnNyNTUzdnFrdWlvaG5keWl2Y2JtMzZuc2gwMWRlbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/eEZAkBTeZ2f2hr7utS/giphy.gif",
  "cloudy": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnBmZnN0cWs5eDN6M3NpMDRvZ3BwNDY0amM2ZjNmN21zaDlkNHg1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l0jExU1nw7KvVtxudC/giphy.gif",
  "cloudy-windy": "https://media.tenor.com/eolTTvDO5FsAAAAi/asnuvis.gif",
  "showers": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExempreGdnYjdsaTg4Mm11Nm9qMjhvdGtpZGNoZWpzNGViZXV2amtiaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1hMjUSHPlG15Rm26lr/giphy.gif",
  "rain": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGl4Y3htcm5kcW5xeHhneDAzYnFubWY0NWN6dG4yMDJ5YWRtdGlkMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/DaTjaHE7pUIGXcWFtX/giphy.gif",
  "thunderstorm": "https://cdn.pixabay.com/animation/2023/11/11/18/15/18-15-55-407_512.gif",
  "snow": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDc0d3hmdGNrZWNlYXZraXJ6dmp0bmhlbzdnaHhyM2sxdWxyejRjbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/WCsg7smbtM2aKkdpHA/giphy.gif",
  "fog": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODJ4Z2k2NTU2dTYwbWVjNmprMHlxZDZqMmU3ejMydGhmcWhjbXVkZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fqhdKisO8aPdXVZKH4/giphy.gif",
  "night-clear": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjVsenlpZWM1cWxsaHZob3dzajBrcHRhbXFsbG9scmU5Y3hzcG81ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SWdMw5Ilfvse4Cx8IE/giphy.gif",
  "night-cloudy": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWxxd2hybWduaTViaGJxMWJrZXRqbjVwbzBtN3B6dzA1enpnZGx3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vg5iLsW5fzaxKnxoVs/giphy.gif",
  "night-showers": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExempreGdnYjdsaTg4Mm11Nm9qMjhvdGtpZGNoZWpzNGViZXV2amtiaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1hMjUSHPlG15Rm26lr/giphy.gif",
  "night-rain": "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-rain.svg",
  "night-thunderstorm": "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-night-rain.svg",
  "night-snow": "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-snow.svg",
  "night-alt-cloudy-windy": "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg"
};

Module.register("MMM-weather-gif", {
  // Initialize the module.
  start: function () {
    this.loaded = false;
    this.gifElement = document.createElement("img");
    this.gifElement.className = "weather-gif";
    this.gifElement.style.display = "none"; // Hide until GIF is ready

    // Apply alignment based on the config
    this.applyAlignment();
  },

  // Apply alignment based on user configuration in config.js
  applyAlignment: function () {
    const alignment = this.config.alignment || "center"; // Default to 'center'

    switch (alignment) {
      case "left":
        this.gifElement.style.marginLeft = "0";
        this.gifElement.style.marginRight = "auto";
        break;
      case "right":
        this.gifElement.style.marginLeft = "auto";
        this.gifElement.style.marginRight = "0";
        break;
      case "center":
      default:
        this.gifElement.style.marginLeft = "auto";
        this.gifElement.style.marginRight = "auto";
        break;
    }
  },

  // Override notification handler.
  notificationReceived: function (notification, payload) {
    if (notification === "WEATHER_UPDATED" && payload.currentWeather) {
      this.showGifBasedOnWeather(payload.currentWeather);
    }
  },

  // Show GIF based on weather data.
  showGifBasedOnWeather: function (weatherData) {
    const newGifUrl = this.getGifUrlBasedOnWeather(weatherData);

    // Only update if the GIF URL is different to prevent unnecessary updates
    if (this.gifElement.src !== newGifUrl) {
      this.gifElement.onload = () => {
        this.gifElement.style.display = "block"; // Show only after the GIF is fully loaded
        this.loaded = true;
        this.updateDom();
      };
      this.gifElement.src = newGifUrl; // Update the GIF source
    }
  },

  // Logic to determine the URL of the GIF based on weather data.
  getGifUrlBasedOnWeather: function (weatherData) {
    return GIF_URLS[weatherData.weatherType] || "https://pic.funnygifsbox.com/uploads/2015/02/35ab.gif";
  },

  // Override DOM generator.
  getDom: function () {
    if (!this.loaded) {
      return document.createTextNode("Loading...");
    }
    return this.gifElement; // Return the GIF element directly when loaded
  },
});
