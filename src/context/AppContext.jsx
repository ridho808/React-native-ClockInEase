import { createContext, useContext, useState } from 'react';

const AppContex = createContext()

const AppProvider = ({children})=>{
    const [Token,setToken] = useState("");

    return (
        <AppContex.Provider value={{Token,setToken}}>
            {children}
        </AppContex.Provider>
    )
}
const useAppContext = ()=>{
    return useContext(AppContex)
}
export {AppProvider,useAppContext};