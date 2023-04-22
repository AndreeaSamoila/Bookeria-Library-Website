import { useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        // incarcam datele si facem o verif
        //daca avem date, le parsam si returnam 
        //altfel
        //setam la valoare initiala
        const localStorageElement = localStorage.getItem(key)
        if(localStorageElement) {
            return JSON.parse(localStorageElement)
        } 
        return initialValue;
    });

    function handleStateChange(newValue) {
        setState(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }
    return [state, handleStateChange];
}