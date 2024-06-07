import './Select.css'
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CustomSelectProps {
    register: UseFormRegister<any>; 
    onValueChange: (value: string) => void;
    name: string;
    options:string[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ register, onValueChange, name ,options}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        onValueChange(selectedValue);
    };
    return (
        <div className="inputGroup">
            <select {...register(name)}  required onChange={handleChange} >
            {options.map((option:string)=><option>
                {option}
            </option>)}
            </select>
           
        </div>
    );
};