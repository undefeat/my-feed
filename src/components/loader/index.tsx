import * as React from 'react';
import * as classnames from 'classnames';
import './index.css';

interface State {
    mounted: boolean;
}

class Loader extends React.PureComponent<{}, State> {
    state = { mounted: false };

    render() {
        return (
            <div className={classnames('loader', { hidden: !this.state.mounted })}>
                <div className="lds-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.requestAnimationFrame(() => {
            this.setState({ mounted: true });
        });
    }
}

export default Loader;
