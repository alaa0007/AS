import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

/**
 * ErrorBoundary
 * ==============
 * 
 * A React component that catches any error in its child component tree, 
 * logs the error to the console, and displays an error message.
 * 
 * Note: This component is a wrapper around the React component 
 * `React.ErrorBoundary` and is designed to be used as a drop-in replacement.
 * It provides additional functionality such as logging the error to the 
 * console and displaying an error message.
 * 
 * @example
 *  <ErrorBoundary>
 *      <MyComponent />
 *  </ErrorBoundary>
 * 
 * @param {React.ReactNode} children - The child components to be rendered 
 *                                     within the ErrorBoundary context.
 * 
 * @returns {React.ReactElement} The rendered ErrorBoundary component.
*/
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {

    //HOOKS
    const [hasError, setHasError] = useState(false);

    /**
     * Handles errors by logging them to the console and updating the error state.
     * 
     * @param {Error} error - The error object thrown in the component tree.
     * @param {React.ErrorInfo} errorInfo - Additional information about the error.
    */
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        console.error(error, errorInfo);
        setHasError(true);
    };

    useEffect(() => {
    const errorHandler = (error: Error, errorInfo: React.ErrorInfo) => {
        handleError(error, errorInfo);
    };

    window.addEventListener('error', (event: ErrorEvent) => {
        const errorInfo: React.ErrorInfo = {
            componentStack: event.error.stack,
        };
        errorHandler(event.error, errorInfo);
    });

    return () => {
        window.addEventListener('error', (event: ErrorEvent) => {
            const errorInfo: React.ErrorInfo = {
                componentStack: event.error.stack,
            };
            errorHandler(event.error, errorInfo);
        });    
    };
    }, []);

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    //RENDER
    return <>{children}</>;
};

//EXPORT
export default ErrorBoundary;
