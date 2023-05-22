const apikey="3ba8d40c5d769a610cf945293d8de753";
const weatherDataEl=document.getElementById("weather-data");
const cityInputEl=document.getElementById("city-input");
const formEl=document.getElementById("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue=cityInputEl.value;
    getWeatherData(cityValue);
});
async function getWeatherData(cityValue){
    try {
        
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
    if(!response.ok){
        throw new Error("Network response is not ok")
    }
    const data=await response.json()
    console.log(data);
    const temperature=Math.round(data.main.temp);
    const description=data.weather[0].description;
    const icon=data.weather[0].icon;

    const details=[
        `Feels like:${Math.round(data.main.feels_like)}`,
        `Humidity:${data.main.humidity}%`,
        `Wind speed : ${data.wind.speed}m/s`,

    ]
    weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weathericon">`;
    weatherDataEl.querySelector(".temperature").textContent=`${temperature}°C`;
    weatherDataEl.querySelector(".description").innerHTML=description;
    weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");
    } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML="";
    weatherDataEl.querySelector(".temperature").textContent="";
    weatherDataEl.querySelector(".description").innerHTML="An error occurred.";
    weatherDataEl.querySelector(".details").innerHTML="";
    }
}