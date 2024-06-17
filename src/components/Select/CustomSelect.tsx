import './Select.css'
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CustomSelectProps {
    register: UseFormRegister<any>; 
    onValueChange: (value: string) => void;
    name: string;
    options:string[];
    defaultValue?:string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ register, onValueChange, name ,options,defaultValue='Food'}) => {
   const [value,setValue] = useState(defaultValue)
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        onValueChange(selectedValue);
        setValue(selectedValue);
    };
    return (
        <div className="inputGroup">
            <select {...register(name)}  value={value} required onChange={handleChange} >
            {options.map((option:string)=><option key={option}>
                {option}
            </option>)}
            </select>
           
        </div>
    );
};