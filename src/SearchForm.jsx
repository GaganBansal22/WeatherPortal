import { useState } from "react";
// import { weatherKey } from "../keys";
const weatherKey=import.meta.env.VITE_REACT_APP_weatherKey
import axios from "axios";
import LocationSearchOption from "./LocationSearchOption";

let url="http://api.openweathermap.org/geo/1.0/direct";
let config={params:{q:"",appid:weatherKey,limit:5}};

function SearchForm({updateLoc}){
    let searchFormElement=document.querySelector(".search");
    let [searchQuery,setSearchQuery]=useState("");
    let [isFocused,setIsFocused]=useState(false);
    let [searchData,setSearchData]=useState();
    function updateSearchData(evt){
        setSearchQuery(evt.target.value);
    }
    function getNewlocFromDevice(){
        let lat,long;
        let s=(pos)=>{
            lat=pos.coords.latitude;
            long=pos.coords.longitude;
            updateLocAndResetForm({lat:lat,long:long});
        }
        let e=(err)=>{
            alert("Unable to fetch location");
        }
        navigator.geolocation.getCurrentPosition(s,e);
    }
    async function getSearchData(){
        if(searchQuery=="") return;
        config.params.q=searchQuery;
        let searchReturnData=await axios.get(url,config);
        setIsFocused(true);
        setSearchData(searchReturnData);
    }
    function updateLocAndResetForm(loc){
        setSearchData(null);
        updateLoc(loc);
    };
    if(isFocused){
        document.querySelector(".mainData").addEventListener("click",()=>{
            if(!searchFormElement.classList.contains("inputboxinitial")){
                document.querySelector(".searchfinal").classList.add("searchdivinitial");
                document.querySelector(".searchdivinitial").classList.remove("searchfinal");
                searchFormElement.classList.add("inputboxinitial");
                searchFormElement.classList.remove("inputboxfinal");
                document.querySelector(".searchiconfinal").classList.add("searchiconinitial");
                document.querySelector(".searchiconinitial").classList.remove("searchiconfinal");
            }
            setIsFocused(false);
            setSearchData(null);
        })
    }
    if(searchData){
        if(searchFormElement.classList.contains("inputboxinitial")){
            document.querySelector(".searchdivinitial").classList.add("searchfinal");
            document.querySelector(".searchfinal").classList.remove("searchdivinitial");
            searchFormElement.classList.add("inputboxfinal");
            searchFormElement.classList.remove("inputboxinitial");
            document.querySelector(".searchiconinitial").classList.add("searchiconfinal");
            document.querySelector(".searchiconfinal").classList.remove("searchiconinitial");
        }

        searchFormElement.addEventListener("keydown",(evt)=>{
            if(evt.key=="ArrowDown")
                document.querySelector(".currentbutton").focus();
            if(evt.key=="ArrowUp")
                document.querySelectorAll("li")[noOfLi-1].firstChild.focus();
            if(evt.key=="ArrowDown" || evt.key=="ArrowUp")
                setIsFocused(true);
        })
        document.querySelector(".currentbutton").addEventListener("keydown",(evt)=>{
            if(evt.key=="ArrowDown")
                document.querySelector("li button").focus();
            if(evt.key=="ArrowUp")
                searchFormElement.focus();
        })

        let noOfLi=document.querySelectorAll("li").length
        for(let i=0;i<noOfLi;i++){
            document.querySelectorAll("li")[i].addEventListener("mouseover",()=>{
                document.querySelectorAll("li img")[i].classList.add("lociconhovercolorchange");
            })
            document.querySelectorAll("li")[i].addEventListener("mouseout",()=>{
                document.querySelectorAll("li img")[i].classList.remove("lociconhovercolorchange");
            })
            document.querySelectorAll("li")[i].firstChild.addEventListener("keydown",(evt)=>{
                if(evt.key=="ArrowDown")
                    document.querySelectorAll("li")[(i+1)%noOfLi].firstChild.focus();
                if(evt.key=="ArrowUp"){
                    if(i==0)
                        document.querySelector(".currentbutton").focus();
                    else
                        document.querySelectorAll("li")[(i-1)%noOfLi].firstChild.focus();
                }
            })
        }
    }
    return (
        <div className="searchdivinitial searchdiv">
            <input 
                type="text" className="search inputboxinitial" placeholder="Enter city"
                onFocus={()=>{setIsFocused(true);}}
                onKeyDown={(evt)=>{
                    if(evt.key=="Enter") getSearchData();
                    if(isFocused && !searchData && (evt.key=="ArrowDown" || evt.key=="ArrowUp")){
                        document.querySelector(".currentbutton").focus();
                        setIsFocused(true);
                    }
                }}
                onChange={updateSearchData}
            />
            <img src="./Images/search.svg" onClick={getSearchData} className="searchiconinitial" alt="search"/>
            {isFocused?<button
                    onKeyDown={(evt)=>{
                        if(evt.key=="Enter")
                            getNewlocFromDevice();
                        if(!searchData && (evt.key=="ArrowDown" || evt.key=="ArrowUp"))
                            document.querySelector(".search").focus()
                    }}
                    onClick={getNewlocFromDevice}
                    className='currentbutton'><img src='Images/cursor-fill.svg' alt=''/>
                    Use Current location
                </button>:""}
            {searchData && isFocused?
                <ol className="ol">
                    {searchData.data.map((add)=>{
                        return <LocationSearchOption key={crypto.randomUUID()} add={{...add}} updateLocAndResetForm={updateLocAndResetForm}/>
                    })}
                </ol>
                :<></>
            }
        </div>
    )
}

export default SearchForm;