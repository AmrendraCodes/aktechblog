import React from 'react';
import './Label.css';

export const Label = React.forwardRef(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={`label-base ${className || ''}`}
        {...props}
    />
));
Label.displayName = "Label";
