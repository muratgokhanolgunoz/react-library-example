import React from "react";

export interface IButtonProps extends Omit<React.ComponentPropsWithoutRef<"button">, 'disabled'>{
    colorScheme: 'primary' | 'secondary' | 'success' | 'error';
    text: string;
    disabled?: boolean;
}