import { useState,useEffect } from 'react';
import './App.css';
// import {geocodingKey,weatherKey} from "../keys"
import axios from "axios";
import Weatherinfo from "./Weatherinfo";
import SearchForm from "./SearchForm";

const weatherKey=import.meta.env.VITE_REACT_APP_weatherKey
const geocodingKey=import.meta.env.VITE_REACT_APP_geocodingKey

function App(){
  let [loc,setLoc]=useState({lat:28.7041,long:77.1025});
  let [data,setData]=useState();
  let [isLoading,setIsLoading]=useState(true);
  function updateLoc(loc){
    setLoc(loc);
  }
  useEffect(()=>{
    setIsLoading(true);
    async function reload(loc){
      let url1=`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.long}&appid=${weatherKey}&units=metric`;
      let url2=`https://api.bigdatacloud.net/data/reverse-geocode`;
      let url2config={params:{latitude:loc.lat,longitude:loc.long,key:geocodingKey}};
      let url3=`https://api-bdc.net/data/timezone-by-location?latitude=${loc.lat}&longitude=${loc.long}&key=${geocodingKey}`;
      let url4=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${loc.lat}&lon=${loc.long}&appid=${weatherKey}`
      let url5=`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.long}&appid=${weatherKey}&units=metric`
      try{
        const [geoDataResponse, timeDataResponse, wDataResponse, aqiDataResponse, futureDataResponse] = await Promise.all([
          axios.get(url2, url2config),axios.get(url3),axios.get(url1),axios.get(url4),axios.get(url5)
        ]);
        setData({ geoData:geoDataResponse, wData:wDataResponse, timeData:timeDataResponse, aqiData:aqiDataResponse, futureData:futureDataResponse });
        setIsLoading(false);
      }catch (error) {
          setData({error:true});
      }
    }
    reload(loc);
  },[loc]);

  useEffect(()=>{
    async function getLoc(){
      try{
        let data=await axios.get(`https://api.bigdatacloud.net/data/ip-geolocation?key=${geocodingKey}`)
        setLoc({lat:data.data.location.latitude,long:data.data.location.longitude})
      }
      catch(e){
        ;
      }
    }
    getLoc();
  },[])

  if(isLoading){
    return (
      <img style={{position:"absolute",top:"25%", maxWidth:'25%'}} src="Images/loading.gif" alt="Loading..."/>
    )
  }
  if(!data || data.error){
    return (
      <div className="error">
        <h1>Oops!Something went Wrong...</h1>
      </div>
    )
  }
  return (
    <>
      <SearchForm updateLoc={updateLoc}/>
      <div className='mainData'>
        <Weatherinfo data={{...data}}/>
      </div>
    </>
  )
}

export default App
