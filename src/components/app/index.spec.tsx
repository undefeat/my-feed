import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import App from '.';

it('renders with "No Posts Found"', () => {
    const rendered = createRenderer(),
        tree = rendered.render(<App users={[]} posts={[]} loading={false} initialScrollTop={0} />);

    expect(tree).toMatchSnapshot();
});

it('renders with loader', () => {
    const rendered = createRenderer(),
        tree = rendered.render(<App users={[]} posts={[]} loading={true} initialScrollTop={0} />);

    expect(tree).toMatchSnapshot();
});

it('renders with post list', () => {
    const users = [
            { id: 1, name: 'Leanne Graham' },
            { id: 2, name: 'Ervin Howell' },
            { id: 3, name: 'Clementine Bauch' },
            { id: 4, name: 'Patricia Lebsack' },
            { id: 5, name: 'Chelsey Dietrich' },
            { id: 6, name: 'Mrs. Dennis Schulist' },
            { id: 7, name: 'Kurtis Weissnat' },
            { id: 8, name: 'Nicholas Runolfsdottir V' },
            { id: 9, name: 'Glenna Reichert' },
            { id: 10, name: 'Clementina DuBuque' }
        ],
        posts = [
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body:
                    'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
            },
            {
                userId: 1,
                id: 2,
                title: 'qui est esse',
                body:
                    'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
            },
            {
                userId: 1,
                id: 3,
                title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
                body:
                    'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
            },
            {
                userId: 1,
                id: 4,
                title: 'eum et est occaecati',
                body:
                    'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
            },
            {
                userId: 1,
                id: 5,
                title: 'nesciunt quas odio',
                body:
                    'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
            },
            {
                userId: 1,
                id: 6,
                title: 'dolorem eum magni eos aperiam quia',
                body:
                    'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae'
            },
            {
                userId: 1,
                id: 7,
                title: 'magnam facilis autem',
                body:
                    'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas'
            },
            {
                userId: 1,
                id: 8,
                title: 'dolorem dolore est ipsam',
                body:
                    'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae'
            },
            {
                userId: 1,
                id: 9,
                title: 'nesciunt iure omnis dolorem tempora et accusantium',
                body:
                    'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas'
            },
            {
                userId: 1,
                id: 10,
                title: 'optio molestias id quia eum',
                body:
                    'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error'
            }
        ];

    const rendered = createRenderer(),
        tree = rendered.render(<App users={users} posts={posts} loading={false} initialScrollTop={0} />);

    expect(tree).toMatchSnapshot();
});
