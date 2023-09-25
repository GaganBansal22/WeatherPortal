function LocationSearchOption({add,updateLocAndResetForm}){
    function optionClicked(e){
        updateLocAndResetForm({lat:add.lat,long:add.lon});
    }
    return (
        <li>
            <button onClick={optionClicked}>
                <img src="Images/geo-alt-fill.svg"/>  {add.name}, {add.state}, {add.country}
            </button>
        </li>
    )
}

export default LocationSearchOption;