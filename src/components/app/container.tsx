import * as React from 'react';
import UserService from 'src/services/UserService';
import PostService from 'src/services/PostService';
import LocalStorageService from 'src/services/LocalStorageService';
import './index.css';
import App from '.';

interface State {
    users: Model.User[];
    posts: Model.Post[];
    loading: boolean;
    initialScrollTop: number;
}

class AppContainer extends React.Component<{}, State> {
    state: State = {
        users: [],
        posts: [],
        loading: false,
        initialScrollTop: 0
    };

    render() {
        return <App {...this.state} />;
    }

    async componentDidMount() {
        const cloak = document.getElementById('cloak');
        if (cloak) {
            cloak.style.visibility = 'hidden';
            cloak.style.opacity = '0';
        }

        try {
            this.setState({ loading: true });

            const users = await UserService.getUsers();
            const posts = await PostService.getPosts();

            console.log(users, posts);

            this.setState({ users, posts, initialScrollTop: LocalStorageService.readScrollTop(), loading: false });
        } catch (e) {
            this.setState(() => {
                throw e;
            });
        }
    }
}

export default AppContainer;
