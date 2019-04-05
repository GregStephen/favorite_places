let places = [];
const search = document.getElementById("search");
const searchBtn = document.getElementById("seePlaces");
const viewAllBtn = document.getElementById('allPlaces');

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

const seePlacesFunction = () => {
  let searchVal = search.value.toLowerCase();
  console.log("searchVal : ",searchVal);
  domStringBuilder(places, searchVal);
  search.value = "";
};

const domStringBuilder = (arrayToPrint, searchValue) => {
  let domString = '';
  
  arrayToPrint.forEach((city) => {
    const cardBuilder = () => {
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
      return domString;
    };

    if(searchValue === '' || searchValue === undefined){
      console.log("search Value empty");
      domString = cardBuilder();
    } else if (city.cityName.toLowerCase().includes(searchValue) || city.cityState.toLowerCase().includes(searchValue)){
      console.log("search val match city");
      domString = cardBuilder();
    } 
  });

  // if (domString === "") {
  //   console.log("no search domString: ");
  //   let sorryString = ''
  //   sorryString += `<div id="sorry" class="row">`
  //   sorryString += `<h3 class="col-6 offset-3">Sorry, no places match your search!</h3>`;
  //   sorryString += `<h4 class="col-6 offset-3">Please try a new search!</h4>`;
  //   sorryString += `</div>`
  //   printToDom('sorryDiv', sorryString);
  //   console.log("gothere");
  // } 
  printToDom('placeDiv', domString);
  
};

const eventListeners = () => {
  searchBtn.addEventListener('click', seePlacesFunction);
}


const init = () => {
  getPlacesData();
  console.log(search.value.toLowerCase());
  eventListeners();
  seePlacesFunction();
  
};

init();