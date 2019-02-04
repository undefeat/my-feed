import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/components/app/container';
import ErrorBoundary from 'src/components/error-boundary';
import 'src/styles.css';

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root') as HTMLElement
);
