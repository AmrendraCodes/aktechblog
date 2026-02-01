import { useState } from 'react';

// Simple mock toast
export const useToast = () => {
    const toast = ({ title, description, variant }) => {
        console.log(`Toast: ${title} - ${description} (${variant})`);
        // Ideally this would trigger the Toaster component context
        // For manual conversion, we can implement a simple context later if needed
        // or just use window.alert for critical things if we want to be ultra-simple
        if (variant === 'destructive') {
            console.error(title, description);
        }
    };
    return { toast };
};
