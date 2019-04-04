let places = [];

const getPlacesData = () => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener('load', fileLoads);
  myRequest.addEventListener('error', fileLoadFails);
  myRequest.open('GET', './db/places.json');
  myRequest.send();
};

function fileLoads(){
  const data = JSON.parse(this.responseText);
  places = data.places;
  domStringBuilder(data.places);
};

function fileLoadFails(){
  console.error('oh SHIT');
};

const printToDom = (divId, textToPrint) => {
  let selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

const domStringBuilder = (arrayToPrint) => {
  let domString = '';
  arrayToPrint.forEach((city) => {
    domString +=  `<div class="card">`;
    domString +=    `<h1 class="cityName">${city.cityName}, ${city.cityState}</h1>`;
    domString +=      `<img class="cityImage" src=${city.cityImage}>`;
    domString +=      `<div class="favoriteSection">`
    domString +=        `<h4 class="favoriteTitle">These are my favorites</h4>`
    domString +=        `<p class="favoriteRestaurant">Restaurant: ${city.favoriteRestaurant}<p>`;
    domString +=        `<p class="favoriteBar">Bar: ${city.favoriteBar}<p>`;
    domString +=        `<p class="favoriteHotel">Hotel: ${city.favoriteHotel}<p>`;
    domString +=        `<p class="favoriteTouristSpot">Tourist Spot: ${city.favoriteTouristAttraction}<p>`;
    domString +=      `</div>`
    domString +=  `</div>`;
  });
  printToDom('placeDiv', domString);
};



const init = () => {
  getPlacesData();
  domStringBuilder(places);
};

init();