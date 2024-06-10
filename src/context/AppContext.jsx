import { createContext, useContext, useState } from 'react';

const AppContex = createContext()

const AppProvider = ({children})=>{
    const [Token,setToken] = useState("");
    const [InfoUser,setInfoUser] = useState({});
    return (
        <AppContex.Provider value={{Token,setToken,setInfoUser,InfoUser}}>
            {children}
        </AppContex.Provider>
    )
}
const useAppContext = ()=>{
    return useContext(AppContex)
}
export {AppProvider,useAppContext};