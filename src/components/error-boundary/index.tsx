import * as React from 'react';

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    state = {
        hasError: false
    };

    render() {
        return this.state.hasError ? <h1>OOPS an Error Occurred</h1> : this.props.children;
    }

    componentDidCatch(error: Error) {
        console.error(error);
    }
}

export default ErrorBoundary;
