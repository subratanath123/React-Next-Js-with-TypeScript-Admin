import React, {FC, ChangeEvent, MouseEventHandler} from 'react';

interface ButtonProps {
    name: string;
    submitting: boolean;
    type: "submit" | "reset" | "button" | undefined;
    buttonType: "primary" | "success" | "danger" | undefined;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({name, type, submitting, buttonType, onSubmit}) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        onSubmit(event);
    };

    return (
        <>
            <button type={type} className={`btn btn-${buttonType} rounded-pill`} onClick={handleClick} disabled={submitting}>{name}</button>
        </>
    );
};

export default Button;
