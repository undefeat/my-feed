import * as React from 'react';
import UserService from 'src/services/UserService';
import PostService from 'src/services/PostService';

interface State {
    users: Model.User[];
    posts: Model.Post[];
    loading: boolean;
}

class App extends React.Component<{}, State> {
    state = {
        users: [],
        posts: [],
        loading: false
    };

    render() {
        const { users, posts, loading } = this.state;

        if (loading) {
            return 'Loading...';
        }

        return (
            <div>
                <h2>Users</h2>
                {JSON.stringify(users)}

                <h2>Posts</h2>
                {JSON.stringify(posts)}
            </div>
        );
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const users = await UserService.getUsers();
            const posts = await PostService.getPosts();

            this.setState({ users, posts, loading: false });
        } catch (e) {
            this.setState(() => {
                throw e;
            });
        }
    }
}

export default App;
