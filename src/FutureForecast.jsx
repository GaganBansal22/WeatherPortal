import { useState } from "react"

function FutureForecast({data}){
    let futureData=data.futureData.data
    const [showEntries,SetShowEntries]=useState(false)
    function handleShowEntriesClick(){
        SetShowEntries(!showEntries)
    }
    return (
        <div className="futureForecast">
            <div onClick={handleShowEntriesClick} role="button" className="futureForecastHeadingDiv">
                <span className="futureForecastHeading">5-Day Forecast</span>
                <span className="futureForecastHeadingToggler">
                    <img src={showEntries?"Images/caret-up-fill.svg":"Images/caret-down-fill.svg"} alt="" />
                </span>
            </div>
            {showEntries?
            <div className="futureForecastEntries">
                {futureData.list.map((data)=>{
                    return (<FutureDataEntry key={data.dt_txt} data={data} />)
                })}
            </div>
            :<></>}
        </div>
    )
}

export default FutureForecast

function FutureDataEntry({data}){
    function returnDateAndTime(date){
        return date.substring(8,10)+"-"+date.substring(5,7)+"-"+date.substring(2,4)+" "+date.substring(11,16)
    }
    let wCondition=data.weather[0].main
    let imgSrc="cloud.svg"
    if (wCondition=="Clear"){
        if (data.dt_txt.substring(11,13)>18 || data.dt_txt.substring(11,13)<6)
            imgSrc="moon.svg"
        else
            imgSrc="sun.svg"
    }
    else if(wCondition=="Rain")
        imgSrc="cloud-rain.svg"
    
    else if(wCondition=="Thunderstorm")
        imgSrc="lightning.svg"
    return (
        <div className="futureForecastEntryDiv">
            <div className="futureForecastEntryDivData">
                <span>{returnDateAndTime(data.dt_txt)}</span>
                <span><img src={`/Images/${imgSrc}`} alt="" /> {data.weather[0].main}</span>
                <span>{data.main.temp} °C</span>
                <span><img src="Images/icons8-water-48.png" style={{width:"20%"}} alt="" /> {Math.trunc(data.pop*100)}%</span>
            </div>
            <hr className="futureForecastEntryDivHR" />
        </div>
    )
}