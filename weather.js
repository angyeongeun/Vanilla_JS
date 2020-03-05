
const weather = document.querySelector(".js-weather");
const API_KEY = "a90fdfaca98889b4006a20dcf7698513";
const COORDS = 'coords';



function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(respon){
     return respon.json();
}).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    const country = json.sys.country;
    weather.innerText = `${temperature}°C   ${place}   ${country}`;
});
    
}


function saveCoors(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoors(coordsObj);
    getWeather(latitude, longitude)
}


function handleGeoError(){
    console.log('cant access geo location');
}


function askForcoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForcoords();
    } else{
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}





function init(){
    loadCoords();

}

init();