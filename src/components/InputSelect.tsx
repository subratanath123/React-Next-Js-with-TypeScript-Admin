import React, {ChangeEvent, FC} from 'react';
import Button from "@/components/Button";

interface SelectProps {
    name: string;
    label: string;
    submitting: boolean;
    value: string;
    options: { value: string; label: string }[];
    handleOptionSelect: (value : ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: FC<SelectProps> = ({name, label, value, options, submitting, handleOptionSelect}) => {
    const onOptionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        handleOptionSelect(event);
    };

    return (
        <div className="row mb-3">
            <label htmlFor="floatingSelect" className="col-sm-2 col-form-label">{label}</label>
            <div className=" col-sm-10">
                <select className="form-select" name={name} id="floatingSelect" aria-label={label} disabled={submitting} value={value} onChange={onOptionSelect}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default InputSelect;