import * as React from 'react';
import Loader from '../loader';
import PostList from '../post-list/container';
import LocalStorageService from '../../services/LocalStorageService';
import { PostInfo } from '../post';

interface Props {
    users: Model.User[];
    posts: Model.Post[];
    loading: boolean;
    initialScrollTop: number;
}

class App extends React.PureComponent<Props> {
    render() {
        const { users, posts, loading, initialScrollTop } = this.props;

        const postInfos: PostInfo[] = posts.map(post => {
            const user = users.find(user => user.id === post.userId);

            return {
                id: post.id,
                author: user ? user.name : 'Unknown',
                title: post.title,
                body: post.body
            };
        });

        return (
            <main className="app">
                <h1>Recent posts</h1>

                {loading ? (
                    <Loader />
                ) : postInfos.length === 0 ? (
                    <h2>No Posts Found</h2>
                ) : (
                    <PostList
                        postInfos={postInfos}
                        rowCount={10}
                        overscan={10}
                        initialScrollTop={initialScrollTop}
                        onScrollTopChanged={scrollTop => {
                            LocalStorageService.writeScrollTopThrottled(scrollTop);
                        }}
                    />
                )}
            </main>
        );
    }
}

export default App;