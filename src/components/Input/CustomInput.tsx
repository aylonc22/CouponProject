import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import './Input.css'

interface CustomInputProps {
    register: UseFormRegister<any>; 
    label: string;
    name: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ register, label, name }) => {
    return (
        <div className="inputGroup">
            <input {...register(name)} type="text" required autoComplete="off" />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};