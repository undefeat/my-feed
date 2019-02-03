import * as React from 'react';
import * as classnames from 'classnames';
import './index.css';

interface State {
    mounted: boolean;
}

class Loader extends React.Component {
    state = { mounted: false };

    render() {
        console.log(this.state.mounted);
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

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state, prevState);
    }

    componentDidMount() {
        window.requestAnimationFrame(() => {
            this.setState({ mounted: true });
        });
    }
}

export default Loader;
