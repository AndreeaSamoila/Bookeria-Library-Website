import { useState } from "react";

export function useForm(initialData) {
    
    const [formValues, setFormValues] = useState(initialData);

    function registerField(key) {
        return {
            value: formValues[key],
            onChange: (event) => {
                const newValue = event.target.value;
                setFormValues((formValues) => ({
                    ...formValues, 
                    [key]: newValue,
            }));
        },
    };
    }

 return {
    formValues, 
    registerField,
    setFormValues
 }
}