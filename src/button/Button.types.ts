import React from "react";

export interface IButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'disabled'>{
    colorScheme: 'primary' | 'secondary' | 'success' | 'error';
    text: string;
    disabled?: boolean;
}