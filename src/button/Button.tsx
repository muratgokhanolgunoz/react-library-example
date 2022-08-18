import React from "react";
import { IButtonProps } from "./Button.types";
import "./Button.css";

const Button: React.FC<IButtonProps> = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
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
            ref={ref}
            disabled={disabled}
            {...rest}
        >
            {text}
        </button>
    );
});

export default Button;