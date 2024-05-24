import React, {FC, ChangeEvent} from 'react';

interface InputProps {
    name: string;
    title: string;
    type: string;
    value: string;
    errors?: string;
    required?: boolean;
    submitting: boolean;
    onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({name, errors, title, type, value, onInputChange, submitting, required = false}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange(e);
    };

    return (
        <>
            <div className="row mb-3">
                <label htmlFor="inputText" className="col-sm-2 col-form-label">{title}</label>
                <div className="col-sm-10 input-group has-validation">
                    {
                        type == 'file'
                            ? <input type={type} name={name} className="form-control" onChange={handleChange}
                                     disabled={submitting} required={required}/>
                            : <input type={type} name={name} className="form-control" value={value}
                                     onChange={handleChange} required={required} disabled={submitting} />
                    }
                    <div className="field-error">
                        {errors}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Input;
