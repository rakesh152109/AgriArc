import React, { useState } from "react";
// import sandySoilImg from '../assets/sandyso.jpg'
// import Gemini from './Gemini.jsx'
import axios from "axios";

const PlantDetails = () => {
  const [ans, setAns] = useState({
    cropName: "",
    landArea: "",
    soilType: "",
    seasonType: "",
    status: false,
  });
  let [res, setRes] = useState(null);

  let prompt;
  const getPrompt = async () => {
    if (ans.status) {
      const { cropName, landArea, soilType, seasonType } = ans;
      // prompt  = `How can I plant ${cropName} in a ${landArea} square meter area with ${soilType} soil during the ${seasonType} season?, information should be presize and to the point ` ;
      prompt = `{
        "materials_required": [],
        "fertilizer": [],
        "steps_for_planting": [],
        "farming_tools": [],
        "needs": {},
        "medical_uses": [],
        "additional_tips": []
      }
      How can I plant ${cropName} in a ${landArea} square meter area with ${soilType} soil during the ${seasonType} season?,  give the information  in  json object format according to the json object provided above all the fields are necessary to be filled`;
      await generateAns();
    }
  };

  async function generateAns() {
    // setAnswer("loading....");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBgbYlUXHXRdtEGEpl0ks8taak81PX1UDo",
      method: "post",
      data: {
        contents: [{ parts: [{ text: prompt }] }],
      },
    });

    let res2 = JSON.parse(
      response["data"]["candidates"][0]["content"]["parts"][0]["text"]
    );
    setRes(res2);
  }

  const handleForm = (e) => {
    e.preventDefault();
    ans.status = true;
    //  generateAns();
    getPrompt();

    // console.log(ans)
    console.log(prompt);
  };

  // this is done for looping object , baacause we cannot use for in loop in jsx
  let keys;
  if (res) {
    keys = Object.keys(res["needs"]);
  }

  return (
    <div className=" flex justify-end ">
      <div className="h-screen flex justify-center gap-4 w-[80vw] p-4 bg-green-300">
        <div className="w-[40vw] h-[40vw]">
          <form action="" onSubmit={handleForm}>
            <div className="flex flex-col mb-10">
              <label
                className="py-2 text-xl italic font-semibold"
                htmlFor="crop"
              >
                Crop Name:
              </label>
              <input
                onChange={(e) => setAns({ ...ans, cropName: e.target.value })}
                className="w-[full] outline-none rounded-lg py-2 text-xl pl-2"
                name="cropName"
                id="crop"
                type="text"
              />
            </div>

            <div className="flex flex-col mb-10">
              <label
                className="py-2 text-xl italic font-semibold"
                htmlFor="area"
              >
                Land Area (in sq. meter):
              </label>
              <input
                onChange={(e) => setAns({ ...ans, landArea: e.target.value })}
                className="w-[full] outline-none rounded-lg py-2 text-xl p-2"
                name="landArea"
                id="area"
                type="number"
              />
            </div>

            <div className="flex flex-col mb-10">
              <label
                className="py-2 text-xl italic font-semibold"
                htmlFor="soil"
              >
                Soil Type:
              </label>
              <div
                className="flex gap-4"
                onChange={(e) => setAns({ ...ans, soilType: e.target.value })}
              >
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="sandy">
                    <img
                      className="h-36 w-36 rounded-full object-cover object-center hover-img"
                      src="./sandy.png"
                      alt=""
                    />
                  </label>
                  <h1 className="px-3 py-2 bg-green-100 rounded-lg">
                    Sandy Soil
                  </h1>
                  <input type="radio" name="agro" value="sandy" id="sandy" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="clay">
                    <img
                      className="h-36 w-36 rounded-full object-cover object-center "
                      src="./clay.png"
                      alt=""
                    />
                  </label>
                  <h1 className="px-3 py-2 bg-green-100 rounded-lg">
                    Clay Soil
                  </h1>
                  <input type="radio" name="agro" value="clay" id="clay" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="slit">
                    <img
                      className="h-36 w-36 rounded-full object-cover object-center "
                      src="./slit.png"
                      alt=""
                    />
                  </label>
                  <h1 className="px-3 py-2 bg-green-100 rounded-lg">
                    Slit Soil
                  </h1>
                  <input
                    className="opacity-1"
                    type="radio"
                    name="agro"
                    value="slit"
                    id="slit"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="loamy">
                    <img
                      className="h-36 w-36 rounded-full object-cover object-center "
                      src="./Loamy.png"
                      alt=""
                    />
                  </label>
                  <h1 className="px-3 py-2 bg-green-100 rounded-lg">
                    Loamy Soil
                  </h1>
                  <input type="radio" name="agro" value="loamy" id="loamy" />
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-10">
              <label
                className="py-2 text-xl italic font-semibold"
                htmlFor="sesaon"
              >
                Season Type:
              </label>
              <select
                onChange={(e) => setAns({ ...ans, seasonType: e.target.value })}
                className="p-2 rounded-md text-xl"
                name="seasonType"
                id="season"
              >
                <option className="" selected value="">
                  Select Season
                </option>
                <option value="summer">Summer - March to May</option>
                <option value="moonson">Rainy - June to September</option>
                <option value="spring">Autumn - October to November</option>
                <option value="winter">Winter - December to February</option>
              </select>
            </div>

            <input type="submit" value="Sbumit" />
          </form>
        </div>

        <div className="h-[90vh] w-1/2 bg-white rounded-lg overflow-x-hidden">
          {res ? (
            <div className="main">
              {/* ans.need */}
              <div className="elem">
                <h1 className="font-bold">Material Required</h1>
                <ol>
                  {res["materials_required"]
                    ? res["materials_required"].map((item, idx) => (
                        <li key={idx}>
                          {idx + 1}. {item}
                        </li>
                      ))
                    : null}
                </ol>
              </div>

              <div className="elem">
                <h1 className="font-bold">Farming Tools</h1>
                <ol>
                  {res["farming_tools"]
                    ? res["farming_tools"].map((item, idx) => (
                        <li key={idx}>
                          {idx + 1}. {item}
                        </li>
                      ))
                    : null}
                </ol>
              </div>
              <div className="elem">
                <h1 className="font-bold">Climate Conditions </h1>
                <ol>
                  {res["needs"]
                    ? keys.map((item, idx) => (
                        <li key={idx}>
                          <b>
                            {idx + 1}.{item}
                          </b>{" "}
                          :{res["needs"][item]}
                        </li>
                      ))
                    : null}
                </ol>
              </div>

              <div className="elem">
                <h1 className="font-bold">Steps For Planting</h1>
                <ol>
                  {res["steps_for_planting"]
                    ? res["steps_for_planting"].map((item, idx) => (
                        <li key={idx}>
                          {idx + 1}. {item}
                        </li>
                      ))
                    : null}
                </ol>
              </div>

              <div className="elem">
                <h1 className="font-bold">Fertilizer</h1>
                <ol>
                  {res?.["fertilizer"]
                    ? res["fertilizer"].map((item, idx) => (
                        <li key={idx}>
                          {idx + 1}. {item}
                        </li>
                      ))
                    : null}
                </ol>
              </div>

              <div className="elem">
                <h1 className="font-bold">Additinonal Tips</h1>
                <ol>
                  {res?.["additional_tips"]
                    ? res["additional_tips"].map((item, idx) => (
                        <li key={idx}>
                          {idx + 1}. {item}
                        </li>
                      ))
                    : null}
                </ol>
              </div>

              <div className="elem">
                <h1 className="font-bold">
                  {" "}
                  {res?.medical_uses.length != "" ? "Medical Uses" : ""}
                </h1>
                <ol>
                  {res?.["medical_uses"]
                    ? res["medical_uses"].map((item, idx) => (
                        <li key={idx}>
                          {idx + 1}. {item}
                        </li>
                      ))
                    : null}
                </ol>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PlantDetails