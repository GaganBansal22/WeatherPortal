function changeBackground(wCondition,timeData){
    if(wCondition=="Sunny")
      wCondition="Clear";
    if(!["Clear","Haze","Rain","Thunderstorm"].includes(wCondition))
      wCondition="Haze";
    if((wCondition=="Clear" || wCondition=="Haze") && ((timeData.data.localTime).substring(11,13)>18 || (timeData.data.localTime).substring(11,13)<6))
      wCondition="Night"+wCondition;
    document.body.style.backgroundImage=`url('Images/${wCondition}.jpg')`;
}

function Weatherinfo({data}){
    let wData=data.wData.data,geoData=data.geoData,timeData=data.timeData;
    let wCondition=wData.weather[0].main;
    let needWhiteText=false;
    changeBackground(wCondition,timeData)
    if(wCondition=="Sunny")
      wCondition="Clear";
    if(!["Clear","Haze","Rain","Thunderstorm"].includes(wCondition))
      wCondition="Haze";
    if((wCondition=="Clear" || wCondition=="Haze") && ((timeData.data.localTime).substring(11,13)>18 || (timeData.data.localTime).substring(11,13)<6))
        needWhiteText=true;
    if(wCondition=="Thunderstorm")
      needWhiteText=true;
    return (
        <div className={needWhiteText?"main whitetext":"main"}>
            <h1 className="location">{geoData.data.city}, {geoData.data.countryName}</h1>
            <h2 className="temp">{wData.main.temp} °C</h2>
            <h2 className="mainw">{wData.weather[0].main}</h2>
            <div className="extra">
                <h3 className="mintemp">Min: {wData.main.temp_min} °C</h3>
                <h3 className="maxtemp">Max: {wData.main.temp_max} °C</h3>
                <h3 className="feeltemp">Feels like: {wData.main.feels_like} °C</h3>
                <h3 className="humidity">Humidity: {wData.main.humidity} %</h3>
            </div>
        </div>
    )
}

export default Weatherinfo;