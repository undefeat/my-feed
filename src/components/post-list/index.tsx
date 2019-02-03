import * as React from 'react';
import Post, { PostInfo } from 'src/components/post';
import './index.css';

interface Props {
    postInfos: PostInfo[];
}

enum ScrollDirection {
    UP,
    DOWN
}

interface State {
    renderFrom: number;
    renderTo: number;
    scrollTop: number;
    direction: ScrollDirection;
}

class PostList extends React.Component<Props, State> {
    state = {
        renderFrom: 0,
        renderTo: 20,
        scrollTop: 0,
        direction: ScrollDirection.DOWN
    };

    rowHeightMin = 200;
    overscan = 10;

    render() {
        const { postInfos } = this.props,
            { renderFrom, renderTo } = this.state;

        const postInfosToRender = postInfos.slice(renderFrom, renderTo);

        const paddingBefore = renderFrom * this.rowHeightMin,
            paddingAfter = (postInfos.length - renderTo) * this.rowHeightMin;

        return (
            <div ref={this.containerRef} className="post-container">
                <div style={{ height: paddingBefore }} />

                <ul>
                    {postInfosToRender.map(postInfo => (
                        <Post key={postInfo.id} {...postInfo} />
                    ))}
                </ul>

                <div style={{ height: paddingAfter }} />
            </div>
        );
    }

    componentDidMount() {
        if (this.containerRef.current) {
            this.containerRef.current.addEventListener('scroll', this.scrollEventListener);
            this.containerRef.current.scrollTop = this.state.scrollTop;
        }
    }

    componentWillUnmount() {
        if (this.containerRef.current) {
            this.containerRef.current.removeEventListener('scroll', this.scrollEventListener);
        }
    }

    private containerRef = React.createRef<HTMLDivElement>();

    private scrollEventListener = () => {
        const container = this.containerRef.current;

        if (container) {
            const total = this.props.postInfos.length,
                containerHeight = container.getBoundingClientRect().height,
                { scrollTop, scrollHeight } = container;

            const rowsToShow = Math.round(containerHeight / this.rowHeightMin),
                scrolledShare = scrollTop / (scrollHeight || 1000);

            const firstIndex = Math.round(scrolledShare * total),
                lastIndex = firstIndex + rowsToShow,
                renderFrom = Math.max(0, firstIndex - this.overscan),
                renderTo = Math.min(total, lastIndex + this.overscan);

            this.setState(prevState => {
                const deltaY = scrollTop - prevState.scrollTop,
                    direction = deltaY > 0 ? ScrollDirection.DOWN : ScrollDirection.UP;

                if (prevState.direction === direction) {
                    return {
                        renderFrom,
                        renderTo,
                        scrollTop,
                        direction
                    };
                }

                return {
                    renderFrom: prevState.renderFrom,
                    renderTo: prevState.renderTo,
                    scrollTop,
                    direction
                };
            });
        }
    };
}

export default PostList;
