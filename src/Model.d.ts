declare namespace Model {
    interface User {
        id: number;
        name: string;
    }
    interface Post {
        userId: number;
        id: number;
        title: string;
        body: string;
    }
}