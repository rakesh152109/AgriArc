import React from 'react'
import  { useState } from "react";
import axios from "axios";

function PlantSuggestion() {
    let [plantType, setPlantType] = useState({
        plant_type: ''
    })
    
 
    


    let handleSubmit = (e) => {
        e.preventDefault();
        plantType.plant_type.length > 5 ? getData(plantType.plant_type) : ""
    }

    function getLatLon() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function (position) {
                const preciseLatitude = position.coords.latitude.toFixed(2);
                const preciseLongitude = position.coords.longitude.toFixed(2);
                resolve([preciseLatitude ,preciseLongitude]);
            }, reject);
        });
    }

    function getWeatherData(data) {
    

        let apikey2 = `XK11NwUmDvkeANMlDi93Q65dkuIHxA00`;
        // let apikey2 = `yZoeFYAHLQNTkbtfdtRYLjCCXFdhjPc9`;
        let url = `https://api.tomorrow.io/v4/weather/forecast?location=${data[0]},${data[0]}&apikey=${apikey2}`;

        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((res) => {
                    let resData = res.data.timelines.daily[0].values;
            let {
                humidityAvg,
                temperatureAvg,
                temperatureMax,
                temperatureMin,
                windSpeedAvg,
                    } = resData;
                    
            let WeatherData = [
                temperatureAvg,
                temperatureMax,
                temperatureMin,
                humidityAvg,
                windSpeedAvg,
            ];
            resolve(WeatherData)
        }).catch((err) => reject(err))



        })

    }


    function getResponseDataFromGemini(latLonData , WeatherData) {
        let plant_type = 'alltype'
        let prompt = `{
            "name": ,
            "common_name_in_India": ,
            "soil_type":,
            "water_level": ,
            "plant_type":,
            "soil_type": ,
            "growth_rate":,
            "sunlight_requirement": ,
            "flowering_season":,
        
          },
          Could you please provide all possible  plant species of ${plant_type} within the specified category that are suitable for growth in the temperature range of ${WeatherData[1]}degree Celcius to${WeatherData[2]}degree Celcius at the location ${latLonData[0]} and ${latLonData[1]} , you can take help of above json object , all the data should be filled in the json object and give the response in json objects , and wrap the json object in to an array 
          `;
        
        return new Promise( async(resolve, reject) => { 

            let apikey = `AIzaSyBgbYlUXHXRdtEGEpl0ks8taak81PX1UDo`
            
            let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`


            try {

                let response = await axios({
                   url: url,
                   method: "post",
                   data: {
                        contents: [{ parts: [{ text: prompt }] }],
                    },
                })
                let jsonRes = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
                let jRes = jsonRes.replace(/```/g, '')
                // let jsRes =  await JSON.parse(
                    
                // );
                let main = JSON.parse(jRes)
                resolve(main)


            } catch (error) {
                reject(error)
            }

            // axios.post({
            //     url: url,
            //     // method: "post",
            //     data: {
            //         contents: [{ parts: [{ text: prompt }] }],
            //     },
            // })
            //     .then((res) => {
            //         let resData = res.data;
            //         resolve(resData);
            //     })
            //     .catch((err) => reject(err))



        })




    }

    let WeatherData;
    let getData = async(pType) => {
        try {
            let latLonData = await getLatLon();
          WeatherData = await getWeatherData(latLonData);
          console.log(latLonData)
          console.log(WeatherData)
            let res = await getResponseDataFromGemini(latLonData, WeatherData ,pType);
          console.log(res);
          
        } catch (error) {
            console.error("Error getting location:", error);
        }
    }
    
    // getData();
    













  return (
    <>
    <div className="main flex  h-screen w-full bg-slate-500 ">
      <div className=" w-[100%] h-full bg-red-300">
        <div className="top flex w-full h-[20%] bg-green-600">
          

          <div className="right w-2/3 h-full">
          <form action="" onSubmit={handleSubmit} className=" gap-2 flex justify-center items-center">
<div className="elem">
<label htmlFor="vegetable"><img className="w-[120px] h-[120px] rounded-full"  src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></label>
<input onChange={(e)=>setPlantType({...plantType , plant_type:e.target.value})}   value={'vegetable'} type="radio" name="plant_type" id="vegetable" />
</div>
<div className="elem">
<label htmlFor="fruits"><img  className="w-[120px] h-[120px] rounded-full" src="https://images.pexels.com/photos/68525/soap-colorful-color-fruit-68525.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></label>
<input  onChange={(e)=>setPlantType({...plantType , plant_type:e.target.value})}  type="radio" value={'fruits'} name="plant_type" id="fruits" />
</div>
<div className="elem">
<label htmlFor="flowers"><img className="w-[120px] h-[120px] rounded-full"  src="https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></label>
<input onChange={(e)=>setPlantType({...plantType , plant_type:e.target.value})}   type="radio" name="plant_type" value={'flowers'} id="flowers" />
</div>
<div className="elem">
<label htmlFor="medicalPlant"><img className="w-[120px] h-[120px] rounded-full"  src="https://media.istockphoto.com/id/1203733319/photo/natural-drug-research-natural-organic-and-scientific-extraction-in-glassware-alternative.jpg?b=1&s=612x612&w=0&k=20&c=9Es8X0_YYGyVEPFLjN5R8c_S1_4EsREDRNFXBS5Sqms=" alt="" /></label>
<input onChange={(e)=>setPlantType({...plantType , plant_type:e.target.value})}   type="radio" value={'medicalPlant'} name="plant_type" id="medicalPlant" />
    </div>
    <button type='submit'>Submit</button>
</form>
          </div>
        </div>
      </div>
    </div>
  </>
      
    )
    
}

export default PlantSuggestion