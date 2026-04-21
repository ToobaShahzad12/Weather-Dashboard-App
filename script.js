let history = [];

function getWeather(){

let city = $("#city").val().trim();

if(city === ""){
$("#error").text("City cannot be empty");
return;
}

if(!/^[a-zA-Z ]+$/.test(city)){
$("#error").text("Only letters allowed");
return;
}

$("#error").text("");

fetchWeather(city);
}

function fetchWeather(city){

let apiKey = "b4471f88ddff5a86aa8e3885aebfc613";

$.ajax({

url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
method: "GET",

beforeSend: function(){
$("#weatherCard").removeClass("d-none");
$("#cityName").text("Loading...");
},

success: function(data){

$("#cityName").text(data.name);

$("#temp").text("🌡 Temperature: " + Math.round(data.main.temp) + " °C");

$("#condition").text("☁ Condition: " + data.weather[0].description);

$("#humidity").text("💧 Humidity: " + data.main.humidity + "%");

let date = new Date();
$("#date").text("Updated: " + date.toLocaleString());

updateHistory(city);

},

error: function(){
$("#error").text("City not found or API issue");
$("#weatherCard").addClass("d-none");
}

});

}

function updateHistory(city){

if(!history.includes(city)){
history.unshift(city);
}

if(history.length > 5){
history.pop();
}

let list = "";

history.forEach(c => {
list += `<li class="list-group-item" onclick="selectCity('${c}')">${c}</li>`;
});

$("#history").html(list);
}

function selectCity(city){
$("#city").val(city);
fetchWeather(city);
}

function toggleMode(){

$("body").toggleClass("dark-mode");

if($("body").hasClass("dark-mode")){
$("#modeBtn").text("Light Mode");
}
else{
$("#modeBtn").text("Dark Mode");
}

}