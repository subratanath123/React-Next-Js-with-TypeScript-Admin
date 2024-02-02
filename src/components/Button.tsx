import React, {FC, ChangeEvent} from 'react';

interface ButtonProps {
    name: string;
    type: "submit" | "reset" | "button" | undefined;
    buttonType: "primary" | "success" | "danger" | undefined;
    onSubmit: (value: ChangeEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({name, type, buttonType, onSubmit}) => {
    const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
        onSubmit(e);
    };

    return (
        <>
            <button type={type} className={`btn btn-${buttonType} rounded-pill`} onSubmit={onSubmit}>{name}</button>
        </>
    );
};

export default Button;
