import * as React from 'react';
import Post, { PostInfo } from '../post';
import { ListSelection } from '../../logic/calcListSelection';
import './index.css';

interface Props extends ListSelection {
    postInfos: PostInfo[];
    avgRowHeight: number | undefined;
    forwardContainerRef?: React.RefObject<HTMLDivElement>;
    forwardListRef?: React.RefObject<HTMLUListElement>;
}

class PostList extends React.PureComponent<Props> {
    render() {
        const { renderFrom, renderTo, avgRowHeight, postInfos, forwardContainerRef, forwardListRef } = this.props;

        const postInfosToRender = postInfos.slice(renderFrom, renderTo),
            paddingBefore = avgRowHeight ? renderFrom * avgRowHeight : 0,
            paddingAfter = avgRowHeight ? (postInfos.length - renderTo) * avgRowHeight : 0;

        return (
            <div ref={forwardContainerRef} className="post-container">
                <div style={{ height: paddingBefore }} />

                <ul ref={forwardListRef} className="post-list">
                    {postInfosToRender.map(postInfo => (
                        <Post key={postInfo.id} {...postInfo} />
                    ))}
                </ul>

                <div style={{ height: paddingAfter }} />
            </div>
        );
    }
}

export default PostList;
