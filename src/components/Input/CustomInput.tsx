import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import './Input.css'

interface CustomInputProps {
    register: UseFormRegister<any>; 
    label: string;
    name: string;
    type:string;
    defaultValue?:string | number
}

export const CustomInput: React.FC<CustomInputProps> = ({ register, label, name ,type,defaultValue}) => {   
    const [inputValue, setInputValue] = useState(defaultValue ?? ''); 

    useEffect(() => {
        setInputValue(defaultValue ?? '');
    }, [defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    return (
        <div className="inputGroup">           
           <input {...register(name)}  onChange={(e)=>setInputValue(e.target.value)} value={inputValue} type={type} required autoComplete="off" />           
           <label  htmlFor={name}>{label}</label>
        </div>
    );
};