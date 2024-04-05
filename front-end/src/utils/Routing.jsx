import { Routes, Route  } from "react-router-dom";
import Landingpage from '../components/Landingpage.jsx'
import Signup from '../components/Signup.jsx'
import Signin from '../components/Signin.jsx'
import Home from '../components/Home/Home.jsx'
import MustLogIN from '../components/MustLogIN.jsx'
import { AuthUser } from '../utils/Context.jsx'


import Weather from '../components/Home/contents/Weather.jsx'
import PlantDetector from '../components/Home/contents/PlantDetector.jsx'
import PlantSuggestion from '../components/Home/contents/PlantSuggestion.jsx'
import PlantDetails from '../components/Home/contents/PlantDetails.jsx'
import UserProfile from '../components/Home/contents/UserProfile.jsx'


function Routing() {

    // const storedData = localStorage.getItem('user');
    const storedData = JSON.parse(localStorage.getItem('user'));
    


    const {
        isUserLoggedIn,
       
      } = AuthUser();
    
    return <>
        <Routes>
            <Route path="/" element={<Landingpage/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            
            <Route path="/home" element={storedData ? <Home /> : <MustLogIN />} >
                
            <Route path="/home/weather" element={<Weather />} />
            <Route path="/home/plantDetector" element={<PlantDetector />} />
            <Route path="/home/plantSuggestion" element={<PlantSuggestion />} />
            <Route path="/home/plantDetails" element={<PlantDetails />} />
            <Route path="/home/userProfile" element={<UserProfile />} />

            </Route>



    </Routes>
    
    
    
    </>
}

export default Routing;