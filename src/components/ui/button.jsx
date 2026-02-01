import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export const Button = ({
    children,
    variant = 'default',
    size = 'default',
    className = '',
    asChild = false,
    ...props
}) => {
    const Component = asChild ? React.Fragment : 'button';

    // If asChild is true, we need to pass the className and props to the child
    // For simplicity in this migration, if asChild is true, we assume the child is a Link 
    // and we wrapper it or clone it. 
    // However, the cleanest way to support 'asChild' behavior without Slot is to just apply styles to the child 
    // or return the child with modified props. 
    // But since we are simplifying, let's just render the child if asChild is true, 
    // and wrapping it with a span/div might break layout.
    // A better approach for "Plain JS" is to just NOT use asChild and use the Link directly in usage,
    // but we want to minimize code changes in parents.

    const baseClass = `btn btn-${variant} btn-${size} ${className}`;

    if (asChild) {
        // Clone the single child and add the class
        const child = React.Children.only(children);
        return React.cloneElement(child, {
            className: `${child.props.className || ''} ${baseClass}`.trim(),
            ...props
        });
    }

    return (
        <button className={baseClass} {...props}>
            {children}
        </button>
    );
};
