import React from 'react';
import './Textarea.css';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={`textarea-base ${className || ''}`}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";
