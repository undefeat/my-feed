import * as React from 'react';
import Post, { PostInfo } from 'src/components/post';
import calcListSelection, { ScrollDirection, ListSelection, getDirection } from 'src/logic/calcListSelection';
import './index.css';

interface Props {
    postInfos: PostInfo[];
    initialScrollTop?: number;
    onScrollTopChanged?: (scrollTop: number) => void;
}

interface State extends ListSelection {
    scrollTop: number;
    direction: ScrollDirection;
}

class PostList extends React.Component<Props, State> {
    state = {
        renderFrom: 0,
        renderTo: 20,
        scrollTop: this.props.initialScrollTop || 0,
        direction: ScrollDirection.DOWN
    };

    rowHeightMin = 250;
    rowsToShow = 10;
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

                <ul className="post-list" style={{ height: this.rowHeightMin * (renderTo - renderFrom) }}>
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
            this.scrollEventListener();
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
            const { overscan, rowsToShow } = this,
                totalRows = this.props.postInfos.length,
                { scrollTop, scrollHeight } = container;

            this.setState(prevState => {
                if (prevState.scrollTop !== scrollTop && this.props.onScrollTopChanged) {
                    this.props.onScrollTopChanged(scrollTop);
                }

                const direction = getDirection(prevState.scrollTop, scrollTop);

                if (prevState.direction === direction) {
                    const selection = calcListSelection({
                        overscan,
                        rowsToShow,
                        scrollHeight,
                        scrollTop,
                        totalRows
                    });

                    return {
                        ...selection,
                        direction,
                        scrollTop
                    };
                }

                return {
                    renderFrom: prevState.renderFrom,
                    renderTo: prevState.renderTo,
                    direction,
                    scrollTop
                };
            });
        }
    };
}

export default PostList;
