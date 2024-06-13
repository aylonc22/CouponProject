import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import './Input.css'

interface CustomInputProps {
    register: UseFormRegister<any>; 
    label: string;
    name: string;
    type:string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ register, label, name ,type}) => {   
    const handleDate = ()=>{
        return type=='date'?new Date().toISOString().slice(0,10):"";
    }
    const [inputValue,setInputValue] = useState(handleDate());
   
    return (
        <div className="inputGroup">           
           <input {...register(name)}  onChange={(e)=>setInputValue(e.target.value)} value={inputValue} type={type} required autoComplete="off" />           
           <label  htmlFor={name}>{label}</label>
        </div>
    );
};