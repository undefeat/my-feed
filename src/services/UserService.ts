import ApiService from './ApiService';

class UserService extends ApiService {
    async getUsers(): Promise<Model.User[]> {
        const response = await fetch(this.API + 'users');

        if (response.status === 200) {
            const body = await response.json();
            const bodyMapped: Model.User[] = body.map(user => ({
                id: user.id,
                name: user.name
            }));

            return bodyMapped;
        } else {
            throw Error("Couldn't fetch users.");
        }
    }
}

export default new UserService();
