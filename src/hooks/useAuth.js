import { useLayoutEffect, useState } from "react";
import {login as loginService} from "../services/auth"
import { useLocalStorage } from "./useLocalStorage";
import { handleTokenUpdate } from "../services/utils";

const initialAuth = {
    user:null,
}

export function useAuth() {

   
    //starea
    const [{user,token}, setUser] = useLocalStorage("library-user", initialAuth);

    useLayoutEffect(() => {
        handleTokenUpdate(token)
    }, [token]);
    
    //cum interactionez cu starea 

    async function login(credentials){

        try {
            const userInfo = await loginService(credentials);
            console.log(userInfo);
            setUser(userInfo);
        } catch(error) {
            throw error.data.message || "Error" 
        }

    }

    function logout(){
        setUser(initialAuth)
    }
    return {
        user,
        token,
        login, 
        logout,
    }
}