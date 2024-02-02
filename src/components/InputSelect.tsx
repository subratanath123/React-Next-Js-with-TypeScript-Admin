import React, {FC} from 'react';
import Button from "@/components/Button";

interface SelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
}

const InputSelect: FC<SelectProps> = ({name, label, options}) => {
    return (
        <div className="row mb-3">
            <label htmlFor="floatingSelect" className="col-sm-2 col-form-label">{label}</label>
            <div className=" col-sm-10">
                <select className="form-select" name={name} id="floatingSelect" aria-label={label}>
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