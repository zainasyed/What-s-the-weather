//jshint esversion:
const buttonE1 = document.querySelector("button");
var input = document.getElementById("location");
const locationE1 = document.querySelector(".location");
const infoTxtE1 =   document.querySelector(".infoTxt");
const tempE1 = document.querySelector(".temp");
const imgE1 = document.querySelector(".img");
const humidityE1 =    document.querySelector(".p1");
const windSpeedE1 =    document.querySelector(".p2");
const pressureE1 = document.querySelector(".p3");

input.addEventListener("keydown",function(event){
if(event.keyCode === 13){
getLocation();
}
});

buttonE1.addEventListener("click", e =>{
e.preventDefault();
getLocation();
})

//grabbing location
function getLocation(){
 let cityName = input.value;
 cityName = cityName.charAt(0).toUpperCase()+cityName.slice(1).toLowerCase();
locationE1.innerHTML = '  <i class=" location-icon fas fa-map-marker-alt"></i>'+cityName;
fetchApi(cityName);
}


function fetchApi(cityName){
  const apiKey = "1b63e63b8a6fc8f68c054562265ccd80";
    const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+unit;

  fetch(url)
  .then(response => response.json())
  .then(data =>{
  infoTxtE1.textContent = "";
  const roundOffTemp = Math.round(data.main.temp);
  const degree = '<span>&#176</span>';
   tempE1.innerHTML= roundOffTemp +" " +degree ;
   const icon = data.weather[0].icon;
   imgE1.src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
   const humidity = data.main.humidity;
humidityE1.innerHTML = humidity+"%";
   const windSpeed = data.wind.speed;
windSpeedE1.innerHTML = Math.round((windSpeed*18)/5) +"km/hr";
   const pressure = data.main.pressure;
   pressureE1.innerHTML = pressure+"hPa";
   })
   .catch(() =>{
infoTxtE1.textContent = "Please search for a valid city 😩";
   tempE1.textContent = "";
      humidityE1.textContent= "";
         windSpeedE1.textContent = "";
         pressureE1.textContent = "";
         imgE1.className = "hidden";
         locationE1.textContent = "";
   })
}
