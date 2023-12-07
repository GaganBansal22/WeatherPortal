function AirQuality({data}){
    let aqi=data.aqiData.data.list[0].main.aqi
    let quality="Good"
    if (aqi==5)
        quality="Very Poor"
    else if(aqi==4)
        quality="Poor"
    else if(aqi==3)
        quality="Moderate"
    else if(aqi==2)
        quality="Fair"
    return (
        <div className="airquality">
            <h3>Air quality : 
                <span style={{marginLeft: "2%"}} className={aqi>=4?"redtxt":aqi>=2?"yellowtxt":"greentxt"}>
                    {quality}
                </span>
            </h3>
        </div>
    )
}

export default AirQuality