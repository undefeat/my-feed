import * as React from 'react';
import Post, { PostInfo } from 'src/components/post';
import calcListLayout, { ListLayout, ScrollDirection } from 'src/logic/calcListLayout';
import './index.css';

interface Props {
    postInfos: PostInfo[];
    initialScrollTop?: number;
    onScrollTopChanged?: (scrollTop: number) => void;
}

interface State extends ListLayout {
    scrollTop: number;
}

class PostList extends React.Component<Props, State> {
    state = {
        renderFrom: 0,
        renderTo: 20,
        scrollTop: this.props.initialScrollTop || 0,
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

                <ul className="post-list">
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
            const totalRows = this.props.postInfos.length,
                containerHeight = container.getBoundingClientRect().height,
                { scrollTop, scrollHeight } = container;

            this.setState(prevState => {
                if (prevState.scrollTop !== scrollTop && this.props.onScrollTopChanged) {
                    this.props.onScrollTopChanged(scrollTop);
                }

                return {
                    ...calcListLayout(prevState, {
                        containerHeight,
                        prevScrollTop: prevState.scrollTop,
                        scrollTop,
                        scrollHeight,
                        overscan: this.overscan,
                        totalRows,
                        rowHeightMin: this.rowHeightMin
                    }),
                    scrollTop
                };
            });
        }
    };
}

export default PostList;
