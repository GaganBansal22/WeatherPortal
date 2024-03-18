import GaugeComponent from 'react-gauge-component'

function AirQuality({ data }) {
    let aqi = data.aqiData.data.list[0].main.aqi
    let quality = "Good"
    if (aqi == 5)
        quality = "Very Poor"
    else if (aqi == 4)
        quality = "Poor"
    else if (aqi == 3)
        quality = "Moderate"
    else if (aqi == 2)
        quality = "Fair"
    function gaugeCenterValue(n){
        return quality;
    }
    return (
        <div>
            <h3 className='text-center mb-0'>Air quality</h3>
            <GaugeComponent
                className='guage'
                type='semicircle'
                value={aqi==1?0:aqi*20}
                minValue={0}
                maxValue={100}
                arc={{gradient:true}}
                labels={
                    {
                        valueLabel:{matchColorWithArc:true,formatTextValue:gaugeCenterValue},
                        tickLabels:{hideMinMax:true}
                    }
                }
            />
        </div>
    )
}

export default AirQuality