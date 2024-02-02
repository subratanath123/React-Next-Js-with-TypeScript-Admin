import React, { FC, ChangeEvent } from 'react';

interface InputProps {
    name: string;
    title: string;
    type: string;
    value: string;
    onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ name, title, type, value, onInputChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange(e);
    };

    return (
        <>
            <div className="row mb-3">
                <label htmlFor="inputText" className="col-sm-2 col-form-label">{title}</label>
                <div className="col-sm-10">
                    <input type={type} name={name} className="form-control" value={value} onChange={handleChange}/>
                </div>
            </div>
        </>
    );
};

export default Input;
