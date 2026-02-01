import React from 'react';
import './Input.css';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={`input-base ${className || ''}`}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";
