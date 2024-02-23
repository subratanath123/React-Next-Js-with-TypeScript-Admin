import React, { FC, ChangeEvent } from 'react';

interface InputProps {
    name: string;
    title: string;
    type: string;
    value: string;
    submitting: boolean;
    onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ name, title, type, value, onInputChange, submitting }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange(e);
    };

    return (
        <>
            <div className="row mb-3">
                <label htmlFor="inputText" className="col-sm-2 col-form-label">{title}</label>
                <div className="col-sm-10">
                    {
                        type == 'file'
                            ? <input type={type} name={name} className="form-control" onChange={handleChange} disabled={submitting} />
                            : <input type={type} name={name} className="form-control" value={value} onChange={handleChange} disabled={submitting} />
                    }

                </div>
            </div>
        </>
    );
};

export default Input;
