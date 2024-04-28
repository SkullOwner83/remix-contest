import { useState } from "react";

//Helper function to format time (00:00)
export function FormatTime(Seconds) {
    let date = new Date(0);
    date.setSeconds(Seconds);
    return date.toISOString().substr(14, 5);
}

//Custom hook to save a state in the local storage
export function useLocalStorage(Key, InitialValue) {    
    const [StoredValue, SetStoredValue] = useState(() => {
        //Function to get the initial value of state from local storage or set it if not
        try {
            const Item = window.localStorage.getItem(Key);
            console.log("Se ha cargado");
            return Item ? JSON.parse(Item) : InitialValue;
        }
        catch (Error) {
            return InitialValue;
        }
    });

    //Function to update the state and save the value in local storage as JSON
    const SetValue = (Value) => {
        try {
            SetStoredValue(Value);
            window.localStorage.setItem(Key, JSON.stringify(Value));
        }
        catch(Error) {
            console.error(Error);
        }
    }
    
    return [StoredValue, SetValue];
}

export function FormatZeroPadding(Value) {
    return Value < 10 ?  `0${Value}` : `${Value}`;
}