import * as React from 'react';
import { throttle } from 'lodash';
import Post, { PostInfo } from '../post';
import calcListSelection, {
    ScrollDirection,
    ListSelection,
    getDirection,
    ListSelectionArgs
} from '../../logic/calcListSelection';
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

    containerRef = React.createRef<HTMLDivElement>();
    listRef = React.createRef<HTMLUListElement>();

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
            this.recalculateSelection();
            this.containerRef.current.addEventListener('scroll', this.scrollEventListenerThrottled);
            this.scrollBy(this.containerRef.current, this.state.scrollTop);
        }
    }

    componentWillUnmount() {
        if (this.containerRef.current) {
            this.containerRef.current.removeEventListener('scroll', this.scrollEventListenerThrottled);
        }
    }

    recalculateSelection = () => {
        const container = this.containerRef.current,
            list = this.listRef.current;

        if (container && list) {
            const { overscan, rowCount, postInfos } = this.props,
                totalRows = postInfos.length,
                { scrollTop, scrollHeight } = container,
                listHeight = list.getBoundingClientRect().height;

            this.setState(prevState =>
                this.calcNextState(
                    prevState,
                    {
                        overscan,
                        rowCount,
                        scrollTop,
                        scrollHeight,
                        totalRows
                    },
                    listHeight,
                    this.props.onScrollTopChanged
                )
            );
        }
    };

    calcNextState(
        prevState: State,
        args: ListSelectionArgs,
        listHeight: number,
        onScrollTopChanged?: (scrollTop: number) => void
    ): State {
        if (prevState.scrollTop !== args.scrollTop && onScrollTopChanged) {
            onScrollTopChanged(args.scrollTop);
        }

        const direction = getDirection(prevState.scrollTop, args.scrollTop),
            avgRowHeight = listHeight / (prevState.renderTo - prevState.renderFrom);

        if (prevState.direction === direction) {
            const selection = calcListSelection(args);

            return {
                ...selection,
                direction,
                scrollTop: args.scrollTop,
                avgRowHeight
            };
        }

        // Don't recalculate selection when direction changes to prevent from jiterring caused by rounding.
        return {
            renderFrom: prevState.renderFrom,
            renderTo: prevState.renderTo,
            direction,
            scrollTop: args.scrollTop,
            avgRowHeight
        };
    }

    private scrollBy = (container: HTMLDivElement, scrollValue: number) => {
        const prevScrollTop = container.scrollTop;
        container.scrollTop += scrollValue;

        const scrolled = container.scrollTop - prevScrollTop;
        // If container was scrolled but wasn't scrolled by the full scroll value try to scroll it by the remainder.
        if (scrolled > 0 && scrolled < scrollValue) {
            window.requestAnimationFrame(() => {
                this.scrollBy(container, scrollValue - scrolled);
            });
        }
    };

    private scrollEventListenerThrottled = throttle(this.recalculateSelection, 50);
}

export default PostList;
