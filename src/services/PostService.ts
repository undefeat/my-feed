import ApiService from './ApiService';

class PostService extends ApiService {
    async getPosts(): Promise<Model.Post[]> {
        const response = await fetch(this.API + 'posts');

        if (response.status === 200) {
            const body = await response.json();
            return body;
        } else {
            throw Error("Couldn't fetch posts.");
        }
    }
}

export default new PostService();
