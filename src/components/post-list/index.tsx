import * as React from 'react';
import Post, { PostInfo } from 'src/components/post';

interface Props {
    postInfos: PostInfo[];
}

interface State {}

class PostList extends React.Component<Props, State> {
    render() {
        return (
            <ul className="post-list">
                {this.props.postInfos.map(postInfo => (
                    <Post key={postInfo.id} {...postInfo} />
                ))}
            </ul>
        );
    }
}

export default PostList;
