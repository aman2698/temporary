import React,{useState} from 'react'
import '../App.css'
import Locations from './Location'
import axios from "axios";


const Showdata = ()=>{
    const [data ,setData] = useState('')
      
    const options = {

        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: {lon: '77.2797334', lat: '28.66047'},
        headers: {
          'x-rapidapi-key': '7fb068b73fmsh352f8f31a30c717p1bf715jsn9e5225d64ca6',
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {

        return(
            <div class="card">
    
            <h2>{data.data[0].city_name}</h2>
            <h3>Cloudy<span>Wind 10km/h <span class="dot">•</span> Precip 0%</span></h3>
            <h1>23°</h1>
            <div class="sky">
                <div class="sun"></div>
                <div class="cloud">
                    <div class="circle-small"></div>
                    <div class="circle-tall"></div>
                    <div class="circle-medium"></div>
                </div>
            </div>
           
        </div>
        )
        // console.log(response.data);
        //  setData(response.data);
        // console.log(data.data[0]);
    }).catch(function (error) {
        console.error(error);
    });

   
}
const Weather = () => {
    


    return !localStorage.getItem('latitude')?<div><Locations/>{console.log("location")}</div>:<div><Showdata/>{console.log("data")} </div>

    
        // <div>
        //     <Locations/>

        // </div>
    
}

export default Weather

