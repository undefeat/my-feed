import * as React from 'react';
import './index.css';

export interface PostInfo {
    id: number;
    author: string;
    title: string;
    body: string;
}

class Post extends React.PureComponent<PostInfo> {
    render() {
        const { author, title, body } = this.props;
        return (
            <li className="post-item">
                <header className="post-item__title">
                    <h2>{title}</h2>
                </header>

                <p className="post-item__body">{body}</p>

                <footer>
                    <h6 className="post-item__author">{author}</h6>
                </footer>
            </li>
        );
    }
}

export default Post;
