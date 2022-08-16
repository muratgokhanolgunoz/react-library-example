import React from "react";
import { IButtonProps } from "./Button.types";
import "./Button.css";

const Button: React.FC<IButtonProps> = React.forwardRef<HTMLButtonElement, IButtonProps>((props) => {
    const {
        colorScheme,
        text,
        disabled = false,
        ...rest
    } = props;

    return (
        <button
            type="button"
            className={`Button Button-${colorScheme}`}
            disabled={disabled}
            {...rest}
        >
            {text}
        </button>
    );
});

export default Button;