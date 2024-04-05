import { createContext, useState , useContext } from "react";

export const AuthContext = createContext();



export const AuthUser = () => {
    return useContext(AuthContext);
}


const Context = ({ children }) => {
    let [userLoggedInDetls , setUserLoggedInDetls] = useState({});
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const data = {
        isUserLoggedIn,
    setIsUserLoggedIn,
    userLoggedInDetls,
    setUserLoggedInDetls
     }


    // console.log(props)
    return <AuthContext.Provider value={data}>
    {children}</AuthContext.Provider>;
}

export default Context;