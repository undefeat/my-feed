import * as React from 'react';
import Post, { PostInfo } from 'src/components/post';
import calcListSelection, { ScrollDirection, ListSelection, getDirection } from 'src/logic/calcListSelection';
import './index.css';

interface Props {
    postInfos: PostInfo[];
    rowCount: number;
    overscan: number;
    initialScrollTop?: number;
    onScrollTopChanged?: (scrollTop: number) => void;
}

interface State extends ListSelection {
    scrollTop: number;
    direction: ScrollDirection;
    avgRowHeight: number | undefined;
}

class PostList extends React.PureComponent<Props, State> {
    state: State = {
        renderFrom: 0,
        renderTo: this.props.rowCount + this.props.overscan,
        scrollTop: this.props.initialScrollTop || 0,
        direction: ScrollDirection.DOWN,
        avgRowHeight: undefined
    };

    render() {
        const { postInfos } = this.props,
            { renderFrom, renderTo, avgRowHeight } = this.state;

        const postInfosToRender = postInfos.slice(renderFrom, renderTo);

        const paddingBefore = avgRowHeight ? renderFrom * avgRowHeight : 0,
            paddingAfter = avgRowHeight ? (postInfos.length - renderTo) * avgRowHeight : 0;

        return (
            <div ref={this.containerRef} className="post-container">
                <div style={{ height: paddingBefore }} />

                <ul ref={this.listRef} className="post-list">
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
            this.containerRef.current.addEventListener('scroll', this.recalcSelection);
            this.containerRef.current.scrollTop = this.state.scrollTop;
            this.recalcSelection();
        }
    }

    componentWillUnmount() {
        if (this.containerRef.current) {
            this.containerRef.current.removeEventListener('scroll', this.recalcSelection);
        }
    }

    recalcSelection = () => {
        const container = this.containerRef.current,
            list = this.listRef.current;

        if (container && list) {
            const { overscan, rowCount, postInfos } = this.props,
                totalRows = postInfos.length,
                { scrollTop, scrollHeight } = container,
                listHeight = list.getBoundingClientRect().height;

            this.setState(prevState => {
                if (prevState.scrollTop !== scrollTop && this.props.onScrollTopChanged) {
                    this.props.onScrollTopChanged(scrollTop);
                }

                const direction = getDirection(prevState.scrollTop, scrollTop),
                    avgRowHeight = listHeight / (prevState.renderTo - prevState.renderFrom);

                if (prevState.direction === direction) {
                    const selection = calcListSelection({
                        overscan,
                        rowCount,
                        scrollHeight,
                        scrollTop,
                        totalRows
                    });

                    return {
                        ...selection,
                        direction,
                        scrollTop,
                        avgRowHeight
                    };
                }

                return {
                    renderFrom: prevState.renderFrom,
                    renderTo: prevState.renderTo,
                    direction,
                    scrollTop,
                    avgRowHeight
                };
            });
        }
    };

    private containerRef = React.createRef<HTMLDivElement>();
    private listRef = React.createRef<HTMLUListElement>();
}

export default PostList;
