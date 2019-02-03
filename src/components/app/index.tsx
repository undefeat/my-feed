import * as React from 'react';
import UserService from 'src/services/UserService';
import PostService from 'src/services/PostService';
import PostList from 'src/components/post-list';
import { PostInfo } from 'src/components/post';
import LocalStorageService from 'src/services/LocalStorageService';
import './index.css';

interface State {
    users: Model.User[];
    posts: Model.Post[];
    loading: boolean;
    initialScrollTop: number;
}

class App extends React.Component<{}, State> {
    state: State = {
        users: [],
        posts: [],
        loading: false,
        initialScrollTop: 0
    };

    render() {
        const { users, posts, loading, initialScrollTop } = this.state;

        if (loading) {
            return 'Loading...';
        }

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
                <PostList
                    postInfos={postInfos}
                    initialScrollTop={initialScrollTop}
                    onScrollTopChanged={scrollTop => {
                        LocalStorageService._writeScrollTopThrottled(scrollTop);
                    }}
                />
            </main>
        );
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const users = await UserService.getUsers();
            const posts = await PostService.getPosts();

            this.setState({ users, posts, initialScrollTop: LocalStorageService.readScrollTop(), loading: false });
        } catch (e) {
            this.setState(() => {
                throw e;
            });
        }
    }
}

export default App;
