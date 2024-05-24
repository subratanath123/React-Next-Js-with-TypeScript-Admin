import React, {ChangeEvent, FC} from 'react';
import Button from "@/components/Button";

interface SelectProps {
    name: string;
    label: string;
    submitting: boolean;
    value: string;
    errors: string;
    options: { value: string; label: string }[];
    handleOptionSelect: (value : ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: FC<SelectProps> = ({name, label, value, errors, options, submitting, handleOptionSelect}) => {
    const onOptionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        handleOptionSelect(event);
    };

    return (
        <div className="row mb-3">
            <div className=" col-sm-10 position-relative">
                <label htmlFor="floatingSelect" className="col-sm-2 col-form-label form-label">{label}</label>
                <select className="form-select" name={name} id="floatingSelect" aria-label={label} disabled={submitting} value={value} onChange={onOptionSelect}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="field-error">
                    {errors}
                </div>
            </div>
        </div>
    );
};

export default InputSelect;